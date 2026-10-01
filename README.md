# Hrvatski Kanal Studio

Besplatni, lokalni web alati za obradu slika, teksta i PDF-a. Sve što može radi direktno u browseru; datoteke se ne šalju na poslužitelj.

## Alati (13)

1. Brisanje pozadine
2. Konverter slika
3. Brojač teksta
4. Čitač teksta
5. Paleta boja
6. QR kod generator
7. Optimizacija slika
8. Slike u PDF
9. Spajanje slika
10. Okvir i sjena
11. Vodeni žig
12. Zamućivanje pozadine
13. Obrezivanje slike

## Pokretanje

Ovo je statična aplikacija bez build procesa i bez plaćenih API-ja. Pokreni je bilo kojim statičkim serverom, primjerice:

```bash
python3 -m http.server 8000
```

QR i PDF koriste besplatne CDN biblioteke samo na stranicama tih alata. Ostali alati rade bez vanjskih servisa.
