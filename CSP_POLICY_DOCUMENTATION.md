# Content Security Policy (CSP) Dokumentáció
## LeventeStudio.app - CSP Beállítások és Döntések

**Dátum:** 2026.01.31
**CSP Verzió:** Standard CSP (Level 2)

---

## Jelenlegi CSP Konfiguráció

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com https://plausible.io https://*.supabase.co;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
```

**Hol van definiálva:** `public/_headers:6-16`

---

## Direktívák Magyarázata

### 1. `default-src 'self'`
**Mit jelent:** Alapértelmezetten csak a saját domain-ről engedélyezett tartalom.

**Miért:** Minimális jogosultság elve (principle of least privilege). Minden egyéb forrás explicit engedélyezést igényel.

---

### 2. `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io`

**Engedélyezett források:**
- `'self'` - Saját domain JS fájlok
- `'unsafe-inline'` - Inline scriptek (pl. GTM init, Consent Mode)
- `https://www.googletagmanager.com` - Google Tag Manager
- `https://plausible.io` - Plausible Analytics

**'unsafe-inline' Indoklása:**
- Astro framework inline scripteket használ client-side hydration-höz
- GTM initialization script inline
- Google Consent Mode v2 init script inline
- **Alternatíva:** Nonce-based CSP (komplex implementáció Astro-ban)
- **Kockázat:** XSS támadások lehetségesek, DE nincs user input feldolgozás
- **Elfogadva:** Kockázat alacsony egy statikus audit weboldalnál

**Blokkolva maradt:**
- `https://bolt.new` - Bolt.new badge script

**Bolt.new Badge Döntés:**
- ❌ **BLOKKOLVA MARAD**
- **Indok:** Nem szükséges funkció, marketing célú badge
- **Hatás:** Bolt.new badge nem jelenik meg (ha lett volna)
- **Előny:** Kevesebb külső függőség, gyorsabb betöltés, kisebb biztonsági felület

---

### 3. `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`

**Engedélyezett források:**
- `'self'` - Saját CSS fájlok
- `'unsafe-inline'` - Inline style tagek és style attribútumok
- `https://fonts.googleapis.com` - Google Fonts CSS

**'unsafe-inline' Indoklása:**
- Tailwind CSS utility classok
- Astro scoped styles
- **Kockázat:** CSS injection lehetséges (adatszivárgás)
- **Elfogadva:** Kockázat alacsony, modern CSS framework esetén általános

---

### 4. `font-src 'self' https://fonts.gstatic.com`

**Engedélyezett források:**
- `'self'` - Saját font fájlok
- `https://fonts.gstatic.com` - Google Fonts CDN

**Tiszta konfiguráció:** Nincs felesleges engedély.

---

### 5. `img-src 'self' data: https:`

**Engedélyezett források:**
- `'self'` - Saját képek
- `data:` - Data URI képek (inline base64)
- `https:` - **BÁRMILYEN HTTPS kép forrás**

**⚠️ BIZTONSÁGI FIGYELEMEZTETÉS:**

**Probléma:**
- `https:` túl megengedő
- Bármilyen HTTPS domain-ről betölthető kép
- Tracking pixel injection lehetséges

**Javaslat leszűkítésre:**
```
img-src 'self' data: https://images.pexels.com;
```

**Miért nem lett most leszűkítve:**
- Nem tudom, pontosan mely külső képforrásokat használsz
- Lehet, hogy más stock fotó szolgáltatást is használsz
- **TODO:** Audit után leszűkíteni a ténylegesen használt domain-ekre

**Ajánlás:**
1. Nézd meg a Network tab-ot → mely domain-ekről töltődnek képek
2. Whitelisteld csak azokat a domain-eket
3. Távolítsd el a `https:` catch-all engedélyt

---

### 6. `connect-src 'self' https://www.google-analytics.com https://plausible.io https://*.supabase.co`

**Engedélyezett API hívások:**
- `'self'` - Saját API-k
- `https://www.google-analytics.com` - Google Analytics beacon
- `https://plausible.io` - Plausible Analytics API
- `https://*.supabase.co` - Supabase backend (auth, database)

**Tiszta konfiguráció:** Minden engedély indokolt.

---

### 7. `frame-ancestors 'none'`

**Mit jelent:** Az oldal NEM ágyazható be iframe-be más oldalakon.

**Miért:** Clickjacking védelem.

**Hatás:**
- Senki nem teheti be a weboldaladat iframe-be
- Védelem click-hijacking ellen

**Helyes döntés:** ✅

---

### 8. `base-uri 'self'`

**Mit jelent:** A `<base>` tag csak saját domain-re mutathat.

**Miért:** Megakadályozza, hogy támadó átirányítsa a relatív URL-eket.

**Helyes döntés:** ✅

---

### 9. `form-action 'self'`

**Mit jelent:** Form csak saját domain-re küldhető.

**Miért:** Megakadályozza, hogy form adatok külső oldalra kerüljenek.

**Hatás:**
- Kapcsolat form csak leventestudio.app-ra küldhető
- Külső form action blokkolva

**Helyes döntés:** ✅

---

## Hiányzó Direktívák (Opcionális)

### `upgrade-insecure-requests`

