const tools = [
  { name: 'Brisanje pozadine', slug: 'brisanje-pozadine', description: 'Ukloni jednobojnu pozadinu lokalno u browseru.', icon: '🧹', href: 'tools/brisanje-pozadine.html' },
  { name: 'Konverter slika', slug: 'konverter-slika', description: 'Pretvori sliku u PNG, JPG ili WebP.', icon: '🖼️', href: 'tools/konverter-slika.html' },
  { name: 'Brojač teksta', slug: 'brojac-teksta', description: 'Broj riječi, znakova, rečenica i vremena čitanja.', icon: '📏', href: 'tools/brojac-teksta.html' },
  { name: 'Čitač teksta', slug: 'citac-teksta', description: 'Pretvori tekst u govor bez slanja podataka.', icon: '🔊', href: 'tools/citac-teksta.html' },
  { name: 'Paleta boja', slug: 'paleta-boja', description: 'Izvadi dominantne boje iz slike.', icon: '🎨', href: 'tools/paleta-boja.html' },
  { name: 'QR kod generator', slug: 'qr-kod-generator', description: 'Generiraj QR kod za link ili tekst.', icon: '📱', href: 'tools/qr-kod-generator.html' },
  { name: 'Optimizacija slika', slug: 'optimizacija-slika', description: 'Smanji dimenzije i veličinu fotografije.', icon: '⚡', href: 'tools/optimizacija-slika.html' },
  { name: 'Slike u PDF', slug: 'slike-u-pdf', description: 'Pretvori više slika u jedan PDF dokument.', icon: '📄', href: 'tools/slike-u-pdf.html' },
  { name: 'Spajanje slika', slug: 'spajanje-slika', description: 'Spoji više slika u uredan kolaž.', icon: '🧩', href: 'tools/spajanje-slika.html' },
  { name: 'Okvir i sjena', slug: 'okvir-i-sjena', description: 'Dodaj okvir i sjenu fotografiji.', icon: '🖼️', href: 'tools/okvir-i-sjena.html' },
  { name: 'Vodeni žig', slug: 'vodeni-zig', description: 'Dodaj prilagodljivi tekstualni vodeni žig.', icon: '💧', href: 'tools/vodeni-zig.html' },
  { name: 'Zamućivanje pozadine', slug: 'zamucivanje-pozadine', description: 'Napravi efekt zamućene pozadine s istaknutim subjektom.', icon: '🌫️', href: 'tools/zamucivanje-pozadine.html' },
  { name: 'Obrezivanje slike', slug: 'obrezivanje-slike', description: 'Izreži sliku na željeni omjer ili slobodni format.', icon: '✂️', href: 'tools/obrezivanje-slike.html' },
];

const grid = document.getElementById('toolGrid');
tools.forEach(tool => {
  const card = document.createElement('a');
  card.href = tool.href;
  card.className = 'tool-card';
  card.innerHTML = `<div class="tool-icon">${tool.icon}</div><div class="tool-name">${tool.name}</div><div class="tool-desc">${tool.description}</div>`;
  grid.appendChild(card);
});
