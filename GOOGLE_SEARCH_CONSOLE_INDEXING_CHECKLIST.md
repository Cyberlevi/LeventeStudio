# Google Search Console - Indexelési Checklist
## LeventeStudio.app - Netlify + Astro

---

## 1. Mit indexeljek, mit ne?

### ✅ INDEXELENDŐ URL-ek (16 oldal)

#### Főoldal
- `https://leventestudio.app/`

#### Szolgáltatások (4 oldal)
- `https://leventestudio.app/szolgaltatas/weboldal-audit/`
- `https://leventestudio.app/szolgaltatas/seo-audit/`
- `https://leventestudio.app/szolgaltatas/ux-audit/`
- `https://leventestudio.app/szolgaltatas/weboldal-gyorsitas/`

#### Blog (5 cikk + lista oldal)
- `https://leventestudio.app/blog/`
- `https://leventestudio.app/blog/google-search-console-hibak/`
- `https://leventestudio.app/blog/miert-lassu-a-wordpress-oldalam/`
- `https://leventestudio.app/blog/mikor-erdemes-weboldal-auditot-kerni/`
- `https://leventestudio.app/blog/ux-audit-specifikacio/`
- `https://leventestudio.app/blog/weboldal-konverzio-optimalizalas/`

#### Esettanulmányok (2 projekt + lista oldal)
- `https://leventestudio.app/esettanulmanyok/`
- `https://leventestudio.app/esettanulmanyok/bundavarazs-kutyakozmetika-audit/`
- `https://leventestudio.app/esettanulmanyok/klima18ker-weboldal-audit/`

#### Kapcsolat és Rólam
- `https://leventestudio.app/kapcsolat/`
- `https://leventestudio.app/rolam/`

### ❌ NEM INDEXELENDŐ URL-ek

#### Technikai oldalak
- `/404` - Hibalaoldal (nincs is a sitemap-ben)
- `/404.html` - Alternatív hibalaoldal
- Bármilyen `/admin/` vagy `/test/` prefix

#### Netlify deploy preview-k
- `https://deploy-preview-*--leventestudio.netlify.app/*`
- `https://*.netlify.app/*` (csak a fő domain indexelése)

#### Query paraméterek
- `?utm_source=*` - Marketing tracking paraméterek
- `?fbclid=*` - Facebook tracking
- `?gclid=*` - Google Ads tracking
- Bármilyen `?` paraméteres URL

#### Duplikált route-ok
- Trailing slash nélküli verziók (ha van trailing slash)
- HTTP verziók (csak HTTPS)
- www verziók (ha nincs www)

---

## 2. Robots Meta és Canonical Logika

### Minden indexelendő oldalon:
```html
<!-- Canonical: mindig a saját URL trailing slash-sel -->
<link rel="canonical" href="https://leventestudio.app/OLDAL_PATH/">

<!-- Meta robots: alapértelmezett index, follow -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
```

### 404 oldalon:
```html
<!-- Nincs canonical vagy noindex kell -->
<meta name="robots" content="noindex, follow">
```

### JAVASOLT: Minden oldal ellenőrzése
1. Canonical URL helyes-e (saját magára mutat)
2. Nincs véletlenül noindex meta tag
3. HTTPS és trailing slash konzisztens

---

## 3. Sitemap és Robots.txt

### Jelenlegi sitemap státusz: ✅ RENDBEN

#### Sitemap index
```
https://leventestudio.app/sitemap-index.xml
```

Ez tartalmazza:
```xml
<sitemap>
  <loc>https://leventestudio.app/sitemap-0.xml</loc>
  <lastmod>2026-01-31T12:53:18.264Z</lastmod>
</sitemap>
```

#### Sitemap-0.xml tartalom
16 URL található benne:
- Főoldal
- Blog lista + 5 blog cikk
- Esettanulmányok lista + 2 projekt
- 4 szolgáltatás oldal
- Kapcsolat, Rólam

**Minden URL helyes formátumú:**
- HTTPS ✅
- Trailing slash ✅
- Teljes domain ✅

### Robots.txt tartalom: ✅ RENDBEN

```
User-agent: *
Allow: /
Sitemap: https://leventestudio.app/sitemap-index.xml
```

### JAVASOLT: Query paraméterek kizárása

Ha sok marketing URL jön be különböző paraméterekkel, add hozzá:

```
User-agent: *
Allow: /
Disallow: /*?*

Sitemap: https://leventestudio.app/sitemap-index.xml
```

