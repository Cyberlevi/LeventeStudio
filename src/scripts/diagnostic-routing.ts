export type DiagnosticRoute = { code: string; name: string; price: string; href: string; reason: string } | null;

export function getDiagnosticRoute(goal: string): DiagnosticRoute {
  if (goal === 'rebuild') return { code: 'SYS/01', name: 'Ügyfélszerző weboldal', price: '250 000 Ft-tól', href: '/weboldal-keszites/', reason: 'A megadott cél alapján először az online alapot és az ajánlatkérési utat érdemes rendbe tenni.' };
  if (['more-leads','better-leads','measurement'].includes(goal)) return { code: 'SYS/02', name: 'Komplett ügyfélszerző rendszer', price: '500 000 Ft-tól', href: '/ugyfelszerzes/', reason: 'A megadott cél alapján nem egyetlen webes elem, hanem a kereslet, landing és mérés összekötése a logikus első irány.' };
  if (goal === 'automation') return { code: 'SYS/03', name: 'Automatizált ügyfélkezelés', price: '750 000 Ft-tól', href: '/ai-automatizalas/', reason: 'A megadott cél alapján a leadkezelés és az ismétlődő folyamatok rendszerbe szervezése lehet a következő szint.' };
  return null;
}
