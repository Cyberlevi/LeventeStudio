# Mérési és publikálási állapot – 2026-09-20

## Publikálási kapcsolat

- GitHub: `Cyberlevi/LeventeStudio`, éles ág: `main`.
- Netlify projekt: `leventestudio`, projektazonosító: `bd385368-eec8-4d8b-830d-e3fc50854160`.
- Ellenőrzött #22 merge: `d36b26694d361622bcf681bd390b038545e9c2b9`.
- A #22 Netlify production telepítése READY, a `telegram-lead` a
  `submission_created` eseményhez van kötve.
- A `leventestudio.app` böngészőben megfigyelt tartalma eltér a Netlify éles
  változatától, és Bolt badge szkriptet tölt. A Netlify projekt elsődleges URL-je
  továbbra is `leventestudio.netlify.app`; domain-hozzárendelés nincs igazolva.
- A DNS és a domain tulajdonosi beállításait nem változtattuk meg. A módosítás előtt
  az aktív domainkezelést és a levelezéshez szükséges rekordokat ellenőrizni kell.

## GitHub Actions

A #22 merge után a CI ténylegesen elindult `push` eseményre a `main` ágon.
A GitHub-futtatók a fiók számlázási zárolása miatt nem kapnak végrehajtást.
A workflow- vagy kódmódosítás nem oldja fel a fiókszintű korlátozást.
A helyi típusellenőrzés a StudioLab korábbi, lehetetlen fallback ágában három
hibát talált; a fallback egyszerűsítése ezeket megszünteti.

## A forrásból igazolt mérési útvonalak

| Esemény | Aktív forrás | Kibocsátási mód |
| --- | --- | --- |
| `page_view` | `BaseLayout.astro` GA4 konfiguráció | közvetlen Google tag; GTM-konténer külön betöltődik |
| `cta_click`, `phone_click`, `faq_expand` | `BaseLayout.astro` kattintásfigyelő | dataLayer objektum és közvetlen `gtag('event', ...)` |
| `demand_landing_view` | `scripts/demand-attribution.ts` | dataLayer objektum és közvetlen gtag |
| `diagnostic_start` | `scripts/inquiry-form.ts`, első fókusz | `pushToDataLayer`: dataLayer objektum és közvetlen gtag |
| `generate_lead` | `pages/koszonjuk.astro` | ugyanaz a helper; csak friss, egyszer felhasznált POST-visszaigazolás mellett |
| `scroll_50`, `scroll_90` | `scripts/scroll-tracking.ts` | csak dataLayer objektum |

A korábbi dokumentációban szereplő `diagnostic_submit` és
`diagnostic_context_expand` eseményeknek nincs aktív kibocsátója a jelenlegi
űrlapban. Ezeket nem szabad már működő mérésként jelenteni.

## Nyitott GA4/GTM döntés

GA4: `G-LNDL3K56Q2`. GTM: `GTM-WZHLTWBD`.

A kétféle kibocsátás önmagában nem bizonyít két GA4-beérkezést: a duplázás attól
függ, milyen tagek és triggerek aktívak a közzétett GTM-konténerben. A konténer
adminisztratív beállításait és a GA4 DebugView beérkezéseit még nem ellenőriztük.

A `GTM_SETUP_GUIDE.md` közvetlen GA4-et jelöl meg elsődlegesnek. Mielőtt bármelyik
betöltőt vagy dataLayer-eseményt eltávolítjuk, meg kell nézni a konténer Google,
GA4 Event és Ads tageit. Így nem veszítünk el működő Ads-triggereket.

Elfogadási feltételek a következő mérési javításhoz:

1. egy betöltés egy `page_view` esemény;
2. egy CTA-kattintás egy megfelelő kattintási esemény;
3. visszaigazolt űrlapküldés egy `generate_lead` esemény;
4. köszönőoldal közvetlen megnyitása vagy újratöltése nem új lead;
5. a hozzájárulási állapot és az Ads-tagek ellenőrzött működése.
