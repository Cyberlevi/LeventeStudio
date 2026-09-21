import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const FORM_URL = 'https://leventestudio.app/lh-diagnostic-form.html';

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

async function postDiagnostic(payload) {
  const body = new URLSearchParams({
    'form-name': 'lh-diagnostic-export',
    source: 'netlify-lighthouse',
    payload: JSON.stringify(payload),
  });

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
    signal: AbortSignal.timeout(15_000),
  });

  return response.status;
}

async function findCandidateReports(root, maxDepth = 5) {
  const matches = [];

  async function walk(dir, depth) {
    if (depth > maxDepth || matches.length >= 40) return;

    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (matches.length >= 40) break;
      if (entry.name === 'node_modules' || entry.name === '.git') continue;

      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, depth + 1);
        continue;
      }

      const lower = entry.name.toLowerCase();
      if (
        lower.includes('lighthouse') ||
        lower.includes('report') ||
        lower.endsWith('.html')
      ) {
        let size = null;
        try {
          size = (await stat(full)).size;
        } catch {
          // ignore
        }
        matches.push({ path: full, size });
      }
    }
  }

  await walk(root, 0);
  return matches;
}

export const onSuccess = async ({ constants, utils }) => {
  const cwd = process.cwd();
  const preferred = [
    path.join(constants.PUBLISH_DIR, 'reports', 'lighthouse.html'),
    path.join(cwd, 'dist', 'reports', 'lighthouse.html'),
    path.join(cwd, 'reports', 'lighthouse.html'),
  ];

  let reportPath = null;
  let html = null;
  let preferredErrors = [];

  for (const candidate of preferred) {
    try {
      html = await readFile(candidate, 'utf8');
      reportPath = candidate;
      break;
    } catch (error) {
      preferredErrors.push({
        path: candidate,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  if (!html) {
    const candidates = await findCandidateReports(cwd, 5);
    await postDiagnostic({
      status: 'report-missing',
      cwd,
      publishDir: constants.PUBLISH_DIR,
      preferredErrors,
      candidates,
    });

    utils.status.show({
      title: 'Lighthouse export: report missing',
      summary: 'Diagnostic status submitted to lh-diagnostic-export.',
    });
    return;
  }

  const lhr = extractLighthouseJson(html);
  if (!lhr) {
    await postDiagnostic({
      status: 'parse-failed',
      reportPath,
      bytes: html.length,
      markers: {
        windowMarker: html.includes('window.__LIGHTHOUSE_JSON__'),
        genericMarker: html.includes('__LIGHTHOUSE_JSON__'),
        versionMarker: html.includes('"lighthouseVersion"'),
      },
    });

    utils.status.show({
      title: 'Lighthouse export: parse failed',
      summary: 'Diagnostic status submitted to lh-diagnostic-export.',
    });
    return;
  }

  const payload = {
    status: 'ok',
    reportPath,
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

  const status = await postDiagnostic(payload);

  utils.status.show({
    title: status >= 200 && status < 300
      ? 'Lighthouse diagnostic exported'
      : 'Lighthouse diagnostic POST returned non-success',
    summary: `HTTP ${status} · A11y ${Math.round((payload.scores.accessibility ?? 0) * 100)} · BP ${Math.round((payload.scores.bestPractices ?? 0) * 100)}`,
  });
};