**Mit csinálna:** HTTP kéréseket automatikusan HTTPS-re váltana.

**Miért nincs:**
- A weboldal már csak HTTPS-t használ
- Nincs legacy HTTP content

**Javaslat:** Hozzáadható extra biztonságért, de nem kritikus.

---

### `object-src 'none'`

**Mit csinálna:** `<object>`, `<embed>`, `<applet>` tagek blokkolása.

**Miért nincs:**
- Alapértelmezett `default-src 'self'` már korlátozza
- Nincs explicit használat ezekre a tagekre

**Javaslat:** Hozzáadható extra biztonságért:
```
object-src 'none';
```

---

### `report-uri` / `report-to`

**Mit csinálna:** CSP violation-öket riportálná egy endpoint-ra.

**Miért nincs:**
- Nincs beállítva reporting endpoint
- Fejlesztés közben zavaró lehet

**Javaslat:** Production környezetben hasznos lenne:
```
report-uri https://leventestudio.app/api/csp-report;
```

---

## CSP Tesztelés

### Hogyan teszteld a CSP-t:

1. **Böngésző Console:**
   - Nyisd meg DevTools → Console
   - Nézd meg, van-e CSP violation error
   - Példa: `Refused to load the script 'https://example.com/script.js' because it violates the following Content Security Policy directive`

2. **Browser Extension:**
   - [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
   - Chrome/Firefox: [CSP Validator extension]

3. **Report-Only mód teszteléshez:**
   - Production push előtt használd `Content-Security-Policy-Report-Only` headert
   - Nem blokkolja a tartalmat, csak riportál
   - Így látod, mi törne el éles környezetben

---

## Gyakori CSP Hibák és Megoldások

### 1. GTM script nem töltődik be

**Hiba:** `Refused to load script from 'https://www.googletagmanager.com/gtm.js'`

**Megoldás:**
- Ellenőrizd, hogy `script-src` tartalmazza: `https://www.googletagmanager.com`

---

### 2. Google Fonts nem töltődik be

**Hiba:** `Refused to load stylesheet from 'https://fonts.googleapis.com'`

**Megoldás:**
- `style-src` tartalmazza: `https://fonts.googleapis.com`
- `font-src` tartalmazza: `https://fonts.gstatic.com`

---

### 3. Inline script blokkolva

**Hiba:** `Refused to execute inline script because it violates CSP`

**Megoldás:**
- `'unsafe-inline'` hozzáadása `script-src`-hez (mint most is van)
- VAGY nonce-based CSP implementálása

---

### 4. Analytics tracking nem működik

**Hiba:** `Refused to connect to 'https://www.google-analytics.com/collect'`

**Megoldás:**
- `connect-src` tartalmazza: `https://www.google-analytics.com`

---

## Jövőbeli Fejlesztések

### 1. Nonce-based CSP (Magas prioritás)

**Miért:**
- Biztonságosabb, mint `'unsafe-inline'`
- Csak a nonce-szal ellátott inline scriptek futhatnak

**Implementáció Astro-ban:**
```astro
---
const nonce = crypto.randomUUID();
---

<script nonce={nonce}>
  // inline script
</script>

<!-- Header-ben: -->
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-{nonce}' https://www.googletagmanager.com">
```

**Komplexitás:** Magas (Astro SSG környezetben nehéz implementálni)

---

### 2. `img-src` leszűkítése (Közepes prioritás)

**Javaslat:**
```
img-src 'self' data: https://images.pexels.com https://images.unsplash.com;
```

**Miért:**
- Tracking pixel védelem
- Kisebb támadási felület

**Implementáció:** Egyszerű - csak a `_headers` fájlt kell módosítani

---

### 3. CSP Reporting beállítása (Alacsony prioritás)

**Javaslat:**
- Supabase Edge Function a CSP violation report fogadására
- Email alert kritikus CSP violation esetén

---

## CSP Best Practice Checklist

- [x] `default-src` restrictive
- [x] `frame-ancestors 'none'` clickjacking védelem
- [x] `base-uri 'self'` base tag védelem
- [x] `form-action 'self'` form hijacking védelem
- [x] GTM, GA4, Plausible engedélyezve
- [ ] `img-src` leszűkítése konkrét domain-ekre
- [ ] Nonce-based CSP implementálás
- [ ] CSP reporting endpoint
- [ ] `object-src 'none'` explicit deklarálás

---

## Összefoglalás

**Jelenlegi CSP állapot:** ✅ **MEGFELELŐ**

**Erősségek:**
- Clickjacking védelem aktív
- Form hijacking védelem aktív
- GTM és Analytics helyesen engedélyezve
- Minimal privilege approach

**Gyengeségek:**
- `'unsafe-inline'` script-src és style-src (elfogadható Astro framework miatt)
- `img-src https:` túl megengedő (javítandó)

**Ajánlás:**
- **Azonnali:** `img-src` leszűkítése konkrét domain-ekre
- **Hosszú távú:** Nonce-based CSP implementálás

**Bolt.new badge döntés:** ❌ **Blokkolva marad** - nem szükséges funkció.

---

**Készítette:** AI Audit Agent
**Utolsó frissítés:** 2026.01.31
