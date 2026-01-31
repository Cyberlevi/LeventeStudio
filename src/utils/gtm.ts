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

export function trackCTAClick(buttonText: string, location: string): void {
  pushToDataLayer({
    event: 'cta_click',
    button_text: buttonText,
    page_location: location,
  });
}

export function trackContactSubmit(formLocation: string): void {
  pushToDataLayer({
    event: 'contact_submit',
    form_location: formLocation,
  });
}

export function trackAuditRequest(ctaLocation: string): void {
  pushToDataLayer({
    event: 'audit_request',
    cta_location: ctaLocation,
  });
}

export function trackScroll(percentage: number): void {
  pushToDataLayer({
    event: `scroll_${percentage}`,
    scroll_percentage: percentage,
  });
}

export function trackPhoneClick(location: string): void {
  pushToDataLayer({
    event: 'phone_click',
    click_location: location,
  });
}

export function trackWhatsAppClick(location: string): void {
  pushToDataLayer({
    event: 'whatsapp_click',
    click_location: location,
  });
}

export function trackInteraction(
  interactionType: string,
  interactionTarget: string,
  interactionValue?: string
): void {
  pushToDataLayer({
    event: `${interactionType}`,
    interaction_type: interactionType,
    interaction_target: interactionTarget,
    interaction_value: interactionValue,
  });
}
