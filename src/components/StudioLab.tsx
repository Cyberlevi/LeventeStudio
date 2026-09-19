import { ArrowUpRight, PawPrint } from 'lucide-react';
import { referenceProjects } from '../data/studio-offers';

export default function StudioLab() {
  return (
    <section id="lab" className="scroll-mt-20 bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Válogatott munkák</p><h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">Nézd meg, mit építünk.</h2></div>
          <p className="max-w-xl text-base leading-relaxed text-graphite-600 lg:justify-self-end">Három saját vagy családi szolgáltatás, három különböző feladat. Ezeken keresztül mutatjuk meg a munkánkat és a megoldásainkat.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {referenceProjects.map((project, index) => (
            <article key={project.id} className={`overflow-hidden rounded-xl border border-graphite-950/10 bg-white ${index === 2 ? 'md:col-span-2 md:grid md:grid-cols-[.65fr_1.35fr]' : ''}`}>
              <a href={project.href} className="group block overflow-hidden border-b border-graphite-950/10" aria-label={`${project.name} projektbemutatás`}>
                {project.image ? <img src={project.image} width="1348" height="926" loading="lazy" decoding="async" alt={`${project.name} – képernyőkép a weboldalról`} className="aspect-[1.456] w-full object-cover object-top transition duration-500 group-hover:scale-[1.025]" /> : <div className="flex h-full min-h-60 flex-col items-center justify-center gap-4 bg-[#eee5de] px-6 py-12 text-[#655248]"><PawPrint size={40} strokeWidth={1.2} aria-hidden="true" /><span className="font-serif text-4xl">Bundavarázs</span><span className="text-xs uppercase tracking-[.2em]">Kutyakozmetika · projektbemutatás</span></div>}
              </a>
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[.15em] text-graphite-500">{project.category}</p>
                <h3 className="mt-3 text-3xl font-medium tracking-tight">{project.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-graphite-700">{project.description}</p>
                <p className="mt-3 text-sm leading-relaxed text-graphite-500">{project.detail}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-graphite-950/10 pt-5 text-sm">
                  <a href={project.href} className="inline-flex items-center gap-2 font-medium hover:underline">Projekt bemutatása <ArrowUpRight size={15} aria-hidden="true" /></a>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-graphite-500 hover:text-graphite-950">Élő weboldal <span className="sr-only">(új lapon)</span> ↗</a>}
                </div>
                <a href={`/kapcsolat/?projekt=${project.id}#diagnosztika`} data-track-cta={`Hasonlót szeretnék - ${project.name}`} data-track-location="portfolio" className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-graphite-600 underline decoration-graphite-300 underline-offset-4 hover:text-graphite-950">Hasonlót szeretnék a vállalkozásomnak <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
