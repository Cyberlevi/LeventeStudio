import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import About from './pages/About';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import { useScrollTracking } from './hooks/useScrollTracking';
import { useTimeTracking } from './hooks/useTimeTracking';
import { trackPageView } from './utils/gtm';

function HomePage() {
  useScrollTracking();
  useTimeTracking();

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/legal" element={<Legal />} />

        {/* Phase 2: Info pages */}
        <Route path="/rolam" element={<About />} />
        <Route path="/esettanulmanyok" element={<CaseStudiesPage />} />
        <Route path="/kapcsolat" element={<ContactPage />} />

        {/* Service pages - to be added in Phase 3 */}
        {/* <Route path="/google-ads-audit" element={<GoogleAdsAudit />} /> */}
        {/* <Route path="/meta-ads-audit" element={<MetaAdsAudit />} /> */}
        {/* <Route path="/linkedin-ads-audit" element={<LinkedInAdsAudit />} /> */}
        {/* <Route path="/tiktok-ads-audit" element={<TikTokAdsAudit />} /> */}
        {/* <Route path="/youtube-ads-audit" element={<YouTubeAdsAudit />} /> */}
        {/* <Route path="/kampanystratégia" element={<CampaignStrategy />} /> */}
        {/* <Route path="/konverzioptimalizalas" element={<ConversionOptimization />} /> */}
        {/* <Route path="/analytics-reporting" element={<AnalyticsReporting />} /> */}

        {/* Local landing pages - to be added in Phase 4 */}
        {/* <Route path="/ppc-szakerto-budapest" element={<BudapestPage />} /> */}
        {/* ... more cities */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
