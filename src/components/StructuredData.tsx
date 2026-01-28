export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Levente Stúdió",
    "url": "https://leventestudio.app",
    "description": "Weboldalak, SEO és technikai rendszerek szakértői rendbetétele. Nem sablonokkal – gondolkodással.",
    "telephone": "+36202826843",
    "priceRange": "$$",
    "areaServed": "HU",
    "serviceType": [
      "Weboldal audit",
      "SEO optimalizálás",
      "Teljesítmény optimalizálás",
      "UX audit",
      "Technikai rendszerek egyszerűsítése"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
