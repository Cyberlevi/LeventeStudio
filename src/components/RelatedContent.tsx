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

export default function RelatedContent({ items, title = "Kapcsolódó tartalmak" }: RelatedContentProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog':
        return 'Blog cikk';
      case 'service':
        return 'Szolgáltatás';
      case 'case-study':
        return 'Esettanulmány';
      default:
        return '';
    }
  };

  return (
    <section className="py-12 bg-cream-50 rounded-sm border border-taupe-200 my-12">
      <div className="px-8">
        <h2 className="text-2xl font-normal text-taupe-900 mb-6">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="block p-6 bg-white rounded-sm border border-taupe-200 hover:border-taupe-400 transition-colors group"
            >
              <div className="text-xs text-taupe-600 mb-2 uppercase tracking-wide">
                {getTypeLabel(item.type)}
              </div>
              <h3 className="text-lg font-normal text-taupe-900 mb-2 group-hover:text-taupe-700">
                {item.title}
              </h3>
              <p className="text-sm text-taupe-600 mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-taupe-700 group-hover:gap-3 transition-all">
                Tovább
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
