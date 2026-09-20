# Content Security Policy – Levente Studio

Frissítve: 2026-09-20.

## Az éles szabály forrása

A `public/_headers` a fejléc sablonja. Az `astro.config.mjs` által regisztrált
`scripts/static-csp.mjs` integráció minden sikeres `astro build` végén végigolvassa
az elkészült HTML-fájlokat, és a tényleges inline szkriptek SHA-256 lenyomatával
helyettesíti a `__BUILD_SCRIPT_HASHES__` jelölőt a `dist/_headers` fájlban.

Az inline kódot változtatás, whitespace-vágás és HTML-entitás-feloldás nélkül
hash-eljük. A build kimenete és a hozzá tartozó fejléc együtt kerül telepítésre.
A művelet az `astro build` közvetlen futtatásakor is megtörténik.

A build hibával megáll, ha a sablonból hiányzik vagy duplázódik a jelölő, nincs
HTML vagy inline szkript, illetve a CSP fejléc túllépi a 7500 bájtos keretet.
A `public` könyvtár önmagában nem telepíthető a kész `dist` helyett.

## Engedélyek és korlátozások

- `script-src`: saját fájlok, `www.googletagmanager.com` és a build során előállított
  pontos lenyomatok. Nincs általános `unsafe-inline` vagy `unsafe-eval` engedély.
- `script-src-attr 'none'`: a HTML eseményattribútumai nem futtathatnak kódot.
  Az `addEventListener` és a React eseménykezelése továbbra is használható.
- `object-src 'none'`: beágyazott objektumok tiltása.
- `base-uri 'none'`: a relatív hivatkozásokat átíró `<base>` elemek tiltása.
- `form-action 'self'`: a böngésző űrlapja csak a saját eredetre küldhet adatot.
- `frame-ancestors 'none'` és `X-Frame-Options: DENY`: az oldal nem ágyazható be.
- A Google Fonts és a meglévő Google mérési végpontok engedélyei megmaradnak.
- A `*.supabase.co` kivétel megszűnt: az aktív `src` kódban nincs Supabase-kliens
  vagy Supabase-kérés. Új integrációnál csak a szükséges projekt eredetét adjuk hozzá.

## Megmaradó korlátok

A stílusokhoz továbbra is szükséges az `unsafe-inline`, többek között a React
stílusattribútumai és a mobil safe-area megjelenítés miatt. A képeknél megmarad a
HTTPS-forrásengedély. Ezeket ez a javítás nem minősíti szigorúra korlátozottnak.

A Google Tag Manager felületén később hozzáadott Custom HTML tag vagy új külső
szkript blokkolódhat. Új tag publikálása előtt előnézetben ellenőrizni kell a CSP-t;
az általános szkriptengedély visszakapcsolása nem része a javítási folyamatnak.

A fejléc csak olyan tárhelyen érvényesül, amely feldolgozza a Netlify `_headers`
fájlt. Más publikálási útvonalon külön ellenőrizni kell a valódi HTTP-választ.

## Ellenőrzés

1. `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`.
2. A kész HTML-fájlok inline szkriptjeinek lenyomata szerepeljen a `dist/_headers`
   fejlécében; a helyettesítő jelölő és a script `unsafe-inline` ne maradjon benne.
3. Netlify Deploy Preview: sütiablak, menü, ajánlatkérő és a blog tartalomjegyzék.
4. A böngésző konzoljában ne legyen a weboldal működését érintő CSP-hiba.
5. Az éles telepítés az ellenőrzött commitból készüljön.

## Forrás

- [Google: Tag Manager és CSP](https://developers.google.com/tag-platform/security/guides/csp)
- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