Ez blokkolja az összes query paraméteres URL-t. **CSAK akkor add hozzá, ha szükséges!**

---

## 4. Search Console Beállítás - Lépésről Lépésre

### 4.1. Property típus választása

**VÁLASSZ: URL prefix property-t**

```
Property típus: URL prefix
URL: https://leventestudio.app
```

**MIÉRT NE Domain property?**
- Domain property DNS TXT record-ot igényel
- URL prefix egyszerűbb, Netlify-nál már igazolt a domain
- Csak HTTPS-t indexelünk, nem kell külön HTTP property

### 4.2. Tulajdonjog igazolás

**Netlify automatikusan kezeli:**
1. Search Console > Add property > URL prefix
2. Választd: "HTML tag" vagy "Google Analytics" módszert
3. Ha GTM van telepítve, az is elég

Alternatíva: Add hozzá a `<head>`-be:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE">
```

### 4.3. Sitemap beküldés

1. Search Console > Sitemaps menüpont
2. Add hozzá: `sitemap-index.xml`

**NE add hozzá a sitemap-0.xml-t külön!** A sitemap-index automatikusan tartalmazza.

Státusz ellenőrzése:
- "Success" - minden rendben
- "Couldn't fetch" - URL elérhetőség probléma
- "Has errors" - XML formátum hiba

**Várható időkeret:**
- Sitemap beolvasás: 1-2 nap
- Első indexelések: 3-7 nap
- Teljes indexelés: 2-4 hét

### 4.4. URL Inspection - Első 10 prioritási URL

Ellenőrizd ezeket az URL-eket "URL Inspection" menüben:

1. `https://leventestudio.app/` (főoldal)
2. `https://leventestudio.app/szolgaltatas/weboldal-audit/`
3. `https://leventestudio.app/szolgaltatas/seo-audit/`
4. `https://leventestudio.app/blog/`
5. `https://leventestudio.app/blog/google-search-console-hibak/`
6. `https://leventestudio.app/esettanulmanyok/`
7. `https://leventestudio.app/kapcsolat/`
8. `https://leventestudio.app/rolam/`
9. `https://leventestudio.app/esettanulmanyok/bundavarazs-kutyakozmetika-audit/`
10. `https://leventestudio.app/blog/weboldal-konverzio-optimalizalas/`

**Mit nézz meg:**
- "URL is on Google" - már indexelve van
- "Coverage: Indexable" - nincs noindex
- "Canonical URL" - helyes canonical
- "Crawlable" - robots.txt nem blokkolja
- "Mobile usability" - nincs mobil hiba

### 4.5. Request Indexing - Mikor használd?

**HASZNÁLD, ha:**
- Új oldal, amit gyorsan indexelni akarsz
- Fontos módosítás történt (pl. title/description változott)
- Blog cikk frissen publikálva

**NE HASZNÁLD, ha:**
- Már van a sitemap-ben (automatikusan megy)
- Ugyanazt az URL-t 1 héten belül már kérted
- Tömeges URL-eket akarsz indexelni (limitált a napi kvóta)

**Daily limit:** ~10-12 URL/nap

**Ajánlott stratégia:**
1. Küld be a sitemap-et
2. Várj 2-3 napot
3. Csak a legfontosabb 3-5 URL-re kérj indexelést manuálisan

---

## 5. Első 7 Nap - Hibák, Amikre Figyelj

### Napi ellenőrzés (1-3. nap):

#### Coverage / Pages menü
- **"Excluded by 'noindex' tag"** - ellenőrizd, hogy szándékosan van-e
- **"Not found (404)"** - törött linkek, régiek URL-ek
- **"Redirect error"** - végtelen redirect loop
- **"Server error (5xx)"** - Netlify hibák, edge function problémák

#### Sitemaps menü
- **"Couldn't fetch"** - sitemap nem érhető el
- **"Has errors"** - XML szintaxis hiba
- **"Discovered URLs"** - mennyi URL-t talált a sitemap-ben

#### Experience menü
- **Core Web Vitals** - LCP, FID, CLS értékek
- **Mobile Usability** - viewport, font méret, kattintható elemek
- **HTTPS** - vegyes tartalom, tanúsítvány hibák

### Heti ellenőrzés (4-7. nap):

#### Enhancements
- **Structured data (Schema)** - JSON-LD hibák
- **Breadcrumbs** - ha van breadcrumb, validálás
- **Logo** - Organization schema hibák

