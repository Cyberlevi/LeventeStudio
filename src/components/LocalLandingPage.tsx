import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';
import AuditCTA from './AuditCTA';
import AboutExpert from './AboutExpert';
import HowIWork from './HowIWork';
import CaseStudies from './CaseStudies';
import FAQ from './FAQ';
import Contact from './Contact';

interface LocalLandingPageProps {
  hero: ReactNode;
  localProofSection?: ReactNode;
  servicesSection: ReactNode;
  ctaTitle?: string;
  ctaSubtitle?: string;
  showAboutExpert?: boolean;
  showCaseStudies?: boolean;
  additionalSections?: ReactNode;
}

export default function LocalLandingPage({
  hero,
  localProofSection,
  servicesSection,
  ctaTitle = "Ingyenes konzultáció helyi vállalkozásoknak",
  ctaSubtitle = "Beszéljük meg, hogyan segíthetek online hirdetéseid optimalizálásában.",
  showAboutExpert = true,
  showCaseStudies = true,
  additionalSections,
}: LocalLandingPageProps) {
  return (
    <>
      <MobileStickyBar />
      <div className="min-h-screen bg-white">
        <Header />

        {hero}

        {localProofSection}

        <div id="services">
          {servicesSection}
        </div>

        <div id="audit-cta">
          <AuditCTA
            variant="primary"
            title={ctaTitle}
            subtitle={ctaSubtitle}
          />
        </div>

        {showAboutExpert && <AboutExpert />}

        <HowIWork />

        {showCaseStudies && <CaseStudies />}

        {additionalSections}

        <FAQ />

        <Contact />

        <Footer />
      </div>
    </>
  );
}
