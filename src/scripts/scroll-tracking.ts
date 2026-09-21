import { hasMeasurementConsent } from '../utils/consent';

function trackScroll(percentage: number): boolean {
  if (typeof window === 'undefined' || !hasMeasurementConsent()) return false;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `scroll_${percentage}`,
    scroll_percentage: percentage,
  });
  return true;
}

let tracked50 = false;
let tracked90 = false;
let rafId: number | null = null;

function handleScroll() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollableHeight = documentHeight - windowHeight;
  if (scrollableHeight <= 0) return;

  const scrollPercentage = (window.scrollY / scrollableHeight) * 100;

  if (scrollPercentage >= 50 && !tracked50 && trackScroll(50)) {
    tracked50 = true;
  }

  if (scrollPercentage >= 90 && !tracked90 && trackScroll(90)) {
    tracked90 = true;
    window.removeEventListener('scroll', throttledScroll);
  }
}

function throttledScroll() {
  if (tracked90 || rafId !== null) return;

  rafId = requestAnimationFrame(() => {
    handleScroll();
    rafId = null;
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', throttledScroll, { passive: true });
  window.addEventListener('ls:consent-updated', () => requestAnimationFrame(handleScroll));
  requestAnimationFrame(handleScroll);
}
