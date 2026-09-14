# Levente Studio

AI-native digitális ügyfélszerző és működési rendszerek szolgáltató vállalkozásoknak.

## Aktív stack

- Astro
- React islands
- TypeScript
- Tailwind CSS
- GA4 + GTM
- Supabase integrációs alapok
- Netlify / statikus deploy

A production build belépője az Astro (`npm run build` → `astro build`). A repo korábbi Vite/React SPA belépője átmenetileg kompatibilitási okból még megtalálható, de nem ez határozza meg a production route-okat. A legacy SPA külön takarítási körben távolítható el, miután a production build ellenőrzött.

## Fejlesztési elvek

A márkapozicionálás, entity-nevek, hangnem és szolgáltatási logika forrása: `.bolt/brand-identity.md`.

Fő elv: nem különálló digitális eszközöket építünk, hanem összekötött ügyfélutat a kereséstől vagy hirdetéstől a mérhető leadig és annak kezeléséig.

## Ellenőrzés

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

A 2026-os átépítés draft PR-ban marad, amíg a production build és a fő konverziós út ellenőrzése le nem zárul. A GitHub Actions quality gate jelenleg repository runner/policy szinten, még a checkout előtt áll meg, ezért ez nem forráskód-build eredmény.
