export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://leventestudio.app/rolam/#tarnoczi-levente',
        name: 'Tarnóczi Levente',
        jobTitle: 'Digitális rendszerépítő',
        description: 'A Levente Studio digitális rendszerépítője: web, SEO, mérés, leadkezelés és AI-assisted üzleti folyamatok.',
        url: 'https://leventestudio.app/rolam/',
        image: 'https://leventestudio.app/levente_studio_portrait_final.webp',
        sameAs: ['https://github.com/Cyberlevi'],
        knowsAbout: [
          'Webfejlesztés',
          'Technical SEO',
          'Webanalitika',
          'Google Ads mérés',
          'Conversion tracking',
          'Lead management',
          'AI workflow',
          'Üzleti automatizálás'
        ],
        worksFor: {
          '@id': 'https://leventestudio.app/#organization'
        }
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://leventestudio.app/#organization',
        name: 'Levente Studio',
        alternateName: 'LeventeStudio',
        url: 'https://leventestudio.app/',
        logo: 'https://leventestudio.app/logo.png',
        image: 'https://leventestudio.app/og-image.jpg',
        description: 'AI-native digitális ügyfélszerző és működési rendszerek szolgáltató vállalkozásoknak.',
        founder: {
          '@id': 'https://leventestudio.app/rolam/#tarnoczi-levente'
        },
        email: 'hello@leventestudio.app',
        areaServed: {
          '@type': 'Country',
          name: 'Hungary'
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'HU'
        },
        slogan: 'Nem csak weboldalt. Ügyfélszerző rendszert.',
        serviceType: [
          'Ügyfélszerző weboldal',
          'Landing page fejlesztés',
          'SEO optimalizálás',
          'Konverziómérés',
          'Lead rendszer',
          'CRM integráció',
          'Üzleti automatizálás',
          'AI workflow'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://leventestudio.app/#website',
        url: 'https://leventestudio.app/',
        name: 'Levente Studio',
        description: 'AI-native digitális ügyfélszerző rendszerek vállalkozásoknak.',
        publisher: {
          '@id': 'https://leventestudio.app/#organization'
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
