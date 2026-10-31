#!/usr/bin/env python3
"""Check local file references in the static Studio without network access."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
CHECKED = 0


def check_reference(source: Path, raw_url: str) -> None:
    global CHECKED
    value = raw_url.strip()
    if not value:
        return

    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return

    raw_path = unquote(parsed.path)
    if raw_path.startswith("/"):
        target = (ROOT / raw_path.lstrip("/")).resolve()
    else:
        target = (source.parent / raw_path).resolve()

    try:
        target.relative_to(ROOT)
    except ValueError:
        ERRORS.append(f"{source.relative_to(ROOT)}: path escapes repository: {value}")
        return

    if target.is_dir():
        target = target / "index.html"

    CHECKED += 1
    if not target.is_file():
        ERRORS.append(f"{source.relative_to(ROOT)}: missing local file: {value}")


class LocalReferenceParser(HTMLParser):
    def __init__(self, source: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.source = source

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name.lower() in {"href", "src", "poster", "action", "formaction"} and value:
                check_reference(self.source, value)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def main() -> int:
    for relative in ("index.html", "app.js", "styles.css"):
        if not (ROOT / relative).is_file():
            ERRORS.append(f"required file missing: {relative}")

    html_files = sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)
    for path in html_files:
        parser = LocalReferenceParser(path)
        try:
            parser.feed(path.read_text(encoding="utf-8"))
            parser.close()
        except (OSError, UnicodeError) as exc:
            ERRORS.append(f"{path.relative_to(ROOT)}: cannot read HTML: {exc}")

    css_files = sorted(path for path in ROOT.rglob("*.css") if ".git" not in path.parts)
    css_url = re.compile(r"url\(\s*(?:['\"])?(.*?)(?:['\"])?\s*\)", re.IGNORECASE)
    for path in css_files:
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            ERRORS.append(f"{path.relative_to(ROOT)}: cannot read CSS: {exc}")
            continue
        for match in css_url.finditer(text):
            check_reference(path, match.group(1))

    tool_dir = ROOT / "tools"
    tool_pages = {path.relative_to(ROOT).as_posix() for path in tool_dir.glob("*.html")}
    if len(tool_pages) != 15:
        ERRORS.append(f"expected 15 tool pages, found {len(tool_pages)}")

    app_js = ROOT / "app.js"
    if app_js.is_file():
        try:
            text = app_js.read_text(encoding="utf-8")
            tool_links = set(
                re.findall(r"(?:href|docsHref)\s*:\s*(['\"])(tools/[^'\"]+\.html)\1", text)
            )
            tool_links = {path for _, path in tool_links}
            for ref in sorted(tool_links):
                check_reference(app_js, ref)
            missing = sorted(tool_pages - tool_links)
            unexpected = sorted(tool_links - tool_pages)
            if missing:
                ERRORS.append(f"tool pages missing from app.js: {', '.join(missing)}")
            if unexpected:
                ERRORS.append(f"app.js references unregistered tool pages: {', '.join(unexpected)}")
        except (OSError, UnicodeError) as exc:
            ERRORS.append(f"app.js: cannot read tool links: {exc}")

    if ERRORS:
        print("Static reference checks failed:")
        for error in ERRORS:
            print(f"- {error}")
        return 1

    print(f"Static checks passed: 15 tool pages, {len(html_files)} HTML files, {len(css_files)} CSS files, {CHECKED} local references.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
