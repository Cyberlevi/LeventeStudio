export default function FAQ() {
  const faqs = [
    {
      question: 'Mennyibe kerül egy weboldal audit?',
      answer: 'A weboldal audit ára a projekt méretétől és összetettségétől függ. Egy alapos technikai és SEO audit általában 150.000–300.000 Ft között mozog. Kisebb weboldalak esetén kevesebbe kerül, nagyobb e-commerce vagy enterprise rendszereknél magasabb. Az első konzultáció ingyenes, ahol tisztázom a pontos igényeket és kiadom az árajánlatot.'
    },
    {
      question: 'Mennyi idő alatt látszik az eredmény?',
      answer: 'A technikai javítások (teljesítmény optimalizálás, mobilbarát nézet) azonnal működnek, ezek hatása már napok alatt mérhető. Az SEO eredmények lassabbak: 2-3 hónap után kezd látszani a rangsorolás javulása, 6 hónap után pedig már markáns változás várható az organikus forgalomban. A konverziós tölcsér javítások 2-4 héten belül mérhetők az Analytics adatokban.'
    },
    {
      question: 'Milyen eszközökkel dolgozol SEO audit során?',
      answer: 'Google Search Console, Google Analytics 4, Screaming Frog SEO Spider, Ahrefs, PageSpeed Insights, GTmetrix, Hotjar vagy Clarity heatmap. Emellett manuális ellenőrzés mobilon és desktopon, böngészők közötti kompatibilitás teszt, és kódszintű audit. Minden eszköz célja, hogy pontos adatokat lássak, és ne találgatásból dolgozzam.'
    },
    {
      question: 'Dolgozol WordPress oldalakkal is?',
      answer: 'Igen, WordPress oldalakon is dolgozom. Sok magyar kisvállalkozás és szolgáltató WordPress alapú weboldalt használ, ezért fontos platform. A technikai SEO audit, teljesítmény optimalizálás, plugin egyszerűsítés és UX javítás mind lehetséges WordPress környezetben is. Nem vagyok WordPress fejlesztő, hanem szakértői audit és optimalizálási szolgáltatást nyújtok.'
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
