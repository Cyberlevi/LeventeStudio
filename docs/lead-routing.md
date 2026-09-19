# Levente Studio – ajánlatkérés és csomagválasztás

A közös csomagadatforrás a `src/data/studio-offers.ts`; a routing a `src/scripts/diagnostic-routing.ts`. Az előzetes irány nem végleges ajánlat.

| Cél | Alapértelmezett csomag |
| --- | --- |
| `presence` | PRESENCE / LS/01 / 149 000 Ft-tól |
| `rebuild` | START / LS/02 / 250 000 Ft-tól |
| `more-leads`, `better-leads`, `measurement` | GROW / LS/03 / 450–650 000 Ft |
| `automation` | SCALE / LS/04 / 750 000 Ft-tól |
| `maintenance`, `unknown`, hiányzó vagy ismeretlen cél | Személyes egyeztetés, automatikus csomag nélkül |

Az érvényes `selected_package` megelőzi a cél szerinti alapértelmezést. A `csomag` és `projekt` URL-paramétereket csak az ismert csomag- és projektlistából fogadjuk el; az érdeklődő az űrlapon módosíthatja őket. `igeny=gondozas` a gondozási igényt választja ki.

Az űrlap a `recommended_system`, `selected_package` és `reference_project` mezőt is beküldi. Az ügyfél előtt nincs belső lead-pontszám. Ezek a kliensoldali mezők tájékoztató kontextusok; nem megbízható szerveroldali döntési alapok.

A `generate_lead` csak a POST sikeres HTTP válasza után, a köszönőoldalon, egyszer felhasznált munkamenet-visszaigazolás mellett kerül kiadásra. Közvetlen köszönőoldal-megnyitás nem lead. Ha a böngészőtárhely nem használható vagy a JavaScript kikapcsolt, a beküldés továbbra is lehetséges, de a kliensoldali visszaigazolás és mérés korlátozott.
