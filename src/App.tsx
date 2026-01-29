import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemAwareness from './components/ProblemAwareness';
import AuditDeliverables from './components/AuditDeliverables';
import AuditCTA from './components/AuditCTA';
import AboutExpert from './components/AboutExpert';
import HowIWork from './components/HowIWork';
import CaseStudies from './components/CaseStudies';
import ForWhom from './components/ForWhom';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import CookieBanner from './components/CookieBanner';
import MobileStickyBar from './components/MobileStickyBar';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Legal from './pages/Legal';
import { useScrollTracking } from './hooks/useScrollTracking';
import { useTimeTracking } from './hooks/useTimeTracking';
import { trackPageView } from './utils/gtm';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useScrollTracking();
  useTimeTracking();

  useEffect(() => {
    trackPageView(window.location.pathname);

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (currentPath === '/cookie-policy') {
    return <CookiePolicy />;
  }

  if (currentPath === '/legal') {
    return <Legal />;
  }

  return (
    <>
      <StructuredData />
      <CookieBanner />
      <MobileStickyBar />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <ProblemAwareness />
        <div id="deliverables">
          <AuditDeliverables />
        </div>
        <div id="audit-cta">
          <AuditCTA
            variant="primary"
            title="Kérj weboldal auditot most"
            subtitle="Válaszd ki, ahogy neked kényelmes. Minden út ugyanoda vezet: tiszta kép arról, mi nem működik."
          />
        </div>
        <AboutExpert />
        <HowIWork />
        <CaseStudies />
        <ForWhom />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
