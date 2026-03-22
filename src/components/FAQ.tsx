import FAQItem from './FAQItem';

export default function FAQ() {
  const faqs = [
    {
      question: 'Mennyit tart az egész folyamat?',
      answer: '5-7 munkanap a konzultációtól az élesítésig. Az Induló csomag akár 3-4 nap alatt is kész lehet. Ha nagyon sürgős, express átfutást is tudunk vállalni.'
    },
    {
      question: 'Mit kapok pontosan?',
      answer: 'Egy élő, működő weboldalt. SEO-ra optimalizálva, gyors betöltéssel, mobilon tökéletes. Hozzá videó útmutatót, hogy tudd frissíteni. Plusz 30-90 nap támogatást, ha bármi kérdés van.'
    },
    {
      question: 'Mi van, ha nem tetszik?',
      answer: 'Folyamatosan egyeztetünk a fejlesztés alatt. Látod mi készül, beleszólhatsz. Ha valamit nem szeretsz, változtatunk rajta. Amíg nem vagy elégedett, addig csiszoljuk.'
    },
    {
      question: 'Kell hozzá domain és tárhely?',
      answer: 'Ha van, használjuk azt. Ha nincs, beszerzünk és beállítjuk körülbelül 15.000 Ft/év áron. Megbeszéljük az elején, hogy mi a legjobb megoldás.'
    },
    {
      question: 'Tudok majd változtatni az oldalon?',
      answer: 'Igen. Kapsz videó útmutatót, hogyan frissítsd a szövegeket, képeket. Ha valami bonyolultabb kell (új funkció, design módosítás), megcsinálom neked.'
    },
    {
      question: 'WordPress lesz?',
      answer: 'Nem. Modern technológiával építjük (Astro/React), ami gyorsabb, biztonságosabb és olcsóbb fenntartani. De ugyanúgy egyszerű kezelni.'
    },
    {
      question: 'Kell-e utána havidíj?',
      answer: 'Nem kötelező. Az alap tárhely 5-10 ezer forint havonta. Ha szeretnéd, hogy folyamatosan finomítsuk az oldalt, van havidíjas csomag (40-50k/hó), de ez opcionális.'
    },
    {
      question: 'Miért gyorsabb, mint máshol?',
      answer: 'Modern fejlesztői eszközöket használok, amikkel sokkal gyorsabban tudok építeni. Nem kell hónapokig tervezgetni, egyszerűen építünk és finomítunk.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Gyakran ismételt kérdések
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
