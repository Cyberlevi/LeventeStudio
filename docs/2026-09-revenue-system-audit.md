# Levente Studio – teljes értékesítési gépezet audit

**Frissítve:** 2026-09-20  
**Ág:** `design-system-unification-2026-09`  
**PR:** #16

## Cél

A Levente Studio minden belépési pontja ugyanabba az üzleti logikába fusson:

```text
keresés / cikk / probléma / referencia
→ releváns szolgáltatás vagy bizonyíték
→ ajánlatkérés
→ forrás + kampány + igény megőrzése
→ sikeres Netlify form POST
→ köszönőoldal
→ személyes egyeztetés
→ írásos ajánlat
```

## Egységes ajánlat

A nyilvános csomagok egyetlen forrása: `src/data/studio-offers.ts`.

- PRESENCE – profi online jelenlét
- START – weboldal a szolgáltatásokhoz
- GROW – weboldal és ügyfélszerzés
- SCALE – rendezett ügyfélkezelés

Az audit nem automatikus csomagajánlat. Audit igénynél előbb a meglévő oldalt vizsgáljuk meg, és csak utána döntünk javításról vagy újraépítésről.

## Bizonyíték

Elsődleges kirakatprojekt: KlímaTiszták.

További valós projektek:
- Klíma18ker
- FuratMester
- Bundavarázs

A publikus esettanulmányokban csak ellenőrizhető állítás szerepel. Becsült bevétel, CPL vagy konverziós arány nem jelenhet meg bizonyított eredményként.

## Konverziós út

Elsődleges CTA minden értékesítési felületen: **Ajánlatot kérek**.

Másodlagos csatornák:
- telefon
- e-mail

A kapcsolatoldal query paraméterrel át tudja venni:
- csomag: `csomag`
- referencia: `projekt`
- cél: `cel`
- gondozási igény: `igeny=gondozas`

A kattintás előtti oldal sessionben megmarad, így a lead `source_page` mezője nem vész el a kapcsolatoldalra navigáláskor.

## Tartalmi funnel

A tudástár cikkei:
- releváns szolgáltatásra linkelnek;
- ahol értelmes, valós esettanulmányra is vezetnek;
- a cikk végén ajánlatkérés CTA van.

A probléma- és auditlandingek:
- audit szándékkal nyitják az ajánlatkérőt;
- ajánlatkérés az elsődleges CTA;
- e-mail és telefon másodlagos.

## Mobil

- egységes Hívás + Ajánlatot kérek sticky CTA;
- jogi, köszönő és 404 oldalon nincs sticky sales CTA;
- mobilmenü scroll lockot, backdropot, Escape-et és fókuszcsapdát használ;
- kis képernyőn a túl nagy technikai státuszpanel rejtve van;
- safe-area kezelve.

## SEO és routing

- Astro statikus build;
- trailing slash;
- sitemap generálás;
- robots.txt sitemap hivatkozással;
- nincs SPA wildcard rewrite;
- valódi 404 fallback;
- canonical minden aktív route-on a BaseLayoutból vagy route-ból.

## Form és leadmérés

Netlify form: `system-diagnostic`.

A technikai név kompatibilitás miatt marad; publikus felületen mindenhol ajánlatkérésként jelenik meg.

A form tartalmazza:
- source_page
- entry_page
- recommended_system
- UTM mezők
- gclid
- csomag
- referencia
- elsődleges cél
- hozzájárulás

`generate_lead` csak sikeres form POST után, a köszönőoldali egyszer használatos receipt alapján kerül kiküldésre.

## Analitika – nyitott ellenőrzési pont

A projekt közvetlen GA4 gtag-et és GTM-et is betölt. A kód több custom eseményt dataLayerbe és közvetlen gtagbe is továbbít.

Ezt nem szabad vakon egyszerűsíteni, amíg a GTM konténer tényleges GA4/Ads továbbítását nem ellenőriztük. Következő mérési auditban azt kell bizonyítani, hogy egy CTA kattintás és egy lead csak egyszer jelenik-e meg a célrendszerben.

## Release gate

Éles merge előtt:

1. Netlify Deploy Preview: `ready`.
2. Astro build minden generált oldallal sikeres.
3. Mobil Lighthouse főoldalon legalább a jelenlegi szintet tartja.
4. Főoldal → csomag → kapcsolat út működik.
5. Problémalanding → audit intent → kapcsolat út működik.
6. Esettanulmány → ajánlatkérés út működik.
7. Blog → szolgáltatás/proof → ajánlatkérés út működik.
8. Form-séma Netlify-ban felismerve.
9. Élesítés után egy jelölt tesztlead szükséges a tényleges kézbesítés igazolására.
10. GA4/GTM duplikáció külön mérési ellenőrzést kap.

## Jelenlegi preview

A legutóbbi teljes preview build 47 generált oldalt épített. A főoldali mobil Lighthouse eredmény: Performance 97, Accessibility 100, Best Practices 92, SEO 100.
