import FAQItem from './FAQItem';

export default function FAQ() {
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
          {faqs.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />)}
        </div>
      </div>
    </section>
  );
}
