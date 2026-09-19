# Levente Studio – kirakat és ajánlatkérés, 2026. szeptember

## Cél

A főoldal a saját munkákat, a megvásárolható szolgáltatásokat és az együttműködés menetét mutatja be. A három projekt saját vagy családi vállalkozásként szerepel; nem külső ügyfélreferenciaként. A demonstrációs teljesítményszámok kikerültek a főoldalról.

## Megvalósítás

- Valódi böngészőképek a KlímaTiszták, Klíma18ker és FuratMester oldalairól (2026-09-19), WebP formátumban.
- A Bundavarázs projektbemutató kártyát kapott. Az ellenőrzött élő cím kétszer 502 választ adott a távoli böngészőben, ezért nem készült róla képernyőkép. A következő frissítéskor ellenőrzött képpel pótolható.
- Közös csomagadatok: `src/data/studio-offers.ts`. Az árak a kiinduló main árait követik: PRESENCE 149 000 Ft-tól, START 250 000 Ft-tól, GROW 450–650 000 Ft, SCALE 750 000 Ft-tól.
- Csomag, referencia vagy gondozási igény átadása az ajánlatkérő oldalnak.
- Az explicit csomagválasztás elsőbbséget kap az előzetes cél szerinti ajánlással szemben. Ismeretlen cél és gondozási igény nem eredményez automatikus csomagajánlást.
- A Netlify űrlap neve változatlan: `system-diagnostic`. A statikusan renderelt űrlap tartalmazza az összes beküldött mezőt, a honeypotot és a hozzájárulást.
- Küldés közben ismételt beküldés tiltva; sikertelen/lejárt kéréskor hibaüzenet és megmaradó mezők. A köszönőoldalhoz csak sikeres HTTP válasz után készül munkamenet-visszaigazolás; személyes adatok nem kerülnek ebbe.
- A köszönőoldal a visszaigazolást egyszer felhasználja, majd törli. Közvetlen megnyitás és újratöltés nem indít új lead eseményt.
- A kampányparaméterek és a belépő oldal megmaradnak az ajánlatkérőre navigáláskor is; tiltott böngészőtárhely mellett az űrlap működőképes marad.
- A belső pontozás kikerült az ügyfélnek megjelenített tartalomból.

## Havi gondozás – belső üzleti tervezet, nem publikált árlista

Tesztelendő nettó célár: 29 900 Ft/hó, kizárólag saját készítésű oldalakhoz. A nyilvános oldal egyedi ajánlatot kérő gondozási lehetőséget mutat; nem tesz új, végleges ár- vagy válaszidő-vállalást.

Lehetséges keret: működésfigyelés, havi űrlapellenőrzés, szükséges technikai frissítések, 30 perc tartalmi módosítás és rövid állapotjelentés. A válaszidőt, hibajavítási keretet, szoftverdíjakat és az ezen felüli fejlesztések elszámolását az első megrendelés előtt írásban kell meghatározni. A két munkanapos reagálás tervezési javaslat; nem azonos a hiba két napon belüli kijavításával.

Az első ügyfeleknél mérni kell a teljes ráfordítást. A csomag gazdaságosságát a tényleges munkaidő és eszközköltség alapján lehet megítélni.

## Kiinduló technikai hibák javítása

- Az esettanulmány `index<proofFlow...` kifejezését az Astro tagként értelmezte. Zárójelezett összehasonlítás és egyértelmű HTML-csomópont javítja a buildet.
- Két sehol nem importált régi React oldalsablon hiányzó komponensekre hivatkozott. Ezeket eltávolítottuk; aktív útvonal nem használta őket.
- Az analitikai Window típusok egy közös deklarációba kerültek; az időmérő hook hiányzó függvényimportja javítva.
- Az ESLint kizárja az Astro által generált `.astro` mappát; a forráskód szabályai változatlanok.

## Ellenőrzés

A helyi `npm run typecheck`, `npm run lint` és `npm run build` sikeres; 46 oldal épült. A négy csomag, a kézi választás elsőbbsége, az ismeretlen/gondozási cél, a kampányadatok továbbvitele és a letiltott böngészőtárhely külön funkcionális ellenőrzést kapott.

A Netlify-előnézet elkészült: https://deploy-preview-15--leventestudio.netlify.app/ (PR #15). Böngészőben ellenőriztük az asztali főoldalt, a referencia-kártyákat és az ajánlatkérőt. A GROW csomag és a FuratMester referencia helyesen előre kiválasztva jelenik meg az űrlapon; az üres kötelező mező megakadályozza a beküldést. A Netlify Forms felismerte a csomag-, referencia-, kampány- és hozzájárulási mezőket.

A Netlify mobil Lighthouse-mérése: teljesítmény 97, akadálymentesség 100, bevált gyakorlatok 92, SEO 100. Ez automatikus mérés, nem kézi telefonos átvételi teszt.

A GitHub Actions `quality` feladata nem indult el: a GitHub a fiók számlázási korlátozását jelezte. Nem kódellenőrzési hibát jelentett; futási lépés és tesztnapló nem készült. A helyi ellenőrzések és a Netlify buildje sikeresek. Az ellenőrzési szabályokat nem kapcsoltuk ki.

Az élő Netlify űrlapkézbesítés és az e-mail-értesítés még nincs igazolva. Élesítés előtt egy engedélyezett próbaküldés kézbesítését, valamint telefonon a megjelenést is ellenőrizni kell. A repo jelenlegi GTM- és gtag-beállításait ez a változat nem tervezi át; a fiókszintű mérési duplikáció külön ellenőrzendő.


## 2026-09-19 – KlímaTiszták kirakatprojekt

- A főoldali hero első számú kirakatprojektje a KlímaTiszták lett.
- Élő oldal: https://klimatisztak.hu/
- A projekt jelenleg Bolt.new → Netlify közvetlen deployból működik, GitHub commit nincs hozzákötve.
- A Levente Studio a Netlify production deploy által készített, konkrét deployhoz kötött screenshotot használja.
- A Klíma18ker, FuratMester és Bundavarázs referenciák megmaradnak, így összesen négy valós projekt látható.
