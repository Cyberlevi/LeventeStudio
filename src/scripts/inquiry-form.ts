import { findOffer, findReference } from '../data/studio-offers';
import { getDiagnosticRoute } from './diagnostic-routing';
import { pushToDataLayer } from '../utils/gtm';
import { captureInquiryAttribution, campaignFields } from '../utils/inquiry-attribution';

const form = document.getElementById('system-diagnostic-form');
if (form instanceof HTMLFormElement) {
  const params = new URLSearchParams(window.location.search);
  const packageSelect = form.querySelector<HTMLSelectElement>('[name="selected_package"]');
  const referenceSelect = form.querySelector<HTMLSelectElement>('[name="reference_project"]');
  const goalSelect = form.querySelector<HTMLSelectElement>('[name="primary_goal"]');
  const preferred = findOffer(params.get('csomag'));
  const reference = findReference(params.get('projekt'));
  const requestedGoal = params.get('cel');
  if (preferred && packageSelect) {
    packageSelect.value = preferred.id;
    if (goalSelect) goalSelect.value = ({ PRESENCE: 'presence', START: 'rebuild', GROW: 'more-leads', SCALE: 'automation' })[preferred.id];
  }
  if (reference && referenceSelect) referenceSelect.value = reference.id;
  if (params.get('igeny') === 'gondozas' && goalSelect) goalSelect.value = 'maintenance';
  if (requestedGoal && goalSelect && Array.from(goalSelect.options).some(option => option.value === requestedGoal)) goalSelect.value = requestedGoal;
  const preferences = document.getElementById('inquiry-preferences');
  if ((preferred || reference) && preferences instanceof HTMLDetailsElement) preferences.open = true;

  const setHidden = (name: string, value: string) => {
    const field = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (field) field.value = value;
  };
  let inquirySource = params.get('from') || '';
  try {
    inquirySource = inquirySource || sessionStorage.getItem('ls_quote_source_page_v1') || '';
    sessionStorage.removeItem('ls_quote_source_page_v1');
  } catch { /* Fall back to the current route. */ }
  setHidden('source_page', inquirySource || window.location.pathname);
  const { entry, campaign } = captureInquiryAttribution();
  setHidden('entry_page', entry);
  for (const name of campaignFields) setHidden(name, campaign[name]);

  form.addEventListener('focusin', () => pushToDataLayer({ event: 'diagnostic_start', source_page: window.location.pathname }), { once: true });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || form.dataset.submitting === 'true') return;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const error = document.getElementById('inquiry-error');
    const status = document.getElementById('inquiry-status');
    const goal = goalSelect?.value || 'unknown';
    const selected = findOffer(packageSelect?.value)?.id || '';
    const project = findReference(referenceSelect?.value)?.id || '';
    const route = getDiagnosticRoute(goal, selected);
    setHidden('recommended_system', route?.code || 'MANUAL');
    form.dataset.submitting = 'true';
    if (button) button.disabled = true;
    if (error) error.hidden = true;
    if (status) status.textContent = 'Küldés folyamatban…';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value,key) => { if (typeof value === 'string') body.append(key,value); });
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body, signal: controller.signal });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      // Save only non-personal context, and only after the form endpoint acknowledges the POST.
      try {
        sessionStorage.setItem('ls_inquiry_receipt_v2', JSON.stringify({ goal, selected, project, source: inquirySource || window.location.pathname, entry, createdAt: Date.now() }));
      } catch { /* A successful submission still navigates without browser storage. */ }
      window.location.assign('/koszonjuk/');
    } catch {
      if (error) { error.hidden = false; error.textContent = 'Nem sikerült megerősíteni a küldést. Az adatokat megtartottuk. Próbáld újra, vagy írj a hello@leventestudio.app címre.'; }
      if (status) status.textContent = 'Az ajánlatkérésed még nincs visszaigazolva.';
      form.dataset.submitting = 'false';
      if (button) button.disabled = false;
    } finally { window.clearTimeout(timer); }
  });
}
