export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __lsGoogleAnalyticsLoaded?: boolean;
    __lsGoogleTagManagerLoaded?: boolean;
  }
}
