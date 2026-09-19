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
  { id: 'klima18ker', name: 'Klíma18ker', category: 'Klímaszerelés · saját vállalkozás',
    description: 'Szolgáltatások, saját munkafotók és műszaki ajánlatkérés egy átlátható oldalon.',
    detail: 'Az érdeklődő megismerheti a munkát, majd elindíthatja a helyszínhez illő ajánlatkérést.',
    image: '/projects/klima18ker.webp', liveUrl: 'https://klima18ker.hu/',
    href: '/esettanulmanyok/klima18ker-weboldal-audit/' },
  { id: 'furatmester', name: 'FuratMester', category: 'Faláttörés · saját szolgáltatás',
    description: 'Konkrét munkatípusok, árakat segítő információk és közvetlen ajánlatkérés.',
    detail: 'A látogató megtalálja a szükséges furat típusát és a következő lépést az egyeztetéshez.',
    image: '/projects/furatmester.webp', liveUrl: 'https://lyukfurasbudapest.hu/',
    href: '/esettanulmanyok/furatmester-digitalis-ugyfelszerzes/' },
  { id: 'bundavarazs', name: 'Bundavarázs', category: 'Kutyakozmetika · családi vállalkozás',
    description: 'Egy személyes szolgáltatás online bemutatása, helyi ügyfelekre szabva.',
    detail: 'A projektbemutatásban a bizalomépítést és a kapcsolatfelvétel felépítését mutatjuk meg.',
    image: null, liveUrl: null,
    href: '/esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/' },
] as const;

export function findReference(value: string | null | undefined) {
  return referenceProjects.find(project => project.id === value);
}
