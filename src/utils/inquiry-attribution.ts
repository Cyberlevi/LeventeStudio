export const campaignFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;
const campaignKey = 'ls_campaign_v1';

export function captureInquiryAttribution(): { entry: string; campaign: Record<string, string> } {
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(campaignFields.map(name => [name, (params.get(name) || '').slice(0, 500)]));
  let entry = window.location.pathname;
  let campaign = current;
  try {
    entry = sessionStorage.getItem('ls_entry_page_v1') || entry;
    sessionStorage.setItem('ls_entry_page_v1', entry);
    if (Object.values(current).some(Boolean)) {
      sessionStorage.setItem(campaignKey, JSON.stringify(current));
    } else {
      const saved = JSON.parse(sessionStorage.getItem(campaignKey) || '{}');
      campaign = Object.fromEntries(campaignFields.map(name => [name, typeof saved?.[name] === 'string' ? saved[name].slice(0, 500) : '']));
    }
  } catch { /* The current page remains usable when storage is unavailable. */ }
  return { entry, campaign };
}
