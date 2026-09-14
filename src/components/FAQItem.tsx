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
  const answerId = `faq-answer-${index}`;

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) trackInteraction('faq_expand', `faq_${index}`, question);
  };

  return (
    <div className="border-b border-white/10 py-4 first:pt-0 last:border-0 sm:py-5">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="group flex min-h-14 w-full items-start justify-between gap-4 py-2 text-left sm:gap-5"
      >
        <div className="flex min-w-0 gap-3 sm:gap-6">
          <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-signal-400">Q/{String(index + 1).padStart(2, '0')}</span>
          <h3 className="min-w-0 font-serif text-[1.35rem] font-light leading-tight tracking-editorial text-white transition-colors group-hover:text-signal-400 sm:text-2xl md:text-3xl">{question}</h3>
        </div>
        <ChevronDown size={22} className={`mt-1 flex-shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-signal-400' : ''}`} />
      </button>
      {isOpen && <p id={answerId} className="ml-0 mt-3 max-w-3xl pr-2 font-light leading-relaxed text-white/55 sm:ml-[4.7rem] sm:mt-4 sm:pr-0">{answer}</p>}
    </div>
  );
}
