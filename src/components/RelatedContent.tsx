import { ArrowRight } from 'lucide-react';

interface RelatedItem {
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'service' | 'case-study';
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
}

export default function RelatedContent({ items, title = 'Kapcsolódó tartalmak' }: RelatedContentProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Cikk';
      case 'service': return 'Szolgáltatás';
      case 'case-study': return 'Esettanulmány';
      default: return '';
    }
  };

  return (
    <section className="my-12 border-y border-white/10 py-10 sm:py-12">
      <div className="mb-7">
        <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/50">Kapcsolódó olvasnivaló</div>
        <h2 className="font-serif text-3xl font-light tracking-editorial text-white sm:text-4xl">{title}</h2>
      </div>
      <div className={`grid gap-4 md:grid-cols-2 ${items.length >= 3 ? 'xl:grid-cols-3' : ''}`}>
        {items.map((item, index) => (
          <a key={index} href={item.url} className="group block border border-white/10 bg-white/[.025] p-6 transition-all hover:-translate-y-0.5 hover:border-signal-400/35 hover:bg-white/[.04]">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.16em] text-signal-300">{getTypeLabel(item.type)}</span>
              <span className="text-[10px] text-white/35">REL/{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mb-3 font-serif text-2xl font-light tracking-editorial text-white transition-colors group-hover:text-signal-300">{item.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-white/60">{item.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-white/80 transition-all group-hover:gap-3">Tovább <ArrowRight size={16} /></div>
          </a>
        ))}
      </div>
    </section>
  );
}
