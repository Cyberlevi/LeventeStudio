import { useEffect, useRef } from 'react';
import { trackInteraction } from '../utils/gtm';

interface CaseStudyData {
  category: string;
  title: string;
  problem: string;
  analysis: string;
  solution: string[];
  result: string;
  isReal?: boolean;
  detailsUrl?: string;
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
    <div
      ref={sectionRef}
      className={`p-8 md:p-12 rounded-sm border ${
        caseStudy.isReal
          ? 'bg-gradient-to-br from-blue-50 to-taupe-50 border-blue-200'
          : 'bg-taupe-50 border-taupe-200'
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block px-3 py-1 bg-taupe-900 text-cream-50 text-sm font-light rounded-sm">
          {caseStudy.category}
        </span>
        {caseStudy.isReal && (
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-sm">
            Valós projekt
          </span>
        )}
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

        {caseStudy.isReal && caseStudy.detailsUrl && (
          <div className="pt-4">
            <a
              href={caseStudy.detailsUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 transition-colors"
            >
              Teljes esettanulmány
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
