export default function CaseStudies() {
  const cases = [
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
      result: 'A betöltési idő 7 másodpercről 1.8 másodpercre csökkent. A helyi kereséseknél (kutyakozmetika + városnév) az első 3 találat közé került. A telefonos megkeresések száma 3 hónap alatt megduplázódott. Most már látszik, hogy honnan jönnek az ügyfelek, melyik hirdetés működik, és melyik kulcsszó hoz foglalást.'
    },
    {
      category: 'E-commerce',
      title: 'Kézműves kozmetikum webshop',
      problem: 'Sok látogató volt, de a kosár elhagyási arány 85% felett. Az emberek betették a terméket, aztán kiléptek. A checkout folyamat bonyolult volt, lassú betöltés, mobil nézet használhatatlan. Az Analytics telepítve volt, de rossz adatokat mutatott, nem lehetett megbízni benne.',
      analysis: 'Heatmap-pel követtem a felhasználói viselkedést a termékoldaltól a checkout-ig. Megnéztem, hol kattintanak, hol görgetnek, hol állnak meg. Ellenőriztem a checkout folyamat technikai hibáit, a betöltési időket oldalanként. Az Analytics konverziós tracking-et átállítottam, hogy láthassa, melyik termék, melyik forgalomforrás hozza a vásárlást.',
      solution: [
        'Checkout folyamat leegyszerűsítése: 4 lépésből 2 lépés, kevesebb kötelező mező',
        'Mobil checkout teljes újratervezése: nagyobb input mezők, auto-complete támogatás',
        'Betöltési sebesség optimalizálás termékoldalon: képek lazy loading, CDN használat',
        'Bizalmi jelek erősítése: szállítási információk, visszaküldési garancia láthatóbb helyre',
        'Analytics konverziós tracking javítása: e-commerce tracking, enhanced e-commerce beállítás'
      ],
      result: 'A kosár elhagyási arány 85%-ról 62%-ra csökkent 2 hónap alatt. A mobil konverzió 3-szorosára nőtt. Most láthatók a pontos termékszintű konverziós adatok, meg lehet nézni, melyik termék milyen csatornáról hoz bevételt. Fizetett hirdetések most már mérhető ROI-t hoznak.'
    },
    {
      category: 'B2B SaaS',
      title: 'Projektmenedzsment szoftver',
      problem: 'A landing page szép volt, de a regisztrációs arány 1% alatt. Az emberek megnézték az oldalt, de nem kattintottak a "Próbáld ki ingyen" gombra. A technikai SEO rendben volt, de az organikus forgalom nem hozott trial regisztrációt. Nem volt világos, mi a termék, kinek való, mit old meg.',
      analysis: 'Végigmentem a teljes customer journey-n. A landing page-től a regisztrációs formon át a first-time user experience-ig. Session recording-okat néztem: hol kattintanak, meddig maradnak, mit olvasnak. Ellenőriztem az üzenet érthetőségét, a CTA-k elhelyezését, a social proof szintjét.',
      solution: [
        'Landing page üzenet újragondolása: konkrét probléma, konkrét megoldás, konkrét eredmény',
        'Social proof erősítése: konkrét ügyfél logók, számok, rövid testimonial-ok',
        'CTA gombok újrastrukturálása: világos következő lépés, csökkentett ellenállás',
        'Regisztrációs form egyszerűsítése: email + jelszó, minden más később',
        'Technikai SEO tartalom kiegészítése: strukturált adatok (SoftwareApplication), FAQ schema'
      ],
      result: 'A regisztrációs arány 0.8%-ról 3.2%-ra nőtt. Trial-ről fizető konverzió is javult, mert most értik, mit kapnak. Az organikus forgalom trial regisztrációja megduplázódott. Most mérhető a teljes funnel, landing page-től aktivációig.'
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
            <div key={index} className="bg-taupe-50 p-8 md:p-12 rounded-sm border border-taupe-200">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-taupe-900 text-cream-50 text-sm font-light rounded-sm">
                  {caseStudy.category}
                </span>
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
