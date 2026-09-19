import { findOffer } from '../data/studio-offers';

export type DiagnosticRoute = { code: string; id: string; name: string; price: string; href: string; reason: string } | null;

export function getDiagnosticRoute(goal: string, selectedPackage = ''): DiagnosticRoute {
  const preferred = findOffer(selectedPackage);
  const defaultId = ({ presence: 'PRESENCE', rebuild: 'START', 'more-leads': 'GROW', 'better-leads': 'GROW', measurement: 'GROW', automation: 'SCALE' } as Record<string,string>)[goal];
  const offer = preferred || findOffer(defaultId);
  if (!offer) return null;
  return { code: offer.code, id: offer.id, name: offer.title, price: offer.price,
    href: `/#csomag-${offer.id.toLowerCase()}`,
    reason: preferred ? 'Ezt a csomagot jelölted meg. A pontos tartalmat és a végösszeget az egyeztetés után rögzítjük.' : 'A megadott cél alapján ez lehet a kiindulópont. A feladat megismerése után személyesen pontosítjuk az ajánlatot.' };
}
