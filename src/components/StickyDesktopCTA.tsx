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
      const scrollPercentage = (scrollPosition / pageHeight) * 100;

      if (scrollPercentage > 30 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="hidden md:block fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-taupe-900 text-cream-50 rounded-sm shadow-2xl p-6 max-w-sm relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-cream-200 hover:text-cream-50 transition-colors"
          aria-label="Bezárás"
        >
          <X size={20} />
        </button>

        <div className="pr-8">
          <div className="text-sm text-cream-200 mb-2">
            Ingyenes konzultáció
          </div>
          <h3 className="text-xl font-normal mb-3">
            Kíváncsi vagy, hogyan javíthatnád a weboldalad?
          </h3>
          <p className="text-sm text-cream-200 mb-4">
            15 perces ingyenes konzultáción átbeszéljük a lehetőségeket.
          </p>

          <a
            href="#audit-cta"
            onClick={() => trackCTAClick('Sticky Desktop CTA', 'desktop_sticky')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cream-50 text-taupe-900 rounded-sm hover:bg-cream-100 transition-colors w-full justify-center text-sm font-normal"
          >
            Audit kérése
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
