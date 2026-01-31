interface CaseStudy {
  category: string;
  title: string;
  problem: string;
  analysis: string;
  solution: string[];
  result: string;
  isReal: boolean;
  detailsUrl?: string;
}

export default function CaseStudies() {
  const cases: CaseStudy[] = [
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
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Esettanulmányok
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Különböző iparágak, különböző problémák. Ugyanaz a megközelítés: adat-alapú diagnózis, konkrét javítás.
        </p>

        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <div
              key={index}
              className={`p-8 md:p-12 rounded-sm border ${
                caseStudy.isReal
                  ? 'bg-gradient-to-br from-blue-50 to-taupe-50 border-blue-200'
                  : 'bg-taupe-50 border-taupe-200'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block px-3 py-1 bg-taupe-900 text-cream-50 text-sm font-light rounded-sm">
                  {caseStudy.category}
                </span>
                {caseStudy.isReal && (
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-sm">
                    Valós projekt
                  </span>
                )}
              </div>

              <h3 className="text-3xl font-light text-taupe-900 mb-8">
                {caseStudy.title}
              </h3>

              <div className="space-y-6 text-taupe-700 font-light leading-relaxed">
                <div>
                  <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi volt a probléma</h4>
                  <p>{caseStudy.problem}</p>
                </div>

                <div>
                  <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mit néztem meg</h4>
                  <p>{caseStudy.analysis}</p>
                </div>

                <div>
                  <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mit javítottam</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {caseStudy.solution.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi lett az eredmény</h4>
                  <p>{caseStudy.result}</p>
                </div>

                {caseStudy.isReal && caseStudy.detailsUrl && (
                  <div className="pt-4">
                    <a
                      href={caseStudy.detailsUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 transition-colors"
                    >
                      Teljes esettanulmány
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-taupe-700 font-light text-lg">
            Ha hasonló problémát látsz a saját weboldaladon, hívj fel bizalommal.
          </p>
        </div>
      </div>
    </section>
  );
}
