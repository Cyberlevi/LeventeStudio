import { Zap, Rocket, Bot, BarChart, Search, Database, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileStickyBar from '../components/MobileStickyBar';
import Contact from '../components/Contact';
import { trackConversion } from '../utils/gtm';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  whatYouGet: string[];
  forWhom: string[];
  priceRange: string;
  deliveryTime: string;
  cta: string;
}

const services: Service[] = [
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Ügyfélszerző Landing (48 óra)",
    description: "Professzionális landing page, ami közvetlenül az ügyfelek megszerzésére optimalizált. Modern design, gyors betöltés, konverzió-követés.",
    whatYouGet: [
      "Astro + React technológia (3x gyorsabb mint WordPress)",
      "SEO-optimalizált tartalom és meta tagek",
      "Google Analytics 4 + konverzió követés",
      "Mobil-barát, reszponzív design",
      "Kapcsolat form + lead capture",
      "90+ PageSpeed Score garancia"
    ],
    forWhom: [
      "Szakemberek, akiknek nincs modern weboldaluk",
      "Vállalkozók, akik gyorsan szeretnének online jelenlétet",
      "Szolgáltatók, akik ügyfeleket akarnak szerezni online"
    ],
    priceRange: "150.000 - 250.000 Ft",
    deliveryTime: "48 óra",
    cta: "Landing kérése"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Weboldal Újraépítés (Modern Stack)",
    description: "Lassú WordPress oldalad? Építem újra modern, gyors technológiával. Átlagosan 3x gyorsabb oldalbetöltés, jobb SEO rangsorolás.",
    whatYouGet: [
      "Teljes content átemelés (oldalak, blog bejegyzések)",
      "Astro + Supabase modern stack",
      "Design modernizálás és felfrissítés",
      "SEO átállás (301 redirectek, sitemap)",
      "Performance optimalizálás (90+ PageSpeed)",
      "1 hónap ingyenes support és finomhangolás"
    ],
    forWhom: [
      "WordPress tulajdonosok lassú oldallal",
      "Vállalkozók, akik modern tech-re váltanának",
      "Cégek, akik SEO előnyt akarnak szerezni"
    ],
    priceRange: "300.000 - 500.000 Ft",
    deliveryTime: "1-2 hét",
    cta: "Újraépítés kérése"
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Automatikus Lead Rendszer",
    description: "Automatizált ügyfélszerzés: form kitöltés → azonnali értesítés → lead tárolás admin felületen. Minden lead egy helyen, kéznél.",
    whatYouGet: [
      "Supabase backend + biztonságos adattárolás",
      "Lead capture dashboard (admin felület)",
      "Email értesítés minden új leadnél",
      "Export funkció (CSV, Excel)",
      "Lead státusz követés (új, folyamatban, lezárt)",
      "Mobilon is elérhető admin panel"
    ],
    forWhom: [
      "Kisvállalkozások, akik követni akarják a leadeket",
      "Marketing ügynökségek ügyfeleiknek",
      "Szolgáltatók, akik professzionális CRM-et akarnak"
    ],
    priceRange: "200.000 - 350.000 Ft",
    deliveryTime: "3-5 nap",
    cta: "Lead rendszer kérése"
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Weboldal Okosítás",
    description: "AI-alapú elemzés és optimalizálás: scroll követés, időmérés, user behavior tracking. Tudd meg, mit csinálnak a látogatóid.",
    whatYouGet: [
      "Google Analytics 4 + GTM telepítés",
      "Scroll depth tracking (meddig görgettek)",
      "Time on page tracking (mennyi időt töltenek az oldalon)",
      "Click tracking (mit kattintanak)",
      "Conversion funnel setup",
      "Havi analytics report (első 3 hónapban)"
    ],
    forWhom: [
      "Weboldalak, amiknek van forgalmuk de nincs konverzió",
      "Marketing csapatok, akik data-driven döntéseket akarnak",
      "E-commerce oldalak optimalizáláshoz"
    ],
    priceRange: "80.000 - 150.000 Ft",
    deliveryTime: "1-2 nap",
    cta: "Okosítás kérése"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO Gyorsjavítás",
    description: "Google nem indexel? Lassú az oldal? Nincs structured data? 48 óra alatt javítom a kritikus SEO hibákat.",
    whatYouGet: [
      "Technical SEO audit (crawl, indexálás, hibák)",
      "Critical issue fix (404-ek, redirect loopok, robots.txt)",
      "Structured data telepítés (Schema.org)",
      "Sitemap generálás + Google Search Console setup",
      "Meta tag optimalizálás",
      "Prioritized action plan (hosszú távú SEO-hoz)"
    ],
    forWhom: [
      "Weboldalak, amiket nem indexel a Google",
      "Új oldalak, amik SEO alapokat akarnak",
      "Vállalkozók, akik gyors SEO javulást akarnak"
    ],
    priceRange: "50.000 - 120.000 Ft",
    deliveryTime: "48 óra",
    cta: "SEO javítás kérése"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Mini CRM Rendszer",
    description: "Egyszerű, de hatékony CRM: lead management, state követés, notes, follow-up reminders. Nincs felesleges funkció, csak ami kell.",
    whatYouGet: [
      "Supabase alapú CRM dashboard",
      "Lead management (új, kapcsolatba lépett, megnyert, elvesztett)",
      "Notes és history minden leadhez",
      "Search és filter funkciók",
      "Export to CSV/Excel",
      "User authentication (biztonságos hozzáférés)"
    ],
    forWhom: [
      "Kisvállalkozások, akiknek túl nagy a Salesforce",
      "Freelancerek és tanácsadók",
      "Szolgáltatók, akik egyszerű lead követést akarnak"
    ],
    priceRange: "250.000 - 400.000 Ft",
    deliveryTime: "1 hét",
    cta: "CRM kérése"
  }
];

