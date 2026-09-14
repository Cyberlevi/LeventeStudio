# GTM setup – Levente Studio 2026

**GTM Container ID:** `GTM-WZHLTWBD`  
**GA4 Measurement ID:** `G-LNDL3K56Q2`

## Mérési alapelv

A Levente Studio jelenlegi elsődleges analitikai forrása a **közvetlen GA4 integráció** a `BaseLayout.astro` fájlban.

A GTM ettől függetlenül betöltődik, hogy később Google Ads, egyéb marketing tagek vagy kontrollált migráció kezelhető legyen központilag.

### Kritikus szabály

**Amíg a direkt GA4 (`G-LNDL3K56Q2`) aktív, a GTM-ben NE fusson külön GA4 / Google tag ugyanarra a propertyre All Pages triggerrel, és NE legyen olyan GA4 Event tag, amely ugyanazokat a dataLayer eseményeket ismét elküldi a GA4-be.**

Ellenkező esetben page view és custom event duplikáció keletkezhet, ami torzítja a forgalmi, konverziós és Ads adatokat.

## Jelenlegi event-modell

A kattintási események és a valódi lead események külön kategóriák.

### Szándék / micro conversion

- `cta_click`
- `phone_click`
- `whatsapp_click`
- scroll és engagement események

Ezek azt jelzik, hogy a látogató érdeklődést mutatott. **Nem egyenlők automatikusan egy elküldött leaddel.**

### Lead

`generate_lead` csak akkor használható, amikor a rendszer ténylegesen tudja, hogy egy lead létrejött vagy egy ajánlatkérés elküldésre került.

Telefon-, WhatsApp- vagy email-link puszta megnyitását nem szabad `contact_submit` vagy `generate_lead` eseményként elszámolni.

## GA4 Key event javaslat

A következő események üzleti értéket jeleznek, de külön kell kezelni őket:

- `phone_click`
- `whatsapp_click`
- később: valódi űrlapküldés / `generate_lead`

A `cta_click` engagement esemény maradjon, ne elsődleges lead konverzió.

## Tesztelés

1. Nyisd meg a Netlify Deploy Preview-t.
2. Fogadd el az analitikai sütiket.
3. GA4 DebugView / Realtime nézetben ellenőrizd:
   - egy oldalbetöltésre egy `page_view` érkezzen;
   - egy telefon kattintásra egy `phone_click` érkezzen;
   - egy WhatsApp kattintásra egy `whatsapp_click` érkezzen;
   - hero CTA kattintás ne hozzon létre `generate_lead` eseményt.
4. GTM Preview-ban ellenőrizd, hogy nincs ugyanarra az eseményre külön GA4 tag, ha a direkt GA4 marad az elsődleges mérés.

## Ha később GTM-re migrálunk

A migrációt egy lépésben kell elvégezni:

1. GA4/Google tag létrehozása GTM-ben `G-LNDL3K56Q2` ID-val.
2. Minden szükséges custom event tesztelése GTM Preview + GA4 DebugView alatt.
3. A közvetlen GA4 script eltávolítása a `BaseLayout.astro` fájlból.
4. Csak ezután publikáljuk a GTM-es GA4 konfigurációt élesben.

Így egyetlen forrás marad, és nem keletkezik dupla mérés.