import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const routes = [
  ['home','index.html'],
  ['megoldasok','megoldasok/index.html'],
  ['rolam','rolam/index.html'],
  ['weboldal-keszites','weboldal-keszites/index.html'],
  ['ugyfelszerzes','ugyfelszerzes/index.html'],
  ['ai-automatizalas','ai-automatizalas/index.html'],
  ['ai-webfejlesztes','ai-webfejlesztes/index.html'],
  ['online-jelenlet','online-jelenlet/index.html'],
  ['lassu-weboldal','lassu-weboldal/index.html'],
  ['google-nem-indexel','google-nem-indexel/index.html'],
  ['weboldal-nem-hoz-ugyfelet','weboldal-nem-hoz-ugyfelet/index.html'],
  ['esettanulmanyok','esettanulmanyok/index.html'],
  ['case-klimatisztak','esettanulmanyok/klimatisztak-kalkulator-ugyfelut/index.html'],
  ['case-klima18ker','esettanulmanyok/klima18ker-weboldal-audit/index.html'],
  ['case-furatmester','esettanulmanyok/furatmester-digitalis-ugyfelszerzes/index.html'],
  ['case-bundavarazs','esettanulmanyok/bundavarazs-helyi-ugyfelszerzes/index.html'],
  ['blog','blog/index.html'],
  ['blog-audit','blog/mikor-erdemes-weboldal-auditot-kerni/index.html'],
  ['blog-konverzio','blog/weboldal-konverzio-optimalizalas/index.html'],
  ['blog-gsc','blog/google-search-console-hibak/index.html'],
  ['blog-wp-speed','blog/miert-lassu-a-wordpress-oldalam/index.html'],
  ['blog-ux','blog/ux-audit-specifikacio/index.html'],
  ['seo-audit','szolgaltatas/seo-audit/index.html'],
  ['ux-audit','szolgaltatas/ux-audit/index.html'],
  ['weboldal-audit','szolgaltatas/weboldal-audit/index.html'],
  ['weboldal-gyorsitas','szolgaltatas/weboldal-gyorsitas/index.html'],
  ['kapcsolat','kapcsolat/index.html'],
  ['adatvedelem','adatvedelem/index.html'],
  ['suti','suti-szabalyzat/index.html'],
  ['jogi','jogi-informaciok/index.html'],
  ['koszonjuk','koszonjuk/index.html'],
  ['404','404.html']
];

const outDir=path.resolve('netlify/functions');
await mkdir(outDir,{recursive:true});

for (const [name,rel] of routes) {
  let exists=true;
  try { await access(path.resolve('dist',rel)); } catch { exists=false; }
  const fnName = `routeaudit-${exists ? 'ok' : 'missing'}-${name}`;
  const content = `export default async () => Response.json(${JSON.stringify({name,rel,exists})});\n`;
  await writeFile(path.join(outDir,fnName+'.mts'),content);
}