#### Index Coverage
- **Valid** - hány oldal indexelve
- **Excluded** - miért vannak kizárva oldalak
- **Error** - kritikus hibák
- **Valid with warnings** - kismértékű problémák

---

## 6. Prioritási Sorrend - 1 Napos Checklist

### 1. ELSŐ: Canonical + Noindex Ellenőrzés (10 perc)
```bash
# Futtasd a parancsokat a 7. szekcióban
# Ellenőrizd, hogy minden oldal jó canonical-t és nincs noindex
```

### 2. Sitemap Validálás (5 perc)
```bash
# Robots.txt és sitemap elérhetőség
curl -I https://leventestudio.app/robots.txt
curl -I https://leventestudio.app/sitemap-index.xml
curl -I https://leventestudio.app/sitemap-0.xml
```

### 3. Státuszkódok (15 perc)
```bash
# 200 vs 301 vs 404 ellenőrzés
# Minden oldal 200-at adjon vissza
```

### 4. Search Console Property Setup (15 perc)
- URL prefix property létrehozása
- Sitemap beküldés
- URL Inspection első 3 oldal

### 5. Core Web Vitals (30 perc)
- PageSpeed Insights futtatás 5 fő oldalon
- Netlify Analytics ellenőrzés
- Chrome DevTools Lighthouse

### 6. Strukturált Adatok (20 perc)
- Schema.org Validator
- Rich Results Test
- JSON-LD hibák ellenőrzése

### 7. 404 és Redirectek (10 perc)
```bash
# 404 oldal működés
curl -I https://leventestudio.app/nem-letezik/
# Várható: 404 Not Found
```

---

## 7. Terminál Parancsok - Gyors Validáció

### 7.1. Robots.txt és Sitemap Elérhetőség

```bash
# Robots.txt státusz
curl -I https://leventestudio.app/robots.txt
# Várható: 200 OK + content-type: text/plain

# Sitemap index státusz
curl -I https://leventestudio.app/sitemap-index.xml
# Várható: 200 OK + content-type: application/xml

# Sitemap-0 státusz
curl -I https://leventestudio.app/sitemap-0.xml
# Várható: 200 OK + content-type: application/xml

# Site.webmanifest
curl -I https://leventestudio.app/site.webmanifest
# Várható: 200 OK + content-type: application/manifest+json
```

---

### 7.2. Canonical URL Ellenőrzés

```bash
# Főoldal canonical
curl -s https://leventestudio.app/ | grep -i "rel=\"canonical\""
# Várható: <link rel="canonical" href="https://leventestudio.app/">

# Blog lista canonical
curl -s https://leventestudio.app/blog/ | grep -i "rel=\"canonical\""
# Várható: <link rel="canonical" href="https://leventestudio.app/blog/">

# Szolgáltatás oldal canonical
curl -s https://leventestudio.app/szolgaltatas/weboldal-audit/ | grep -i "rel=\"canonical\""
# Várható: <link rel="canonical" href="https://leventestudio.app/szolgaltatas/weboldal-audit/">

# Batch check: összes szolgáltatás
for page in weboldal-audit seo-audit ux-audit weboldal-gyorsitas; do
  echo "=== /szolgaltatas/$page/ ==="
  curl -s "https://leventestudio.app/szolgaltatas/$page/" | grep -i "rel=\"canonical\""
done
```

---

### 7.3. Noindex Meta Ellenőrzés (biztosítsd, hogy NINCS noindex)

```bash
# Főoldal - NEM szabad noindex-nek lennie
curl -s https://leventestudio.app/ | grep -i "noindex"
# Várható: üres kimenet (nincs találat)

# Blog cikkek - NEM szabad noindex-nek lennie
curl -s https://leventestudio.app/blog/google-search-console-hibak/ | grep -i "noindex"
# Várható: üres kimenet

# 404 oldal - LEHET noindex (opcionális)
curl -s https://leventestudio.app/404/ | grep -i "noindex"
# Ha van noindex, az rendben van

# Batch check: összes blog cikk
for slug in google-search-console-hibak miert-lassu-a-wordpress-oldalam mikor-erdemes-weboldal-auditot-kerni ux-audit-specifikacio weboldal-konverzio-optimalizalas; do
  echo "=== /blog/$slug/ ==="
  result=$(curl -s "https://leventestudio.app/blog/$slug/" | grep -i "noindex")
  if [ -z "$result" ]; then
    echo "✅ OK - Nincs noindex"
  else
    echo "❌ HIBA - Van noindex: $result"
  fi
done
```

---

