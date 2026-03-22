import { ArrowRight } from 'lucide-react';
import { trackCTAClick, trackAuditRequest } from '../utils/gtm';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-cream-50">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-taupe-100 text-taupe-900 text-sm font-light rounded-sm">
              Weboldal Készítés Kisvállalkozásoknak
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-light text-taupe-900 mb-6 leading-tight">
              Weboldal, ami tényleg<br />
              <span className="text-taupe-600">hoz ügyfeleket</span>
            </h1>

            <div className="text-lg md:text-xl text-taupe-700 mb-8 font-light space-y-4">
              <p className="font-normal text-taupe-900 text-2xl">
                Kisvállalkozásoknak, akik új weboldalt szeretnének vagy a jelenlegi oldaluk nem hoz eredményt
              </p>
              <p>
                Nem csak megtervezzük, hanem megépítjük, beindítjuk és megtanítjuk használni.
                Gyors, SEO optimalizált, úgy hogy tényleg cseng a telefon.
              </p>
              <p className="text-base text-taupe-600">
                5-7 napos átfutás · Modern technológia · Átlátható árazás
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#kapcsolat"
                onClick={() => {
                  trackCTAClick('Ingyenes konzultáció', 'hero_primary');
                  trackAuditRequest('hero_cta');
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-lg font-normal"
              >
                Beszéljük meg a projektet
                <ArrowRight size={20} />
              </a>

              <a
                href="#csomagok"
                onClick={() => trackCTAClick('Csomagok', 'hero_secondary')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-taupe-300 text-taupe-700 rounded-sm hover:bg-taupe-50 hover:border-taupe-500 transition-colors duration-200 text-lg"
              >
                Árak és csomagok
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-taupe-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5-7 nap átfutás</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Nincs rejtett költség</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden bg-taupe-100">
                <img
                  src="/levente_studio_portrait_final.webp"
                  alt="Tarnóczi Levente - Weboldal Audit Szakértő"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-sm shadow-lg border border-taupe-200">
                <div className="text-4xl font-normal text-taupe-900 mb-1">5-7 nap</div>
                <div className="text-sm text-taupe-600">kész a weboldalad</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-3xl font-normal text-taupe-900 mb-2">Gyors</div>
            <div className="text-sm text-taupe-600">5-7 napos átfutás</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-normal text-taupe-900 mb-2">Modern</div>
            <div className="text-sm text-taupe-600">SEO optimalizált</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-normal text-taupe-900 mb-2">Mobilbarát</div>
            <div className="text-sm text-taupe-600">Minden eszközön tökéletes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-normal text-taupe-900 mb-2">Átlátható</div>
            <div className="text-sm text-taupe-600">Fix árak, nincs meglepetés</div>
          </div>
        </div>
      </div>
    </section>
  );
}
