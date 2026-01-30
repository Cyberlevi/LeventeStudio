import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';
import AuditCTA from './AuditCTA';
import HowIWork from './HowIWork';
import CaseStudies from './CaseStudies';
import ForWhom from './ForWhom';
import FAQ from './FAQ';
import Contact from './Contact';

interface ServicePageProps {
  hero: ReactNode;
  problemSection?: ReactNode;
  deliverablesSection: ReactNode;
  ctaTitle?: string;
  ctaSubtitle?: string;
  showCaseStudies?: boolean;
  showForWhom?: boolean;
  additionalSections?: ReactNode;
}

export default function ServicePage({
  hero,
  problemSection,
  deliverablesSection,
  ctaTitle = "Kérj ingyenes konzultációt most",
  ctaSubtitle = "Beszéljük meg, hogyan segíthetek a céljaid elérésében.",
  showCaseStudies = true,
  showForWhom = true,
  additionalSections,
}: ServicePageProps) {
  return (
    <>
      <MobileStickyBar />
      <div className="min-h-screen bg-white">
        <Header />

        {hero}

        {problemSection}

        <div id="deliverables">
          {deliverablesSection}
        </div>

        <div id="audit-cta">
          <AuditCTA
            variant="primary"
            title={ctaTitle}
            subtitle={ctaSubtitle}
          />
        </div>

        <HowIWork />

        {showCaseStudies && <CaseStudies />}

        {showForWhom && <ForWhom />}

        {additionalSections}

        <FAQ />

        <Contact />

        <Footer />
      </div>
    </>
  );
}