### 7.4. Státuszkódok - 200 / 301 / 404 Ellenőrzés

```bash
# Főoldal - 200 OK
curl -I -s https://leventestudio.app/ | head -n 1
# Várható: HTTP/2 200

# 404 oldal tesztelése
curl -I -s https://leventestudio.app/nem-letezik-ez-az-oldal/ | head -n 1
# Várható: HTTP/2 404

# Trailing slash redirect teszt (ha van)
curl -I -s https://leventestudio.app/blog | head -n 1
# Ha 301 vagy 308 → /blog/ redirect, az jó

# Batch check: összes oldal 200-e
echo "=== Státuszkód ellenőrzés ==="
for url in \
  "/" \
  "/blog/" \
  "/szolgaltatas/weboldal-audit/" \
  "/szolgaltatas/seo-audit/" \
  "/esettanulmanyok/" \
  "/kapcsolat/" \
  "/rolam/"; do
  status=$(curl -I -s "https://leventestudio.app$url" | head -n 1 | awk '{print $2}')
  echo "$url → $status"
done
```

---

### 7.5. OG Meta és Favicon Ellenőrzés

```bash
# OG Image ellenőrzés
curl -s https://leventestudio.app/ | grep -i "og:image"
# Várható: <meta property="og:image" content="https://leventestudio.app/og-image.jpg">

# OG Title
curl -s https://leventestudio.app/ | grep -i "og:title"
# Várható: <meta property="og:title" content="...">

# OG Description
curl -s https://leventestudio.app/ | grep -i "og:description"
# Várható: <meta property="og:description" content="...">

# Favicon fájl elérhetőség
curl -I https://leventestudio.app/favicon.ico
# Várható: 200 OK

# Apple Touch Icon
curl -I https://leventestudio.app/apple-touch-icon.png
# Várható: 200 OK

# Batch check: minden OG meta
echo "=== OG Meta ellenőrzés ==="
for meta in og:title og:description og:image og:url og:type; do
  echo "=== $meta ==="
  curl -s https://leventestudio.app/ | grep -i "$meta"
done
```

---

### 7.6. Security Headers Ellenőrzés

```bash
# Security headers ellenőrzés
curl -I https://leventestudio.app/ | grep -E "(X-Frame-Options|X-Content-Type-Options|Content-Security-Policy)"
# Várható:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: ...

# HTTPS redirect
curl -I http://leventestudio.app/ | head -n 1
# Ha 301/302 → HTTPS, az jó
```

---

### 7.7. Sitemap URL Számolás

```bash
# Hány URL van a sitemap-ben?
curl -s https://leventestudio.app/sitemap-0.xml | grep -o "<loc>" | wc -l
# Várható: 16

# Összes URL listázása
curl -s https://leventestudio.app/sitemap-0.xml | grep -oP '(?<=<loc>).*?(?=</loc>)'
```

---

### 7.8. Core Web Vitals - Gyors Teszt (Chrome DevTools)

```bash
# Lighthouse futtatás (Chrome CLI szükséges)
# npm install -g lighthouse

lighthouse https://leventestudio.app/ --only-categories=performance --output=json --output-path=./lighthouse-report.json

# Vagy egyszerű PageSpeed Insights API hívás
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://leventestudio.app/&strategy=mobile" | jq '.lighthouseResult.categories.performance.score'
```

---

### 7.9. Structured Data Validáció

```bash
# JSON-LD schema ellenőrzés (grep alapú)
curl -s https://leventestudio.app/ | grep -A 50 'application/ld+json'

# Ha jq van telepítve, parse-olhatod
curl -s https://leventestudio.app/ | grep -oP '(?<=<script type="application/ld\+json">).*?(?=</script>)' | jq .
```

---

### 7.10. Teljes Oldal Audit - Shell Script

Készíts egy `audit-site.sh` fájlt:

