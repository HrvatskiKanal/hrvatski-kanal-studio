# Hrvatski Kanal Studio

Besplatni statički web-alati za obradu slika, teksta, PDF-a, preuzimanja i transkripciju govora. Nema backend poslužitelja, korisničkih računa, oglasa, plaćenih API-ja, ključeva ni obavezne naplate.

> Datoteke se obrađuju u pregledniku korisnika. Aplikacija nema formu za plaćanje, ne šalje korisničke datoteke na poslužitelj Hrvatskog Kanala i ne koristi cloud funkcije.

## Hrvatski Kanal Tool Lab

Ovaj repozitorij je **kanonski dom za browser-lokalne alate** i početna točka za povezane agente i suradnike. Prije bilo kakve izmjene pročitaj:

- [`TOOL_REGISTRY.json`](TOOL_REGISTRY.json) — strojno čitljiv popis alata, repozitorija, testova i granica ovisnosti
- [`AGENTS.md`](AGENTS.md) — pravila za agente i dodavanje novih alata
- [`TOOL_LAB.md`](TOOL_LAB.md) — struktura cijelog laboratorija i siguran plan za buduće objedinjavanje starih kopija
- [`AUDIT_2026-10-01.md`](AUDIT_2026-10-01.md) — provjera svih 14 alata, ispravci i poznate granice

Novi lokalni alat pripada ovdje, u `tools/`. Alati kojima stvarno treba poslužitelj (npr. višestruki video downloader) ostaju odvojeni i moraju jasno navesti trošak CPU-a, prometa i hostinga.

## Alati (14)

1. **Brisanje pozadine** — uklanjanje jednobojne pozadine
2. **Konverter slika** — PNG, JPG i WebP
3. **Brojač teksta** — riječi, znakovi i rečenice
4. **Čitač teksta** — tekst u govor preko browsera
5. **Paleta boja** — dominantne boje iz slike
6. **QR kod generator** — QR kod za tekst ili poveznicu
7. **Optimizacija slika** — promjena dimenzija, formata i kvalitete
8. **Slike u PDF** — više slika u jedan PDF
9. **Spajanje slika** — kolaž od 2–4 slike u zadanom redoslijedu
10. **Okvir i sjena** — okvir i sjena na fotografiji
11. **Vodeni žig** — tekstualni žig na slici
12. **Zamućivanje slike** — efekt zamućenja na cijeloj slici
13. **Downloader** — izravni URL, tekst ili Base64 u datoteku
14. **Transkriptor audio i videa** — lokalni Whisper za datoteke i Web Speech API za mikrofon

## Downloader: stvarna ograničenja

Downloader radi za **izravne HTTP/HTTPS datoteke** koje izvor dopušta preuzeti u pregledniku (CORS). Ne koristi proxy, server ni skriveni plaćeni servis.

- URL mora voditi na datoteku, ne na web-stranicu ili zaštićeni stream.
- YouTube stranice/playliste/streamovi namjerno nisu podržani. Za vlastiti sadržaj koristi službeni YouTube Studio download ili Google Takeout.
- Facebook, Instagram, X/Twitter i TikTok poveznice često vode na stranicu ili odvojene video/audio streamove. Ovaj alat ne zaobilazi zaštite, ne prijavljuje se na račune i ne spaja odvojene streamove; za vlastiti sadržaj koristi službeni izvoz platforme.
- `.m3u8` i `.mpd` manifesti nisu video-datoteke sa zvukom, pa ih alat odbija umjesto da stvori datoteku bez tona.
- Za tekst i Base64 sav se rad odvija lokalno; ništa se ne šalje na mrežu.

To znači da nema troška servera, ali ni lažnog obećanja da će zaštićene društvene mreže raditi kao "univerzalni downloader".

## Ovisnosti i privatnost

QR generator i PDF alat koriste lokalno spremljene, pinane browser biblioteke u `vendor/`; nema CDN ovisnosti:

- `qrcode.min.js` — QRCode 1.5.4, MIT
- `jspdf.umd.min.js` — jsPDF 2.5.0, MIT
- `transformers.min.js` — Transformers.js 3.7.2, Apache-2.0
- `ort-wasm-simd-threaded.jsep.wasm` — ONNX Runtime Web WASM, MIT

Transkriptor radi lokalno nakon preuzimanja modela. Prilikom **prvog** pokretanja transkripcije datoteke preuzima besplatni Whisper model iz javnog model-repozitorija i sprema ga u cache preglednika; audio/video datoteka se ne šalje tamo ni na Hrvatski Kanal. Taj je jednokratni model-download jedina nužna vanjska mrežna ovisnost. Ako se želi potpuno offline transkripcija, kompatibilne datoteke modela treba prethodno objaviti zajedno sa statičkom aplikacijom (npr. u vlastitom GitHub Releaseu) i tada prilagoditi `vendor/studio-transcriber.js`.

## Lokalno pokretanje

```bash
python3 -m http.server 8000
```

Zatim otvori `http://localhost:8000`.

## Provjera bez instalacije i bez troška

Za repozitorij je dodana provjera koja koristi samo ugrađeni Node.js, bez `npm install`, bez paketa i bez mrežnog poziva:

```bash
npm test
```

Provjera potvrđuje da svih 14 alatnih stranica postoji i da je registrirano u `app.js`, da lokalne CSS/JS/WASM ovisnosti postoje te da se svaki inline JavaScript blok može sintaksno parsirati. Tako se kvarovi hvataju prije objave na GitHub Pages.

## Besplatno objavljivanje na GitHub Pages

Projekt je obična statička stranica i ne treba build, server, bazu, tajne varijable ni GitHub Actions.

1. U GitHub repozitoriju otvori **Settings → Pages**.
2. U **Build and deployment** izaberi **Deploy from a branch**.
3. Odaberi granu `main` i mapu `/(root)`, pa spremi.
4. Nemoj uključivati plaćene add-one, Actions deployment niti vanjske servere samo za ovaj projekt.

Za javni repozitorij GitHub Pages je najjednostavniji način hostanja bez aplikacijskog backenda. I dalje vrijede GitHubova pravila i ograničenja usluge; studio sam ne stvara potrošnju API-ja ili poslužitelja.
