import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceUrl = 'https://deploy-preview-63--leventestudio.netlify.app/reports/lighthouse.html';
const outDir = path.resolve('netlify/functions');

await mkdir(outDir, { recursive: true });

function safeId(value, max = 64) {
  return String(value || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max) || 'unknown';
}

async function emit(name, payload) {
  const source = `export default async () => Response.json(${JSON.stringify(payload)});\n`;
  await writeFile(path.join(outDir, `${name}.mts`), source);
  console.log('[lhreport]', name);
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
  // Lighthouse standalone reports embed the LHR exactly like:
  // window.__LIGHTHOUSE_JSON__ = {...};</script>
  const startMarker = '__LIGHTHOUSE_JSON__ = ';
  const markerIndex = html.indexOf(startMarker);

  if (markerIndex >= 0) {
    const jsonStart = markerIndex + startMarker.length;
    const jsonEnd = html.indexOf(';</script>', jsonStart);

    if (jsonEnd > jsonStart) {
      const jsonText = html.slice(jsonStart, jsonEnd).trim();

      try {
        const parsed = JSON.parse(jsonText);
        if (parsed?.audits && parsed?.categories) return parsed;
      } catch {
        // Fall through to balanced JSON fallback below.
      }
    }
  }

  const fallbackMarkers = [
    'window.__LIGHTHOUSE_JSON__',
    '__LIGHTHOUSE_JSON__',
  ];

  for (const marker of fallbackMarkers) {
    const fallbackIndex = html.indexOf(marker);
    if (fallbackIndex < 0) continue;

    const jsonText = extractBalancedJson(html, fallbackIndex + marker.length);
    if (!jsonText) continue;

    try {
      const parsed = JSON.parse(jsonText);
      if (parsed?.audits && parsed?.categories) return parsed;
    } catch {
      // Try the next marker.
    }
  }

  return null;
}

function failingAudits(lhr, categoryId) {
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
  response = await fetch(sourceUrl, {
    headers: { accept: 'text/html' },
    signal: AbortSignal.timeout(20_000),
  });
  html = await response.text();
} catch (error) {
  await emit('lhreport-fetch-exception', {
    message: error instanceof Error ? error.message : String(error),
  });
  process.exit(0);
}

if (!response.ok) {
  await emit(`lhreport-http-${response.status}`, {
    status: response.status,
    preview: html.slice(0, 300),
  });
  process.exit(0);
}

const lhr = extractLighthouseJson(html);

if (!lhr) {
  const windowMarker = html.includes('window.__LIGHTHOUSE_JSON__');
  const genericMarker = html.includes('__LIGHTHOUSE_JSON__');
  const versionMarker = html.includes('"lighthouseVersion"');
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = safeId(titleMatch?.[1] || 'no-title', 44);
  await emit(
    `lhreport-json-not-found-w${windowMarker ? 1 : 0}-g${genericMarker ? 1 : 0}-v${versionMarker ? 1 : 0}-${title}`,
    {
      bytes: html.length,
      windowMarker,
      genericMarker,
      versionMarker,
      title: titleMatch?.[1],
      preview: html.slice(0, 500),
    },
  );
  process.exit(0);
}

const a11yScore = Math.round((lhr.categories?.accessibility?.score ?? 0) * 100);
const bpScore = Math.round((lhr.categories?.['best-practices']?.score ?? 0) * 100);

await emit(`lhreport-score-a${a11yScore}-b${bpScore}`, {
  a11yScore,
  bpScore,
  lighthouseVersion: lhr.lighthouseVersion,
  fetchTime: lhr.fetchTime,
});

for (const audit of failingAudits(lhr, 'accessibility')) {
  const auditId = safeId(audit?.id);
  await emit(`lhreport-a11y-${auditId}`, {
    id: audit?.id,
    title: audit?.title,
    score: audit?.score,
    displayValue: audit?.displayValue,
  });

  for (let i = 0; i < Math.min(4, audit?.details?.items?.length ?? 0); i += 1) {
    const item = audit.details.items[i] ?? {};
    const selector = safeId(
      item?.node?.selector ||
      item?.node?.nodeLabel ||
      item?.url ||
      item?.source ||
      item?.failureReason ||
      'item',
      44,
    );
    await emit(`lhreport-a11y-${auditId}-i${i+1}-${selector}`, {
      audit: audit?.id,
      selector: item?.node?.selector,
      snippet: item?.node?.snippet,
      nodeLabel: item?.node?.nodeLabel,
      explanation: item?.node?.explanation,
      url: item?.url,
      source: item?.source,
      failureReason: item?.failureReason,
    });
  }
}

for (const audit of failingAudits(lhr, 'best-practices')) {
  const auditId = safeId(audit?.id);
  await emit(`lhreport-bp-${auditId}`, {
    id: audit?.id,
    title: audit?.title,
    score: audit?.score,
    displayValue: audit?.displayValue,
  });

  for (let i = 0; i < Math.min(4, audit?.details?.items?.length ?? 0); i += 1) {
    const item = audit.details.items[i] ?? {};
    const selector = safeId(
      item?.node?.selector ||
      item?.node?.nodeLabel ||
      item?.url ||
      item?.source ||
      item?.failureReason ||
      'item',
      44,
    );
    await emit(`lhreport-bp-${auditId}-i${i+1}-${selector}`, {
      audit: audit?.id,
      selector: item?.node?.selector,
      snippet: item?.node?.snippet,
      nodeLabel: item?.node?.nodeLabel,
      explanation: item?.node?.explanation,
      url: item?.url,
      source: item?.source,
      failureReason: item?.failureReason,
    });
  }
}

console.log('[lhreport] Lighthouse report materialized');
