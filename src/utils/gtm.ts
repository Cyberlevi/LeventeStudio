declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(eventData: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

export function trackPageView(page: string): void {
  pushToDataLayer({
    event: 'page_view',
    page_path: page,
    page_title: document.title,
  });
}

export function trackEvent(
  eventName: string,
  eventCategory?: string,
  eventLabel?: string,
  eventValue?: number
): void {
  pushToDataLayer({
    event: eventName,
    event_category: eventCategory || 'engagement',
    event_label: eventLabel,
    event_value: eventValue,
  });
}

export function trackConversion(
  conversionName: string,
  conversionValue?: number,
  conversionLabel?: string
): void {
  pushToDataLayer({
    event: conversionName,
    event_category: 'conversion',
    event_label: conversionLabel,
    value: conversionValue,
  });
}

export function trackScroll(percentage: number): void {
  pushToDataLayer({
    event: `scroll_${percentage}`,
    scroll_depth: percentage,
  });
}

export function trackTimeOnPage(seconds: number): void {
  pushToDataLayer({
    event: `time_on_page_${seconds}s`,
    time_seconds: seconds,
  });
}

export function trackInteraction(
  interactionType: string,
  interactionTarget: string,
  interactionValue?: string
): void {
  pushToDataLayer({
    event: `${interactionType}_interaction`,
    interaction_type: interactionType,
    interaction_target: interactionTarget,
    interaction_value: interactionValue,
  });
}
