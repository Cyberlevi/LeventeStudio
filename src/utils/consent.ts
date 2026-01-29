export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
  timestamp: number;
};

const CONSENT_KEY = 'ls_consent_v1';

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
      console.error('Both localStorage and sessionStorage failed:', sessionStorageError);

      if (confirm(
        'A böngésző nem engedélyezi a sütik tárolását. Kérjük engedélyezd a sütiket a beállításokban, ' +
        'különben minden oldal újratöltésnél újra el kell fogadnod a sütiket.\n\n' +
        'Tovább folytatod süti tárolás nélkül?'
      )) {
        console.info('User acknowledged storage limitation');
      }
    }
  }
}

export function hasConsent(): boolean {
  const state = getConsentState();
  return state !== null;
}

export function updateGoogleConsent(state: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  });
}

declare global {
  interface Window {
    gtag?: (
      command: 'consent' | 'event' | 'config',
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}
