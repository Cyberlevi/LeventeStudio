const KEY='ls_entry_page_v1';
try {
  if (!sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY, window.location.pathname);
} catch (_) {}

const demandRoutes = new Set(['/megoldasok/','/weboldal-keszites/','/ugyfelszerzes/','/ai-automatizalas/']);
if (demandRoutes.has(window.location.pathname)) {
  const payload={event:'demand_landing_view',demand_landing:window.location.pathname};
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push(payload);
  if(typeof window.gtag==='function') window.gtag('event','demand_landing_view',{demand_landing:window.location.pathname});
}
