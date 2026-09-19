export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'consent' | 'event' | 'config', action: string, params?: Record<string, unknown>) => void;
  }
}
