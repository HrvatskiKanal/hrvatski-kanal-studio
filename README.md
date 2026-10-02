# Hrvatski Kanal Studio

Besplatni lokalni web alati za obradu slika, teksta, PDF-a, preuzimanja i transkripciju govora. Datoteke se obrađuju u browseru; nema našeg backend poslužitelja ni plaćenih API-ja.

Ovi alati namijenjeni su našoj stanici i našoj zajednici. Više alata i sadržaja dostupno je na [hrvatskikanal.com/alati](https://hrvatskikanal.com/alati).

## Alati (15)

1. **Hrvatski Kanal AI** — hrvatski istraživački alat
2. **Downloader** — URL, tekst i Base64 u datoteku
3. **Vodeni žig** — tekstualni žig na slici
4. **Paleta boja** — dominantne boje iz slike
5. **Slike u PDF** — više slika u jedan PDF
6. **Čitač teksta** — tekst u govor preko browsera
7. **Brojač teksta** — riječi, znakovi i rečenice
8. **Okvir i sjena** — okvir i sjena na fotografiji
9. **Spajanje slika** — kolaž od više slika
10. **Konverter slika** — PNG, JPG i WebP
11. **Brisanje pozadine** — uklanjanje jednobojne pozadine
12. **Zamućivanje slike** — efekt zamućenja na cijeloj slici
13. **QR kod generator** — QR kod za tekst ili poveznicu
14. **Optimizacija slika** — promjena dimenzija i kvalitete
15. **Transkriptor audio i videa** — lokalni Whisper i Web Speech API za mikrofon

Redoslijed je namjerno složen od kraćeg prema dužem nazivu alata radi vizualne urednosti. Opisi ostaju kratki i odvojeni od naziva alata.

## Pokretanje

```bash
python3 -m http.server 8000
```

QR, PDF i transkriptor koriste besplatne CDN biblioteke samo u browseru. Transkriptor pri prvom korištenju preuzima besplatni Whisper model u cache; audio se obrađuje lokalno i ne šalje se na naš server. Za mikrofon je potreban browser s Web Speech API podrškom.

Hrvatski Kanal AI je odvojen od ovog statičkog Studio sučelja. Stranica alata koristi opcionalni Studio bridge (`window.HK_AGENT_ENDPOINT` ili `/api/hk-agent`); privatni hub, pravila i memorija ne kopiraju se u javni frontend.

## Licenca

Svi alati navedeni u ovom repozitoriju, njihov izvorni kod, skripte i prateća dokumentacija obuhvaćeni su vlasničkom nekomercijalnom licencom Hrvatskog Kanala iz datoteke [`LICENSE`](./LICENSE). Neovlašteno umnožavanje, redistribucija, komercijalno iskorištavanje i izrada izvedenih komercijalnih radova nisu dopušteni bez pisanog odobrenja nositelja autorskih prava.
