import { Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';

interface ProblemLandingPageV2Props {
  h1: string;
  intro: string;
  symptoms: string[];
  causes: {
    title: string;
    items: string[];
  };
  auditScope: {
    title: string;
    items: string[];
  };
  deliverables: {
    title: string;
    items: string[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    subtitle: string;
  };
  relatedProblems?: {
    title: string;
    url: string;
    description: string;
  }[];
}

export default function ProblemLandingPageV2({
  h1,
  intro,
  symptoms,
  causes,
  auditScope,
  deliverables,
  faq,
  cta,
  relatedProblems,
}: ProblemLandingPageV2Props) {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-36 pb-20 bg-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 studio-grid pointer-events-none" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="studio-kicker text-taupe-500 mb-5">Diagnózis → rendszerterv</div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-taupe-900 mb-7 leading-[1.02] text-balance">
            {h1}
          </h1>
          <p className="text-lg sm:text-xl text-taupe-700 font-light leading-relaxed max-w-3xl">
            {intro}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
            Tünetek
          </h2>
          <div className="grid gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="studio-card flex items-start gap-4 border-taupe-200 bg-taupe-50/50 p-5">
                <div className="flex-shrink-0 w-2 h-2 bg-taupe-900 rounded-full mt-2"></div>
                <p className="text-taupe-700 font-light text-lg">{symptom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
            {causes.title}
          </h2>
          <div className="space-y-6">
            {causes.items.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-taupe-900 text-cream-50 rounded-full flex items-center justify-center text-sm font-light">
                  {index + 1}
                </div>
                <p className="text-taupe-700 font-light text-lg pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
            {auditScope.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {auditScope.items.map((item, index) => (
              <div key={index} className="studio-card border-taupe-200 p-5 bg-white">
                <p className="text-taupe-700 font-light text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
            {deliverables.title}
          </h2>
          <div className="space-y-6">
            {deliverables.items.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 border border-taupe-300 text-taupe-900 rounded-full flex items-center justify-center text-sm font-light">
                  {index + 1}
                </div>
                <p className="text-taupe-700 font-light text-lg pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
            Gyakori kérdések
          </h2>
          <div className="divide-y divide-taupe-200 border-y border-taupe-200">
            {faq.map((item, index) => (
              <div key={index} className="py-7">
                <h3 className="text-xl font-normal text-taupe-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-taupe-700 font-light leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kapcsolat" className="py-20 sm:py-24 bg-taupe-900 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="studio-kicker text-cream-300 mb-5">Következő lépés</div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-cream-50 mb-5 text-balance">
            {cta.title}
          </h2>
          <p className="text-lg text-cream-100 font-light mb-10 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href="https://wa.me/36202826843?text=Szia%2C%20a%20weboldalam%20m%C5%B1k%C3%B6d%C3%A9s%C3%A9t%20szeretn%C3%A9m%20%C3%A1tn%C3%A9zetni."
              target="_blank"
              rel="noopener noreferrer"
              className="studio-card inline-flex flex-col items-center justify-center gap-2 px-6 py-5 bg-cream-50 text-taupe-900 border-cream-50"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-normal">WhatsApp</span>
              <span className="text-xs opacity-70">Gyors projektindítás</span>
            </a>
            <a
              href="mailto:hello@leventestudio.app?subject=Weboldal%20diagn%C3%B3zis%20%C3%A9s%20rendszerterv"
              className="studio-card inline-flex flex-col items-center justify-center gap-2 px-6 py-5 border border-taupe-600 text-cream-50 bg-taupe-800"
            >
              <Mail className="w-5 h-5" />
              <span className="font-normal">Email</span>
              <span className="text-xs opacity-70">hello@leventestudio.app</span>
            </a>
            <a
              href="tel:+36202826843"
              className="studio-card inline-flex flex-col items-center justify-center gap-2 px-6 py-5 border border-taupe-600 text-cream-50 bg-taupe-900"
            >
              <Phone className="w-5 h-5" />
              <span className="font-normal">Telefon</span>
              <span className="text-xs opacity-70">+36 20 282 6843</span>
            </a>
          </div>
        </div>
      </section>

      {relatedProblems && relatedProblems.length > 0 && (
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-taupe-900 mb-12">
              Kapcsolódó problémák
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProblems.map((problem, index) => (
                <a
                  key={index}
                  href={problem.url}
                  className="studio-card block p-6 bg-white border-taupe-200 rounded-sm group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-normal text-taupe-900 mb-2 group-hover:text-taupe-700 transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-taupe-600 font-light text-sm">
                        {problem.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-taupe-400 group-hover:text-taupe-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
