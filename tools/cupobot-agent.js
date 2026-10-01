const message = document.getElementById('message');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const askBtn = document.getElementById('askBtn');
const status = document.getElementById('status');
const answer = document.getElementById('answer');
const downloadBtn = document.getElementById('downloadBtn');
let selectedFiles = [];
let selectedUrls = [];
let outputUrl = '';

fileInput.addEventListener('change', () => {
  selectedFiles = [...(fileInput.files || [])];
  selectedUrls.forEach((url) => URL.revokeObjectURL(url));
  selectedUrls = selectedFiles.map((file) => URL.createObjectURL(file));
  preview.src = selectedUrls[0] || '';
  preview.style.display = selectedUrls[0] ? 'block' : 'none';
  downloadBtn.style.display = 'none';
  status.textContent = selectedFiles.length ? `${selectedFiles.length} datoteka spremno za CupoBota.` : 'Spremno.';
});

function normalize(text) {
  return text.toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function say(tool, text) {
  answer.textContent = `CupoBot je odabrao alat „${tool}”. ${text}`;
  status.textContent = 'Alat je završio obradu.';
}
function publish(dataUrl, filename, tool, text) {
  if (outputUrl) URL.revokeObjectURL(outputUrl);
  outputUrl = dataUrl;
  downloadBtn.href = dataUrl;
  downloadBtn.download = filename;
  downloadBtn.style.display = 'inline-flex';
  say(tool, `${text} Rezultat je obrađen lokalno u pregledniku.`);
}
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = reject;
    image.src = url;
  });
}
function drawImage(image, maxWidth = 1800) {
  const scale = Math.min(1, maxWidth / image.naturalWidth);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}
