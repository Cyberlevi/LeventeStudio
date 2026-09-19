import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: 'Melyik csomagot válasszam?', answer: 'Egyszerű bemutatkozáshoz a PRESENCE, több szolgáltatás bemutatásához a START lehet jó kiindulópont. A GROW a weboldalt, a kampányoldalakat és a mérést kapcsolja össze. A SCALE az ügyfélkezelés és az adminisztráció egyszerűsítésére is kiterjed. Az egyeztetésen pontosítjuk, mire van szükséged.' },
  { question: 'Mit kell nekem adnom a weboldalhoz?', answer: 'A vállalkozásod és a szolgáltatásaid adatait, a használható fotókat és az elérhetőségeket. A szövegírás, képelőkészítés és egyéb tartalmi munka körét előre rögzítjük az ajánlatban.' },
  { question: 'Mennyi idő alatt készül el?', answer: 'A határidő az oldalak számától, a funkcióktól és a rendelkezésre álló tartalomtól függ. Az ütemezést az ajánlatban rögzítjük, az első változatot pedig előnézetben tudod átnézni.' },
  { question: 'Hány módosítás fér bele?', answer: 'A módosítási körök számát és tartalmát az ajánlat tartalmazza. Ha közben új oldalra vagy funkcióra lenne szükség, előbb megbeszéljük a többletmunkát és a díját.' },
  { question: 'WordPressben készül az oldal?', answer: 'Új weboldalainkat Astro vagy React alapokon készítjük. Az önálló tartalomszerkesztés igényét külön egyeztetjük, és ha szükséges, megfelelő szerkesztőfelületet tervezünk hozzá.' },
  { question: 'Kié lesz a domain és a tárhely?', answer: 'A domain és a tárhely a te nevedre kerül. Az átadáskor egyeztetjük a hozzáféréseket, a használatot és az esetleges további gondozást.' },
  { question: 'Mi történik az átadás után?', answer: 'Az ajánlatban rögzített támogatással segítünk az indulásban. A saját készítésű oldalakhoz havi gondozás is kérhető, előre egyeztetett feladatokkal, módosítási idővel és díjjal.' },
  { question: 'Mire használjátok az AI-t?', answer: 'Kutatás, szövegvázlatok, fejlesztés és ismétlődő feladatok előkészítésére. Az elkészült tartalmat és működést ellenőrizzük, az árról és a vállalásokról személyesen egyeztetünk.' }
];

export default function FAQ2026() {
  return (
    <section className="relative overflow-hidden bg-graphite-900 px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end md:mb-16">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />Gyakori kérdések</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">Amit indulás előtt <span className="text-signal-400">érdemes tisztázni.</span></h2>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/45 lg:justify-self-end">Tartalom, határidő, módosítások és átadás. Ezeket már az elején tisztázzuk.</p>
        </div>

        <div className="border-y border-white/10">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-white/10 py-4 last:border-0 sm:py-5">
              <summary
                data-track-faq="true"
                data-faq-index={String(index)}
                data-faq-question={faq.question}
                className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 py-2 text-left marker:content-none sm:gap-5"
              >
                <div className="flex min-w-0 gap-3 sm:gap-6">
                  <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-signal-400">Q/{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="min-w-0 font-serif text-[1.35rem] font-light leading-tight tracking-editorial text-white transition-colors group-hover:text-signal-400 sm:text-2xl md:text-3xl">{faq.question}</h3>
                </div>
                <ChevronDown size={22} className="mt-1 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180 group-open:text-signal-400" aria-hidden="true" />
              </summary>
              <p className="ml-0 mt-3 max-w-3xl pr-2 font-light leading-relaxed text-white/55 sm:ml-[4.7rem] sm:mt-4 sm:pr-0">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
