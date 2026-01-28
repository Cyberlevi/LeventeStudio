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
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setConsentState(state: Omit<ConsentState, 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  const consentState: ConsentState = {
    ...state,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
  } catch {
    // Silently fail if localStorage is not available
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
