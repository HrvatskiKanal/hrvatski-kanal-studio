# Hrvatski Kanal Studio

Besplatni lokalni web alati za obradu slika, teksta, PDF-a, preuzimanja i transkripciju govora. Datoteke se obrađuju u browseru; nema našeg backend poslužitelja ni plaćenih API-ja.

## Alati (15)

1. **Brisanje pozadine** — uklanjanje jednobojne pozadine
2. **Konverter slika** — PNG, JPG i WebP
3. **Brojač teksta** — riječi, znakovi i rečenice
4. **Čitač teksta** — tekst u govor preko browsera
5. **Paleta boja** — dominantne boje iz slike
6. **QR kod generator** — QR kod za tekst ili poveznicu
7. **Optimizacija slika** — promjena dimenzija i kvalitete
8. **Slike u PDF** — više slika u jedan PDF
9. **Spajanje slika** — kolaž od više slika
10. **Okvir i sjena** — okvir i sjena na fotografiji
11. **Vodeni žig** — tekstualni žig na slici
12. **Zamućivanje slike** — efekt zamućenja na cijeloj slici
13. **Downloader** — URL, tekst i Base64 u datoteku
14. **Transkriptor audio i videa** — lokalni Whisper za datoteke i Web Speech API za mikrofon
15. **CupoBot** — neovisni hrvatski istraživački mozak pozvan kao Studio alat; javne akcije i objave zahtijevaju odobrenje

## Pokretanje

```bash
python3 -m http.server 8000
```

QR, PDF i transkriptor koriste besplatne CDN biblioteke samo u browseru. Transkriptor pri prvom korištenju preuzima besplatni Whisper model u cache; audio se obrađuje lokalno i ne šalje se na naš server. Za mikrofon je potreban browser s Web Speech API podrškom.

CupoBot je odvojen od ovog statičkog Studio sučelja. Stranica alata koristi opcionalni Studio bridge (`window.HK_CUPOBOT_ENDPOINT` ili `/api/cupobot`); privatni hub, pravila i memorija ne kopiraju se u javni frontend.
