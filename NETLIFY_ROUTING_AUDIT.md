# Netlify routing – aktuális állapot

**Frissítve:** 2026-09-20

## Forrás

- Framework: Astro
- Output: statikus
- Production branch: `main`
- Netlify project: `leventestudio`
- Canonical domain: `https://leventestudio.app`
- `astro.config.mjs`: `trailingSlash: 'always'`, `build.format: 'directory'`

## Routing

A routing egyetlen repo-szintű forrása a `public/_redirects` fájl.

Jelenlegi szabályok:

```text
/esettanulmanyok/bundavarazs-kutyakozmetika-audit/  /esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/  301
/*  /404.html  404
```

Nincs SPA fallback és nincs `netlify.toml` rewrite-réteg.

## Sitemap és robots

- Sitemap: Astro sitemap integráció.
- Robots: `public/robots.txt`.
- A 404 oldal nem kerül sitemapbe.
- A jogi és köszönőoldalak saját meta/robots szabályt használnak.

## Biztonsági és cache headerek

A `public/_headers` adja a CSP, frame, content-type, referrer és permissions szabályokat, valamint a statikus asset cache-t.

## Release ellenőrzés

Minden merge előtt:

1. Netlify deploy-preview legyen `ready`.
2. Minden Astro oldal generálódjon buildhiba nélkül.
3. Ellenőrizd a főoldalt, `/kapcsolat/`, `/megoldasok/`, az esettanulmány-indexet és legalább egy problémalandinget.
4. Ellenőrizd az ajánlatkérő POST-ot külön engedélyezett teszttel.
5. 404 route maradjon valódi 404 státusz.
6. Ne kerüljön vissza `/* /index.html 200` SPA fallback.

## Megjegyzés

A korábbi, 2026 januári routing audit 8 generált oldalra és régi redirect-tervre készült. Az már nem tekinthető aktuális rendszerleírásnak.