export default function AIWebDevelopment() {
  return (
    <>
      <MobileStickyBar />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-cream-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-taupe-100 rounded-full mb-6">
              <Bot className="w-4 h-4 text-taupe-700" />
              <span className="text-sm font-light text-taupe-700">AI-Powered Web Development</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-taupe-900 mb-6">
              Modern Weboldalak <span className="font-normal">48 Órán Belül</span>
            </h1>
            <p className="text-lg md:text-xl text-taupe-700 font-light mb-8 max-w-2xl mx-auto">
              Claude Sonnet 4.5 + Astro stack. Amit mások 4 hét alatt csinálnak, nálam 2 nap.
              Agency minőség, freelancer ár, startup sebesség.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200"
              >
                Szolgáltatások megtekintése
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-taupe-900 text-taupe-900 rounded-sm hover:bg-taupe-50 transition-colors duration-200"
              >
                Ingyenes konzultáció
              </a>
            </div>
          </div>
        </section>

        {/* Why AI-Powered Section */}
        <section className="py-16 px-6 bg-white border-b border-taupe-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-taupe-900 text-center mb-12">
              Miért AI-Powered Fejlesztés?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-taupe-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-taupe-700" />
                </div>
                <h3 className="text-xl font-normal text-taupe-900 mb-2">Gyorsabb Delivery</h3>
                <p className="text-taupe-600 font-light">
                  Claude Sonnet 4.5 = coding asszisztens. 48 óra delivery, ahol mások 2-4 hetet várnak.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-taupe-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-taupe-700" />
                </div>
                <h3 className="text-xl font-normal text-taupe-900 mb-2">Modern Tech Stack</h3>
                <p className="text-taupe-600 font-light">
                  Astro + Supabase = 3x gyorsabb mint WordPress. 90+ PageSpeed Score garantálva.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-taupe-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-taupe-700" />
                </div>
                <h3 className="text-xl font-normal text-taupe-900 mb-2">Production-Ready</h3>
                <p className="text-taupe-600 font-light">
                  Nem prototype, hanem deploy-ready code. SEO-optimalizált, biztonságos, karbantartható.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 bg-cream-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-taupe-900 mb-4">
                Szolgáltatások
              </h2>
              <p className="text-lg text-taupe-700 font-light max-w-2xl mx-auto">
                AI-assisted development. Minden sort review-olok, minden projektet tesztelek.
                Modern tooling, production quality.
              </p>
            </div>

            <div className="grid gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-sm border border-taupe-200 hover:border-taupe-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-taupe-100 rounded-sm flex items-center justify-center flex-shrink-0 text-taupe-700">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-2xl font-normal text-taupe-900 mb-2">
                              {service.title}
                            </h3>
                            <p className="text-taupe-700 font-light leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 lg:text-right lg:min-w-[200px]">
                            <div className="text-sm text-taupe-600 font-light">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {service.deliveryTime}
                            </div>
                            <div className="text-lg font-normal text-taupe-900">
                              {service.priceRange}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="text-sm font-normal text-taupe-900 mb-3 uppercase tracking-wide">
                              Mit kapsz:
                            </h4>
                            <ul className="space-y-2">
                              {service.whatYouGet.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-taupe-700 font-light">
                                  <CheckCircle2 className="w-4 h-4 text-taupe-600 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-normal text-taupe-900 mb-3 uppercase tracking-wide">
                              Kinek való:
                            </h4>
                            <ul className="space-y-2">
                              {service.forWhom.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-taupe-700 font-light">
                                  <ArrowRight className="w-4 h-4 text-taupe-600 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href="https://wa.me/36202826843?text=Szia%2C%20%C3%A9rdekel%20a(z)%20" + encodeURIComponent(service.title)
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackConversion('service_cta_click', undefined, service.title)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-sm"
                          >
                            {service.cta}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-taupe-300 text-taupe-900 rounded-sm hover:bg-taupe-50 transition-colors duration-200 text-sm"
                          >
                            Ingyenes konzultáció
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 px-6 bg-white border-t border-taupe-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-taupe-900 text-center mb-12">
              Tech Stack & Tooling
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-normal text-taupe-900 mb-4">Frontend</h3>
                <ul className="space-y-2 text-taupe-700 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Astro (static site generation)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    React (interactive components)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Tailwind CSS (modern styling)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    TypeScript (type safety)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-normal text-taupe-900 mb-4">Backend & Infrastructure</h3>
                <ul className="space-y-2 text-taupe-700 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Supabase (PostgreSQL database)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Edge Functions (serverless API)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Netlify/Vercel (hosting)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-taupe-600" />
                    Google Analytics 4 + GTM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-taupe-900 to-taupe-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-cream-50 mb-6">
              Kész Elindulni?
            </h2>
            <p className="text-lg text-cream-200 font-light mb-8 max-w-2xl mx-auto">
              Beszéljük meg a projektedet. Ingyenes konzultáció, gyors válasz, konkrét action plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/36202826843?text=Szia%2C%20AI-powered%20webfejleszt%C3%A9sr%C5%91l%20szeretn%C3%A9k%20besz%C3%A9lni"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('click_whatsapp', undefined, 'ai_page_cta')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cream-50 text-taupe-900 rounded-sm hover:bg-white transition-colors duration-200"
              >
                Ingyenes konzultáció WhatsApp-on
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-cream-300 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200"
              >
                Vagy írj emailt
              </a>
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </>
  );
}
