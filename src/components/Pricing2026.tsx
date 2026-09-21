import { ArrowRight, ArrowUpRight, Check, Wrench } from 'lucide-react';
import { studioOffers } from '../data/studio-offers';

const offerMeta = {
  PRESENCE: {
    step: '01',
    stage: 'Jelenlét',
    code: 'FOUNDATION',
    note: 'Legyen saját, vállalható online alapod.',
  },
  START: {
    step: '02',
    stage: 'Struktúra',
    code: 'STRUCTURE',
    note: 'Mutasd meg több szolgáltatásodat átláthatóan.',
  },
  GROW: {
    step: '03',
    stage: 'Ügyfélszerzés',
    code: 'ACQUISITION',
    note: 'Kösd össze az oldalakat, kampányokat és mérést.',
  },
  SCALE: {
    step: '04',
    stage: 'Rendszer',
    code: 'SYSTEM',
    note: 'Csökkentsd a kézi adminisztrációt és kösd össze a folyamatokat.',
  },
} as const;

export default function Pricing2026() {
  return (
    <section
      id="csomagok"
      className="relative isolate scroll-mt-20 overflow-hidden border-y border-white/10 bg-graphite-950 px-5 py-20 text-ivory-100 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-signal-400/[.055] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-[29rem] h-px bg-gradient-to-r from-transparent via-signal-400/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[86rem]">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.22em] text-white/60">
              <span className="signal-dot" />
              OFFER / SYSTEM MAP
            </div>
            <h2 className="max-w-[10ch] font-serif text-[clamp(3.3rem,7vw,7rem)] font-light leading-[.86] tracking-[-.055em] text-white">
              Ne csomagot válassz.
              <span className="mt-2 block italic text-signal-300">Kiindulópontot.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-base font-light leading-relaxed text-white/60 sm:text-lg">
              Az egyszerű bemutatkozástól az összekötött ügyfélkezelésig. A pontos tartalmat,
              funkciókat és végösszeget írásos ajánlatban rögzítjük.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4 lg:max-w-xl">
              {studioOffers.map((offer) => {
                const meta = offerMeta[offer.id];
                const active = offer.id === 'GROW';

                return (
                  <a
                    key={offer.id}
                    href={`#csomag-${offer.id.toLowerCase()}`}
                    className={`group relative min-h-20 bg-graphite-950 px-3 py-3.5 transition-colors hover:bg-white/[.045] sm:px-4 ${
                      active ? 'bg-white/[.035]' : ''
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-x-0 top-0 h-px bg-signal-400" aria-hidden="true" />
                    )}
                    <span className={`block text-[9px] tracking-[.18em] ${active ? 'text-signal-400' : 'text-white/60'}`}>
                      {meta.step}
                    </span>
                    <span className="mt-2 block text-xs text-white/75">{meta.stage}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4 border-y border-white/10 py-3 text-[9px] uppercase tracking-[.2em] text-white/60">
          <span>LS / OFFER ARCHITECTURE</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 via-signal-400/30 to-white/10" />
          <span className="hidden sm:inline">04 MODULES / SELECT START POINT</span>
        </div>

        <div className="grid border-x border-white/10 md:grid-cols-2 xl:grid-cols-4">
          {studioOffers.map((offer, index) => {
            const meta = offerMeta[offer.id];
            const featured = offer.id === 'GROW';

            return (
              <article
                key={offer.id}
                id={`csomag-${offer.id.toLowerCase()}`}
                className={`group relative flex scroll-mt-24 flex-col border-b border-white/10 px-5 py-7 transition-colors duration-300 sm:px-7 sm:py-8 md:[&:nth-child(odd)]:border-r xl:border-r xl:last:border-r-0 ${
                  featured
                    ? 'bg-[linear-gradient(180deg,rgba(216,255,120,.075),rgba(216,255,120,.018)_30%,transparent_62%)]'
                    : 'bg-graphite-950 hover:bg-white/[.025]'
                }`}
              >
                {featured && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-px bg-signal-400" aria-hidden="true" />
                    <div className="absolute right-0 top-0 h-16 w-px bg-gradient-to-b from-signal-400/70 to-transparent xl:hidden" aria-hidden="true" />
                  </>
                )}

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className={`text-[10px] tracking-[.2em] ${featured ? 'text-signal-400' : 'text-white/60'}`}>
                      {meta.step} / {offer.id}
                    </div>
                    <div className="mt-2 text-[9px] uppercase tracking-[.16em] text-white/60">{meta.code}</div>
                  </div>

                  <div className="flex items-center gap-2 text-[8px] uppercase tracking-[.16em] text-white/60">
                    <span className={`h-1.5 w-1.5 rounded-full ${featured ? 'bg-signal-400 shadow-[0_0_12px_rgba(216,255,120,.55)]' : 'bg-white/20'}`} />
                    {featured ? 'ACTIVE' : 'READY'}
                  </div>
                </div>

                <div className="mt-8 min-h-[9.5rem]">
                  <p className="text-[10px] uppercase tracking-[.16em] text-white/65">{meta.stage}</p>
                  <h3 className="mt-3 max-w-[12ch] text-[clamp(1.65rem,2.3vw,2.35rem)] font-medium leading-[1.02] tracking-[-.035em] text-white">
                    {offer.title}
                  </h3>
                  <p className="mt-4 max-w-[31rem] text-sm font-light leading-relaxed text-white/60">{meta.note}</p>
                </div>

                <div className="mt-6 border-y border-white/10 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] uppercase tracking-[.18em] text-white/60">Projektár</span>
                    <span className="text-[8px] uppercase tracking-[.14em] text-white/60">STARTING POINT</span>
                  </div>
                  <p className={`mt-2 text-2xl font-medium tracking-[-.03em] sm:text-[1.7rem] ${featured ? 'text-signal-300' : 'text-white'}`}>
                    {offer.price}
                  </p>
                </div>

                <p className="mt-6 text-sm font-light leading-relaxed text-white/58">{offer.description}</p>

                <div className="mt-7">
                  <p className="mb-4 text-[9px] uppercase tracking-[.18em] text-white/60">Rendszer elemei</p>
                  <ul className="space-y-3">
                    {offer.features.map((feature) => (
                      <li key={feature} className="grid grid-cols-[1.15rem_1fr] gap-2.5 text-sm leading-relaxed text-white/58">
                        <Check
                          size={13}
                          strokeWidth={1.7}
                          className={`mt-1 ${featured ? 'text-signal-400' : 'text-white/60'}`}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[9px] uppercase tracking-[.18em] text-white/60">Neked való, ha</p>
                    <p className="mt-3 min-h-[4.5rem] text-sm font-light leading-relaxed text-white/60">
                      {offer.suitableFor}
                    </p>
                  </div>

                  <a
                    href={`/kapcsolat/?csomag=${offer.id}#diagnosztika`}
                    data-track-cta={`Ajánlatot kérek - ${offer.id}`}
                    data-track-location="product_showcase"
                    className={`mt-6 flex min-h-14 items-center justify-between border px-4 text-sm font-medium transition-all ${
                      featured
                        ? 'border-signal-400 bg-signal-400 text-graphite-950 hover:bg-signal-300'
                        : 'border-white/15 text-white/78 hover:border-signal-400/50 hover:bg-white/[.035] hover:text-white'
                    }`}
                  >
                    <span>Erre kérek ajánlatot</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>

                <span
                  className="pointer-events-none absolute bottom-3 right-3 text-[8px] tracking-[.16em] text-white/[.12]"
                  aria-hidden="true"
                >
                  LS/{meta.step}
                </span>
              </article>
            );
          })}
        </div>

        <div className="grid border-x border-b border-white/10 lg:grid-cols-[1fr_1fr]">
          <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="text-[9px] uppercase tracking-[.18em] text-white/60">SCOPE / ELŐRE TISZTÁZZUK</div>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/60">
              Az oldalak és funkciók számát, a szövegek és képek előkészítését, a módosítási köröket,
              a határidőt és az átadás utáni támogatás keretét.
            </p>
          </div>
          <div className="p-5 sm:p-7">
            <div className="text-[9px] uppercase tracking-[.18em] text-white/60">COST / KÜLSŐ TÉTELEK</div>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/60">
              A feltüntetett összegek irányadó projektárak. A hirdetési költés, domain, tárhely és külső
              szoftverek díja csak külön feltüntetés esetén része az ajánlatnak.
            </p>
          </div>
        </div>

        <div
          id="gondozas"
          className="relative mt-14 overflow-hidden border border-white/10 bg-white/[.022] p-6 sm:p-8 lg:grid lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-signal-400">
              <Wrench size={13} strokeWidth={1.5} aria-hidden="true" />
              AFTERCARE / SYSTEM MAINTENANCE
            </div>
            <h3 className="max-w-[12ch] font-serif text-4xl font-light leading-[.95] tracking-[-.045em] text-white sm:text-5xl">
              Legyen, aki gondozza az oldalad.
            </h3>
            <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/60">
              A saját készítésű weboldalakhoz folyamatos gondozás is kérhető. A feladatokat, havi
              módosítási időt, válaszidőt és díjat külön ajánlatban rögzítjük.
            </p>
          </div>

          <div className="relative mt-8 border-t border-white/10 pt-7 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                'Működés és űrlapok ellenőrzése',
                'Szükséges technikai frissítések',
                'Egyeztetett tartalmi módosítások',
                'Rövid állapotjelentés',
              ].map((item, index) => (
                <li key={item} className="flex min-h-16 items-center gap-3 bg-graphite-950 px-4 py-3 text-sm text-white/58">
                  <span className="text-[9px] tracking-[.15em] text-signal-400">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/kapcsolat/?igeny=gondozas#diagnosztika"
              data-track-cta="Weboldalgondozás érdekel"
              data-track-location="maintenance"
              className="mt-6 inline-flex items-center gap-3 border-b border-signal-400/50 pb-1.5 text-sm text-white/78 transition-colors hover:border-signal-400 hover:text-signal-300"
            >
              A weboldalgondozás is érdekel <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 text-[8px] uppercase tracking-[.18em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>LS / OFFER SYSTEM / 2026</span>
          <span className="flex items-center gap-3">
            PRESENCE <ArrowRight size={10} /> START <ArrowRight size={10} /> GROW <ArrowRight size={10} /> SCALE
          </span>
        </div>
      </div>
    </section>
  );
}
