# Lokalni vendor bundleovi

Ova mapa sadrži samo browser bundleove besplatnih biblioteka koje Studio koristi bez CDN ovisnosti:

- `qrcode.min.js` — QRCode `1.5.4`, MIT licenca, izvor: https://github.com/soldair/node-qrcode
- `jspdf.umd.min.js` — jsPDF `2.5.0`, MIT licenca, izvor: https://github.com/parallax/jsPDF

Bundleovi su pinani u repozitoriju kako bi QR generator i Slike u PDF radili i kada vanjski CDN nije dostupan. Korisničke datoteke obrađuju se lokalno u pregledniku.

Transkriptor namjerno ostaje lazy-loaded browser modul jer Whisper model zauzima mnogo više prostora od samog JavaScript bundlea. Datoteka se ne šalje na Hrvatski Kanal server; model se preuzima i sprema u browser cache prema Transformers.js ponašanju.
