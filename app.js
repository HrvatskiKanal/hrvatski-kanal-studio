const tools = [
  { name: 'Brisanje pozadine', slug: 'brisanje-pozadine', description: 'Ukloni pozadinu sa slike u par klikova.', icon: '🧹', href: 'tools/brisanje-pozadine.html' },
  { name: 'Konverter slika', slug: 'konverter-slika', description: 'Pretvori JPG, PNG, WebP i GIF.', icon: '🖼️', href: 'tools/konverter-slika.html' },
  { name: 'Brojač teksta', slug: 'brojac-teksta', description: 'Broj slova, riječi i znakova.', icon: '📏', href: 'tools/brojac-teksta.html' },
  { name: 'Čitač teksta', slug: 'citac-teksta', description: 'Prebaci tekst u govor.', icon: '🔊', href: 'tools/citac-teksta.html' },
  { name: 'Paleta boja', slug: 'paleta-boja', description: 'Izvadi boje iz slike.', icon: '🎨', href: 'tools/paleta-boja.html' },
  { name: 'QR kod generator', slug: 'qr-kod-generator', description: 'Generiraj QR kod za link ili tekst.', icon: '📱', href: 'tools/qr-kod-generator.html' },
  { name: 'Optimizacija slika', slug: 'optimizacija-slika', description: 'Smanji veličinu ili kvalitetu.', icon: '⚡', href: 'tools/optimizacija-slika.html' },
  { name: 'Slike u PDF', slug: 'slike-u-pdf', description: 'Pretvori više slika u PDF.', icon: '📄', href: 'tools/slike-u-pdf.html' },
  { name: 'Spajanje slika', slug: 'spajanje-slika', description: 'Spoji više slika u kolaž.', icon: '🧩', href: 'tools/spajanje-slika.html' },
  { name: 'Okvir i sjena', slug: 'okvir-i-sjena', description: 'Dodaj okvir, sjenu i stil.', icon: '🖼️', href: 'tools/okvir-i-sjena.html' },
  { name: 'Vodeni žig', slug: 'vodeni-zig', description: 'Dodaj tekst na sliku.', icon: '💧', href: 'tools/vodeni-zig.html' },
  { name: 'Zamućivanje slike', slug: 'zamucivanje-pozadine', description: 'Dodaj efekt zamućenja cijeloj slici.', icon: '🌫️', href: 'tools/zamucivanje-pozadine.html' },
  { name: 'Downloader', slug: 'downloader', description: 'Preuzmi URL, tekst ili Base64 u datoteku lokalno u pregledniku.', icon: '⬇️', href: 'tools/downloader.html' },
  { name: 'Transkriptor audio i videa', slug: 'transkriptor', description: 'Pretvori govor iz audio/video datoteke ili mikrofona u tekst.', icon: '🎙️', href: 'tools/transkriptor.html' },
  { name: 'CupoBot', slug: 'cupobot', description: 'Neovisni hrvatski istraživački mozak kao Studio alat.', icon: '🧠', href: 'tools/cupobot.html' }
];

const grid = document.getElementById('toolGrid');

if (grid) {
  tools.forEach(tool => {
    const card = document.createElement('a');
    card.href = tool.href;
    card.className = 'tool-card';
    card.innerHTML = `
      <div class="tool-icon">${tool.icon}</div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-desc">${tool.description}</div>
    `;
    grid.appendChild(card);
  });
}
