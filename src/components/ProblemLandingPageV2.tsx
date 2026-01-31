import { Phone, Mail, ArrowRight } from 'lucide-react';

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
      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-light text-taupe-900 mb-6">
            {h1}
          </h1>
          <p className="text-lg sm:text-xl text-taupe-700 font-light leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
            Tünetek
          </h2>
          <div className="space-y-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-taupe-900 rounded-full mt-2"></div>
                <p className="text-taupe-700 font-light text-lg">{symptom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
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
          <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
            {auditScope.title}
          </h2>
          <div className="space-y-4">
            {auditScope.items.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-taupe-900 rounded-full mt-2"></div>
                <p className="text-taupe-700 font-light text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
            {deliverables.title}
          </h2>
          <div className="space-y-6">
            {deliverables.items.map((item, index) => (
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
          <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
            Gyakori kérdések
          </h2>
          <div className="space-y-8">
            {faq.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-light text-taupe-900 mb-3">
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

      <section className="py-16 sm:py-20 bg-taupe-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-cream-50 mb-4">
            {cta.title}
          </h2>
          <p className="text-lg text-cream-100 font-light mb-12">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+36304967847"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cream-50 text-taupe-900 rounded-sm hover:bg-cream-100 transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              <span className="font-light">+36 30 496 7847</span>
            </a>
            <a
              href="mailto:levente@leventestudio.app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream-50 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="font-light">levente@leventestudio.app</span>
            </a>
          </div>
        </div>
      </section>

      {relatedProblems && relatedProblems.length > 0 && (
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-light text-taupe-900 mb-12">
              Kapcsolódó problémák
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProblems.map((problem, index) => (
                <a
                  key={index}
                  href={problem.url}
                  className="block p-6 bg-white border border-taupe-200 rounded-sm hover:border-taupe-900 transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-light text-taupe-900 mb-2 group-hover:text-taupe-700 transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-taupe-600 font-light text-sm">
                        {problem.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-taupe-400 group-hover:text-taupe-900 transition-colors flex-shrink-0" />
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
