# LEVENTE STUDIO – BRAND SYSTEM 2026

## MÁRKAPOZÍCIÓ

**Kategória:** weboldalkészítő stúdió szolgáltató vállalkozásoknak.

**Mit adunk el elsőként:** átlátható, gyors és vállalható weboldalt, amely bemutatja a szolgáltatást, segít választani és egyszerűvé teszi az ajánlatkérést.

**A magasabb csomagokban ehhez kapcsolódhat:**
- szolgáltatási és kampányoldal;
- technikai SEO és keresési struktúra;
- GA4 / GTM / kapcsolatfelvétel-mérés;
- ügyfélszerzési folyamat finomítása;
- leadkezelés, CRM és automatizálás;
- AI-támogatott elemzés és belső workflow.

Az AI és az automatizálás háttérképesség. Nem ezekkel kezdjük a kommunikációt, ha az ügyfél valójában jó weboldalt szeretne.

## FŐ ÍGÉRET

> Weboldal, amire büszkén küldöd az ügyfeled.

A kommunikáció legyen egyszerű: mit készítünk, mennyibe kerülhet, milyen saját munkáink vannak, és hogyan lehet ajánlatot kérni.

## BIZONYÍTÉK

Valós saját vagy családi szolgáltatói projektek:
- Klíma18ker;
- FuratMester;
- Bundavarázs.

Csak ellenőrzött eredményt vagy egyértelműen bemutatott folyamatot állítunk tényként. Demonstrációs vagy kitalált teljesítményszám nem jelenhet meg valós eredményként.

## SZOLGÁLTATÁSI SZINTEK

A csomagok egyetlen forrása: `src/data/studio-offers.ts`.

### PRESENCE
Profi online jelenlét – **149 000 Ft-tól**.

### START
Weboldal a szolgáltatásaidhoz – **250 000 Ft-tól**.

### GROW
Weboldal és ügyfélszerzés – **450–650 000 Ft**.

### SCALE
Rendezett ügyfélkezelés – **750 000 Ft-tól**.

A nyilvános ár- és csomagszöveget ne duplikáljuk más fájlokban, ha az közös adatból renderelhető.

## KONVERZIÓS ÚT

**Elsődleges CTA:** Ajánlatot kérek.

Az ajánlatkérő célja nem egy technikai „diagnosztikai” élmény eladása, hanem hogy az érdeklődő röviden leírja a vállalkozását és a feladatot, majd személyes egyeztetés következzen.

**Másodlagos csatornák:** e-mail és telefon.

A WhatsApp lehet kiegészítő csatorna, de ne legyen route-onként eltérő elsődleges CTA.

## HANGNEM

Legyen:
- emberi;
- világos;
- szakértői;
- konkrét;
- nyugodt és prémium;
- magyarul természetes.

Kerüljük:
- felesleges angol zsargont;
- „system / diagnostic / signal / operator / lab” UI-nyelvet, ha magyarul egyszerűbben elmondható;
- túlzó garanciákat;
- technológiai öncélúságot;
- konkurencia lenézését;
- hosszú marketingrizsát.

## VIZUÁLIS IDENTITÁS

### Színek
- Graphite: `#0b0d0c`
- Graphite soft: `#151816`
- Warm ivory: `#f4f0e8`
- Ivory muted: `#c9c3b8`
- Signal lime: `#d8ff78`

A régi taupe/cream paletta legacy. Új felületen ne ez legyen az alap.

### Tipográfia
- **Inter:** navigáció, törzsszöveg, UI és fő értékajánlat.
- **Cormorant Garamond:** editorial kiemelések és szekciócímek.

### Layout
- `site-shell`: széles marketing- és portfóliófelületek.
- `content-shell`: olvasási és részletes tartalmi felületek.
- Mobilon az elsődleges konverziós út legyen könnyen elérhető.
- Ne építsünk párhuzamos Header / Contact / Sticky CTA design-generációkat.

## LOGÓ ÉS NÉVHASZNÁLAT

**Márkanév:** Levente Studio  
**Személy:** Tarnóczi Levente  
**Szerep:** weboldalkészítő és digitális rendszerépítő

A fejléc és a lábléc ugyanazt a márka-lockupot és névlogikát kövesse.

## TECHNIKAI ELVEK

- Astro-first, statikus render ahol lehet.
- React csak valós interakcióhoz.
- Analitikai kattintásméréshez a közös `data-track-*` rendszer használata.
- Csomagadatok: `src/data/studio-offers.ts`.
- Cookie/consent felület globális.
- Egyetlen mobil CTA komponens.
- A jogi dokumentumoknak saját, olvasható tipográfiai rendszere van.
- 320–430 px között is ellenőrizhető, kényelmes mobilélmény.

---

**Verzió:** 3.0  
**Frissítve:** 2026-09-19
