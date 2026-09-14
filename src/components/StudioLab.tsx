import { ArrowUpRight, BarChart3, Search, Target, Workflow } from 'lucide-react';

const projects = [
  {
    name: 'Klima18ker',
    category: 'Klímatechnika',
    description: 'Helyi szolgáltatói rendszer weboldallal, technikai SEO-val, mérési infrastruktúrával és konverziófókusszal.',
    capabilities: ['Web + SEO', 'GA4 / GTM', 'Konverzió-optimalizálás'],
    href: '/esettanulmanyok/klima18ker-weboldal-audit/',
    icon: Search,
  },
  {
    name: 'FuratMester',
    category: 'Faláttörés és magfúrás',
    description: 'Leadközpontú rendszer landingekkel, Google Ads-kompatibilis méréssel, ajánlatkérési folyamattal és folyamatos finomhangolással.',
    capabilities: ['Landing rendszer', 'Ads-ready tracking', 'Lead funnel'],
    href: '/esettanulmanyok/furatmester-digitalis-ugyfelszerzes/',
    icon: Target,
  },
  {
    name: 'Bundavarázs',
    category: 'Helyi szolgáltatás',
    description: 'Lokális ügyfélszerzési modell keresési jelenléttel, mérhető kampányokkal és szolgáltatói konverziós logikával.',
    capabilities: ['Local growth', 'Mérés', 'Kampánylogika'],
    href: '/esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/',
    icon: BarChart3,
  },
];

export default function StudioLab() {
  return (
    <section id="lab" className="px-6 py-24 bg-taupe-900 text-cream-50 scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 studio-grid-dark opacity-25 pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-end mb-14">
          <div>
            <div className="studio-kicker text-cream-300 mb-5">
              <Workflow size={16} />
              Levente Studio Lab
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-balance">
              Nem prezentációban bizonyítunk.
              <span className="block text-cream-300">Éles rendszereken.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-lg md:text-xl text-cream-200 font-light leading-relaxed max-w-2xl">
              Saját szolgáltató vállalkozásokon építjük és teszteljük a webes, SEO-, hirdetési, mérési és automatizálási folyamatokat.
              Amit működőképesnek látunk, azt visszük tovább ügyfélprojektekbe.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <a
                key={project.name}
                href={project.href}
                className="group studio-card border-taupe-700 bg-taupe-800/40 p-7 text-cream-50"
                aria-label={`${project.name} esettanulmány megnyitása`}
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="w-11 h-11 border border-taupe-600 flex items-center justify-center">
                    <Icon size={21} />
                  </div>
                  <ArrowUpRight size={20} className="text-cream-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                <div className="text-xs uppercase tracking-[0.15em] text-cream-400 mb-2">{project.category}</div>
                <h3 className="text-2xl font-normal mb-4">{project.name}</h3>
                <p className="text-cream-200 font-light leading-relaxed mb-7">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.capabilities.map((capability) => (
                    <span key={capability} className="px-3 py-1.5 border border-taupe-600 text-xs text-cream-200">
                      {capability}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 border-t border-taupe-700 pt-10">
          <div>
            <div className="text-3xl font-light mb-1">Build</div>
            <div className="text-sm text-cream-400">Gyorsan piacra visszük.</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-1">Measure</div>
            <div className="text-sm text-cream-400">Mérjük, miből lesz megkeresés.</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-1">Improve</div>
            <div className="text-sm text-cream-400">A valós adatok alapján javítjuk.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
