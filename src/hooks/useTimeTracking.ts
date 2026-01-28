import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '../utils/gtm';

export function useTimeTracking() {
  const tracked60 = useRef(false);
  const tracked120 = useRef(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);

      if (elapsed >= 60 && !tracked60.current) {
        tracked60.current = true;
        trackTimeOnPage(60);
      }

      if (elapsed >= 120 && !tracked120.current) {
        tracked120.current = true;
        trackTimeOnPage(120);
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
}
