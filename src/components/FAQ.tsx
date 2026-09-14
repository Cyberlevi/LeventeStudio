import FAQItem from './FAQItem';

export default function FAQ() {
  const faqs = [
    {
      question: 'Ez weboldalkészítés vagy marketing?',
      answer: 'A kettő közötti falat bontjuk le. A weboldalt, a keresési struktúrát, a mérést, a leadkezelést és szükség esetén az automatizálást egy közös ügyfélút részeként tervezzük meg.'
    },
    {
      question: 'Mit jelent nálatok az AI-native működés?',
      answer: 'Az AI-t nem dísznek tesszük az oldalra. Elemzésre, fejlesztési gyorsításra, tartalmi munkára, riport-előkészítésre és automatizálható adminisztrációra használjuk. Az üzleti döntéseket továbbra is valós adatok és emberi kontroll vezetik.'
    },
    {
      question: 'Mennyi idő alatt készül el?',
      answer: 'A rendszer méretétől függ. Egy fókuszált landing és mérési alap néhány munkanap alatt elkészülhet, egy többoldalas, CRM-et vagy automatizálást is tartalmazó rendszer ennél hosszabb projekt. Az ütemezést a rendszerterv után rögzítjük.'
    },
    {
      question: 'Kell mindenkinek CRM és automatizálás?',
      answer: 'Nem. Csak azt építjük be, ami az adott vállalkozás működését ténylegesen egyszerűsíti. Egy helyi szolgáltatónak sokszor a jó landing, helyi jelenlét és tiszta mérés fontosabb, mint egy nagy CRM.'
    },
    {
      question: 'WordPress-szel is dolgoztok?',
      answer: 'Meglévő WordPress rendszert auditálni, migrálni vagy szükség esetén továbbfejleszteni is lehet. Új rendszereknél általában modern, gyors és jól skálázható technológiát választunk az üzleti igény alapján.'
    },
    {
      question: 'Honnan tudom, hogy működik-e?',
      answer: 'Már a tervezéskor meghatározzuk, mi számít konverziónak. A cél az, hogy ne csak látogatottságot láss, hanem követhető legyen a keresésből vagy kampányból érkező valódi érdeklődés útja is.'
    },
    {
      question: 'Van egyszeri projekt és folyamatos együttműködés is?',
      answer: 'Igen. Lehet egyszeri rendszerépítés, de a legerősebb eredmény akkor jön, amikor az éles adatok alapján később is tudjuk javítani a landingeket, mérést, ajánlatot és automatizálást.'
    },
    {
      question: 'Mennyibe kerül?',
      answer: 'A főoldalon START, GROW és SCALE szinteket mutatunk irányadó induló árakkal. A pontos ajánlatot a cél, a meglévő rendszer és a szükséges integrációk alapján adjuk meg.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-4 text-center">GYIK</p>
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Amit rendszerépítés előtt érdemes tisztázni
        </h2>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
