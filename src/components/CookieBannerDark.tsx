import { useEffect, useState } from 'react';
import { Shield, X } from 'lucide-react';
import { getConsentState, setConsentState, updateGoogleConsent, hasConsent } from '../utils/consent';

export default function CookieBannerDark() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const state = window as Window & { __lsConsentBannerMounted?: boolean };
    if (state.__lsConsentBannerMounted) return;
    state.__lsConsentBannerMounted = true;
    setIsOwner(true);

    if (!hasConsent()) setVisible(true);
    else {
      const current = getConsentState();
      if (current) updateGoogleConsent(current);
    }

    return () => {
      state.__lsConsentBannerMounted = false;
    };
  }, []);

  const save = (state: typeof prefs) => {
    setConsentState(state);
    updateGoogleConsent({ ...state, timestamp: Date.now() });
    setVisible(false);
  };

  if (!isOwner || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-3 sm:p-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain border border-white/10 bg-graphite-950 text-white shadow-2xl shadow-black/50">
        <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
        <div className="relative p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-5 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-white/10 text-signal-400"><Shield size={20} /></div>
              <div><div className="text-[10px] uppercase tracking-[.18em] text-signal-400">Adatvédelmi beállítások</div><h3 id="cookie-dialog-title" className="mt-1 text-xl font-medium">Süti beállítások</h3></div>
            </div>
            <button onClick={() => save({ necessary: true, analytics: false, marketing: false })} className="inline-flex h-11 w-11 items-center justify-center text-white/55 hover:text-white" aria-label="Bezárás"><X size={20} /></button>
          </div>

          {!details ? (
            <>
              <p className="mb-5 font-light leading-relaxed text-white/55">Ez az oldal sütiket használ a működéshez, a méréshez és – ha engedélyezed – a marketing teljesítményének követéséhez.</p>
              <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/45">
                <a href="/adatvedelem/" className="border-b border-signal-400 text-white">Adatvédelem</a>
                <a href="/suti-szabalyzat/" className="border-b border-signal-400 text-white">Süti szabályzat</a>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="bg-signal-400 px-6 py-3 text-sm font-medium text-graphite-950 hover:bg-signal-300">Összes elfogadása</button>
                <button onClick={() => save({ necessary: true, analytics: false, marketing: false })} className="border border-white/15 px-6 py-3 text-sm text-white/70 hover:border-white/30 hover:text-white">Csak szükségesek</button>
                <button onClick={() => setDetails(true)} className="px-4 py-3 text-sm text-white/45 underline decoration-signal-400 underline-offset-4 hover:text-white">Testreszabás</button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 space-y-3">
                <ConsentRow title="Szükséges sütik" text="Az oldal működéséhez elengedhetetlenek." checked disabled />
                <ConsentRow title="Analitikai sütik" text="A használat és a konverziós út mérésére szolgálnak." checked={prefs.analytics} onChange={(checked) => setPrefs({ ...prefs, analytics: checked })} />
                <ConsentRow title="Marketing sütik" text="Hirdetési konverziómérésre és remarketingre szolgálnak." checked={prefs.marketing} onChange={(checked) => setPrefs({ ...prefs, marketing: checked })} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row"><button onClick={() => save(prefs)} className="bg-signal-400 px-6 py-3 text-sm font-medium text-graphite-950">Mentés</button><button onClick={() => setDetails(false)} className="border border-white/15 px-6 py-3 text-sm text-white/70">Vissza</button></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentRow({ title, text, checked, disabled = false, onChange }: { title: string; text: string; checked: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <label className="flex items-start justify-between gap-5 border border-white/10 bg-white/[0.035] p-4">
      <div><div className="text-white">{title}</div><p className="mt-1 text-sm font-light text-white/45">{text}</p></div>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className="mt-1 h-5 w-5 accent-[#d8ff78]" />
    </label>
  );
}
