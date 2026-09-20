import { ArrowRight, ArrowUpRight, Check, Layers3 } from 'lucide-react';
import { studioOffers } from '../data/studio-offers';

const offerMeta = {
  PRESENCE: { step: '01', stage: 'Jelenlét', note: 'Legyen saját, vállalható online alapod.' },
  START: { step: '02', stage: 'Struktúra', note: 'Mutasd meg több szolgáltatásodat átláthatóan.' },
  GROW: { step: '03', stage: 'Ügyfélszerzés', note: 'Kösd össze az oldalakat, kampányokat és mérést.' },
  SCALE: { step: '04', stage: 'Rendszer', note: 'Csökkentsd a kézi adminisztrációt és kösd össze a folyamatokat.' },
} as const;

export default function Pricing2026() {
  return (
    <section id="csomagok" className="relative scroll-mt-20 overflow-hidden bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-signal-400/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Csomagok és árak</p>
            <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">
              Ne csomagot válassz.<br />
              <span className="text-graphite-500">Kiindulópontot.</span>
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-graphite-600 lg:justify-self-end">
            Az egyszerű bemutatkozástól az összekötött ügyfélkezelésig. A pontos tartalmat, funkciókat és végösszeget írásos ajánlatban rögzítjük.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl border border-graphite-950/10 bg-white p-4 shadow-[0_12px_40px_rgba(18,20,17,.04)] sm:p-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-graphite-500">
            <Layers3 size={14} aria-hidden="true" />
            Fejlődési út
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {studioOffers.map((offer, index) => {
              const meta = offerMeta[offer.id];
              return (
                <div key={offer.id} className="relative flex min-h-20 items-center gap-3 rounded-xl border border-graphite-950/8 bg-ivory-100 px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-graphite-950 text-[10px] tracking-[.14em] text-signal-400">
                    {meta.step}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[.16em] text-graphite-500">{offer.id}</p>
                    <p className="mt-1 text-sm font-medium text-graphite-900">{meta.stage}</p>
                  </div>
                  {index < studioOffers.length - 1 && (
                    <ArrowRight size={14} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-graphite-300 lg:block" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {studioOffers.map((offer) => {
            const meta = offerMeta[offer.id];
            const featured = offer.id === 'GROW';

            return (
              <article
                key={offer.id}
                id={`csomag-${offer.id.toLowerCase()}`}
                className={`group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_16px_50px_rgba(18,20,17,.05)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 ${
                  featured
                    ? 'border-graphite-950 bg-graphite-950 text-ivory-100'
                    : 'border-graphite-950/10 bg-white'
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${featured ? 'bg-signal-400' : 'bg-graphite-950/10'}`} aria-hidden="true" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-[9px] uppercase tracking-[.18em] ${featured ? 'text-signal-400' : 'text-graphite-500'}`}>
                      {meta.step} / {offer.id}
                    </p>
                    <p className={`mt-2 text-xs ${featured ? 'text-ivory-400' : 'text-graphite-500'}`}>{meta.stage}</p>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[.14em] ${
                    featured
                      ? 'border-signal-400/30 bg-signal-400/10 text-signal-300'
                      : 'border-graphite-950/10 bg-ivory-100 text-graphite-500'
                  }`}>
                    Kiindulópont
                  </span>
                </div>

                <h3 className="mt-6 min-h-16 text-2xl font-medium leading-tight tracking-tight">{offer.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-ivory-400' : 'text-graphite-500'}`}>{meta.note}</p>

                <div className={`mt-6 rounded-xl border p-4 ${
                  featured ? 'border-white/10 bg-white/[.045]' : 'border-graphite-950/8 bg-ivory-100'
                }`}>
                  <p className={`text-[9px] uppercase tracking-[.16em] ${featured ? 'text-ivory-500' : 'text-graphite-500'}`}>Projektár</p>
                  <p className={`mt-1.5 text-2xl font-semibold tracking-tight ${featured ? 'text-signal-300' : 'text-graphite-950'}`}>{offer.price}</p>
                </div>

                <p className={`mt-5 text-sm leading-relaxed ${featured ? 'text-ivory-300' : 'text-graphite-600'}`}>{offer.description}</p>

                <ul className="my-7 space-y-3">
                  {offer.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-2.5 text-sm leading-relaxed ${featured ? 'text-ivory-300' : 'text-graphite-600'}`}>
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${featured ? 'bg-signal-400/12 text-signal-300' : 'bg-graphite-950/5 text-graphite-700'}`}>
                        <Check size={12} strokeWidth={2} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`mt-auto border-t pt-5 ${featured ? 'border-white/15' : 'border-graphite-950/10'}`}>
                  <p className={`text-[9px] uppercase tracking-[.16em] ${featured ? 'text-ivory-500' : 'text-graphite-500'}`}>Neked való, ha</p>
                  <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-ivory-400' : 'text-graphite-500'}`}>{offer.suitableFor}</p>
                  <a
                    href={`/kapcsolat/?csomag=${offer.id}#diagnosztika`}
                    data-track-cta={`Ajánlatot kérek - ${offer.id}`}
                    data-track-location="product_showcase"
                    className={`mt-6 flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      featured
                        ? 'bg-signal-400 text-graphite-950 hover:bg-signal-300'
                        : 'bg-graphite-950 text-white hover:bg-graphite-800'
                    }`}
                  >
                    Erre kérek ajánlatot <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 border-t border-graphite-950/15 pt-6 text-sm leading-relaxed text-graphite-600 md:grid-cols-2">
          <p><strong className="text-graphite-950">Előre tisztázzuk:</strong> az oldalak és funkciók számát, a szövegek és képek előkészítését, a módosítási köröket, a határidőt és az átadás utáni támogatás keretét.</p>
          <p>A feltüntetett összegek irányadó projektárak. A hirdetési költés, a domain, a tárhely és a külső szoftverek díja csak külön feltüntetés esetén része az ajánlatnak.</p>
        </div>

        <div id="gondozas" className="mt-12 grid gap-8 overflow-hidden rounded-2xl border border-graphite-950/15 bg-white p-7 shadow-[0_16px_50px_rgba(18,20,17,.04)] sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[.18em] text-graphite-500">Átadás után is</p>
            <h3 className="font-serif text-4xl font-light tracking-editorial">Legyen, aki gondozza az oldalad.</h3>
            <p className="mt-4 text-sm leading-relaxed text-graphite-600">A saját készítésű weboldalakhoz folyamatos gondozás is kérhető. A feladatokat, a havi módosítási időt, a válaszidőt és a díjat külön ajánlatban rögzítjük.</p>
          </div>
          <div>
            <ul className="grid gap-3 text-sm text-graphite-700 sm:grid-cols-2">
              {['Működés és űrlapok ellenőrzése', 'Szükséges technikai frissítések', 'Egyeztetett tartalmi módosítások', 'Rövid állapotjelentés'].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} className="shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/kapcsolat/?igeny=gondozas#diagnosztika"
              data-track-cta="Weboldalgondozás érdekel"
              data-track-location="maintenance"
              className="mt-6 inline-flex items-center gap-2 border-b border-graphite-950 pb-1 text-sm font-medium"
            >
              A weboldalgondozás is érdekel <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
