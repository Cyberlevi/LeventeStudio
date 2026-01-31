import CaseStudy from '../components/CaseStudy';

export default function CaseStudiesPage() {
  const cases = [
    {
      category: 'Klímatechnika',
      title: 'Klima18ker weboldal technikai audit',
      problem: 'A weboldal 3 súlyos problémával küzdött: lassú betöltés (6-8 mp mobilon), 42 indexelési hiba a Google Search Console-ban, és szerveroldali 502 hibák a crawl kérések 12%-ánál. Az organikus forgalom 3 hónap alatt 22%-kal csökkent, miközben a konkurensek forgalma változatlan maradt.',
      analysis: 'Teljesítmény audit PageSpeed Insights-tal: LCP 5.2 mp (határérték: 2.5 mp), Performance Score 34/100. Azonosított problémák: optimalizálatlan képek (2.4 MB banner), 7 render-blocking CSS fájl, nincs cache, TTFB 1.8 mp. Google Search Console részletes elemzés: noindex tag kategória oldalakon, duplikált termékleírások, canonical hiánya szűrő URL-eknél. Szerver log audit: PHP memória limit túllépés, osztott tárhely konkurens kérés limit.',
      solution: [
        'Kép optimalizálás: WebP konverzió, lazy loading, width/height attribútumok',
        'Render-blocking erőforrások: CSS/JS összevonás, critical CSS inline, defer attribútum',
        'Cache konfiguráció: WP Super Cache, böngésző cache 1 év, GZIP tömörítés',
        'Indexelési hibák: Yoast SEO beállítás módosítás, 16 termékleírás átírása, canonical URL-ek',
        'Szerver upgrade: osztott tárhelyről VPS-re váltás, PHP memória limit 512 MB, Nginx reverse proxy'
      ],
      result: 'LCP 5.2 mp-ről 1.8 mp-re (65% javulás), Performance Score 89/100. Indexelési hibák 42-ről 0-ra, indexelt oldalak 78-ról 114-re (46% növekedés). 502 hibák 12%-ról 0.2%-ra csökkentek. Organikus forgalom 34%-kal nőtt 8 hét alatt, bounce rate 68%-ról 52%-ra csökkent.',
      isReal: true,
      detailsUrl: '/esettanulmanyok/klima18ker-weboldal-audit/'
    },
    {
      category: 'Helyi szolgáltatás',
      title: 'Bundavarázs Kutyakozmetika',
      problem: 'A weboldal nem hozott foglalásokat. Lassan töltött be, a Google Analytics nem működött rendesen, a mobil nézet olvashatatlan volt. Az online jelenlétet kézben tartották, de eredmény nem volt. Fizetett hirdetések futottak, de a konverzió nulla. Senki nem hívott, senki nem foglalt időpontot.',
      analysis: 'Végigmentem a teljes felhasználói úton mobilon és asztali gépen. Megnéztem a teljesítményadatokat: betöltési idő, Core Web Vitals, szerver válaszidő. Ellenőriztem a Google Search Console hibajelzéseket, az Analytics beállításokat. Strukturált adatok, meta tagek, sitemap, robots.txt – minden technikai SEO alapot átnéztem. Teszteltem a CTA gombokat, az űrlapot, a mobilnézetet.',
      solution: [
        'Mobil layout teljes újratervezése: tisztább hierarchia, nagyobb gombok, olvasható szöveg',
        'Betöltési idő optimalizálás: képek tömörítése, fölösleges scriptek eltávolítása, lazy loading',
        'Google Analytics helyes telepítése és konfigurálása: konverziós célok, eseménykövetés',
        'Local SEO setup: strukturált adatok (LocalBusiness), Google Business profil integráció',
        'CTA gombok átgondolása: telefonszám és foglalás egyértelmű fókuszban'
      ],
      result: 'A betöltési idő 7 másodpercről 1.8 másodpercre csökkent. A helyi kereséseknél (kutyakozmetika + városnév) az első 3 találat közé került. A telefonos megkeresések száma 3 hónap alatt megduplázódott. Most már látszik, hogy honnan jönnek az ügyfelek, melyik hirdetés működik, és melyik kulcsszó hoz foglalást.',
      isReal: true,
      detailsUrl: '/esettanulmanyok/bundavarazs-kutyakozmetika-audit/'
    }
  ];

  return (
    <>
        <section className="px-6 pt-32 pb-24 bg-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-taupe-900 mb-8 text-center">
              Esettanulmányok
            </h1>

            <p className="text-xl md:text-2xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              Valós ügyfélprojektek, mérhető eredményekkel. Technikai diagnózis, konkrét javítás, adat-alapú megközelítés.
            </p>

            <div className="space-y-12">
              {cases.map((caseStudy, index) => (
                <CaseStudy key={index} caseStudy={caseStudy} />
              ))}
            </div>

            <div className="mt-16 bg-taupe-900 text-cream-50 p-8 md:p-12 rounded-sm text-center">
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Hasonló problémát látsz?
              </h2>
              <p className="text-cream-100 font-light text-lg mb-8 max-w-2xl mx-auto">
                Ha a te weboldaladon is lassan tölt be, nem hoz konverziót, vagy nem tudod, mi nem működik – beszéljünk.
              </p>
              <a
                href="/#audit-cta"
                className="inline-block px-8 py-4 bg-cream-50 text-taupe-900 font-light rounded-sm hover:bg-cream-100 transition-colors duration-200"
              >
                Kérj weboldal auditot
              </a>
            </div>
          </div>
        </section>
    </>
  );
}
