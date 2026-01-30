# 🚀 Deploy Checklist & Verifikáció

## Pre-Deploy Ellenőrzés

- [x] **Astro config** - `trailingSlash: 'always'`, `build.format: 'directory'`
- [x] **_redirects** - SPA fallback törölve, explicit 301! szabályok
- [x] **Sitemap** - Manuális törölve, plugin generál
- [x] **404 oldal** - Létrehozva
- [x] **Belső linkek** - Trailing slash mindenhol
- [x] **Local build** - Sikeres (8 oldal)

## Deploy Lépések

```bash
# 1. Git commit
git add .
git commit -m "fix: resolve Googlebot 502 errors with trailing slash canonicalization"

# 2. Push to production
git push origin main

# 3. Netlify Dashboard
# - Ellenőrizd a build log-ot
# - Várj, amíg a deploy kész (2-3 perc)
```

## Post-Deploy Verifikáció

### 1️⃣ Gyors Smoke Test (3 curl parancs)

```bash
# Test 1: Főoldal 200?
curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://leventestudio.app/ | head -1

# Test 2: Trailing slash-es oldal 200?
curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://leventestudio.app/kapcsolat/ | head -1

# Test 3: Slash nélküli 301 redirectel?
curl -I -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://leventestudio.app/kapcsolat | grep -E "HTTP|location"
```

**Elvárt eredmény:**
```
HTTP/2 200        ← Test 1 OK
HTTP/2 200        ← Test 2 OK
HTTP/2 301        ← Test 3 redirect
location: /kapcsolat/  ← Test 3 target
```

---

### 2️⃣ Teljes Sitemap URL Teszt

```bash
#!/bin/bash
echo "Testing all sitemap URLs with Googlebot UA..."

URLS=(
  "/"
  "/rolam/"
  "/esettanulmanyok/"
  "/kapcsolat/"
  "/szolgaltatas/weboldal-audit/"
  "/szolgaltatas/seo-audit/"
  "/szolgaltatas/weboldal-gyorsitas/"
)

for url in "${URLS[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
    "https://leventestudio.app$url")
  
  if [ "$STATUS" = "200" ]; then
    echo "✅ $url - $STATUS"
  else
    echo "❌ $url - $STATUS"
  fi
  
  sleep 0.5
done
```

**Elvárt eredmény:** Mind a 7 URL **200 OK**

---

### 3️⃣ Trailing Slash Redirect Teszt

```bash
#!/bin/bash
echo "Testing trailing slash redirects..."

SLASH_TESTS=(
  "/rolam"
  "/esettanulmanyok"
  "/kapcsolat"
  "/szolgaltatas/weboldal-audit"
  "/szolgaltatas/seo-audit"
  "/szolgaltatas/weboldal-gyorsitas"
)

for url in "${SLASH_TESTS[@]}"; do
  RESPONSE=$(curl -s -I -A "Googlebot" "https://leventestudio.app$url")
  STATUS=$(echo "$RESPONSE" | grep "HTTP" | head -1 | awk '{print $2}')
  LOCATION=$(echo "$RESPONSE" | grep -i "^location:" | awk '{print $2}' | tr -d '\r')
  
  if [ "$STATUS" = "301" ]; then
    echo "✅ $url → $LOCATION"
  else
    echo "❌ $url - Unexpected status: $STATUS"
  fi
  
  sleep 0.5
done
```

**Elvárt eredmény:** Mind a 6 URL **301** redirect a trailing slash-es verzióra

---

### 4️⃣ Cache Viselkedés Teszt

```bash
# 1. kérés (várhatóan cache miss)
curl -I https://leventestudio.app/ | grep -i "cache-status"

# 2. kérés (várhatóan cache hit)
sleep 1
curl -I https://leventestudio.app/ | grep -i "cache-status"
```

**Elvárt eredmény:**
```
cache-status: "Netlify Edge"; fwd=miss    ← 1. kérés
cache-status: "Netlify Edge"; hit         ← 2. kérés
```

---

### 5️⃣ Sitemap Ellenőrzés

```bash
# Ellenőrizd, hogy a sitemap elérhető és trailing slash-es URL-eket tartalmaz
curl -s https://leventestudio.app/sitemap-index.xml | head -5
curl -s https://leventestudio.app/sitemap-0.xml | grep "<loc>" | head -7
```

**Elvárt eredmény:** Minden `<loc>` tag trailing slash-sel végződik

---

## ✅ Siker Kritériumok

1. ✅ Mind a 7 sitemap URL **200 OK** (Googlebot UA)
2. ✅ Slash nélküli URL-ek **301 redirect** slash-esre
3. ✅ Cache **95%+ hit rate** (2. kéréstől)
4. ✅ Response time **<100ms** (cache hit)
5. ✅ **0 db 502/504 hiba** (bármely URL, bármely UA)

---

## 🔥 Ha Valami Nem Működik

### Probléma: Még mindig 502-t kapok

**Debug:**
```bash
# 1. Ellenőrizd a response headeröket
curl -v -A "Googlebot" https://leventestudio.app/kapcsolat/ 2>&1 | grep -E "HTTP|x-nf-request-id|cache-status"

# 2. Nézd meg a Netlify deploy log-ot
# Netlify Dashboard → Deploys → Latest → Build log

# 3. Ellenőrizd, hogy a _redirects fájl helyesen deployolt
curl -s https://leventestudio.app/_redirects
```

**Fix:**
- Ellenőrizd, hogy a deploy tényleg az új kóddal történt
- Netlify cache clear: Deploys → Trigger deploy → Clear cache and deploy
- Várj 2-3 percet (edge cache propagáció)

---

### Probléma: 404 a trailing slash-es URL-ekre

**Debug:**
```bash
# Ellenőrizd a build output-ot
ls -la dist/rolam/
# Elvárt: dist/rolam/index.html
```

**Fix:**
- Ellenőrizd az `astro.config.mjs`-ben: `build.format: 'directory'`
- Rebuild + redeploy

---

### Probléma: Cache nem működik

**Debug:**
```bash
# Többszöri kérés ugyanarra az URL-re
for i in {1..5}; do
  curl -s -I https://leventestudio.app/ | grep -i "cache-status"
  sleep 0.5
done
```

**Fix:**
- Cache warm-up: Hívd meg az URL-eket 2-3x
- Netlify CDN propagáció: várj 5-10 percet
- Ha továbbra sem működik → Netlify support

---

## 📞 Google Search Console

### Re-crawl kérése (opcionális, de ajánlott)

1. **URL Inspection Tool:**
   - GSC Dashboard → URL Inspection
   - Másold be: `https://leventestudio.app/`
   - Kattints: "Request Indexing"

2. **Sitemap újraküldés:**
   - GSC Dashboard → Sitemaps
   - Távolítsd el a régi sitemap-et (ha van)
   - Add hozzá: `https://leventestudio.app/sitemap-index.xml`

3. **Monitor:**
   - Coverage Report (1-2 nap)
   - Crawl Stats (1 hét)
   - Elvárt: 0 error, minden URL indexelt

---

## 🎉 Deploy Kész!

Ha minden teszt zöld, akkor:
- ✅ **502 hibák megszűntek**
- ✅ **Cache stabilan működik**
- ✅ **SEO optimális** (clean URLs, gyors load)
- ✅ **Google crawler boldog** 🤖

**Következő 24-48 óra:**
- Monitor Google Search Console crawl stats
- Ellenőrizd a Plausible analytics-et (traffic normál?)
- Élvezd a stabil oldalt! 🚀
