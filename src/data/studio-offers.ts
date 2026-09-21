type PreviewDevice = 'tablet' | 'mobile';

const responsiveScreenshot = (project: string, device: PreviewDevice) =>
  `/.netlify/functions/project-preview?project=${encodeURIComponent(project)}&device=${device}&v=20260921-5`;

export const studioOffers = [
  {
    id: 'PRESENCE', code: 'LS/01', title: 'Profi online jelenlét', price: '149 000 Ft-tól',
    description: 'Egy átlátható bemutatkozó oldal, ahol az érdeklődő gyorsan megismer és elér.',
    features: ['Egyoldalas bemutatkozás', 'Mobilra tervezett megjelenés', 'Szolgáltatások és elérhetőségek', 'Ajánlatkérő űrlap', 'Keresési és mérési alapok'],
    suitableFor: 'Ha most indulsz, vagy a közösségi oldalad mellé saját weboldalt szeretnél.',
    href: '/online-jelenlet/',
  },
  {
    id: 'START', code: 'LS/02', title: 'Weboldal a szolgáltatásaidhoz', price: '250 000 Ft-tól',
    description: 'Több hely a munkáidnak, a szolgáltatásaidnak és a vásárlás előtti kérdéseknek.',
    features: ['Többoldalas weboldal', 'Szolgáltatások és referenciák bemutatása', 'Egyszerű ajánlatkérési folyamat', 'Keresőbarát technikai felépítés', 'Kapcsolatfelvételek mérése'],
    suitableFor: 'Ha több szolgáltatást kínálsz, és az érdeklődőnek segítenél választani.',
    href: '/weboldal-keszites/',
  },
  {
    id: 'GROW', code: 'LS/03', title: 'Weboldal és ügyfélszerzés', price: '450–650 000 Ft',
    description: 'A fontos szolgáltatások és kampányok saját oldalt kapnak, követhető megkeresésekkel.',
    features: ['Kulcsszó- és konkurenciakutatás', 'Szolgáltatási és kampányoldalak', 'Hirdetésekhez előkészített mérés', 'Ajánlatkérési folyamat finomítása', 'Alap automatizálás', '60 nap egyeztetett finomhangolás'],
    suitableFor: 'Ha már működik a vállalkozásod, és tudatosabban építenéd az ügyfélszerzést.',
    href: '/ugyfelszerzes/',
  },
  {
    id: 'SCALE', code: 'LS/04', title: 'Rendezett ügyfélkezelés', price: '750 000 Ft-tól',
    description: 'Összekötjük a megkereséseket, a nyilvántartást és az ismétlődő feladatokat.',
    features: ['Az induláshoz szükséges webes alapok', 'Ügyfél- vagy ajánlatkérés-nyilvántartás', 'Egyeztetett folyamatok automatizálása', 'Szükséges rendszerek összekötése', 'Áttekinthető állapotok és kimutatások', '90 nap egyeztetett finomhangolás'],
    suitableFor: 'Ha már az ajánlatkérések követése és a kézi adminisztráció veszi el az idődet.',
    href: '/ai-automatizalas/',
  },
] as const;

export type OfferId = (typeof studioOffers)[number]['id'];
export function findOffer(value: string | null | undefined) {
  return studioOffers.find(offer => offer.id === value);
}

export const referenceProjects = [
  { id: 'klimatisztak', name: 'KlímaTiszták', category: 'Klímatisztítás · saját digitális projekt',
    description: 'Kalkulátorral támogatott szolgáltatási oldal, világos ajánlatkérési úttal és mobilra tervezett folyamattal.',
    detail: 'A projekt azt mutatja meg, hogyan lehet a szolgáltatásválasztást, az árazási logikát és a kapcsolatfelvételt egyetlen ügyfélútba rendezni.',
    image: 'https://d33wubrfki0l68.cloudfront.net/6aa7727ca06f6a4ae42ef0e7/screenshot_2026-09-14-04-05-37-0000.webp', tabletImage: responsiveScreenshot('klimatisztak', 'tablet'), mobileImage: responsiveScreenshot('klimatisztak', 'mobile'), liveUrl: 'https://klimatisztak.hu/',
    href: '/esettanulmanyok/klimatisztak-kalkulator-ugyfelut/' },
  { id: 'klima18ker', name: 'Klíma18ker', category: 'Klímaszerelés · saját vállalkozás',
    description: 'Szolgáltatások, saját munkafotók és műszaki ajánlatkérés egy átlátható oldalon.',
    detail: 'Az érdeklődő megismerheti a munkát, majd elindíthatja a helyszínhez illő ajánlatkérést.',
    image: 'https://d33wubrfki0l68.cloudfront.net/6aa805a1031c990008cfc983/screenshot_2026-09-14-14-34-00-0000.webp', tabletImage: responsiveScreenshot('klima18ker', 'tablet'), mobileImage: responsiveScreenshot('klima18ker', 'mobile'), liveUrl: 'https://klima18ker.hu/',
    href: '/esettanulmanyok/klima18ker-weboldal-audit/' },
  { id: 'furatmester', name: 'FuratMester', category: 'Faláttörés · saját szolgáltatás',
    description: 'Konkrét munkatípusok, árakat segítő információk és közvetlen ajánlatkérés.',
    detail: 'A látogató megtalálja a szükséges furat típusát és a következő lépést az egyeztetéshez.',
    image: 'https://d33wubrfki0l68.cloudfront.net/6aaffa8ab15dfa0008c4789a/screenshot_2026-09-20-15-24-19-0000.webp', tabletImage: responsiveScreenshot('furatmester', 'tablet'), mobileImage: responsiveScreenshot('furatmester', 'mobile'), liveUrl: 'https://lyukfurasbudapest.hu/',
    href: '/esettanulmanyok/furatmester-digitalis-ugyfelszerzes/' },
  { id: 'bundavarazs', name: 'Bundavarázs', category: 'Kutyakozmetika · családi vállalkozás',
    description: 'Egy személyes szolgáltatás online bemutatása, helyi ügyfelekre szabva.',
    detail: 'A projektbemutatásban a bizalomépítést és a kapcsolatfelvétel felépítését mutatjuk meg.',
    image: 'https://d33wubrfki0l68.cloudfront.net/6aafdea445a27fc81c03df56/screenshot_2026-09-20-13-25-31-0000.webp', tabletImage: responsiveScreenshot('bundavarazs', 'tablet'), mobileImage: responsiveScreenshot('bundavarazs', 'mobile'), liveUrl: 'https://bundavarazskutyakozmetika.hu/',
    href: '/esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/' },
] as const;

export function findReference(value: string | null | undefined) {
  return referenceProjects.find(project => project.id === value);
}
