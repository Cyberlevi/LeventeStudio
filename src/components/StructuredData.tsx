export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://leventestudio.app/rolam/#tarnóczi-levente",
        "name": "Tarnóczi Levente",
        "jobTitle": "Weboldal Audit Szakértő & Founder",
        "description": "Strukturális webes növekedési audit specialista 8+ éves webfejlesztői tapasztalattal",
        "url": "https://leventestudio.app/rolam/",
        "image": "https://leventestudio.app/levente_studio_portrait_final.webp",
        "sameAs": [
          "https://www.linkedin.com/in/tarnóczi-levente/",
          "https://github.com/leventestudio"
        ],
        "knowsAbout": [
          "Technical SEO",
          "Website Performance Optimization",
          "UX Auditing",
          "WordPress Optimization",
          "Core Web Vitals",
          "Conversion Rate Optimization",
          "Google Search Console",
          "Website Analytics"
        ],
        "alumniOf": {
          "@type": "Organization",
          "name": "Web Development & Technical SEO"
        },
        "owns": {
          "@id": "https://leventestudio.app/#organization"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://leventestudio.app/#organization",
        "name": "LeventeStudio",
        "legalName": "LeventeStudio by Tarnóczi Levente",
        "alternateName": "Levente Stúdió",
        "url": "https://leventestudio.app/",
        "logo": "https://leventestudio.app/logo.png",
        "image": "https://leventestudio.app/og-image.jpg",
        "description": "Strukturális webes növekedési audit szolgáltató cégeknek. Adat-alapú weboldal elemzés, teljesítmény optimalizálás és konverzió növelés.",
        "founder": {
          "@id": "https://leventestudio.app/rolam/#tarnóczi-levente"
        },
        "foundingDate": "2022",
        "telephone": "+36202826843",
        "email": "hello@leventestudio.app",
        "priceRange": "120000-200000 HUF",
        "currenciesAccepted": "HUF",
        "paymentAccepted": "Banki átutalás",
        "areaServed": {
          "@type": "Country",
          "name": "Hungary"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "HU"
        },
        "slogan": "Strukturális webes növekedési audit – nem sablon, hanem gondolkodás",
        "serviceType": [
          "Weboldal audit",
          "SEO audit",
          "UX audit",
          "Weboldal gyorsítás",
          "Teljesítmény optimalizálás",
          "Conversion Rate Optimization",
          "Technical SEO audit",
          "WordPress optimalizálás"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Audit Szolgáltatások",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Weboldal Audit",
                "description": "Teljes körű weboldal audit: technikai SEO, teljesítmény, konverzió és UX elemzés",
                "provider": {
                  "@id": "https://leventestudio.app/#organization"
                }
              },
              "price": "150000",
              "priceCurrency": "HUF",
              "url": "https://leventestudio.app/szolgaltatas/weboldal-audit/"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Audit",
                "description": "Mélyreható SEO audit kulcsszó kutatással és versenytárs elemzéssel",
                "provider": {
                  "@id": "https://leventestudio.app/#organization"
                }
              },
              "price": "200000",
              "priceCurrency": "HUF",
              "url": "https://leventestudio.app/szolgaltatas/seo-audit/"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UX Audit",
                "description": "Felhasználói élmény audit konverzió optimalizálással",
                "provider": {
                  "@id": "https://leventestudio.app/#organization"
                }
              },
              "price": "150000",
              "priceCurrency": "HUF",
              "url": "https://leventestudio.app/szolgaltatas/ux-audit/"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Weboldal Gyorsítás",
                "description": "Teljesítmény optimalizálás Core Web Vitals javítással",
                "provider": {
                  "@id": "https://leventestudio.app/#organization"
                }
              },
              "price": "120000",
              "priceCurrency": "HUF",
              "url": "https://leventestudio.app/szolgaltatas/weboldal-gyorsitas/"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "2",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://leventestudio.app/#website",
        "url": "https://leventestudio.app/",
        "name": "LeventeStudio - Weboldal Audit Szakértő",
        "description": "Strukturális webes növekedési audit szolgáltató cégeknek",
        "publisher": {
          "@id": "https://leventestudio.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://leventestudio.app/blog/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