```bash
#!/bin/bash

DOMAIN="https://leventestudio.app"
PAGES=(
  "/"
  "/blog/"
  "/blog/google-search-console-hibak/"
  "/szolgaltatas/weboldal-audit/"
  "/szolgaltatas/seo-audit/"
  "/esettanulmanyok/"
  "/kapcsolat/"
  "/rolam/"
)

echo "=========================================="
echo "LeventeStudio.app - SEO Audit"
echo "=========================================="
echo ""

for page in "${PAGES[@]}"; do
  echo "📄 Ellenőrzés: $page"

  # Státuszkód
  status=$(curl -I -s "$DOMAIN$page" | head -n 1 | awk '{print $2}')
  echo "   ├─ Státusz: $status"

  # Canonical
  canonical=$(curl -s "$DOMAIN$page" | grep -i "rel=\"canonical\"" | sed -n 's/.*href="\([^"]*\)".*/\1/p')
  echo "   ├─ Canonical: $canonical"

  # Noindex ellenőrzés
  noindex=$(curl -s "$DOMAIN$page" | grep -i "noindex")
  if [ -z "$noindex" ]; then
    echo "   ├─ Noindex: ✅ Nincs (indexelhető)"
  else
    echo "   ├─ Noindex: ❌ VAN (nem indexelhető)"
  fi

  # OG Image
  og_image=$(curl -s "$DOMAIN$page" | grep -i "og:image" | sed -n 's/.*content="\([^"]*\)".*/\1/p')
  echo "   └─ OG Image: $og_image"

  echo ""
done

echo "=========================================="
echo "Sitemap ellenőrzés"
echo "=========================================="
sitemap_count=$(curl -s "$DOMAIN/sitemap-0.xml" | grep -o "<loc>" | wc -l)
echo "Sitemap URL-ek száma: $sitemap_count"
echo ""

echo "✅ Audit kész!"
```

Futtatás:
```bash
chmod +x audit-site.sh
./audit-site.sh
```

---

## 8. Összegzés - 1 Napos Ütemterv

### 09:00 - 09:30 | Terminál validáció
- Futtasd a 7.2, 7.3, 7.4 parancsokat
- Ellenőrizd a canonical, noindex, státuszkódokat

### 09:30 - 10:00 | Search Console Setup
- URL prefix property létrehozás
- Sitemap beküldés (sitemap-index.xml)
- Tulajdonjog igazolás

### 10:00 - 10:30 | URL Inspection
- Első 5 prioritási URL ellenőrzés
- Request indexing a főoldalra + 2 szolgáltatás oldalra

### 10:30 - 11:00 | OG Meta és Favicon
- OG image, title, description ellenőrzés (7.5)
- Favicon elérhetőség

### 11:00 - 11:30 | Core Web Vitals
- PageSpeed Insights 3 fő oldalon
- Lighthouse report főoldalra

### 11:30 - 12:00 | Structured Data
- Schema.org validator
- JSON-LD hibák ellenőrzése

### 12:00 - 12:15 | Dokumentáció
- Jegyzet készítése: mit csináltam, mit találtam
- Screenshot a Search Console-ról

---

## 9. Követés - 7-30 Nap

### Heti ellenőrzés:
- Search Console > Pages menü: hány oldal indexelve
- Coverage hibák száma
- Core Web Vitals trend
- Kattintások, megjelenések (ha van már adat)

### Havi ellenőrzés:
- Új oldalak hozzáadása a sitemap-hez (ha van)
- Blog cikkek indexelési státusza
- Top 10 keresési kifejezés

---

## 10. Hibák és Megoldások

### Probléma: "Sitemap couldn't fetch"
**Megoldás:**
1. Ellenőrizd: `curl -I https://leventestudio.app/sitemap-index.xml`
2. Ha 404 → build után ellenőrizd a dist/-ben
3. Ha 200 → várj 24 órát, Google cache lehet

### Probléma: "Excluded by 'noindex' tag"
**Megoldás:**
1. URL Inspection az adott URL-re
2. Ellenőrizd a source-ban: `curl -s URL | grep noindex`
3. Ha van noindex, távolítsd el és build újra

### Probléma: "Redirect error"
**Megoldás:**
1. Ellenőrizd: `curl -I URL`
2. Ha 301 loop → Netlify redirects vagy headers hiba
3. Ellenőrizd a `_redirects` fájlt

### Probléma: "Discovered - currently not indexed"
**Megoldás:**
- Ez normális, várj 7-14 napot
- Google algoritmus dönti el, mikor indexel
- Ha fontos, "Request indexing" manuálisan

---

## 11. További Források

- [Google Search Console Help](https://support.google.com/webmasters)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)

---

**FIGYELEM:** Ne várj csodát 24 órán belül! A Google indexelés 3-7 nap, teljes lefedettség 2-4 hét.

**Siker kritériumok 7 nap után:**
- ✅ Sitemap "Success" státusz
- ✅ Főoldal + 3-5 fontos oldal indexelve
- ✅ 0 kritikus hiba a Coverage-ben
- ✅ Core Web Vitals "Good" zónában

**Good luck!** 🚀
