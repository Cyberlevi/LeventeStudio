# Levente Studio — diagnózis lead routing

A rendszerdiagnózis után megjelenő irány **előzetes tájékozódási javaslat**, nem automatikus ajánlat és nem helyettesíti az emberi átnézést.

## Routing
- `rebuild` → SYS/01 / Ügyfélszerző weboldal / 250 000 Ft-tól
- `more-leads`, `better-leads`, `measurement` → SYS/02 / Komplett ügyfélszerző rendszer / 500 000 Ft-tól
- `automation` → SYS/03 / Automatizált ügyfélkezelés / 750 000 Ft-tól
- `unknown` vagy hiányzó cél → nincs csomagajánlás; emberi átnézés

A `bottleneck` csak kontextus, jelenleg nem írja felül a `primary_goal` routingot.

## Mérési elv
- `generate_lead` marad az elsődleges lead konverzió.
- `diagnostic_route_view` támogató esemény, paraméterei: `recommended_system`, `primary_goal`, `bottleneck`, `source_page`, `entry_page`.
- Az ajánlott rendszer nem kerül primary conversionként számolásra.
