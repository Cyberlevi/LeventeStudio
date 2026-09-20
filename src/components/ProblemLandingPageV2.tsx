import { Phone, Mail, ArrowRight } from 'lucide-react';

interface ProblemLandingPageV2Props {
  h1: string;
  intro: string;
  symptoms: string[];
  causes: { title: string; items: string[] };
  auditScope: { title: string; items: string[] };
  deliverables: { title: string; items: string[] };
  faq: { question: string; answer: string }[];
  cta: { title: string; subtitle: string };
  relatedProblems?: { title: string; url: string; description: string }[];
}

export default function ProblemLandingPageV2({ h1, intro, symptoms, causes, auditScope, deliverables, faq, cta, relatedProblems }: ProblemLandingPageV2Props) {
  return (
    <main className="min-h-screen bg-graphite-950 text-white">
      <section className="subpage-hero">
        <div className="subpage-signal-grid" aria-hidden="true" />
        <div className="subpage-glow" aria-hidden="true" />
        <div className="subpage-container relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-end">
            <div>
              <div className="signal-kicker mb-6"><span className="signal-dot" />Weboldal-áttekintés</div>
              <h1 className="subpage-title">{h1}</h1>
              <p className="subpage-lead">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8"><a href="/kapcsolat/?cel=audit#diagnosztika" data-track-cta="Ajánlatot kérek" data-track-location="problem_hero" className="signal-button-primary">Ajánlatot kérek <span aria-hidden="true">↗</span></a><a href="#scope" data-track-cta="Mit vizsgálunk?" data-track-location="problem_hero" className="signal-button-secondary">Mit vizsgálunk?</a></div>
            </div>
            <aside className="tech-status-panel hidden sm:block">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5"><span className="text-xs uppercase tracking-[0.18em] text-white/45">Gyors áttekintés</span><span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-signal-400"><span className="signal-dot" />ellenőrzés</span></div>
              <div className="space-y-3">{['Probléma','Ok','Prioritás','Lépés'].map((item,index) => <div key={item} className="flex items-center justify-between gap-5 py-2 border-b border-white/[0.06] last:border-0"><span className="text-sm text-white/60">{String(index+1).padStart(2,'0')}</span><span className="text-sm text-white">{item}</span></div>)}</div>
              <div className="mt-7 h-px bg-white/10 relative overflow-hidden"><span className="absolute inset-y-0 left-0 w-2/3 bg-signal-400 signal-line" /></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="hightech-section bg-graphite-900 relative overflow-hidden">
        <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
        <div className="hightech-container relative grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28"><div className="text-xs uppercase tracking-[0.18em] text-white/55 mb-4">Jellemző tünetek</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance">Amit általában <span className="text-signal-400">először észreveszel.</span></h2></div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">{symptoms.map((symptom,index) => <div key={index} className="tech-card-dark p-5 sm:p-6"><div className="text-[10px] uppercase tracking-[0.18em] text-signal-400 mb-7">{String(index+1).padStart(2,'0')}</div><p className="text-white/65 font-light text-base sm:text-lg leading-relaxed">{symptom}</p></div>)}</div>
        </div>
      </section>

      <section className="hightech-section bg-graphite-950 relative overflow-hidden">
        <div className="absolute inset-0 subpage-signal-grid opacity-30 pointer-events-none" />
        <div className="hightech-container relative grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
          <div><div className="signal-kicker mb-5"><span className="signal-dot" />Lehetséges okok</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance">{causes.title}</h2></div>
          <div className="space-y-3">{causes.items.map((item,index) => <div key={index} className="tech-card-dark p-5 sm:p-6 flex gap-4 sm:gap-5 items-start"><span className="text-xs text-signal-400 tracking-[0.18em] pt-1">{String(index+1).padStart(2,'0')}</span><p className="text-white/65 font-light text-base sm:text-lg leading-relaxed">{item}</p></div>)}</div>
        </div>
      </section>

      <section id="scope" className="hightech-section bg-graphite-900 scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
        <div className="hightech-container relative">
          <div className="max-w-3xl mb-10 md:mb-14"><div className="text-xs uppercase tracking-[0.18em] text-signal-400 mb-4">Mit vizsgálunk</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance mb-5">{auditScope.title}</h2><p className="text-lg text-white/55 font-light">Nem checklista kedvéért mérünk. A cél, hogy rangsorolható legyen, melyik beavatkozásnak van üzleti értelme.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">{auditScope.items.map((item,index) => <div key={index} className="tech-card-dark p-6 min-h-[160px] flex flex-col"><div className="text-[10px] uppercase tracking-[0.18em] text-signal-400 mb-8">{String(index+1).padStart(2,'0')}</div><p className="text-white/65 font-light leading-relaxed mt-auto">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="hightech-section bg-graphite-950">
        <div className="hightech-container grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28"><div className="text-xs uppercase tracking-[0.18em] text-signal-400 mb-4">Mit kapsz</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance">{deliverables.title}</h2></div>
          <div className="space-y-1">{deliverables.items.map((item,index) => <div key={index} className="border-b border-white/10 py-5 sm:py-6 flex gap-5 items-start"><span className="text-xs text-signal-400 tracking-[0.18em] pt-1">{String(index+1).padStart(2,'0')}</span><p className="text-white/65 font-light text-base sm:text-lg leading-relaxed">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="hightech-section bg-graphite-900 relative overflow-hidden">
        <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
        <div className="hightech-container relative max-w-4xl">
          <div className="text-xs uppercase tracking-[0.18em] text-signal-400 mb-4">FAQ</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance mb-10 md:mb-14">Gyakori kérdések</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">{faq.map((item,index) => <div key={index} className="py-6 sm:py-7 grid md:grid-cols-[56px_1fr] gap-3 md:gap-6"><div className="text-xs text-signal-400 tracking-[0.16em]">Q/{String(index+1).padStart(2,'0')}</div><div><h3 className="font-serif text-2xl sm:text-3xl font-light tracking-editorial text-white mb-3">{item.question}</h3><p className="text-white/55 font-light leading-relaxed">{item.answer}</p></div></div>)}</div>
        </div>
      </section>

      <section id="kapcsolat" className="hightech-section bg-signal-400 text-graphite-950 scroll-mt-24"><div className="hightech-container"><div className="grid lg:grid-cols-[1fr_0.9fr] gap-9 lg:gap-14 items-end mb-10"><div><div className="text-xs uppercase tracking-[0.2em] opacity-55 mb-4">Következő lépés</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.95] text-balance">{cta.title}</h2></div><p className="text-base sm:text-lg opacity-70 font-light leading-relaxed">{cta.subtitle}</p></div><div className="grid gap-3 sm:grid-cols-[1.4fr_.8fr_.8fr] sm:gap-4"><a href="/kapcsolat/?cel=audit#diagnosztika" data-track-cta="Ajánlatot kérek" data-track-location="problem_landing" className="bg-graphite-950 text-white p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-graphite-900 transition-colors"><div><div className="font-medium">Ajánlatot kérek</div><div className="text-xs text-white/55">Írd meg röviden, miben segíthetünk</div></div><ArrowRight className="w-5 h-5 text-signal-400" /></a><a href="mailto:hello@leventestudio.app?subject=Weboldal%20%C3%A1tn%C3%A9z%C3%A9s" data-track-cta="E-mail" data-track-location="problem_landing" className="bg-graphite-950 text-white p-5 sm:p-6 flex items-center gap-4 hover:bg-graphite-900 transition-colors"><Mail className="w-5 h-5 text-signal-400" /><div><div className="font-medium">E-mail</div><div className="text-xs text-white/55">Közvetlenül</div></div></a><a href="tel:+36202826843" data-track-event="phone_click" data-track-location="problem_landing" className="bg-graphite-950 text-white p-5 sm:p-6 flex items-center gap-4 hover:bg-graphite-900 transition-colors"><Phone className="w-5 h-5 text-signal-400" /><div><div className="font-medium">Telefon</div><div className="text-xs text-white/55">Hívás</div></div></a></div></div></section>

      {relatedProblems && relatedProblems.length > 0 && <section className="hightech-section bg-graphite-950"><div className="hightech-container max-w-5xl"><div className="text-xs uppercase tracking-[0.18em] text-signal-400 mb-4">További segítség</div><h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-editorial leading-[0.94] text-balance mb-10 md:mb-12">Ha több probléma is összefügg.</h2><div className="grid sm:grid-cols-2 gap-4 md:gap-5">{relatedProblems.map((problem,index) => <a key={index} href={problem.url} className="tech-card-dark p-6 sm:p-7 group"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] uppercase tracking-[0.18em] text-signal-400 mb-5">{String(index+1).padStart(2,'0')}</div><h3 className="font-serif text-2xl sm:text-3xl font-light tracking-editorial text-white mb-2">{problem.title}</h3><p className="text-white/50 font-light text-sm leading-relaxed">{problem.description}</p></div><ArrowRight className="w-5 h-5 text-signal-400 group-hover:translate-x-1 transition-all flex-shrink-0" /></div></a>)}</div></div></section>}
    </main>
  );
}
