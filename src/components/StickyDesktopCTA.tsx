import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { trackCTAClick } from '../utils/gtm';

export default function StickyDesktopCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = pageHeight > 0 ? (scrollPosition / pageHeight) * 100 : 0;

      if (scrollPercentage > 30 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="hidden md:block fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="relative max-w-sm overflow-hidden border border-white/10 bg-graphite-950/95 text-white backdrop-blur-xl shadow-2xl shadow-black/30">
        <div className="absolute inset-0 subpage-signal-grid opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="relative p-6">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            aria-label="Bezárás"
          >
            <X size={18} />
          </button>

          <div className="pr-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-signal-400 mb-4">
              <span className="signal-dot" /> system diagnostic
            </div>
            <h3 className="font-serif text-2xl font-light tracking-editorial leading-tight mb-3">
              Látod a teljes utat a kereséstől a leadig?
            </h3>
            <p className="text-sm text-white/55 mb-5 leading-relaxed">
              Pár válaszból gyorsan kiderül, hol érdemes először hozzányúlni a rendszerhez.
            </p>

            <a
              href="#diagnosztika"
              onClick={() => trackCTAClick('Rendszerdiagnózis', 'desktop_sticky')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-signal-400 text-graphite-950 hover:bg-signal-300 transition-colors w-full justify-center text-sm font-semibold"
            >
              Megnézem a rendszerem
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
