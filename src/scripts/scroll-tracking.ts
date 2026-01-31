declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function trackScroll(percentage: number) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `scroll_${percentage}`,
    scroll_percentage: percentage,
  });
}

let tracked50 = false;
let tracked90 = false;

function handleScroll() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

  if (scrollPercentage >= 50 && !tracked50) {
    tracked50 = true;
    trackScroll(50);
  }

  if (scrollPercentage >= 90 && !tracked90) {
    tracked90 = true;
    trackScroll(90);
  }
}

let rafId: number | null = null;

function throttledScroll() {
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      handleScroll();
      rafId = null;
    });
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', throttledScroll, { passive: true });
}
