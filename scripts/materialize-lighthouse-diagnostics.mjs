import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const target = 'https://leventestudio.app/';
const outDir = path.resolve('netlify/functions');

await mkdir(outDir, { recursive: true });

function safeId(value) {
  return String(value || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'unknown';
}

async function emit(name, payload) {
  const source = `export default async () => Response.json(${JSON.stringify(payload)});\n`;
  await writeFile(path.join(outDir, `${name}.mts`), source);
  console.log('[psdiag-function]', name);
}

function failingAudits(lhr, categoryId) {
  const refs = lhr?.categories?.[categoryId]?.auditRefs ?? [];

  return refs
    .filter((ref) => (ref.weight ?? 0) > 0)
    .map((ref) => lhr?.audits?.[ref.id])
    .filter((audit) => {
      if (!audit) return false;
      if (['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)) return false;
      return typeof audit.score === 'number' && audit.score < 1;
    });
}

async function runCategory(label, apiCategory, lighthouseCategoryId) {
  const url = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  url.searchParams.set('url', target);
  url.searchParams.set('strategy', 'MOBILE');
  url.searchParams.set('category', apiCategory);

  let response;
  let body;

  try {
    response = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(90_000),
    });
    body = await response.text();
  } catch (error) {
    await emit(`psdiag-${label}-fetch-exception`, {
      message: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  if (!response.ok) {
    await emit(`psdiag-${label}-http-${response.status}`, {
      status: response.status,
      preview: body.slice(0, 300),
    });
    return;
  }

  let json;
  try {
    json = JSON.parse(body);
  } catch (error) {
    await emit(`psdiag-${label}-json-parse-failed`, {
      message: error instanceof Error ? error.message : String(error),
      preview: body.slice(0, 300),
    });
    return;
  }

  const lhr = json?.lighthouseResult;
  if (!lhr?.categories?.[lighthouseCategoryId]) {
    await emit(`psdiag-${label}-category-missing`, {
      availableCategories: Object.keys(lhr?.categories ?? {}),
    });
    return;
  }

  const score = Math.round((lhr.categories[lighthouseCategoryId].score ?? 0) * 100);
  await emit(`psdiag-${label}-score-${score}`, {
    score,
    fetchTime: lhr.fetchTime,
    lighthouseVersion: lhr.lighthouseVersion,
  });

  const failures = failingAudits(lhr, lighthouseCategoryId);

  if (failures.length === 0) {
    await emit(`psdiag-${label}-no-failures`, { score });
    return;
  }

  for (const audit of failures) {
    await emit(`psdiag-${label}-${safeId(audit.id)}`, {
      id: audit.id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue,
    });
  }
}

await runCategory('a11y', 'ACCESSIBILITY', 'accessibility');
await runCategory('bp', 'BEST_PRACTICES', 'best-practices');

console.log('[psdiag] PageSpeed audit IDs materialized');
