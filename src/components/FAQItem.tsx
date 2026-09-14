import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackInteraction } from '../utils/gtm';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) trackInteraction('faq_expand', `faq_${index}`, question);
  };

  return (
    <div className="border-b border-white/10 py-6 first:pt-0 last:border-0 sm:py-7">
      <button onClick={handleToggle} className="group flex w-full items-start justify-between gap-5 text-left">
        <div className="flex gap-4 sm:gap-6">
          <span className="pt-1 text-[10px] uppercase tracking-[0.18em] text-signal-400">Q/{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-serif text-2xl font-light tracking-editorial text-white transition-colors group-hover:text-signal-400 md:text-3xl">{question}</h3>
        </div>
        <ChevronDown size={22} className={`mt-1 flex-shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-signal-400' : ''}`} />
      </button>
      {isOpen && <p className="ml-0 mt-4 max-w-3xl font-light leading-relaxed text-white/55 sm:ml-[4.7rem]">{answer}</p>}
    </div>
  );
}
