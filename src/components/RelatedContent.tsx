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
    <section className="my-12 border-y border-graphite-950/10 py-10 sm:py-12">
      <div className="mb-7">
        <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-graphite-500">Kapcsolódó olvasnivaló</div>
        <h2 className="font-serif text-3xl font-light tracking-editorial text-graphite-950 sm:text-4xl">{title}</h2>
      </div>
      <div className={`grid gap-4 md:grid-cols-2 ${items.length >= 3 ? 'xl:grid-cols-3' : ''}`}>
        {items.map((item, index) => (
          <a key={index} href={item.url} className="group block border border-graphite-950/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-graphite-950/20 hover:shadow-lg hover:shadow-graphite-950/5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.16em] text-graphite-600">{getTypeLabel(item.type)}</span>
              <span className="text-[10px] text-graphite-400">REL/{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mb-3 font-serif text-2xl font-light tracking-editorial text-graphite-950 transition-colors group-hover:text-graphite-700">{item.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-graphite-600">{item.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-graphite-800 transition-all group-hover:gap-3">Tovább <ArrowRight size={16} /></div>
          </a>
        ))}
      </div>
    </section>
  );
}
