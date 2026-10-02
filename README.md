# Hrvatski Kanal Studio

Besplatni lokalni web alati za obradu slika, teksta, PDF-a, preuzimanja i transkripciju govora. Datoteke se obrađuju u browseru; nema našeg backend poslužitelja ni plaćenih API-ja.

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

## Otvoreni AI agenti

Veliki hrvatski vodič kroz otvorene projekte za AI asistente, upravljanje računalom, MCP povezivanje i razvoj računalnih agenata. Svaki naziv vodi izravno na njegov GitHub repozitorij.

### AI agenti

1. [Suna](https://github.com/kortix-ai/suna) — otvoreni agent za istraživanje, planiranje i izvršavanje zadataka
2. [gptme](https://github.com/gptme/gptme) — agent iz naredbenog retka za rad s kodom i alatima
3. [Terminator](https://github.com/iris-networks/terminator) — okvir za povezivanje i orkestraciju AI agenata
4. [OpenManus](https://github.com/FoundationAgents/OpenManus) — otvoreni okvir za eksperimentiranje s općim agentima
5. [AgenticSeek](https://github.com/Fosowl/agenticSeek) — projekt za samostalno istraživanje i izvršavanje zadataka
6. [Codel](https://github.com/semanser/codel) — AI pomoćnik za razvojne projekte i programski kod
7. [Opus](https://github.com/jeffrey-zang/opus) — eksperiment za višekoračne zadatke s agentom
8. [Arrakis](https://github.com/abshkbh/arrakis) — projekt za orkestraciju zadataka vođenih agentom
9. [Planar Computer Use](https://github.com/coplane/planar-computer-use) — eksperiment s agentima koji razumiju radnje na računalu
10. [LangManus](https://github.com/Darwin-lfl/langmanus) — okvir za jezične agente s planiranjem zadataka
11. [KwaiAgents](https://github.com/KwaiKEG/KwaiAgents) — istraživačke komponente za izgradnju AI agenata

### Upravljanje računalom

1. [Bytebot](https://github.com/bytebot-ai/bytebot) — agent za istraživanje rada s grafičkim sučeljem računala
2. [Magentic UI](https://github.com/microsoft/magentic-ui) — sučelje za suradnju čovjeka i računalnog agenta
3. [SOFIA](https://github.com/akim42003/SOFIA) — projekt za izvršavanje zadataka kroz računalno sučelje
4. [Agentic AI Computer](https://github.com/masfaatanveer/Agentic-AI-Computer) — eksperiment s agentom za računalne radnje
5. [Spongecake](https://github.com/aditya-nadkarni/spongecake) — eksperiment za računalne agente i automatizaciju
6. [Cuse](https://github.com/cuse-dev/cuse) — alat za istraživanje agenata koji koriste računalno sučelje
7. [Llama4 Computer Use](https://github.com/TheoLeeCJ/llama4-computer-use) — primjer računalnog agenta s Llama modelom
8. [Computer Agent](https://github.com/suitedaces/computer-agent) — povezivanje jezičnog modela s radnjama na računalu
9. [Computer Use Node.js Demo](https://github.com/lx-0/computer-use-nodejs-demo) — demo računalnog agenta u Node.js okruženju
10. [GPT Agent](https://github.com/iris-networks/gpt-agent) — eksperiment s GPT agentom i alatima

### MCP

1. [EdgeBox](https://github.com/BIGPPWONG/EdgeBox) — povezivanje agenata s alatima i vanjskim mogućnostima kroz MCP

### CUA SDK

1. [OWL](https://github.com/camel-ai/owl) — razvojni okvir za agente koji koriste računalne alate
2. [AI SDK Computer Use](https://github.com/vercel-labs/ai-sdk-computer-use) — primjer povezivanja AI SDK-a s računalnim radnjama
3. [E2B Open Computer Use](https://github.com/e2b-dev/open-computer-use) — primjer pokretanja računalnih radnji u sandboxu
4. [OpenAI CUA Sample App](https://github.com/openai/openai-cua-sample-app) — referentni primjer aplikacije za računalnu upotrebu

> **Napomena:** Ovo je urednički izbor, a ne službena preporuka. Prije instalacije provjeri aktivnost projekta, sigurnost, licencu, ovisnosti i moguće troškove modela ili hostinga. Popis je sadržajno nadahnut javnim popisom [Open Source Alternatives to Manus AI](https://github.com/rodrigoandrigo/open-source-alternatives-to-manus-ai), ali su hrvatski tekst, opisi i organizacija originalno uređeni za Hrvatski Kanal.

## Pokretanje

```bash
python3 -m http.server 8000
```

QR, PDF i transkriptor koriste besplatne CDN biblioteke samo u browseru. Transkriptor pri prvom korištenju preuzima besplatni Whisper model u cache; audio se obrađuje lokalno i ne šalje se na naš server. Za mikrofon je potreban browser s Web Speech API podrškom.

Hrvatski Kanal AI je odvojen od ovog statičkog Studio sučelja. Stranica alata koristi opcionalni Studio bridge (`window.HK_AGENT_ENDPOINT` ili `/api/hk-agent`); privatni hub, pravila i memorija ne kopiraju se u javni frontend.

## Licenca

Svi alati navedeni u ovom repozitoriju, njihov izvorni kod, skripte i prateća dokumentacija obuhvaćeni su vlasničkom nekomercijalnom licencom Hrvatskog Kanala iz datoteke [`LICENSE`](./LICENSE). Neovlašteno umnožavanje, redistribucija, komercijalno iskorištavanje i izrada izvedenih komercijalnih radova nisu dopušteni bez pisanog odobrenja nositelja autorskih prava.
