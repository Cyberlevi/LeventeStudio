export default function TrustBar() {
  const signals = [
    ['01', 'Own projects', 'Valós üzleti környezetben tesztelve'],
    ['02', 'Real tracking', 'A forrástól a leadig követhető'],
    ['03', 'Modern stack', 'Gyors, karbantartható alapok'],
    ['04', 'Continuous', 'Adatok alapján javítva']
  ];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-graphite-900 px-6 py-8 text-white md:py-10">
      <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[86rem] grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-0">
        {signals.map(([number, title, description]) => (
          <div key={number} className="relative pr-5 md:border-r md:border-white/10 md:px-7 first:pl-0 last:border-r-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-signal-400">{number}</div>
            <div className="mt-3 text-lg font-medium tracking-[-0.02em] text-white md:text-xl">{title}</div>
            <div className="mt-1 max-w-[15rem] text-sm font-light leading-relaxed text-white/50">{description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
