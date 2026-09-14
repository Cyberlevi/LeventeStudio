# Levente Studio 2026 — Premium Homepage Redesign

## Pozíció

**Levente Studio = AI-native ügyfélszerző rendszerek prémium kivitelben.**

Nem klasszikus webügynökség. Nem külön web / SEO / Ads / automatizálás szolgáltatásokat értékesít, hanem egy összekötött ügyfélutat a figyelemtől a mérhető leadig és annak kezeléséig.

## Vizuális irány

- Alap: **graphite / warm ivory**
- Signature accent: **signal lime** — csak jel, státusz és fő CTA szerepben
- Hangulat: digital systems studio + editorial luxury
- Nem: neon AI stock, túl sok glassmorphism, sablonos bento dashboard, lila-kék gradient
- Tipó: nagy sans headline + kontrollált serif/editorial ellenpont
- Mozgás: lassú, funkcionális, reduced-motion kompatibilis
- Forma: vékony vonalak, grid, system map, státuszpontok, ritmikus whitespace

## B — Főoldal wireframe

### 00. Navigation
- sötét, áttetsző sticky header
- bal: LEVENTE / STUDIO wordmark
- közép: Megoldások / Lab / Tudástár / Rólam
- jobb: signal-lime CTA — `2 perces diagnózis`
- mobil: minimal menu + diagnózis CTA

### 01. Hero — System Signal
**Cél:** 5 másodperc alatt pozíció + bizonyíték + következő lépés.

Bal oldal:
- micro-label: `LEVENTE STUDIO / SYSTEMS LAB / 2026`
- H1: `Nem weboldalt építünk. Ügyfélszerző rendszert.`
- subhead: `Web + SEO + hirdetés + mérés + automatizálás — egy rendszerként.`
- primary CTA: `Indítsd a 2 perces diagnózist`
- secondary CTA: `Nézd meg a Labot`
- proof chips: saját éles projektek / mérhető funnel / AI-native workflow

Jobb oldal:
- signature **System Signal Map**
- vizuális folyamat: `Search / Ads → Landing → Lead → Follow-up`
- állapotok: tracking active / source captured / automation ready
- projekt chipek: Klima18ker / FuratMester / Bundavarázs
- emberi hitelesség: kis operator card Tarnóczi Leventével

### 02. Proof rail
Négy rövid, vizuális proof:
- Own projects
- Real tracking
- Built to convert
- Continuous improvement

Nincsenek kitalált számok.

### 03. Studio Lab — Selected systems
A három saját projekt nagy, vizuális editorial kártyákon.
- 01 Klima18ker
- 02 FuratMester
- 03 Bundavarázs

Mindegyiknél:
- probléma
- rendszer
- stack / capability
- esettanulmány link

### 04. Problem → System
Aszimmetrikus sticky storytelling.
Bal oldalon a problémák, jobb oldalon a rendszer-folyamat változik.

### 05. Method — Build / Measure / Improve
Három nagy lépés, nem klasszikus ikon-grid.
- Build
- Measure
- Improve

Az AI itt jelenik meg motor formájában, nem főtermékként.

### 06. Diagnostic — Interactive lead entry
A 2 perces Netlify form vizuálisan a fő termék belépője.
- progress feel
- erős kontraszt
- source / UTM / gclid rögzítés
- köszönőoldalon valódi `generate_lead`

### 07. Offer architecture
START / GROW / SCALE, de nem három azonos kártya.
- GROW domináns
- START és SCALE másodlagos
- rendszer-mélység vizuálisan is látszik

### 08. FAQ
Tömör, nagy tipó, kisebb disclosure elemek.

### 09. Final CTA
Sötét, egyetlen üzenet:
`Ne weboldalt tervezzünk. Nézzük meg, hol folyik el az ügyfél.`
Primary: diagnózis
Secondary: WhatsApp

### 10. Footer
Minimal, editorial, jogi linkekkel és rendszerpozícióval.

## C — Hero + visual system spec

### Hero layout
- min-height: 92–100svh
- max-width: 1280–1360px
- desktop: 56/44 split
- H1: 72–104px fluid
- mobil H1: 48–64px
- headline max 3 vizuális sor
- CTA-k max 2

### System Signal Map
- sötét panel a sötét hero-n belül, eltérő textúrával
- finom 24–32px grid
- 4 node, köztük vonal
- aktív node signal-lime
- lassú scan line / pulse
- semmi gyors vagy játékos animáció

### Design tokens
- Graphite: `#0B0D0C`
- Graphite soft: `#151816`
- Ivory: `#F4F0E8`
- Ivory muted: `#C9C3B8`
- Signal lime: `#D8FF78`
- Signal lime soft: `#BFE85A`
- Hairline dark: `rgba(244,240,232,.12)`
- Hairline light: `rgba(11,13,12,.12)`

### Motion
- entry reveal: 500–700ms
- node pulse: 2.8–3.6s
- scan: 8–12s
- hover translate: max 2–4px
- reduced motion: all decorative animation off

### CRO rules
- Primary CTA minden fő belépési ponton ugyanoda: `#diagnosztika`
- Telefon / WhatsApp micro conversion, nem lead
- `generate_lead` csak form submit után
- hero első viewportban: position + proof + CTA
- nincs CTA-zaj

## Sikerkritérium

A homepage akkor kész, ha első ránézésre nem sorolható be a tipikus magyar `weboldalkészítő` sablonok közé, mégis azonnal érthető, mit kap az ügyfél és mi a következő lépés.
