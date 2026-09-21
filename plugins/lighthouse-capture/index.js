import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
      // Try next marker.
    }
  }

  return null;
}


function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function writeDiagnosticPage(publishDir, payload) {
  const page = `<!doctype html>
  <html lang="hu">
    <head>
      <meta charset="utf-8">
      <meta name="robots" content="noindex,nofollow">
      <title>Lighthouse diagnosztika</title>
      <style>
        body{margin:0;padding:32px;background:#0b0d0c;color:#f4f0e8;font-family:Arial,sans-serif}
        h1{font-size:42px;color:#d8ff78;margin:0 0 24px}
        h2{font-size:28px;color:#d8ff78;margin:30px 0 12px}
        .scores{font-size:22px;margin-bottom:28px}
        .audit{border:1px solid #3b433b;padding:16px;margin:12px 0}
        .audit strong{font-size:20px}
        pre{white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.45;color:#d8ddd3}
      </style>
    </head>
    <body>
      <h1>Lighthouse diagnosztika</h1>
      <div class="scores">Performance: ${Math.round((payload?.scores?.performance ?? 0)*100)} · Accessibility: ${Math.round((payload?.scores?.accessibility ?? 0)*100)} · Best Practices: ${Math.round((payload?.scores?.bestPractices ?? 0)*100)} · SEO: ${Math.round((payload?.scores?.seo ?? 0)*100)}</div>
      <h2>Accessibility</h2>
      ${(payload?.accessibility ?? []).map(a => `<div class="audit"><strong>${escapeHtml(a.id)} — ${escapeHtml(a.title)}</strong><pre>${escapeHtml(JSON.stringify(a.items ?? [], null, 2))}</pre></div>`).join('') || '<p>Nincs bukó audit.</p>'}
      <h2>Best Practices</h2>
      ${(payload?.bestPractices ?? []).map(a => `<div class="audit"><strong>${escapeHtml(a.id)} — ${escapeHtml(a.title)}</strong><pre>${escapeHtml(JSON.stringify(a.items ?? [], null, 2))}</pre></div>`).join('') || '<p>Nincs bukó audit.</p>'}
    </body>
  </html>`;

  await writeFile(path.join(publishDir, 'index.html'), page);
}

function compactItem(item) {
  return {
    url: item?.url,
    source: item?.source,
    failureReason: item?.failureReason,
    warning: item?.warning,
    selector: item?.node?.selector,
    snippet: item?.node?.snippet,
    nodeLabel: item?.node?.nodeLabel,
    explanation: item?.node?.explanation,
  };
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
    })
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      scoreDisplayMode: audit.scoreDisplayMode,
      displayValue: audit.displayValue,
      description: audit.description,
      detailsType: audit.details?.type,
      items: Array.isArray(audit.details?.items)
        ? audit.details.items.slice(0, 12).map(compactItem)
        : [],
    }));
}

export const onPostBuild = async ({ constants, utils }) => {
  const reportPath = path.join(constants.PUBLISH_DIR, 'reports', 'lighthouse.html');
  const outputPath = path.join(constants.PUBLISH_DIR, 'lh-diagnostic.txt');

  let html;
  try {
    html = await readFile(reportPath, 'utf8');
  } catch (error) {
    const payload = {
      ok: false,
      stage: 'read-report',
      reportPath,
      publishDir: constants.PUBLISH_DIR,
      error: error instanceof Error ? error.message : String(error),
    };
    await writeFile(outputPath, JSON.stringify(payload, null, 2));
    utils.status.show({
      title: 'Lighthouse capture: report missing',
      summary: 'Diagnostic file written before deploy.',
    });
    return;
  }

  const lhr = extractLighthouseJson(html);
  if (!lhr) {
    const payload = {
      ok: false,
      stage: 'parse-report',
      reportPath,
      bytes: html.length,
      markers: {
        windowMarker: html.includes('window.__LIGHTHOUSE_JSON__'),
        genericMarker: html.includes('__LIGHTHOUSE_JSON__'),
        versionMarker: html.includes('"lighthouseVersion"'),
      },
    };
    await writeFile(outputPath, JSON.stringify(payload, null, 2));
    utils.status.show({
      title: 'Lighthouse capture: parse failed',
      summary: 'Diagnostic file written before deploy.',
    });
    return;
  }

  const payload = {
    ok: true,
    fetchTime: lhr.fetchTime,
    lighthouseVersion: lhr.lighthouseVersion,
    scores: {
      performance: lhr.categories?.performance?.score,
      accessibility: lhr.categories?.accessibility?.score,
      bestPractices: lhr.categories?.['best-practices']?.score,
      seo: lhr.categories?.seo?.score,
      pwa: lhr.categories?.pwa?.score,
    },
    accessibility: failingAudits(lhr, 'accessibility'),
    bestPractices: failingAudits(lhr, 'best-practices'),
  };

  await writeFile(outputPath, JSON.stringify(payload, null, 2));
  await writeDiagnosticPage(constants.PUBLISH_DIR, payload);

  utils.status.show({
    title: 'Lighthouse capture ready',
    summary: `A11y ${Math.round((payload.scores.accessibility ?? 0) * 100)} · BP ${Math.round((payload.scores.bestPractices ?? 0) * 100)}`,
  });
};
