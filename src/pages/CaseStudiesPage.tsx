import CaseStudy from '../components/CaseStudy';

export default function CaseStudiesPage() {
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
      analysis: 'Heatmap-pel követtem a felhasználói viselkedést a termékoldaltól a checkout-ig. Megnézem, hol kattintanak, hol görgetnek, hol állnak meg. Ellenőriztem a checkout folyamat technikai hibáit, a betöltési időket oldalanként. Az Analytics konverziós tracking-et átállítottam, hogy láthassa, melyik termék, melyik forgalomforrás hozza a vásárlást.',
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
    },
    {
      category: 'Helyi szolgáltatás',
      title: 'Fodrászat Budapest belvárosában',
      problem: 'Volt weboldal, volt Google My Business profil, de senki nem talált rá helyi keresésekre. Nem volt időpontfoglalás, csak egy telefonszám. Mobilon használhatatlan volt az oldal. Az Analytics nem volt telepítve, nem lehetett tudni, hogy ki nézi, honnan jön.',
      analysis: 'Ellenőriztem a helyi SEO alapokat: strukturált adatok, Google My Business beállítások, NAP (name, address, phone) következetesség, helyi kulcsszavak. Megnéztem a konkurenciát, hogy kik jelennek meg helyi keresésekre. Teszteltem a mobilnézetet, a betöltési sebességet, a felhasználói élményt.',
      solution: [
        'Helyi SEO setup: strukturált adatok (LocalBusiness schema), helyi kulcsszavak beépítése tartalomba',
        'Google My Business profil optimalizálás: kategóriák, szolgáltatások, fotók, nyitvatartás',
        'Mobil layout újratervezése: tiszta navigáció, nagy CTA gombok, könnyű időpontfoglalás',
        'Időpontfoglaló integráció: külső rendszer beépítése, egyszerű foglalási folyamat',
        'Google Analytics és Search Console telepítése: követés, riportálás, optimalizálás'
      ],
      result: 'A helyi keresésekben (fodrászat + kerület név) az első 5 találat közé került. Az időpontfoglalások 60%-kal nőttek az első 2 hónapban. Most látható, hogy melyik szolgáltatás a népszerű, honnan jönnek az ügyfelek, melyik nap melyik időpont fogy el először.'
    },
    {
      category: 'E-commerce',
      title: 'Sportfelszerelés webshop',
      problem: 'A webshop lassú volt, a termékképek sokáig töltöttek be. Az organikus forgalom alacsony, hiába sok termék. A termékleírások nem voltak SEO-barátok, a strukturált adatok hiányoztak. Mobil nézeten a keresés és szűrés használhatatlan.',
      analysis: 'Átfésültem a technikai SEO-t: indexelés, sitemap, robots.txt, crawl hibák, strukturált adatok. Megnéztem a termékoldal sebességét, képoptimalizálást, lazy loading-ot. Ellenőriztem a mobil UX-et, a szűrők működését, a keresés relevancia-t. Átnéztem a termékoldalak tartalmát, kulcsszavakat, meta tageket.',
      solution: [
        'Kép optimalizálás: modern formátumok (WebP), tömörítés, lazy loading, srcset használat',
        'Strukturált adatok hozzáadása: Product schema minden termékhez (ár, elérhetőség, értékelés)',
        'Termékleírások átírása: SEO-barát, kulcsszóval optimalizált, értékes tartalom',
        'Mobil navigáció javítása: egyszerűbb szűrők, jobb keresés, nagyobb kattintható területek',
        'Technikai SEO hibák javítása: duplikált meta leírások, hiányzó alt szövegek, 404 hibák'
      ],
      result: 'A betöltési idő 6 másodpercről 2.1 másodpercre javult. Az organikus forgalom 4 hónap alatt 80%-kal nőtt. Termékspecifikus keresésekre (pl. futócipő márka modell) bekerültek az első oldalra. A mobil konverzió 2.5-szeresére nőtt.'
    },
    {
      category: 'B2B szolgáltatás',
      title: 'IT tanácsadó cég',
      problem: 'Professzionális weboldal volt, de senki nem kereste meg őket rajta keresztül. Az Analytics telepítve volt, de nem volt konverziós tracking. Nem lehetett tudni, melyik tartalom működik, melyik szolgáltatás érdekli az embereket. A landing page-ek nem hoztak lead-et.',
      analysis: 'Végigmentem a lead generation folyamaton: landing page-től a kapcsolatfelvételig. Megnéztem a session recording-okat, hogy hol kattintanak, meddig maradnak. Ellenőriztem a CTA-k elhelyezését, az űrlapok bonyolultságát, a bizalmi jelek szintjét. Átnéztem az Analytics setupot, hogy mi követhető, mi nem.',
      solution: [
        'Landing page-ek újrastrukturálása: egyértelmű probléma-megoldás-eredmény struktúra',
        'Lead generation form egyszerűsítése: kevesebb kötelező mező, lépcsőzetes információkérés',
        'Konverziós tracking beállítása: lead form submit, telefonhívás, email klikk követése',
        'Social proof erősítése: ügyfelek logói, testimonial-ok, case study linkek',
        'CTA gombok optimalizálása: helyezés, szöveg, színek, ellenállás csökkentése'
      ],
      result: 'A lead form kitöltési arány 1.2%-ról 4.8%-ra nőtt. Mostantól látható, melyik landing page hozza a legtöbb lead-et, melyik szolgáltatás érdekli a látogatókat. A konverzió követhető, optimalizálható. A telefonos megkeresések száma is megnőtt, mert mostantól követhető.'
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
              Különböző iparágak, különböző problémák. Ugyanaz a megközelítés: adat-alapú diagnózis, konkrét javítás.
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
