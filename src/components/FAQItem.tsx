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

    if (newState) {
      trackInteraction('faq_expand', `faq_${index}`, question);
    }
  };

  return (
    <div className="border-b border-taupe-200 pb-8 last:border-0">
      <button
        onClick={handleToggle}
        className="w-full text-left flex items-start justify-between gap-4 group"
      >
        <h3 className="text-xl md:text-2xl font-normal text-taupe-900 group-hover:text-taupe-700 transition-colors">
          {question}
        </h3>
        <ChevronDown
          size={24}
          className={`flex-shrink-0 text-taupe-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <p className="text-taupe-700 font-light leading-relaxed mt-4 animate-in fade-in duration-200">
          {answer}
        </p>
      )}
    </div>
  );
}