function imageCanvas(image) { return drawImage(image); }
function rgbBackgroundRemoval(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = image;
  const samples = [[0,0], [width-1,0], [0,height-1], [width-1,height-1], [Math.floor(width/2),0], [0,Math.floor(height/2)]];
  const bg = [0, 0, 0];
  for (const [x, y] of samples) { const i = (y * width + x) * 4; bg[0] += data[i]; bg[1] += data[i+1]; bg[2] += data[i+2]; }
  bg[0] /= samples.length; bg[1] /= samples.length; bg[2] /= samples.length;
  for (let i = 0; i < data.length; i += 4) {
    const distance = Math.hypot(data[i] - bg[0], data[i+1] - bg[1], data[i+2] - bg[2]);
    const spread = Math.max(data[i], data[i+1], data[i+2]) - Math.min(data[i], data[i+1], data[i+2]);
    if (distance < 42 && spread < 55) data[i+3] = 0;
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}
async function imageTask(task) {
  if (!selectedFiles.length) throw new Error('Za ovaj alat učitajte sliku.');
  const image = await loadImage(selectedFiles[0]);
  const canvas = imageCanvas(image);
  const n = normalize(task);
  if (n.includes('pozadin') || n.includes('transparent') || n.includes('izrezi')) {
    publish(rgbBackgroundRemoval(canvas).toDataURL('image/png'), 'cupo-bez-pozadine.png', 'Brisanje pozadine', 'Pozadina je uklonjena.');
    return true;
  }
  if (n.includes('konvert') || n.includes('png') || n.includes('jpg') || n.includes('webp')) {
    const type = n.includes('webp') ? 'image/webp' : n.includes('jpg') || n.includes('jpeg') ? 'image/jpeg' : 'image/png';
    publish(canvas.toDataURL(type, 0.92), `cupo-konvertirano.${type.split('/')[1].replace('jpeg', 'jpg')}`, 'Konverter slika', `Slika je pretvorena u ${type.split('/')[1].toUpperCase()}.`);
    return true;
  }
  if (n.includes('optimiz') || n.includes('smanji') || n.includes('komprimir')) {
    const max = n.match(/(\d{3,4})\s*px/);
    const optimized = drawImage(image, max ? Number(max[1]) : 1200);
    publish(optimized.toDataURL('image/jpeg', 0.8), 'cupo-optimizirano.jpg', 'Optimizacija slika', 'Veličina i kvaliteta slike su optimizirane.');
    return true;
  }
  if (n.includes('vodeni zig') || n.includes('vodeni z') || n.includes('watermark')) {
    const ctx = canvas.getContext('2d');
    const text = task.match(/(?:tekst|žig|zig)\s*[:=-]?\s*(.+)$/i)?.[1] || 'Hrvatski Kanal';
    ctx.save(); ctx.globalAlpha = 0.45; ctx.font = `700 ${Math.max(26, canvas.width / 10)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeText(text, canvas.width/2, canvas.height/2); ctx.fillStyle = '#fff'; ctx.fillText(text, canvas.width/2, canvas.height/2); ctx.restore();
    publish(canvas.toDataURL('image/png'), 'cupo-vodeni-zig.png', 'Vodeni žig', 'Dodao sam tekstualni vodeni žig.');
    return true;
  }
  if (n.includes('zamut') || n.includes('blur')) {
    const ctx = canvas.getContext('2d'); const copy = document.createElement('canvas'); copy.width = canvas.width; copy.height = canvas.height; const cctx = copy.getContext('2d'); cctx.filter = 'blur(15px)'; cctx.drawImage(canvas, 0, 0); ctx.clearRect(0,0,canvas.width,canvas.height); ctx.drawImage(copy,0,0); publish(canvas.toDataURL('image/png'), 'cupo-zamuceno.png', 'Zamućivanje slike', 'Primijenio sam zamućivanje.');
    return true;
  }
  if (n.includes('okvir') || n.includes('sjena')) {
    const pad = 24; const framed = document.createElement('canvas'); framed.width = canvas.width + pad*2; framed.height = canvas.height + pad*2; const ctx = framed.getContext('2d'); ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 18; ctx.fillRect(pad,pad,canvas.width,canvas.height); ctx.shadowColor = 'transparent'; ctx.drawImage(canvas,pad,pad); publish(framed.toDataURL('image/png'), 'cupo-okvir.png', 'Okvir i sjena', 'Dodao sam okvir i sjenu.');
    return true;
  }
  if (n.includes('palet') || n.includes('boje')) {
    const ctx = canvas.getContext('2d'); const data = ctx.getImageData(0,0,canvas.width,canvas.height).data; const buckets = new Map(); for (let i=0;i<data.length;i+=16) { const key = [Math.round(data[i]/32)*32,Math.round(data[i+1]/32)*32,Math.round(data[i+2]/32)*32].join(','); buckets.set(key,(buckets.get(key)||0)+1); } const colors = [...buckets.entries()].sort((a,b)=>b[1]-a[1]).slice(0,6).map(([key])=>key.split(',').map(Number)); const palette = document.createElement('canvas'); palette.width=900; palette.height=180; const p=palette.getContext('2d'); colors.forEach((c,i)=>{p.fillStyle=`rgb(${c[0]},${c[1]},${c[2]})`;p.fillRect(i*150,0,150,180);p.fillStyle=(c[0]+c[1]+c[2]>380)?'#111':'#fff';p.font='16px sans-serif';p.fillText(`#${c.map(x=>x.toString(16).padStart(2,'0')).join('')}`,i*150+12,160);}); publish(palette.toDataURL('image/png'), 'cupo-paleta.png', 'Paleta boja', 'Izvukao sam dominantne boje.');
    return true;
  }
  return false;
}
async function qrTask(task) {
  if (typeof QRCode === 'undefined') throw new Error('QR modul nije učitan.');
  const value = task.replace(/.*?(qr|kod|kôd)\s*(za|od)?\s*[:=-]?/i, '').trim();
  if (!value) throw new Error('Napišite tekst ili URL za QR kod.');
  const canvas = document.createElement('canvas');
  await new Promise((resolve, reject) => QRCode.toCanvas(canvas, value, { width: 600, margin: 3 }, (error) => error ? reject(error) : resolve()));
  publish(canvas.toDataURL('image/png'), 'cupo-qr-kod.png', 'QR kod generator', 'QR kod je generiran.');
}
function textTask(task) {
  const text = task.replace(/^(prebroj|izbroji|broj riječi|brojac tekst[a]?|čitaj|procitaj)\s*[:=-]?/i, '').trim();
  const words = text ? text.split(/\s+/).length : 0; const chars = text.length; const sentences = text ? (text.match(/[.!?]+(?=\s|$)/g) || []).length : 0;
  if (normalize(task).includes('citaj') || normalize(task).includes('čitaj')) window.speechSynthesis?.speak(new SpeechSynthesisUtterance(text));
  say(normalize(task).includes('citaj') ? 'Čitač teksta' : 'Brojač teksta', `Tekst ima ${words} riječi, ${chars} znakova i ${sentences} rečenica.`);
}
async function runAgentTool() {
  const task = message.value.trim(); const n = normalize(task); downloadBtn.style.display = 'none';
  if (!task) { status.textContent = 'Opišite što želite napraviti.'; return; }
  askBtn.disabled = true; status.textContent = 'CupoBot analizira zadatak i bira naš alat…';
  try {
    if (n.includes('qr') || n.includes('qrcode')) await qrTask(task);
    else if (n.includes('broj rijec') || n.includes('brojac')) textTask(task);
    else if (n.includes('citaj tekst') || n.includes('procitaj')) textTask(task);
    else if (selectedFiles.length && await imageTask(task)) {}
    else {
      const response = await fetch(window.HK_CUPOBOT_ENDPOINT || '/api/cupobot', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ message: task, client:'hrvatski-kanal-studio', hasImage:selectedFiles.length > 0 }) });
      if (!response.ok) throw new Error(`Bridge HTTP ${response.status}`);
      const data = await response.json(); answer.textContent = data.text || data.answer || 'CupoBot nije vratio tekstualni odgovor.'; status.textContent = data.requiresApproval ? 'Nacrt čeka odobrenje.' : 'Odgovor je spreman.';
    }
  } catch (error) { status.textContent = error.message || 'Alat nije uspio završiti obradu.'; answer.textContent = 'CupoBot nije poslao sliku niti ključ trećoj strani. Provjerite unos i pokušajte ponovno.'; }
  finally { askBtn.disabled = false; }
}
askBtn.addEventListener('click', runAgentTool);
