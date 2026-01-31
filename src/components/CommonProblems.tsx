import { ArrowRight } from 'lucide-react';

const problems = [
  {
    title: 'Lassú weboldal',
    url: '/lassu-weboldal/',
    description: 'PageSpeed piros, Core Web Vitals hibák. Megnézem, mi lassítja az oldaladat.',
  },
  {
    title: 'Google nem indexel',
    url: '/google-nem-indexel/',
    description: 'Nincs forgalom, mert a Google nem látja az oldaladat. Search Console hibák.',
  },
  {
    title: 'Weboldal nem hoz ügyfelet',
    url: '/weboldal-nem-hoz-ugyfelet/',
    description: 'Fizettél egy weboldalért, de nem termel. Megnézem, mi nem működik.',
  },
];

export default function CommonProblems() {
  return (
    <section className="py-16 sm:py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-4 text-center">
          Gyakori problémák
        </h2>
        <p className="text-lg text-taupe-700 font-light text-center mb-12 max-w-3xl mx-auto">
          Ezekkel a problémákkal találkozom leggyakrabban. Ha felismered magad, nézd meg a részleteket.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <a
              key={index}
              href={problem.url}
              className="block p-8 bg-white border border-taupe-200 rounded-sm hover:border-taupe-900 transition-all duration-200 group"
            >
              <h3 className="text-xl font-light text-taupe-900 mb-3 group-hover:text-taupe-700 transition-colors">
                {problem.title}
              </h3>
              <p className="text-taupe-600 font-light mb-4 leading-relaxed">
                {problem.description}
              </p>
              <div className="flex items-center gap-2 text-taupe-900 group-hover:gap-3 transition-all">
                <span className="text-sm font-light">Részletek</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
