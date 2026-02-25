export interface Industry {
  slug: string;
  name: string;
  namePlural: string;
  description: string;
  painPoints: string[];
  benefits: string[];
  caseStudySlug?: string;
  price: string;
  keywords: string[];
}

export const industries: Industry[] = [
  {
    slug: 'fodraszat',
    name: 'Fodrászat',
    namePlural: 'Fodrászatok',
    description: 'Weboldal audit fodrászatoknak és szépségszalonoknak. Időpontfoglalás optimalizálás, helyi SEO és mobile konverzió javítás.',
    painPoints: [
      'Online időpontfoglalás nem működik mobilon',
      'Google Maps-en nem találják meg az ügyfelek',
      'Konkurens szalonok előrébb vannak a keresésben',
      'Weboldal nem konvertál látogatót ügyféllé',
      'Lassú betöltés riasztja az ügyfeleket'
    ],
    benefits: [
      'Helyi SEO optimalizálás (Google Maps ranking)',
      'Időpontfoglalási rendszer audit',
      'Mobile konverzió optimalizálás',
      'Képek és galéria teljesítmény javítás',
      'Google My Business integráció ellenőrzés'
    ],
    caseStudySlug: 'bundavarazs-kutyakozmetika-audit',
    price: '150.000',
    keywords: ['fodrászat weboldal audit', 'szépségszalon SEO', 'fodrász időpontfoglalás optimalizálás']
  },
  {
    slug: 'klima-szerviz',
    name: 'Klíma és Fűtésszerelő',
    namePlural: 'Klíma Szerelők',
    description: 'Weboldal audit klíma szerelőknek és fűtéstechnikai cégeknek. Helyi keresés optimalizálás, sürgősségi hívás konverzió és szezonális marketing.',
    painPoints: [
      'Sürgősségi hívásnál nem találják meg a telefonszámot',
      'Helyi keresésben nem jelenik meg (Google Maps)',
      'Szezonális időszakban elvesznek az ügyfelek',
      'Versenytársak előrébb vannak a rangsorban',
      'Weboldal nem ébreszt bizalmat (elavult design)'
    ],
    benefits: [
      'Helyi SEO audit (Google Maps, NAP consistency)',
      'Telefonszám és CTA prominencia ellenőrzés',
      'Szezonális kulcsszó optimalizálás',
      'Trust signal audit (referenciák, certificációk)',
      'Mobile sürgősségi hívás optimalizálás'
    ],
    caseStudySlug: 'klima18ker-weboldal-audit',
    price: '150.000',
    keywords: ['klíma szerelő weboldal', 'fűtésszerelő SEO', 'klíma szerelő helyi keresés']
  },
  {
    slug: 'ugyvedi-iroda',
    name: 'Ügyvédi Iroda',
    namePlural: 'Ügyvédi Irodák',
    description: 'Weboldal audit ügyvédi irodáknak. Trust építés, szakértői pozicionálás és B2B ügyfélszerzés optimalizálás.',
    painPoints: [
      'Potenciális ügyfelek nem bíznak meg online',
      'Versenytársak előrébb vannak a Google-ben',
      'Weboldal nem közvetít szakértelmet',
      'Kapcsolatfelvételi űrlap nem konvertál',
      'Nincs organikus ügyfélszerzés a weboldallal'
    ],
    benefits: [
      'Trust signal audit (credentials, publikációk)',
      'Szakértői tartalom SEO optimalizálás',
      'Kontakt űrlap konverzió javítás',
      'Szakmai blog struktúra audit',
      'E-A-T (Expertise, Authority, Trust) építés'
    ],
    price: '200.000',
    keywords: ['ügyvédi iroda weboldal audit', 'ügyvéd SEO', 'jogi weboldal optimalizálás']
  },
  {
    slug: 'konyveloi-iroda',
    name: 'Könyvelői Iroda',
    namePlural: 'Könyvelők',
    description: 'Weboldal audit könyvelőknek és adótanácsadóknak. B2B ügyfélszerzés, trust építés és szolgáltatási csomag kommunikáció.',
    painPoints: [
      'Cégek nem találják meg online',
      'Szolgáltatási csomagok nem érthetők',
      'Nincs organikus ügyfélszerzés',
      'Versenytársak előrébb vannak',
      'Kapcsolatfelvétel után nincs folytatás'
    ],
    benefits: [
      'B2B SEO kulcsszó audit',
      'Szolgáltatási oldal konverzió optimalizálás',
      'Trust építés (referenciák, szaktudás)',
      'Ügyfél onboarding folyamat audit',
      'Lead nurturing rendszer ellenőrzés'
    ],
    price: '180.000',
    keywords: ['könyvelő weboldal audit', 'adótanácsadó SEO', 'könyvelői iroda online marketing']
  },
  {
    slug: 'fogorvos',
    name: 'Fogorvos',
    namePlural: 'Fogorvosok',
    description: 'Weboldal audit fogorvosoknak és fogászati klinikáknak. Időpontfoglalás, helyi SEO és trust építés.',
    painPoints: [
      'Online időpontfoglalás túl bonyolult',
      'Helyi keresésben nem jelennek meg',
      'Páciensek nem bíznak meg online',
      'Versenytárs klinikák előrébb vannak',
      'Szolgáltatások és árak nem érthetők'
    ],
    benefits: [
      'Időpontfoglalási rendszer UX audit',
      'Helyi SEO optimalizálás (Google Maps)',
      'Trust signal audit (referenciák, előtte-utána)',
      'Szolgáltatási csomag kommunikáció',
      'GDPR és adatvédelmi compliance check'
    ],
    price: '150.000',
    keywords: ['fogorvos weboldal audit', 'fogászat SEO', 'fogorvos időpontfoglalás']
  },
  {
    slug: 'etterem',
    name: 'Étterem',
    namePlural: 'Éttermek',
    description: 'Weboldal audit éttermeknek és vendéglátóhelyeknek. Asztalfoglalás, étlap optimalizálás és helyi keresés.',
    painPoints: [
      'Asztalfoglalás nehézkes vagy nem működik',
      'Étlap nem olvasható mobilon',
      'Google Maps-en rossz a ranking',
      'Weboldal túl lassú (sok kép)',
      'Nincs integrálva rendelési rendszerrel'
    ],
    benefits: [
      'Asztalfoglalási rendszer audit',
      'Étlap mobil megjelenítés optimalizálás',
      'Kép optimalizálás (gyors betöltés)',
      'Helyi SEO audit',
      'Online rendelés integráció ellenőrzés'
    ],
    price: '150.000',
    keywords: ['étterem weboldal audit', 'étterem SEO', 'asztalfoglalás optimalizálás']
  },
  {
    slug: 'epitoipari-ceg',
    name: 'Építőipari Cég',
    namePlural: 'Építőipari Cégek',
    description: 'Weboldal audit építőipari cégeknek. B2B lead generálás, projekt portfólió és ajánlatkérés optimalizálás.',
    painPoints: [
      'Ajánlatkérési űrlap nem konvertál',
      'Projekt portfólió nem látható',
      'B2B ügyfelek nem találják meg',
      'Weboldal nem közvetít szakértelmet',
      'Nincs organikus lead generálás'
    ],
    benefits: [
      'Ajánlatkérési űrlap konverzió audit',
      'Projekt portfólió struktúra optimalizálás',
      'B2B SEO kulcsszó audit',
      'Trust signal ellenőrzés (referenciák, certificációk)',
      'Lead nurturing folyamat audit'
    ],
    price: '180.000',
    keywords: ['építőipari weboldal audit', 'építőipari cég SEO', 'építőipari lead generálás']
  },
  {
    slug: 'autoszerelo',
    name: 'Autószerelő',
    namePlural: 'Autószerelők',
    description: 'Weboldal audit autószerelőknek és szervizeknek. Helyi keresés, időpontfoglalás és sürgősségi hívás optimalizálás.',
    painPoints: [
      'Sürgősségi hívás nem egyszerű',
      'Időpontfoglalás nem működik jól',
      'Helyi keresésben nem jelennek meg',
      'Szolgáltatások és árak nem tiszták',
      'Versenytárs szervizek előrébb vannak'
    ],
    benefits: [
      'Sürgősségi hívás CTA optimalizálás',
      'Időpontfoglalási rendszer audit',
      'Helyi SEO audit',
      'Szolgáltatási oldal struktúra javítás',
      'Mobile UX optimalizálás'
    ],
    price: '150.000',
    keywords: ['autószerelő weboldal audit', 'autószerviz SEO', 'autószerelő online marketing']
  },
  {
    slug: 'webshop',
    name: 'Webshop',
    namePlural: 'Webshopok',
    description: 'Weboldal audit webshopoknak és e-commerce oldalaknak. Checkout optimalizálás, termékoldal SEO és konverzió növelés.',
    painPoints: [
      'Kosárelhagyás (cart abandonment) magas',
      'Termékek nem jelennek meg Google-ben',
      'Checkout folyamat túl bonyolult',
      'Webshop lassú (sok termék, kép)',
      'Mobil vásárlás nehézkes'
    ],
    benefits: [
      'Checkout folyamat konverzió audit',
      'Termékoldal SEO optimalizálás',
      'Teljesítmény audit (képek, cache)',
      'Mobil e-commerce UX audit',
      'Kosárelhagyás csökkentési javaslatok'
    ],
    price: '200.000',
    keywords: ['webshop audit', 'e-commerce SEO audit', 'webshop optimalizálás']
  },
  {
    slug: 'ingatlan-iroda',
    name: 'Ingatlan Ügynök',
    namePlural: 'Ingatlan Irodák',
    description: 'Weboldal audit ingatlan ügynököknek. Ingatlankereső optimalizálás, lead generálás és helyi SEO.',
    painPoints: [
      'Ingatlankereső nem működik jól mobilon',
      'Lead űrlap nem konvertál',
      'Ingatlanok nem jelennek meg Google-ben',
      'Weboldal lassú (sok kép)',
      'Nincs organikus lead generálás'
    ],
    benefits: [
      'Ingatlankereső UX audit',
      'Lead űrlap konverzió optimalizálás',
      'Ingatlanoldal SEO audit',
      'Kép optimalizálás (teljesítmény)',
      'Helyi SEO stratégia'
    ],
    price: '180.000',
    keywords: ['ingatlan weboldal audit', 'ingatlan ügynök SEO', 'ingatlan lead generálás']
  },
  {
    slug: 'wellness',
    name: 'Wellness Központ',
    namePlural: 'Wellness Központok',
    description: 'Weboldal audit wellness központoknak és spa létesítményeknek. Időpontfoglalás, szolgáltatás kommunikáció és visual optimalizálás.',
    painPoints: [
      'Online időpontfoglalás bonyolult',
      'Szolgáltatások nem érthetők',
      'Weboldal nem közvetíti a wellness élményt',
      'Lassú betöltés (sok kép)',
      'Nincs jó konverzió foglalásból'
    ],
    benefits: [
      'Időpontfoglalási rendszer audit',
      'Szolgáltatási csomag kommunikáció',
      'Visual design és kép optimalizálás',
      'Teljesítmény audit',
      'Konverzió optimalizálás'
    ],
    price: '150.000',
    keywords: ['wellness weboldal audit', 'spa weboldal optimalizálás', 'wellness időpontfoglalás']
  },
  {
    slug: 'fitnesz-terem',
    name: 'Fitnesz Terem',
    namePlural: 'Fitnesz Termek',
    description: 'Weboldal audit fitnesz termeknek. Tagsági regisztráció, bérlet vásárlás és szolgáltatás kommunikáció optimalizálás.',
    painPoints: [
      'Online regisztráció nem működik',
      'Bérlet vásárlás túl bonyolult',
      'Szolgáltatások és árak nem érthetők',
      'Weboldal nem motivál',
      'Helyi keresésben nem jelennek meg'
    ],
    benefits: [
      'Regisztrációs folyamat audit',
      'Bérlet vásárlási konverzió optimalizálás',
      'Szolgáltatási kommunikáció javítás',
      'Visual és motivációs tartalom audit',
      'Helyi SEO optimalizálás'
    ],
    price: '150.000',
    keywords: ['fitnesz terem weboldal audit', 'edzőterem SEO', 'fitnesz online marketing']
  },
  {
    slug: 'orvosi-rendelo',
    name: 'Orvosi Rendelő',
    namePlural: 'Orvosi Rendelők',
    description: 'Weboldal audit orvosi rendelőknek és magánklinikáknak. Időpontfoglalás, trust építés és GDPR compliance.',
    painPoints: [
      'Online időpontfoglalás nem megfelelő',
      'Páciensek nem bíznak meg',
      'GDPR compliance kérdéses',
      'Szolgáltatások nem érthetők',
      'Helyi keresésben nem jelennek meg'
    ],
    benefits: [
      'Időpontfoglalási rendszer audit',
      'Trust signal optimalizálás',
      'GDPR és adatvédelmi compliance check',
      'Szolgáltatási kommunikáció javítás',
      'Helyi SEO audit'
    ],
    price: '180.000',
    keywords: ['orvosi rendelő weboldal audit', 'magánklinika SEO', 'orvosi időpontfoglalás']
  },
  {
    slug: 'asztalos',
    name: 'Asztalos',
    namePlural: 'Asztalosok',
    description: 'Weboldal audit asztalosoknak és bútorokészítőknek. Projekt portfólió, ajánlatkérés és visual optimalizálás.',
    painPoints: [
      'Projekt portfólió nem látható jól',
      'Ajánlatkérési folyamat bonyolult',
      'Képek lassú betöltése',
      'Nincs organikus ügyfélszerzés',
      'Versenytársak előrébb vannak'
    ],
    benefits: [
      'Portfólió galéria optimalizálás',
      'Ajánlatkérési űrlap audit',
      'Kép optimalizálás (gyors betöltés)',
      'SEO audit (helyi és szakmai kulcsszavak)',
      'Trust signal ellenőrzés'
    ],
    price: '150.000',
    keywords: ['asztalos weboldal audit', 'bútorkészítő SEO', 'asztalos online marketing']
  },
  {
    slug: 'webfejleszto-ugynokseg',
    name: 'Webfejlesztő Ügynökség',
    namePlural: 'Webfejlesztő Ügynökségek',
    description: 'Weboldal audit webfejlesztő ügynökségeknek. B2B lead generálás, portfólió és szakértői pozicionálás.',
    painPoints: [
      'Portfolio nem demonstrálja szakértőséget',
      'B2B ügyfelek nem konvertálnak',
      'Nincs gondolati vezetőség (thought leadership)',
      'Versenytársak előrébb vannak',
      'Lead minőség alacsony'
    ],
    benefits: [
      'Portfolio struktúra és case study audit',
      'B2B lead generálási stratégia',
      'Thought leadership tartalom audit',
      'Technikai SEO audit (gyakorolj amit hirdetsz)',
      'Service page konverzió optimalizálás'
    ],
    price: '200.000',
    keywords: ['webfejlesztő ügynökség audit', 'web agency SEO', 'webfejlesztő lead generálás']
  }
];
