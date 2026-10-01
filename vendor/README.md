# Lokalni vendor bundleovi

Ova mapa sadrži samo browser bundleove besplatnih biblioteka koje Studio koristi bez CDN ovisnosti:

- `qrcode.min.js` — QRCode `1.5.4`, MIT licenca, izvor: https://github.com/soldair/node-qrcode
- `jspdf.umd.min.js` — jsPDF `2.5.0`, MIT licenca, izvor: https://github.com/parallax/jsPDF
- `transformers.min.js` — Transformers.js `3.7.2`, Apache-2.0 licenca, izvor: https://github.com/huggingface/transformers.js
- `ort-wasm-simd-threaded.jsep.wasm` — ONNX Runtime Web WASM backend, MIT licenca, potreban za lokalni Whisper runtime
- `studio-transcriber.js` — naš Hrvatski Kanal wrapper koji konfigurira lokalni runtime, WASM putanju i browser cache

Bundleovi su pinani u repozitoriju kako bi QR generator i Slike u PDF radili i kada vanjski CDN nije dostupan. Korisničke datoteke obrađuju se lokalno u pregledniku.

Transkriptor koristi naš lokalni runtime i WASM backend. Whisper model zauzima mnogo više prostora od samog JavaScript bundlea, pa se model lazy-loads i sprema u browser cache. Datoteka se ne šalje na Hrvatski Kanal server; model se preuzima samo prvi put iz javnog model repozitorija.
