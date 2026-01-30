import { useEffect, useRef } from 'react';
import { trackInteraction } from '../utils/gtm';

interface CaseStudyData {
  category: string;
  title: string;
  problem: string;
  analysis: string;
  solution: string[];
  result: string;
}

interface CaseStudyProps {
  caseStudy: CaseStudyData;
}

export default function CaseStudy({ caseStudy }: CaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackInteraction('case_study_view', caseStudy.title.toLowerCase().replace(/\s+/g, '_'), 'viewed');
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [caseStudy.title]);

  return (
    <div ref={sectionRef} className="bg-taupe-50 p-8 md:p-12 rounded-sm border border-taupe-200">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-taupe-900 text-cream-50 text-sm font-light rounded-sm">
          {caseStudy.category}
        </span>
      </div>

      <h3 className="text-3xl font-light text-taupe-900 mb-8">
        {caseStudy.title}
      </h3>

      <div className="space-y-6 text-taupe-700 font-light leading-relaxed">
        <div>
          <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi volt a probléma</h4>
          <p>{caseStudy.problem}</p>
        </div>

        <div>
          <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mit néztem meg</h4>
          <p>{caseStudy.analysis}</p>
        </div>

        <div>
          <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mit javítottam</h4>
          <ul className="space-y-2 list-disc list-inside">
            {caseStudy.solution.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi lett az eredmény</h4>
          <p>{caseStudy.result}</p>
        </div>
      </div>
    </div>
  );
}
