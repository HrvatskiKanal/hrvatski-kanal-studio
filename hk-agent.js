(() => {
  const tools = [
    { name: 'Brisanje pozadine', terms: ['pozadin', 'background'], href: 'tools/brisanje-pozadine.html', answer: 'Za uklanjanje pozadine otvori alat, učitaj sliku i spremi PNG.' },
    { name: 'Konverter slika', terms: ['konvert', 'pretvori', 'jpg', 'png', 'webp'], href: 'tools/konverter-slika.html', answer: 'Konverter pretvara JPG, PNG, WebP i GIF izravno u pregledniku.' },
    { name: 'Brojač teksta', terms: ['broj', 'riječ', 'znak', 'tekst'], href: 'tools/brojac-teksta.html', answer: 'Brojač prikazuje riječi, znakove i duljinu teksta bez slanja sadržaja na server.' },
    { name: 'Čitač teksta', terms: ['čitaj', 'čitač', 'govor', 'izgovor'], href: 'tools/citac-teksta.html', answer: 'Čitač koristi govor koji je dostupan u tvom pregledniku ili operativnom sustavu.' },
    { name: 'Paleta boja', terms: ['palet', 'boje', 'boja'], href: 'tools/paleta-boja.html', answer: 'Paleta boja izvlači dominantne boje iz učitane slike lokalno.' },
    { name: 'QR kod generator', terms: ['qr', 'kod'], href: 'tools/qr-kod-generator.html', answer: 'QR generator radi kod za tekst ili poveznicu izravno u pregledniku.' },
    { name: 'Optimizacija slika', terms: ['optimiz', 'smanji', 'veličin'], href: 'tools/optimizacija-slika.html', answer: 'Optimizacija smanjuje veličinu slike i omogućuje izbor formata i kvalitete.' },
    { name: 'Slike u PDF', terms: ['pdf', 'dokument'], href: 'tools/slike-u-pdf.html', answer: 'Učitaj jednu ili više slika i napravi PDF na svom uređaju.' },
    { name: 'Spajanje slika', terms: ['spoji', 'kolaž'], href: 'tools/spajanje-slika.html', answer: 'Spajanje slika slaže više slika u kolaž prema redoslijedu učitavanja.' },
    { name: 'Okvir i sjena', terms: ['okvir', 'sjena'], href: 'tools/okvir-i-sjena.html', answer: 'Dodaj okvir, sjenu i stil slici prije spremanja.' },
    { name: 'Vodeni žig', terms: ['vodeni', 'žig', 'tekst na slici'], href: 'tools/vodeni-zig.html', answer: 'Vodeni žig dodaje tekst na sliku, lokalno u pregledniku.' },
    { name: 'Zamućivanje slike', terms: ['zamuć', 'blur'], href: 'tools/zamucivanje-pozadine.html', answer: 'Zamućivanje dodaje efekt zamućenja slici bez uploadanja datoteke.' },
    { name: 'Transkriptor', terms: ['transkript', 'audio', 'video', 'govor u tekst'], href: 'tools/transkriptor.html', answer: 'Transkriptor obrađuje audio ili video u pregledniku; prvi put može preuzeti otvoreni model u cache.' },
  ];
  const sitePages = [
    { name: 'Početna i Alati', terms: ['počet', 'naslov', 'alat', 'studio'], href: 'index.html#tools', answer: 'Na početnoj stranici nalazi se cijeli Hrvatski Kanal Studio i svi lokalni alati.' },
    { name: 'Vrijeme', terms: ['vrijem', 'prognoz', 'temperatur'], href: 'https://hrvatskikanal.com/vrijeme', answer: 'Rubrika Vrijeme prikazuje javno dostupne podatke; vrijednosti mogu biti nedostupne ili zastarjele.' },
    { name: 'Ekonomija', terms: ['ekonom', 'burz', 'tržišt', 'dion'], href: 'https://hrvatskikanal.com/ekonomija', answer: 'Rubrika Ekonomija prikazuje tržišne podatke i povezane vijesti uz napomene o izvoru.' },
    { name: 'Vijesti i članci', terms: ['vijest', 'članak', 'aktual'], href: 'https://hrvatskikanal.com/clanci', answer: 'Vijesti i članci dostupni su u rubrici Vijesti.' },
    { name: 'Politika', terms: ['politik'], href: 'https://hrvatskikanal.com/clanci?k=politika', answer: 'Članke iz rubrike Politika možeš otvoriti na stranici članaka.' },
    { name: 'Mediji', terms: ['medij'], href: 'https://hrvatskikanal.com/clanci?k=mediji', answer: 'Članke iz rubrike Mediji možeš otvoriti na stranici članaka.' },
    { name: 'Geopolitika', terms: ['geopolit'], href: 'https://hrvatskikanal.com/clanci?k=geopolitika', answer: 'Članke iz rubrike Geopolitika možeš otvoriti na stranici članaka.' },
    { name: 'Kalendar', terms: ['kalendar', 'vjera', 'povijest', 'domovinski rat'], href: 'https://hrvatskikanal.com/kalendar', answer: 'Kalendar okuplja tematske datume i sadržaje Hrvatskog Kanala.' },
    { name: 'Katolički kalendar', terms: ['katolič', 'katolick', 'svetac', 'spomendan', 'liturg'], href: 'https://hrvatskikanal.com/kalendar/vjera#cover', answer: 'Katolički kalendar i spomendani nalaze se u rubrici Vjera.' },
    { name: 'Povijest Hrvata', terms: ['povijest hrvata', 'hrvatska povijest'], href: 'https://hrvatskikanal.com/kalendar/povijest-hrvata#cover', answer: 'Povijest Hrvata nalazi se u posebnoj kalendarskoj rubrici.' },
    { name: 'Domovinski rat', terms: ['domovinski', 'rat'], href: 'https://hrvatskikanal.com/kalendar/domovinski-rat#cover', answer: 'Sadržaji o Domovinskom ratu nalaze se u posebnoj rubrici kalendara.' },
    { name: 'O kanalu', terms: ['o kanalu', 'tko ste'], href: 'https://hrvatskikanal.com/o-nama', answer: 'Osnovne informacije o Hrvatskom Kanalu nalaze se na stranici O kanalu.' },
    { name: 'Kontakt i podrška', terms: ['kontakt', 'email', 'e-mail', 'podrš', 'donacij', 'paypal', 'kava'], href: 'https://hrvatskikanal.com/kontakt', answer: 'Kontakt je za pitanja, a stranica Podrška objašnjava dobrovoljnu podršku radu kanala.' },
  ];

  const normalize = (value) => value.toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  async function wikipediaAnswer(question) {
    const url = `https://hr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(question)}&format=json&origin=*&utf8=1&srlimit=1`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    const search = await response.json();
    const title = search.query?.search?.[0]?.title?.trim();
    if (!title) return null;
    const extractUrl = `https://hr.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(title)}&format=json&origin=*`;
    const extractResponse = await fetch(extractUrl, { headers: { Accept: 'application/json' } });
    if (!extractResponse.ok) return null;
    const extract = await extractResponse.json();
    const page = Object.values(extract.query?.pages || {})[0];
    const summary = page?.extract?.replace(/\s+/g, ' ').trim();
    if (!summary) return null;
    return { text: `Nakon pretrage Hrvatskog Kanala pronašao sam i javni sažetak s Wikipedije o temi „${title}“. ${summary.slice(0, 600)}${summary.length > 600 ? '…' : ''}`, links: [] };
  }
  const answer = (question) => {
    const q = normalize(question.trim());
    if (!q) return { text: 'Napiši što tražiš — alat, rubriku, članak ili temu — pa ću pokušati pronaći najbliži odgovor.', links: [] };
    if (/^(pozdrav|bok|hej|hello|zdravo)/.test(q)) return { text: 'Pozdrav! Reci mi što želiš napraviti ili koju rubriku tražiš. Neću ti izmišljati odgovor ako ga nemam.', links: [] };
    if (q.includes('downloader') || q.includes('preuzim') || q.includes('youtube') || q.includes('tiktok')) return { text: 'HK Agent namjerno nije povezan s video downloaderom. Za video koristi zasebne službene upute i samo sadržaj za koji imaš pravo preuzimanja.', links: [] };
    const matches = [...tools, ...sitePages].filter((item) => item.terms.some((term) => q.includes(normalize(term))));
    if (matches.length) return { text: matches.length === 1 ? matches[0].answer : `Našao sam nekoliko povezanih mjesta na stranici. Najbliže tvom pitanju je: ${matches[0].answer}`, links: matches.slice(0, 3) };
    if (q.includes('besplat') || q.includes('cijena') || q.includes('novac')) return { text: 'Studio alati rade bez registracije i plaćenog API-ja. Obrada se odvija u tvom pregledniku; transkriptor može prvi put preuzeti otvoreni model u cache.', links: [] };
    return { text: 'Nisam našao dovoljno precizan odgovor. Probaj pitanje svojim riječima, na primjer: “gdje je vrijeme?”, “trebam PDF od slika”, “tražim politiku” ili “kako smanjiti sliku?”.', links: [] };
  };

  const root = document.createElement('div');
  root.className = 'hk-agent';
  root.innerHTML = `<button class="hk-agent-launch" type="button" aria-expanded="false" aria-controls="hk-agent-panel"><span class="hk-agent-mark">HK</span><span>HK Agent</span></button><section id="hk-agent-panel" class="hk-agent-panel" hidden aria-label="HK Agent"><header><div><strong>HK Agent</strong><small>Pretraži alate, rubrike i teme</small></div><button class="hk-agent-close" type="button" aria-label="Zatvori">×</button></header><div class="hk-agent-messages" aria-live="polite"><div class="hk-agent-message hk-agent-bot">Pozdrav! Mogu pretražiti alate i stranice Hrvatskog Kanala. Video downloader nije uključen.</div></div><form class="hk-agent-form"><label class="sr-only" for="hk-agent-input">Pitanje za HK Agent</label><input id="hk-agent-input" autocomplete="off" placeholder="Pretraži alat, rubriku ili temu…" /><button type="submit" aria-label="Pošalji">→</button></form><p class="hk-agent-note">Lokalna pretraga je osnovna. Ako nema rezultata, dohvaća se javni Wikipedia sažetak bez vanjske poveznice u chatu.</p></section>`;
  document.body.appendChild(root);
  const launch = root.querySelector('.hk-agent-launch');
  const panel = root.querySelector('.hk-agent-panel');
  const close = root.querySelector('.hk-agent-close');
  const form = root.querySelector('.hk-agent-form');
  const input = root.querySelector('#hk-agent-input');
  const messages = root.querySelector('.hk-agent-messages');
  const toggle = (open) => { panel.hidden = !open; launch.setAttribute('aria-expanded', String(open)); if (open) input.focus(); };
  launch.addEventListener('click', () => toggle(panel.hidden));
  close.addEventListener('click', () => toggle(false));
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    const user = document.createElement('div'); user.className = 'hk-agent-message hk-agent-user'; user.textContent = question; messages.appendChild(user);
    const result = answer(question);
    const show = (response) => { const bot = document.createElement('div'); bot.className = 'hk-agent-message hk-agent-bot'; bot.textContent = response.text; messages.appendChild(bot); if (response.links.length) { const list = document.createElement('div'); list.className = 'hk-agent-links'; response.links.forEach((tool) => { const link = document.createElement('a'); link.href = tool.href; link.textContent = `Otvori: ${tool.name}`; list.appendChild(link); }); messages.appendChild(list); } };
    if (result.links.length) show(result);
    else if (!/^(pozdrav|bok|hej|hello|zdravo)/.test(normalize(question)) && !['downloader', 'preuzim', 'youtube', 'tiktok', 'besplat', 'cijena', 'novac'].some((term) => normalize(question).includes(term))) {
      input.disabled = true;
      try { show(await wikipediaAnswer(question) || result); } catch { show(result); } finally { input.disabled = false; }
    } else show(result);
    input.value = ''; messages.scrollTop = messages.scrollHeight;
  });
})();
