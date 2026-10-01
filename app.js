const tools = [
  { name: 'CupoBot', slug: 'cupobot', description: 'hrvatski istraživački alat', icon: '🧠', href: 'tools/cupobot.html', docsHref: 'https://github.com/Hrvatski-Kanal/cupobot-hub' },
  { name: 'Downloader', slug: 'downloader', description: 'URL, tekst i Base64 u datoteku', icon: '⬇️', href: 'tools/downloader.html' },
  { name: 'Vodeni žig', slug: 'vodeni-zig', description: 'tekstualni žig na slici', icon: '💧', href: 'tools/vodeni-zig.html' },
  { name: 'Paleta boja', slug: 'paleta-boja', description: 'dominantne boje iz slike', icon: '🎨', href: 'tools/paleta-boja.html' },
  { name: 'Slike u PDF', slug: 'slike-u-pdf', description: 'više slika u jedan PDF', icon: '📄', href: 'tools/slike-u-pdf.html' },
  { name: 'Čitač teksta', slug: 'citac-teksta', description: 'tekst u govor preko browsera', icon: '🔊', href: 'tools/citac-teksta.html' },
  { name: 'Brojač teksta', slug: 'brojac-teksta', description: 'riječi, znakovi i rečenice', icon: '📏', href: 'tools/brojac-teksta.html' },
  { name: 'Okvir i sjena', slug: 'okvir-i-sjena', description: 'okvir i sjena na fotografiji', icon: '🖼️', href: 'tools/okvir-i-sjena.html' },
  { name: 'Spajanje slika', slug: 'spajanje-slika', description: 'kolaž od više slika', icon: '🧩', href: 'tools/spajanje-slika.html' },
  { name: 'Konverter slika', slug: 'konverter-slika', description: 'PNG, JPG i WebP', icon: '🖼️', href: 'tools/konverter-slika.html' },
  { name: 'QR kod generator', slug: 'qr-kod-generator', description: 'QR kod za tekst ili poveznicu', icon: '📱', href: 'tools/qr-kod-generator.html' },
  { name: 'Brisanje pozadine', slug: 'brisanje-pozadine', description: 'uklanjanje jednobojne pozadine', icon: '🧹', href: 'tools/brisanje-pozadine.html' },
  { name: 'Zamućivanje slike', slug: 'zamucivanje-pozadine', description: 'efekt zamućenja na cijeloj slici', icon: '🌫️', href: 'tools/zamucivanje-pozadine.html' },
  { name: 'Optimizacija slika', slug: 'optimizacija-slika', description: 'promjena dimenzija i kvalitete', icon: '⚡', href: 'tools/optimizacija-slika.html' },
  { name: 'Transkriptor audio i videa', slug: 'transkriptor', description: 'lokalni Whisper i Web Speech API za mikrofon', icon: '🎙️', href: 'tools/transkriptor.html' }
];

const grid = document.getElementById('toolGrid');

if (grid) {
  tools.forEach((tool, index) => {
    const card = document.createElement('article');
    card.className = 'tool-card';
    const nameHref = tool.docsHref || tool.href;
    const external = tool.docsHref ? ' target="_blank" rel="noopener noreferrer"' : '';
    card.innerHTML = `
      <div class="tool-number">${index + 1}</div>
      <div class="tool-icon">${tool.icon}</div>
      <a class="tool-name" href="${nameHref}"${external}>${tool.name}</a>
      <div class="tool-desc">${tool.description}</div>
      <a class="tool-open" href="${tool.href}">Otvori alat</a>
    `;
    grid.appendChild(card);
  });
}
