import { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { getConsentState, setConsentState, updateGoogleConsent, hasConsent } from '../utils/consent';
import { loadPlausible } from '../utils/plausible';
import { navigate } from '../utils/navigation';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!hasConsent()) {
      setIsVisible(true);
    } else {
      const existingConsent = getConsentState();
      if (existingConsent) {
        updateGoogleConsent(existingConsent);
        if (existingConsent.analytics) {
          loadPlausible();
        }
      }
    }
  }, []);

  const acceptAll = () => {
    const state = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsentState(state);
    updateGoogleConsent({ ...state, timestamp: Date.now() });
    loadPlausible();
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    const state = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsentState(state);
    updateGoogleConsent({ ...state, timestamp: Date.now() });
    setIsVisible(false);
  };

  const savePreferences = () => {
    setConsentState(preferences);
    updateGoogleConsent({ ...preferences, timestamp: Date.now() });
    if (preferences.analytics) {
      loadPlausible();
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-2xl bg-white border border-taupe-200 shadow-2xl rounded-sm pointer-events-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="text-taupe-700" size={24} />
              <h3 className="text-xl font-normal text-taupe-900">Süti beállítások</h3>
            </div>
            <button
              onClick={acceptNecessary}
              className="text-taupe-500 hover:text-taupe-700 transition-colors"
              aria-label="Bezárás"
            >
              <X size={20} />
            </button>
          </div>

          {!showDetails ? (
            <>
              <p className="text-taupe-700 font-light leading-relaxed mb-4">
                Ez az oldal sütiket használ a működéshez és az adatok méréséhez. Az analitikai és
                marketing sütik opcionálisak.
              </p>

              <p className="text-taupe-600 text-sm font-light mb-6">
                További információ:{' '}
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="text-taupe-900 underline hover:text-taupe-700 cursor-pointer"
                >
                  Adatvédelmi Tájékoztató
                </button>
                {' • '}
                <button
                  onClick={() => navigate('/cookie-policy')}
                  className="text-taupe-900 underline hover:text-taupe-700 cursor-pointer"
                >
                  Süti Szabályzat
                </button>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors text-sm font-light"
                >
                  Összes elfogadása
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-6 py-3 border border-taupe-300 text-taupe-900 rounded-sm hover:bg-taupe-50 transition-colors text-sm font-light"
                >
                  Csak szükségesek
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-6 py-3 text-taupe-700 hover:text-taupe-900 transition-colors text-sm font-light underline"
                >
                  Testreszabás
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between p-4 bg-taupe-50 rounded-sm">
                  <div className="flex-1">
                    <h4 className="text-taupe-900 font-normal mb-1">Szükséges sütik</h4>
                    <p className="text-sm text-taupe-600 font-light">
                      Az oldal működéséhez elengedhetetlenek. Nem kapcsolhatók ki.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 w-5 h-5 accent-taupe-900"
                  />
                </div>

                <div className="flex items-start justify-between p-4 bg-taupe-50 rounded-sm">
                  <div className="flex-1">
                    <h4 className="text-taupe-900 font-normal mb-1">Analitikai sütik</h4>
                    <p className="text-sm text-taupe-600 font-light">
                      Segítenek megérteni, hogyan használod az oldalt (Google Analytics).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="mt-1 w-5 h-5 accent-taupe-900"
                  />
                </div>

                <div className="flex items-start justify-between p-4 bg-taupe-50 rounded-sm">
                  <div className="flex-1">
                    <h4 className="text-taupe-900 font-normal mb-1">Marketing sütik</h4>
                    <p className="text-sm text-taupe-600 font-light">
                      Hirdetések mérésére és remarketing kampányokra szolgálnak.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="mt-1 w-5 h-5 accent-taupe-900"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors text-sm font-light"
                >
                  Mentés
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 border border-taupe-300 text-taupe-900 rounded-sm hover:bg-taupe-50 transition-colors text-sm font-light"
                >
                  Vissza
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
