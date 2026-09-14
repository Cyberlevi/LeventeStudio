import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: 'Ez weboldalkészítés vagy marketing?', answer: 'A kettő közötti falat bontjuk le. A weboldalt, a keresési struktúrát, a mérést, a leadkezelést és szükség esetén az automatizálást egy közös ügyfélút részeként tervezzük meg.' },
  { question: 'Mit jelent nálatok az AI-native működés?', answer: 'Az AI-t nem dísznek tesszük az oldalra. Elemzésre, fejlesztési gyorsításra, tartalmi munkára, riport-előkészítésre és automatizálható adminisztrációra használjuk. Az üzleti döntéseket továbbra is valós adatok és emberi kontroll vezetik.' },
  { question: 'Mennyi idő alatt készül el?', answer: 'A rendszer méretétől függ. Egy fókuszált landing és mérési alap néhány munkanap alatt elkészülhet, egy többoldalas, CRM-et vagy automatizálást is tartalmazó rendszer ennél hosszabb projekt. Az ütemezést a rendszerterv után rögzítjük.' },
  { question: 'Kell mindenkinek CRM és automatizálás?', answer: 'Nem. Csak azt építjük be, ami az adott vállalkozás működését ténylegesen egyszerűsíti. Egy helyi szolgáltatónak sokszor a jó landing, helyi jelenlét és tiszta mérés fontosabb, mint egy nagy CRM.' },
  { question: 'WordPress-szel is dolgoztok?', answer: 'Meglévő WordPress rendszert auditálni, migrálni vagy szükség esetén továbbfejleszteni is lehet. Új rendszereknél általában modern, gyors és jól skálázható technológiát választunk az üzleti igény alapján.' },
  { question: 'Honnan tudom, hogy működik-e?', answer: 'Már a tervezéskor meghatározzuk, mi számít konverziónak. A cél az, hogy ne csak látogatottságot láss, hanem követhető legyen a keresésből vagy kampányból érkező valódi érdeklődés útja is.' },
  { question: 'Van egyszeri projekt és folyamatos együttműködés is?', answer: 'Igen. Lehet egyszeri rendszerépítés, de a legerősebb eredmény akkor jön, amikor az éles adatok alapján később is tudjuk javítani a landingeket, mérést, ajánlatot és automatizálást.' },
  { question: 'Mennyibe kerül?', answer: 'A főoldalon START, GROW és SCALE szinteket mutatunk irányadó induló árakkal. A pontos ajánlatot a cél, a meglévő rendszer és a szükséges integrációk alapján adjuk meg.' }
];

export default function FAQ2026() {
  return (
    <section className="relative overflow-hidden bg-graphite-900 px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end md:mb-16">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />FAQ / system clarity</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">Amit rendszerépítés előtt <span className="text-signal-400">érdemes tisztázni.</span></h2>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/45 lg:justify-self-end">Kevesebb homályos ígéret, több konkrét működési válasz. Itt vannak a kérdések, amelyek tényleg számítanak indulás előtt.</p>
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
