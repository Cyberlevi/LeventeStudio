import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-cream-50">
      <div className="max-w-4xl w-full text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-taupe-100 text-taupe-900 text-sm font-light rounded-sm">
          Weboldal Audit Szakértő
        </div>

        <h1 className="text-5xl md:text-7xl font-light text-taupe-900 mb-8 leading-tight text-balance">
          Mérnöki precizitás,<br />
          nem marketing bullshit
        </h1>

        <div className="text-lg md:text-xl text-taupe-700 mb-12 font-light max-w-3xl mx-auto space-y-4 text-balance">
          <p>
            A weboldal lassú, nem konvertál, a Google nem talál? Megnézem pontosan mi nem működik,
            és adat-alapú javítással rendbe teszem.
          </p>
          <p className="font-normal text-taupe-900">
            Weboldal audit 5-7 nap alatt. Konkrét problémák, konkrét megoldások, konkrét ütemterv.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#audit-cta"
            data-plausible-event="hero-cta-audit"
            className="inline-flex items-center gap-3 px-8 py-4 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-lg"
          >
            Audit kérése
            <ArrowRight size={20} />
          </a>

          <a
            href="#deliverables"
            data-plausible-event="hero-cta-learn"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-taupe-700 text-taupe-700 rounded-sm hover:bg-taupe-50 transition-colors duration-200 text-lg"
          >
            Mit kapsz az auditban
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-taupe-600 text-sm font-light">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light text-taupe-900 mb-1">5-7 nap</span>
            <span>Átfutási idő</span>
          </div>
          <div className="h-12 w-px bg-taupe-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light text-taupe-900 mb-1">30+</span>
            <span>Sikeres projekt</span>
          </div>
          <div className="h-12 w-px bg-taupe-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light text-taupe-900 mb-1">100%</span>
            <span>Adat-alapú</span>
          </div>
        </div>
      </div>
    </section>
  );
}
