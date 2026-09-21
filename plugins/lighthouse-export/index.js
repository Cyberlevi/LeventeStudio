import { readFile } from 'node:fs/promises';
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
    })
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue,
      items: Array.isArray(audit.details?.items)
        ? audit.details.items.slice(0, 8).map((item) => ({
            url: item?.url,
            source: item?.source,
            failureReason: item?.failureReason,
            selector: item?.node?.selector,
            snippet: item?.node?.snippet,
            nodeLabel: item?.node?.nodeLabel,
          }))
        : [],
    }));
}

export const onSuccess = async ({ constants, utils }) => {
  const reportPath = path.join(constants.PUBLISH_DIR, 'reports', 'lighthouse.html');

  let html;
  try {
    html = await readFile(reportPath, 'utf8');
  } catch (error) {
    utils.status.show({
      title: 'Lighthouse export: report missing',
      summary: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  const lhr = extractLighthouseJson(html);
  if (!lhr) {
    utils.status.show({
      title: 'Lighthouse export: parse failed',
      summary: 'The report exists, but embedded Lighthouse JSON was not found.',
    });
    return;
  }

  const payload = {
    fetchTime: lhr.fetchTime,
    lighthouseVersion: lhr.lighthouseVersion,
    scores: {
      performance: lhr.categories?.performance?.score,
      accessibility: lhr.categories?.accessibility?.score,
      bestPractices: lhr.categories?.['best-practices']?.score,
      seo: lhr.categories?.seo?.score,
    },
    accessibility: failingAudits(lhr, 'accessibility'),
    bestPractices: failingAudits(lhr, 'best-practices'),
  };

  const deployUrl = 'https://leventestudio.app';

  const body = new URLSearchParams({
    'form-name': 'lh-diagnostic-export',
    source: 'netlify-lighthouse',
    payload: JSON.stringify(payload),
  });

  try {
    const response = await fetch(`${deployUrl}/lh-diagnostic-form.html`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(15_000),
    });

    utils.status.show({
      title: response.ok ? 'Lighthouse diagnostic exported' : 'Lighthouse export POST failed',
      summary: response.ok
        ? `A11y ${Math.round((payload.scores.accessibility ?? 0) * 100)} · BP ${Math.round((payload.scores.bestPractices ?? 0) * 100)}`
        : `HTTP ${response.status}`,
    });
  } catch (error) {
    utils.status.show({
      title: 'Lighthouse export request failed',
      summary: error instanceof Error ? error.message : String(error),
    });
  }
};
