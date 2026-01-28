import { useEffect, useRef } from 'react';
import { trackScroll } from '../utils/gtm';

export function useScrollTracking() {
  const tracked50 = useRef(false);
  const tracked90 = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 50 && !tracked50.current) {
        tracked50.current = true;
        trackScroll(50);
      }

      if (scrollPercentage >= 90 && !tracked90.current) {
        tracked90.current = true;
        trackScroll(90);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
