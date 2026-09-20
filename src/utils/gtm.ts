export function pushToDataLayer(eventData: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  if (window.gtag && eventData.event) {
    const eventName = eventData.event as string;
    const eventParams = { ...eventData };
    delete eventParams.event;
    window.gtag('event', eventName, eventParams);
  }
}

export function trackScroll(percentage: number): void {
  pushToDataLayer({
    event: `scroll_${percentage}`,
    scroll_percentage: percentage,
  });
}
