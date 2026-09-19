import { ArrowUpRight, Check } from 'lucide-react';
import { studioOffers } from '../data/studio-offers';

export default function Pricing2026() {
  return (
    <section id="csomagok" className="scroll-mt-20 bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Csomagok és árak</p><h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">A vállalkozásodhoz<br />illő megoldás.</h2></div><p className="max-w-xl leading-relaxed text-graphite-600 lg:justify-self-end">Az egyszerű bemutatkozástól az összekötött ügyfélkezelésig. Válassz egy kiindulópontot, a pontos tartalmat és a végösszeget írásos ajánlatban rögzítjük.</p></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {studioOffers.map(offer => <article key={offer.id} id={`csomag-${offer.id.toLowerCase()}`} className={`flex scroll-mt-24 flex-col rounded-xl border p-6 sm:p-7 ${offer.id === 'GROW' ? 'border-graphite-950 bg-graphite-950 text-ivory-100' : 'border-graphite-950/10 bg-white'}`}>
            <p className={`text-xs tracking-[.16em] ${offer.id === 'GROW' ? 'text-signal-400' : 'text-graphite-500'}`}>{offer.id}</p>
            <h3 className="mt-5 min-h-16 text-2xl font-medium leading-tight tracking-tight">{offer.title}</h3>
            <p className={`mt-5 text-xl font-semibold ${offer.id === 'GROW' ? 'text-signal-300' : ''}`}>{offer.price}</p>
            <p className={`mt-4 text-sm leading-relaxed ${offer.id === 'GROW' ? 'text-ivory-300' : 'text-graphite-600'}`}>{offer.description}</p>
            <ul className="my-7 space-y-3">{offer.features.map(feature => <li key={feature} className={`flex items-start gap-2 text-sm leading-relaxed ${offer.id === 'GROW' ? 'text-ivory-300' : 'text-graphite-600'}`}><Check size={15} className="mt-1 shrink-0" aria-hidden="true" />{feature}</li>)}</ul>
            <div className={`mt-auto border-t pt-5 ${offer.id === 'GROW' ? 'border-white/15' : 'border-graphite-950/10'}`}><p className={`text-sm leading-relaxed ${offer.id === 'GROW' ? 'text-ivory-400' : 'text-graphite-500'}`}>{offer.suitableFor}</p><a href={`/kapcsolat/?csomag=${offer.id}#diagnosztika`} data-track-cta={`Ajánlatot kérek - ${offer.id}`} data-track-location="product_showcase" className={`mt-6 flex min-h-12 items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-medium transition ${offer.id === 'GROW' ? 'bg-signal-400 text-graphite-950 hover:bg-signal-300' : 'bg-graphite-950 text-white hover:bg-graphite-800'}`}>Erre kérek ajánlatot <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </article>)}
        </div>
        <div className="mt-8 grid gap-6 border-t border-graphite-950/15 pt-6 text-sm leading-relaxed text-graphite-600 md:grid-cols-2"><p><strong className="text-graphite-950">Előre tisztázzuk:</strong> az oldalak és funkciók számát, a szövegek és képek előkészítését, a módosítási köröket, a határidőt és az átadás utáni támogatás keretét.</p><p>A feltüntetett összegek irányadó projektárak. A hirdetési költés, a domain, a tárhely és a külső szoftverek díja csak külön feltüntetés esetén része az ajánlatnak.</p></div>
        <div id="gondozas" className="mt-12 grid gap-8 rounded-xl border border-graphite-950/15 bg-white p-7 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:items-center"><div><p className="mb-3 text-xs uppercase tracking-[.18em] text-graphite-500">Átadás után is</p><h3 className="font-serif text-4xl font-light tracking-editorial">Legyen, aki gondozza az oldalad.</h3><p className="mt-4 text-sm leading-relaxed text-graphite-600">A saját készítésű weboldalakhoz folyamatos gondozás is kérhető. A feladatokat, a havi módosítási időt, a válaszidőt és a díjat külön ajánlatban rögzítjük.</p></div><div><ul className="grid gap-3 text-sm text-graphite-700 sm:grid-cols-2">{['Működés és űrlapok ellenőrzése', 'Szükséges technikai frissítések', 'Egyeztetett tartalmi módosítások', 'Rövid állapotjelentés'].map(item => <li key={item} className="flex gap-2"><Check size={16} className="shrink-0" aria-hidden="true" />{item}</li>)}</ul><a href="/kapcsolat/?igeny=gondozas#diagnosztika" data-track-cta="Weboldalgondozás érdekel" data-track-location="maintenance" className="mt-6 inline-flex items-center gap-2 border-b border-graphite-950 pb-1 text-sm font-medium">A weboldalgondozás is érdekel <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
      </div>
    </section>
  );
}
