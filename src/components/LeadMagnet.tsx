import { Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { trackCTAClick } from '../utils/gtm';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    trackCTAClick('Lead Magnet Download', 'checklist_download');

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Lead Magnet',
          event_label: 'Audit Checklist',
          value: 1
        });
      }
    }, 500);
  };

  if (submitted) {
    return (
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-taupe-900 mb-4">
            Köszönöm!
          </h2>
          <p className="text-lg text-taupe-700 mb-8">
            Az Audit Checklist már úton van az email fiókoddba. Ellenőrizd a spam mappát is!
          </p>
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 text-taupe-600 hover:text-taupe-900 transition-colors"
          >
            Közben olvass a blogon →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-taupe-900 text-cream-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 bg-taupe-800 text-cream-100 text-sm font-light rounded-sm">
              Ingyenes Letöltés
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
              Weboldal Audit<br />Checklist 2026
            </h2>
            <p className="text-lg text-cream-200 mb-8">
              50+ pontból álló audit checklist, amivel saját magad is átvizsgálhatod a weboldalad.
              Ugyanazt a módszertant használom, mint professzionális audit során.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-cream-100">Technikai SEO checklist (indexelés, robots.txt, sitemap)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-cream-100">Teljesítmény audit pontok (Core Web Vitals, betöltési idő)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-cream-100">Konverzió optimalizálási szempontok (CTA, form, mobile UX)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-cream-100">WordPress specifikus ellenőrzések (plugin, cache, adatbázis)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm p-8 md:p-10">
            <h3 className="text-2xl font-normal text-taupe-900 mb-2">
              Töltsd le ingyen
            </h3>
            <p className="text-taupe-600 mb-6">
              Add meg az email címed, és azonnal megkapod a checklist-et PDF formátumban.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-email" className="block text-sm font-normal text-taupe-700 mb-2">
                  Email cím *
                </label>
                <input
                  type="email"
                  id="lead-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="te@vallalkozasod.hu"
                  className="w-full px-4 py-3 border border-taupe-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-taupe-500 text-taupe-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-normal"
              >
                {loading ? 'Küldés...' : (
                  <>
                    <Download size={20} />
                    Checklist letöltése
                  </>
                )}
              </button>

              <p className="text-xs text-taupe-500">
                A letöltéssel hozzájárulsz, hogy heti 1 emailt küldjek weboldal optimalizálási tippekkel.
                Bármikor leiratkozhatsz.
              </p>
            </form>

            <div className="mt-8 pt-6 border-t border-taupe-200">
              <div className="flex items-center gap-4 text-sm text-taupe-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Nincs spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Azonnali hozzáférés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
