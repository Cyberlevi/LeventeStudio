import Header from './components/Header';
import Hero from './components/Hero';
import HowIWork from './components/HowIWork';
import WhatIHelp from './components/WhatIHelp';
import CaseStudy from './components/CaseStudy';
import ForWhom from './components/ForWhom';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';

function App() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <HowIWork />
        <WhatIHelp />
        <CaseStudy />
        <ForWhom />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
