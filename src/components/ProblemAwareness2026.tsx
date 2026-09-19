import { Eye, MessageSquare, BarChart3 } from 'lucide-react';

export default function ProblemAwareness2026() {
  const benefits = [
    { icon: Eye, title: 'Látszódjon, miben vagy jó', text: 'Saját munkák, érthető szolgáltatások és az érdeklődő valódi kérdéseire adott válaszok.' },
    { icon: MessageSquare, title: 'Legyen egyszerű ajánlatot kérni', text: 'Mobilon is könnyen használható gombok és olyan űrlap, amely a munkához szükséges információt kéri be.' },
    { icon: BarChart3, title: 'Lásd, honnan jön az érdeklődés', text: 'A választott csomaghoz illő mérés segít követni a kapcsolatfelvételeket és a későbbi fejlesztések irányát.' },
  ];
  return <section className="bg-graphite-950 px-5 py-16 text-ivory-100 sm:px-6 lg:px-8"><div className="mx-auto max-w-[86rem]"><h2 className="mb-9 max-w-2xl font-serif text-4xl font-light tracking-editorial sm:text-5xl">A megjelenés mögött legyen átgondolt működés.</h2><div className="grid gap-8 md:grid-cols-3">{benefits.map(({icon: Icon,title,text}) => <article key={title} className="border-t border-white/15 pt-6"><Icon size={24} strokeWidth={1.5} className="text-signal-400" aria-hidden="true" /><h3 className="mt-5 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ivory-400">{text}</p></article>)}</div></div></section>;
}
