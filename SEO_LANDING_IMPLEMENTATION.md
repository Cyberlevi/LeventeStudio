# SEO Landing Oldalak Implementálás

## Létrehozott oldalak

3 új SEO landing oldal lett létrehozva azonos sablonnal:

1. **`/lassu-weboldal/`** - Lassú weboldal audit
2. **`/google-nem-indexel/`** - Google indexelési problémák
3. **`/weboldal-nem-hoz-ugyfelet/`** - Általános weboldal audit

## Oldal struktúra

Minden oldal tartalmazza:

- **H1** - Fő probléma megfogalmazása
- **Bevezető** - Rövid magyarázat az üzleti hatásról
- **Tünetek** - 5 felsorolás pont
- **Okok** - 3-5 számozott ok
- **Mit nézek meg az auditban** - 6 pont
- **Mit kapsz** - 6 számozott deliverable
- **FAQ** - 5 gyakori kérdés-válasz
- **CTA** - Erős call-to-action (Auditot kérek)
- **Kapcsolódó problémák** - Linkek a másik 2 landingre

## SEO elemek

Minden oldal tartalmazza:

✅ Egyedi `<title>` tag
✅ Egyedi `<meta name="description">`
✅ Canonical URL (`<link rel="canonical">`)
✅ Open Graph meta tagek (og:title, og:description, og:url, og:image)
✅ Twitter Card meta tagek
✅ JSON-LD strukturált adat (ProfessionalService schema)
✅ Benne van a sitemap-ben

## Főoldal integráció

A főoldalra (`/`) hozzáadva lett egy **"Gyakori problémák"** szekció:
- 3 kártyás layout
- Belső linkek mind a 3 landingre
- Elhelyezés: CaseStudies után, ForWhom előtt

## Teszt parancsok

### 1. HTTP Headers ellenőrzés

```bash
# Lassu weboldal
curl -I https://leventestudio.app/lassu-weboldal/

# Google nem indexel
curl -I https://leventestudio.app/google-nem-indexel/

# Weboldal nem hoz ügyfelet
curl -I https://leventestudio.app/weboldal-nem-hoz-ugyfelet/
```

**Elvárt kimenet:**
```
HTTP/2 200
content-type: text/html
```

### 2. Sitemap ellenőrzés

```bash
curl -s https://leventestudio.app/sitemap-0.xml | grep -E "lassu-weboldal|google-nem-indexel|weboldal-nem-hoz-ugyfelet"
```

**Elvárt kimenet:**
```xml
<url><loc>https://leventestudio.app/google-nem-indexel/</loc>...</url>
<url><loc>https://leventestudio.app/lassu-weboldal/</loc>...</url>
<url><loc>https://leventestudio.app/weboldal-nem-hoz-ugyfelet/</loc>...</url>
```

### 3. Meta tagek ellenőrzés

```bash
# Canonical URL
curl -s https://leventestudio.app/lassu-weboldal/ | grep -o 'rel="canonical" href="[^"]*"'

# OG Image
curl -s https://leventestudio.app/google-nem-indexel/ | grep -o 'property="og:image" content="[^"]*"'

# Structured Data
curl -s https://leventestudio.app/weboldal-nem-hoz-ugyfelet/ | grep -o '"@type":"ProfessionalService"'
```

**Elvárt kimenet:**
```
rel="canonical" href="https://leventestudio.app/lassu-weboldal/"
property="og:image" content="https://leventestudio.app/og-image.jpg"
"@type":"ProfessionalService"
```

### 4. Belső linkek ellenőrzés

```bash
# Főoldalon a Gyakori problémák szekció
curl -s https://leventestudio.app/ | grep -o 'href="/lassu-weboldal/"'

# Kapcsolódó problémák a landing oldalon
curl -s https://leventestudio.app/lassu-weboldal/ | grep -o 'href="/google-nem-indexel/"'
```

## Google Search Console teendők

A deployment után az alábbi 4 lépést kell végrehajtani a Search Console-ban:

### 1. URL Inspection - /lassu-weboldal/

```
1. Google Search Console > URL Inspection
2. Beírd: https://leventestudio.app/lassu-weboldal/
3. "Test Live URL" gomb
4. "Request Indexing" gomb
```

### 2. URL Inspection - /google-nem-indexel/

```
1. Google Search Console > URL Inspection
2. Beírd: https://leventestudio.app/google-nem-indexel/
3. "Test Live URL" gomb
4. "Request Indexing" gomb
```

### 3. URL Inspection - /weboldal-nem-hoz-ugyfelet/

```
1. Google Search Console > URL Inspection
2. Beírd: https://leventestudio.app/weboldal-nem-hoz-ugyfelet/
3. "Test Live URL" gomb
4. "Request Indexing" gomb
```

### 4. Sitemap újra beküldés

```
1. Google Search Console > Sitemaps
2. Ellenőrizd: sitemap-0.xml státuszát
3. Ha szükséges, töröld és add újra: sitemap-0.xml
4. Várható: 19 URL-t kell felismernie (volt 16 + 3 új)
```

**Megjegyzés:** Az indexelés 1-7 napot vehet igénybe. A "Request Indexing" felgyorsítja, de nem garantálja az azonnali indexelést.

## Komponensek

- **`ProblemLandingPageV2.tsx`** - Újrahasználható landing sablon
- **`CommonProblems.tsx`** - Gyakori problémák szekció a főoldalra

## Astro routing

- Trailing slash: **enabled** (alapértelmezett)
- URL formátum: `/lassu-weboldal/` (záró slash-el)
- Build output: `/dist/lassu-weboldal/index.html`
