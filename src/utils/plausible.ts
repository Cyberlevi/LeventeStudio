let plausibleLoaded = false;

export function loadPlausible(): void {
  if (typeof window === 'undefined' || plausibleLoaded) return;

  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', 'leventestudio.app');
  script.src = 'https://plausible.io/js/script.js';

  document.head.appendChild(script);
  plausibleLoaded = true;
}

export function isPlausibleLoaded(): boolean {
  return plausibleLoaded;
}
