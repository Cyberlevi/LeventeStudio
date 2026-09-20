# Netlify setup – Levente Studio

**Frissítve:** 2026-09-20

A Levente Studio jelenleg már Netlify-on fut és GitHubhoz van kötve.

## Production

- Netlify project: `leventestudio`
- Production branch: `main`
- Build command: `npm run build`
- Publish directory: `dist`
- Domain: `https://leventestudio.app`

## Deploy folyamat

1. Fejlesztés külön GitHub ágon.
2. Pull request `main` felé.
3. Netlify Deploy Preview automatikusan buildel.
4. Preview ellenőrzés.
5. Merge után production deploy.

## Kritikus fájlok

- `astro.config.mjs` – statikus Astro build és sitemap.
- `public/_redirects` – csak szükséges redirectek + 404 fallback.
- `public/_headers` – CSP, security és cache.
- `public/robots.txt` – sitemap hivatkozás.

## Fontos szabályok

- Ne kerüljön vissza SPA fallback: `/* /index.html 200`.
- Új route-nál legyen canonical és értelmes title/description.
- Köszönőoldal és 404 ne legyen értékesítési sticky CTA.
- Production merge előtt a Netlify preview legyen `ready`.
- A GitHub Actions jelenlegi fiók/runner hibája nem helyettesíti a Netlify build ellenőrzést.

## Kapcsolatfelvétel

A Netlify Forms form neve jelenleg `system-diagnostic`. A név technikai kompatibilitás miatt marad, miközben a publikus UI mindenhol ajánlatkérésként kommunikálja.

A form sikerét csak sikeres HTTP válasz után tekintjük leadnek.
