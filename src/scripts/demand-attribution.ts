import { hasMeasurementConsent } from '../utils/consent';
import { captureInquiryAttribution } from '../utils/inquiry-attribution';

captureInquiryAttribution();

const demandRoutes = new Set(['/megoldasok/','/online-jelenlet/','/weboldal-keszites/','/ugyfelszerzes/','/ai-automatizalas/','/ai-webfejlesztes/']);
let demandLandingTracked = false;

function trackDemandLanding() {
  if (demandLandingTracked || !demandRoutes.has(window.location.pathname) || !hasMeasurementConsent()) return;

  demandLandingTracked = true;
  const payload={event:'demand_landing_view',demand_landing:window.location.pathname};
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push(payload);
  if(typeof window.gtag==='function') window.gtag('event','demand_landing_view',{demand_landing:window.location.pathname});
}

trackDemandLanding();
window.addEventListener('ls:consent-updated', trackDemandLanding);
