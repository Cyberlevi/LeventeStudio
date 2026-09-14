import { ArrowRight, BarChart3, Bot, Search, Workflow } from 'lucide-react';
import { trackCTAClick, trackSystemConsultation } from '../utils/gtm';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-cream-50">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-taupe-100 text-taupe-900 text-sm font-light rounded-full">
              <Bot size={16} />
              AI-native digitális növekedési rendszerek · 2026
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-light text-taupe-900 mb-6 leading-[0.98]">
              Nem csak weboldalt.<br />
              <span className="text-taupe-600">Ügyfélszerző rendszert.</span>
            </h1>

            <div className="text-lg md:text-xl text-taupe-700 mb-8 font-light space-y-4 max-w-2xl">
              <p className="font-normal text-taupe-900 text-2xl">
                Web + SEO + hirdetés + mérés + automatizálás egy rendszerben.
              </p>
              <p>
                Olyan digitális rendszereket építünk szolgáltató vállalkozásoknak, amelyek nem csak jól néznek ki,
                hanem mérhetően több megkeresést hoznak és kevesebb kézi munkát igényelnek.
              </p>
              <p className="text-base text-taupe-600">
                Amit ügyfélnek adunk, azt előtte saját, éles vállalkozásokon teszteljük.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#kapcsolat"
                onClick={() => {
                  trackCTAClick('Rendszertervezés', 'hero_primary');
                  trackSystemConsultation('hero_primary');
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-lg font-normal"
              >
                Beszéljük át a rendszert
                <ArrowRight size={20} />
              </a>

              <a
                href="#lab"
                onClick={() => trackCTAClick('Valós rendszerek', 'hero_secondary')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-taupe-300 text-taupe-700 rounded-sm hover:bg-taupe-50 hover:border-taupe-500 transition-colors duration-200 text-lg"
              >
                Valós rendszereink
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-taupe-700">
              <div className="flex items-center gap-2"><Search size={17} /> SEO</div>
              <div className="flex items-center gap-2"><BarChart3 size={17} /> Mérés</div>
              <div className="flex items-center gap-2"><Workflow size={17} /> Automatizálás</div>
              <div className="flex items-center gap-2"><Bot size={17} /> AI workflow</div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden bg-taupe-100">
                <img
                  src="/levente_studio_portrait_final.webp"
                  alt="Tarnóczi Levente - Levente Studio digitális rendszerek"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-sm shadow-lg border border-taupe-200 max-w-xs">
                <div className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-2">Levente Studio Lab</div>
                <div className="text-2xl font-normal text-taupe-900 mb-2">Előbb magunkon teszteljük.</div>
                <div className="text-sm text-taupe-600">Éles szolgáltató vállalkozásokon mérjük, mi működik.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 border-y border-taupe-200 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="text-2xl font-normal text-taupe-900 mb-1">AI-native</div>
            <div className="text-sm text-taupe-600">nem AI-díszítés</div>
          </div>
          <div>
            <div className="text-2xl font-normal text-taupe-900 mb-1">Mérhető</div>
            <div className="text-sm text-taupe-600">GA4, GTM, lead tracking</div>
          </div>
          <div>
            <div className="text-2xl font-normal text-taupe-900 mb-1">Gyors</div>
            <div className="text-sm text-taupe-600">modern Astro stack</div>
          </div>
          <div>
            <div className="text-2xl font-normal text-taupe-900 mb-1">Üzleti</div>
            <div className="text-sm text-taupe-600">nem csak design</div>
          </div>
        </div>
      </div>
    </section>
  );
}
