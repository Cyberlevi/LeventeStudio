import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const target = 'https://leventestudio.app/reports/lighthouse.html';
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
  console.log('[lh-diag-function]', name);
}

function extractBalancedJson(source, start) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  let begun = false;
  let jsonStart = start;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (!begun) {
      if (char !== '{') continue;
      begun = true;
      depth = 1;
      jsonStart = i;
      continue;
    }

    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(jsonStart, i + 1);
    }
  }

  return null;
}

function extractLighthouseJson(html) {
  const markers = [
    'window.__LIGHTHOUSE_JSON__',
    '__LIGHTHOUSE_JSON__',
    '"lighthouseVersion"',
  ];

  for (const marker of markers) {
    const markerIndex = html.indexOf(marker);
    if (markerIndex < 0) continue;

    const searchStart = marker === '"lighthouseVersion"'
      ? Math.max(0, html.lastIndexOf('{', markerIndex))
      : markerIndex + marker.length;

    const jsonText = extractBalancedJson(html, searchStart);
    if (!jsonText) continue;

    try {
      const parsed = JSON.parse(jsonText);
      if (parsed?.audits && parsed?.categories) return parsed;
    } catch {
      // continue
    }
  }

  return null;
}

function failingAuditIds(lhr, categoryId) {
  const refs = lhr.categories?.[categoryId]?.auditRefs ?? [];
  return refs
    .filter((ref) => (ref.weight ?? 0) > 0)
    .map((ref) => lhr.audits?.[ref.id])
    .filter((audit) => {
      if (!audit) return false;
      if (['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)) return false;
      return typeof audit.score === 'number' && audit.score < 1;
    });
}

let response;
let html;

try {
  response = await fetch(target, {
    headers: { accept: 'text/html' },
    signal: AbortSignal.timeout(20_000),
  });
  html = await response.text();
} catch (error) {
  await emit('lhdiag-report-fetch-exception', { message: error instanceof Error ? error.message : String(error) });
  process.exit(0);
}

if (!response.ok) {
  await emit(`lhdiag-report-http-${response.status}`, { status: response.status, preview: html.slice(0, 300) });
  process.exit(0);
}

const lhr = extractLighthouseJson(html);

if (!lhr) {
  await emit('lhdiag-report-json-not-found', {
    bytes: html.length,
    hasWindowMarker: html.includes('window.__LIGHTHOUSE_JSON__'),
    hasGenericMarker: html.includes('__LIGHTHOUSE_JSON__'),
    hasVersionMarker: html.includes('"lighthouseVersion"'),
  });
  process.exit(0);
}

const a11yScore = Math.round((lhr.categories?.accessibility?.score ?? 0) * 100);
const bpScore = Math.round((lhr.categories?.['best-practices']?.score ?? 0) * 100);

await emit(`lhdiag-score-a${a11yScore}-b${bpScore}`, { a11yScore, bpScore });

for (const audit of failingAuditIds(lhr, 'accessibility')) {
  await emit(`lhdiag-a11y-${safeId(audit.id)}`, {
    id: audit.id,
    title: audit.title,
    score: audit.score,
  });
}

for (const audit of failingAuditIds(lhr, 'best-practices')) {
  await emit(`lhdiag-bp-${safeId(audit.id)}`, {
    id: audit.id,
    title: audit.title,
    score: audit.score,
  });
}

console.log('[lh-diag] materialized audit IDs from Lighthouse HTML');
