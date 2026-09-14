import { ArrowUpRight, BarChart3, Search, Target, Workflow } from 'lucide-react';

const projects = [
  {
    number: '01',
    name: 'Klima18ker',
    category: 'Klímatechnika / saját rendszer',
    description: 'Helyi szolgáltatói rendszer weboldallal, technikai SEO-val, mérési infrastruktúrával és konverziófókusszal.',
    capabilities: ['Web + SEO', 'GA4 / GTM', 'Konverzió'],
    href: '/esettanulmanyok/klima18ker-weboldal-audit/',
    icon: Search,
  },
  {
    number: '02',
    name: 'FuratMester',
    category: 'Faláttörés / saját rendszer',
    description: 'Leadközpontú rendszer landingekkel, Ads-kompatibilis méréssel és ajánlatkérési folyamattal.',
    capabilities: ['Landing', 'Tracking', 'Lead funnel'],
    href: '/esettanulmanyok/furatmester-digitalis-ugyfelszerzes/',
    icon: Target,
  },
  {
    number: '03',
    name: 'Bundavarázs',
    category: 'Helyi szolgáltatás / saját rendszer',
    description: 'Lokális ügyfélszerzési modell keresési jelenléttel, mérhető kampánylogikával és konverziós alappal.',
    capabilities: ['Local growth', 'Mérés', 'Kampány'],
    href: '/esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/',
    icon: BarChart3,
  },
];

const evidence = [
  ['03', 'saját üzleti rendszer', 'Nem demo és nem fiktív referencia.'],
  ['01', 'összekötött ügyfélút', 'Kereséstől vagy hirdetéstől a megkeresésig.'],
  ['∞', 'iteráció', 'Építés → mérés → javítás valós használatból.'],
];

export default function StudioLab() {
  return (
    <section id="lab" className="relative overflow-hidden bg-graphite-950 px-6 py-24 text-ivory-100 scroll-mt-24 md:py-32">
      <div className="absolute inset-0 studio-grid-dark opacity-45" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <div className="studio-kicker mb-5 text-signal-300"><Workflow size={15} /> Levente Studio Lab</div>
            <h2 className="max-w-3xl text-5xl font-light leading-[0.94] tracking-[-0.045em] md:text-7xl">
              Nem prezentációban
              <span className="block font-serif-display italic text-ivory-400">bizonyítunk.</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg font-light leading-relaxed text-ivory-400 md:text-xl">
              Saját szolgáltató vállalkozásokon építjük és teszteljük a webes, SEO-, hirdetési, mérési és automatizálási folyamatokat. Ami éles működésben beválik, azt visszük tovább ügyfélprojektekbe.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ivory-300">
              Ez a különbség egy portfólió és egy működő labor között: itt nem azt mutatjuk meg, mit tudnánk építeni, hanem azt, milyen rendszerlogikát használunk a saját üzleteinkben is.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {evidence.map(([value, title, detail]) => (
            <div key={title} className="bg-graphite-950 p-5 sm:p-6">
              <div className="text-3xl font-light tracking-[-0.04em] text-signal-300">{value}</div>
              <div className="mt-3 text-sm font-medium text-ivory-100">{title}</div>
              <div className="mt-1 text-xs leading-relaxed text-ivory-400">{detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const span = index === 0 ? 'lg:col-span-6' : 'lg:col-span-3';
            return (
              <a key={project.name} href={project.href} className={`group relative min-h-[25rem] overflow-hidden border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:border-signal-300/35 hover:bg-white/[0.045] ${span}`}>
                <div className="absolute right-4 top-2 select-none text-[7rem] font-light leading-none tracking-[-0.08em] text-white/[0.035] md:text-[9rem]">{project.number}</div>
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-signal-300"><Icon size={19} /></div>
                    <ArrowUpRight size={20} className="text-ivory-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal-300" />
                  </div>

                  <div className="mt-auto pt-16">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-ivory-400">{project.category}</div>
                    <h3 className={`mt-3 font-medium tracking-[-0.035em] ${index === 0 ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{project.name}</h3>
                    <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-ivory-400">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.capabilities.map(cap => <span key={cap} className="border border-white/10 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-ivory-400">{cap}</span>)}
                    </div>
                    <div className="mt-6 text-xs font-medium text-signal-300">Esettanulmány megnyitása ↗</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 grid border-t border-white/10 pt-8 md:grid-cols-3">
          {[
            ['Build', 'Gyorsan piacra visszük.'],
            ['Measure', 'Mérjük, miből lesz megkeresés.'],
            ['Improve', 'A valós adatok alapján javítjuk.'],
          ].map(([title, text], index) => (
            <div key={title} className="py-4 md:border-r md:border-white/10 md:px-7 first:pl-0 last:border-r-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-signal-300">0{index + 1}</div>
              <div className="mt-2 text-2xl font-medium tracking-[-0.03em]">{title}</div>
              <div className="mt-1 text-sm text-ivory-400">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
