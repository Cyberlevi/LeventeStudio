declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: any[]) => void;
  }
}

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

export function trackLeadMagnetDownload(magnetType: string, location: string): void {
  pushToDataLayer({
    event: 'generate_lead',
    lead_type: 'lead_magnet',
    magnet_type: magnetType,
    location: location,
    value: 1
  });
}

export function trackServiceView(serviceName: string): void {
  pushToDataLayer({
    event: 'view_item',
    item_category: 'service',
    item_name: serviceName
  });
}

export function trackIndustryPageView(industry: string): void {
  pushToDataLayer({
    event: 'view_industry_page',
    industry: industry,
    page_type: 'vertical_landing'
  });
}

export function trackBlogRead(articleTitle: string, readPercentage: number): void {
  pushToDataLayer({
    event: 'blog_engagement',
    article_title: articleTitle,
    read_percentage: readPercentage
  });
}

export function trackFunnelStep(stepName: string, stepNumber: number): void {
  pushToDataLayer({
    event: 'funnel_progress',
    funnel_step: stepName,
    step_number: stepNumber
  });
}

export function trackMicroConversion(conversionType: string, value: string): void {
  pushToDataLayer({
    event: 'micro_conversion',
    conversion_type: conversionType,
    conversion_value: value
  });
}
