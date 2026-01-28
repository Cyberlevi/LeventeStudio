export default function FAQ() {
  const faqs = [
    {
      question: 'Mennyibe kerül a weboldal audit?',
      answer: '150.000–300.000 Ft a weboldal méretétől és összetettségétől függően. Kisebb oldalak (5-10 aloldal, egyszerű struktúra) 150.000 Ft körül. Nagyobb rendszerek (e-commerce, sok aloldal, komplex funkciók) 300.000 Ft. Az első 15 perces konzultáció ingyenes, ott megmondom a pontos árat.'
    },
    {
      question: 'Mennyi idő alatt készül el az audit?',
      answer: 'Egy átlagos weboldal auditja 5-7 munkanap. Nagyobb rendszereknél (e-commerce, több nyelv, komplex funkciók) 10-14 nap. A dokumentáció átadása után közösen átbeszéljük, kérdések, magyarázat, prioritások. Nem adok át egy PDF-et anélkül, hogy végigmennénk rajta.'
    },
    {
      question: 'Mit kapok pontosan az audit végén?',
      answer: 'Részletes audit dokumentációt: minden megtalált probléma prioritási sorrendben. Teljesítmény elemzést (PageSpeed, Core Web Vitals). SEO technikai auditot (meta, structured data, indexelés). Konverziós gátló pontokat heatmap és Analytics alapján. Javítási ütemtervet: mit először, mit később. Ajánlást a következő lépésekre.'
    },
    {
      question: 'Ki javítja meg a hibákat, amit találsz?',
      answer: 'Az audit csak a diagnózis. A javítást nem én csinálom, hanem a saját fejlesztőd, vagy egy másik szakember. Az audit dokumentáció elég részletes ahhoz, hogy bárki meg tudja csinálni. Ha nincs fejlesztőd, tudok ajánlani, vagy segítek megtalálni a megfelelő embert.'
    },
    {
      question: 'Mikor éri meg auditot csináltatni?',
      answer: 'Ha a weboldal lassú, nem konvertál, vagy a Google nem talál. Ha fizetett hirdetést futtatsz, de az eredmény nem kielégítő. Ha van forgalom, de nincs lead vagy vásárlás. Ha már van Analytics, de nem érted az adatokat. Ha fejleszteni akarsz, de nem tudod, merre indulj el.'
    },
    {
      question: 'Dolgozol WordPress / Shopify / custom oldalakkal?',
      answer: 'Igen, mindhárommal. A platform nem számít, az audit módszer ugyanaz: teljesítmény, SEO, UX, konverzió. WordPress, Shopify, Webflow, custom fejlesztés – mindegy. Az audit arról szól, hogy mi nem működik, nem arról, hogy milyen rendszeren van.'
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
            <div key={index} className="border-b border-taupe-200 pb-8 last:border-0">
              <h3 className="text-xl md:text-2xl font-normal text-taupe-900 mb-4">
                {faq.question}
              </h3>
              <p className="text-taupe-700 font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
