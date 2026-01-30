# Netlify Setup Guide - LeventeStudio

## Jelenlegi Helyzet

✅ Build kész: `dist/` folder
✅ Redirect loop fix alkalmazva
❌ Deploy: GitHub Pages → **Át kell állítani Netlify-re**

---

## Opció 1: Netlify UI Deploy (Ajánlott - Egyszerű)

### 1. Netlify Dashboard
1. Megy ide: **https://app.netlify.com/**
2. Sign in (GitHub accounttal ajánlott)

### 2. Import Project
**Ha már van site "leventestudio" néven:**
- Sites → `leventestudio` → Site settings → Build & deploy
- **Git repository:** Link repositoryt

**Ha még nincs site:**
- **"Add new site"** → "Import an existing project"
- GitHub választása
- Repository kiválasztása

### 3. Build Settings Megadása
```
Build command: npm run build
Publish directory: dist
Node version: 20
```

**Environment variables** (.env fájlból):
```
VITE_SUPABASE_URL=<from .env>
VITE_SUPABASE_ANON_KEY=<from .env>
```

### 4. Deploy Settings
- **Branch:** `main`
- **Auto publish:** Enable (auto deploy git push után)
- **Production branch:** `main`

### 5. Domain Settings
- Site settings → Domain management
- **Custom domain:** `leventestudio.app`
- **HTTPS:** Automatikusan enabled (Let's Encrypt)

---

## Opció 2: Netlify CLI Deploy (Gyors Test)

### 1. Telepítés
```bash
npm install -g netlify-cli
```

### 2. Login
```bash
netlify login
# Böngésző megnyílik → Authorize
```

### 3. Site Linking

**Ha már létezik a site:**
```bash
cd /tmp/cc-agent/62673665/project
netlify link
# Choose: "Use current git remote origin"
# Or: "Search by site name" → leventestudio
```

**Ha új site:**
```bash
netlify init
# "Create & configure a new site"
# Team: Your team
# Site name: leventestudio
# Build command: npm run build
# Publish directory: dist
```

### 4. Deploy
```bash
# Test deploy (draft URL)
netlify deploy

# Production deploy
netlify deploy --prod
```

### 5. Environment Variables Beállítása
```bash
# Netlify Dashboard
netlify open:site
# → Site settings → Environment variables → Add

# Vagy CLI:
netlify env:set VITE_SUPABASE_URL "your-url"
netlify env:set VITE_SUPABASE_ANON_KEY "your-key"
```

---

## Opció 3: Git-based Continuous Deployment (Best Practice)

### 1. GitHub Repository Netlify-hez Kapcsolása

**Netlify Dashboard:**
1. Sites → Add new site → Import project
2. **Connect to Git provider:** GitHub
3. **Pick repository:** `your-username/leventestudio`
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables hozzáadása

### 2. Auto Deploy Beállítása
```
✅ Branch: main
✅ Deploy context: Production
✅ Deploy hook: On git push
```

**Eredmény:**
- Minden `git push origin main` → Auto deploy
- Netlify automatikusan build-eli és deploy-olja
- ~2 perc deploy time

### 3. GitHub Workflow Módosítása (Opcionális)

**Eltávolíthatod a GitHub Pages workflow-t:**
```bash
rm .github/workflows/static.yml
```

**Vagy átnevezheted Netlify-re:**
```yaml
# .github/workflows/netlify-deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

**GitHub Secrets hozzáadása:**
1. Netlify: Site settings → Site details → **API ID** (másold ki)
2. Netlify: User settings → Applications → **Personal access tokens** → New token
3. GitHub: Settings → Secrets and variables → Actions
   - `NETLIFY_SITE_ID`: API ID
   - `NETLIFY_AUTH_TOKEN`: Token

---

## Netlify-Specific Files (már megvan)

### `public/_redirects` ✅
```
# 404 handling
/*  /404.html  404
```

### `public/_headers` (security headers)
Ellenőrizd:
```
cat public/_headers
```

Ha nincs meg vagy hiányos, add hozzá:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Verifikáció Deploy Után

### 1. Site Működik
```bash
curl -I https://leventestudio.app/
# Expected: HTTP/2 200
```

### 2. Redirect Loop Fix
```bash
curl -I https://leventestudio.app/kapcsolat/
# Expected: HTTP/2 200 (NOT 301 loop)
```

### 3. Run Test Script
```bash
bash test-redirect-loop.sh
```

### 4. Netlify Deploy Log
```
Netlify Dashboard → Deploys → Latest deploy → Deploy log
```

**Ellenőrizd:**
- ✅ Build command: `npm run build`
- ✅ Exit code: 0
- ✅ Deploy time: ~2-3 min
- ✅ Functions: 0 (unless using Edge Functions)
- ✅ Redirect rules: 1 (/* /404.html)

---

## Troubleshooting

### Deploy Fails - Build Error
```bash
# Local build test
npm ci
npm run build

# Check build output
ls -la dist/
```

### Site Loads but Blank/404
**Probléma:** Publish directory rossz
**Fix:** Site settings → Build & deploy → **Publish directory: dist**

### Environment Variables Missing
```bash
# Check .env values
cat .env | grep VITE_

# Add to Netlify
Netlify Dashboard → Site settings → Environment variables
```

### Custom Domain Not Working
1. DNS beállítások:
   - **leventestudio.app** → Netlify Name Servers
   - Vagy: A record → Netlify Load Balancer IP
2. Netlify: Domain settings → **HTTPS certificate** (auto provision)
3. Várj 24-48 órát DNS propagációra

### Redirect Loop Még Mindig Jelen
1. **Clear Netlify cache:**
   ```
   Deploys → "Clear cache and deploy"
   ```

2. **Check _redirects deployed:**
   ```bash
   curl https://leventestudio.app/_redirects
   # Should show: /*  /404.html  404
   ```

3. **Check Netlify UI redirects:**
   - Site settings → Build & deploy → Post processing
   - **Redirects and rewrites:** Should be empty (no UI rules)

---

## Gyors Start (TL;DR)

**3 perc setup:**
```bash
# 1. Install CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Link site (if exists) or init (if new)
netlify link  # OR: netlify init

# 4. Deploy
netlify deploy --prod

# 5. Verify
curl -I https://leventestudio.app/kapcsolat/
# Expected: HTTP/2 200 ✅
```

**Done!** 🚀

---

## Mi A Következő Lépés?

1. **Deploy to Netlify** (fenti opciók valamelyike)
2. **"Clear cache and deploy"** (kötelező a redirect fix miatt)
3. **Run:** `bash test-redirect-loop.sh` (verifikáció)
4. **Monitor:** Netlify Dashboard → Deploys (sikeresség check)
5. **Test live:** https://leventestudio.app/kapcsolat/

**Cél:** 0 redirect loop, 100% working site ✅
