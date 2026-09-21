export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
  timestamp: number;
};

const CONSENT_KEY = 'ls_consent_v1';
const GOOGLE_ANALYTICS_ID = 'G-LNDL3K56Q2';
const GOOGLE_TAG_MANAGER_ID = 'GTM-WZHLTWBD';

function ensureGoogleQueue(): void {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

function appendGoogleScript(id: string, src: string): void {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function loadGoogleTags(): void {
  if (typeof window === 'undefined' || window.__lsGoogleTagsLoaded) return;

  window.__lsGoogleTagsLoaded = true;
  ensureGoogleQueue();
  window.gtag?.('js', new Date());
  window.gtag?.('config', GOOGLE_ANALYTICS_ID);
  window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  appendGoogleScript(
    'ls-google-analytics',
    `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
  );
  appendGoogleScript(
    'ls-google-tag-manager',
    `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`,
  );
}

export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const sessionStored = sessionStorage.getItem(CONSENT_KEY);
      if (!sessionStored) return null;
      return JSON.parse(sessionStored);
    }
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to retrieve consent state:', error);
    try {
      const sessionStored = sessionStorage.getItem(CONSENT_KEY);
      if (!sessionStored) return null;
      return JSON.parse(sessionStored);
    } catch {
      return null;
    }
  }
}

export function setConsentState(state: Omit<ConsentState, 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  const consentState: ConsentState = {
    ...state,
    timestamp: Date.now(),
  };

  const serialized = JSON.stringify(consentState);

  try {
    localStorage.setItem(CONSENT_KEY, serialized);
  } catch (localStorageError) {
    console.warn('localStorage failed, trying sessionStorage:', localStorageError);

    try {
      sessionStorage.setItem(CONSENT_KEY, serialized);
      console.info('Consent state saved to sessionStorage (will expire on browser close)');
    } catch (sessionStorageError) {
      console.warn('Consent preference could not be persisted; it will be requested again on a later page load.', sessionStorageError);
    }
  }
}

export function hasConsent(): boolean {
  const state = getConsentState();
  return state !== null;
}

export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;

  ensureGoogleQueue();

  window.gtag?.('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  });

  if (state.analytics || state.marketing) loadGoogleTags();
}
