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

A production build belépője az Astro (`npm run build` → `astro build`). A korábbi Vite/React SPA belépő és az App-only örökség már ki lett takarítva a 2026-os újraindítási branchből.

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

A 2026-os átépítés draft PR-ban marad, amíg a production build és a fő konverziós út ellenőrzése le nem zárul.

- GitHub Actions quality gate: jelenleg repository runner/policy szinten, még a checkout előtt áll meg, ezért ez nem forráskód-build eredmény.
- Netlify: a production a `main` branchet használja; Deploy Previews és branch deployok engedélyezve vannak a 2026-os branch vizuális és build QA-jához.
- Éles merge csak sikeres preview/build és mobil + desktop ellenőrzés után.

<!-- lighthouse control preview: 2026-09-23 -->
