import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const toolsDirectory = join(root, 'tools');
const registryPath = join(root, 'TOOL_REGISTRY.json');
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'hk-studio-check-'));
const errors = [];
let inlineScriptCount = 0;

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function isExternal(value) {
  return /^(?:https?:)?\/\//i.test(value) || /^(?:data|mailto|tel):/i.test(value);
}

function checkInlineJavaScript(htmlPath, html) {
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let index = 0;
  while ((match = scriptPattern.exec(html))) {
    const attributes = match[1];
    const code = match[2].trim();
    if (/\bsrc\s*=/i.test(attributes) || !code) continue;
    const extension = /\btype\s*=\s*["']module["']/i.test(attributes) ? '.mjs' : '.js';
    const checkFile = join(temporaryDirectory, `${relative(root, htmlPath).replaceAll('/', '_')}-${index}${extension}`);
    writeFileSync(checkFile, code);
    const result = spawnSync(process.execPath, ['--check', checkFile], { encoding: 'utf8' });
    assert(result.status === 0, `${relative(root, htmlPath)}: JavaScript syntax error\n${result.stderr}`);
    inlineScriptCount += 1;
    index += 1;
  }
}

function checkLocalAssets(htmlPath, html) {
  const pattern = /<(script|link)\b[^>]*(?:src|href)\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const [, tag, source] = match;
    if (isExternal(source)) {
      assert(false, `${relative(root, htmlPath)}: ${tag} must not load a remote asset (${source})`);
      continue;
    }
    const localPath = resolve(dirname(htmlPath), source.split(/[?#]/, 1)[0]);
    assert(localPath.startsWith(root) && exists(localPath), `${relative(root, htmlPath)}: missing local ${tag} asset ${source}`);
  }
}

function exists(path) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

try {
  const tools = readdirSync(toolsDirectory)
    .filter(name => name.endsWith('.html'))
    .sort();
  assert(tools.length === 14, `Expected 14 tool pages, found ${tools.length}.`);

  const app = readFileSync(join(root, 'app.js'), 'utf8');
  const registeredTools = [...app.matchAll(/href:\s*'tools\/([^']+\.html)'/g)].map(match => match[1]).sort();
  assert(registeredTools.length === tools.length, `app.js registers ${registeredTools.length} tools, but ${tools.length} pages exist.`);
  assert(JSON.stringify(registeredTools) === JSON.stringify(tools), 'app.js tool links do not match the actual tool pages.');

  let registry = null;
  try {
    registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  } catch (error) {
    assert(false, `TOOL_REGISTRY.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (registry) {
    assert(registry.hubRepository === 'HrvatskiKanal/hrvatski-kanal-studio', 'TOOL_REGISTRY.json must name this repository as the Tool Lab hub.');
    const studio = registry.repositories?.find(repository => repository.id === 'studio');
    assert(studio?.role === 'canonical-local-tool-lab', 'TOOL_REGISTRY.json must mark the Studio as canonical-local-tool-lab.');
    const registryTools = (registry.tools || []).map(tool => tool.path?.replace(/^tools\//, '')).sort();
    assert(registryTools.length === tools.length, `TOOL_REGISTRY.json registers ${registryTools.length} tools, but ${tools.length} pages exist.`);
    assert(JSON.stringify(registryTools) === JSON.stringify(tools), 'TOOL_REGISTRY.json tool paths do not match the actual tool pages.');
    const ids = (registry.tools || []).map(tool => tool.id);
    assert(new Set(ids).size === ids.length, 'TOOL_REGISTRY.json contains duplicate tool ids.');
  }

  const pages = [join(root, 'index.html'), ...tools.map(name => join(toolsDirectory, name))];
  for (const pagePath of pages) {
    const html = readFileSync(pagePath, 'utf8');
    checkLocalAssets(pagePath, html);
    checkInlineJavaScript(pagePath, html);
  }

  if (errors.length) {
    console.error(`Static check failed with ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
    process.exitCode = 1;
  } else {
    console.log(`Static check passed: ${tools.length} tool pages, ${inlineScriptCount} inline scripts, and all local assets validated.`);
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
