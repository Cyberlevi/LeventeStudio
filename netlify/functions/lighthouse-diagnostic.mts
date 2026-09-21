function extractBalancedJson(source: string, start: number): string | null {
  let depth = 0;
  let inString = false;
  let escaped = false;
  let begun = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (!begun) {
      if (char !== '{') continue;
      begun = true;
      depth = 1;
      start = i;
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return null;
}

function extractLighthouseJson(html: string): Record<string, any> | null {
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

function compactNode(item: any) {
  if (!item || typeof item !== 'object') return item;
  const node = item.node;
  return {
    url: item.url,
    source: item.source,
    description: item.description,
    failureReason: item.failureReason,
    warning: item.warning,
    node: node
      ? {
          selector: node.selector,
          snippet: node.snippet,
          nodeLabel: node.nodeLabel,
          explanation: node.explanation,
        }
      : undefined,
  };
}

function failingAudits(lhr: any, categoryId: string) {
  const refs = lhr.categories?.[categoryId]?.auditRefs ?? [];

  return refs
    .filter((ref: any) => (ref.weight ?? 0) > 0)
    .map((ref: any) => lhr.audits?.[ref.id])
    .filter((audit: any) => {
      if (!audit) return false;
      if (['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)) return false;
      return typeof audit.score === 'number' && audit.score < 1;
    })
    .map((audit: any) => ({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      scoreDisplayMode: audit.scoreDisplayMode,
      displayValue: audit.displayValue,
      description: audit.description,
      detailsType: audit.details?.type,
      items: Array.isArray(audit.details?.items)
        ? audit.details.items.slice(0, 12).map(compactNode)
        : [],
    }));
}

export default async () => {
  const reportUrl = 'https://leventestudio.app/reports/lighthouse.html';

  try {
    const response = await fetch(reportUrl, {
      headers: { accept: 'text/html' },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, stage: 'fetch', status: response.status },
        { status: 502, headers: { 'cache-control': 'no-store' } },
      );
    }

    const html = await response.text();
    const lhr = extractLighthouseJson(html);

    if (!lhr) {
      return Response.json(
        {
          ok: false,
          stage: 'parse',
          bytes: html.length,
          markers: {
            window: html.includes('window.__LIGHTHOUSE_JSON__'),
            generic: html.includes('__LIGHTHOUSE_JSON__'),
            version: html.includes('"lighthouseVersion"'),
          },
        },
        { status: 500, headers: { 'cache-control': 'no-store' } },
      );
    }

    return Response.json(
      {
        ok: true,
        fetchTime: lhr.fetchTime,
        lighthouseVersion: lhr.lighthouseVersion,
        scores: {
          accessibility: lhr.categories?.accessibility?.score,
          bestPractices: lhr.categories?.['best-practices']?.score,
        },
        accessibility: failingAudits(lhr, 'accessibility'),
        bestPractices: failingAudits(lhr, 'best-practices'),
      },
      {
        headers: {
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        },
      },
    );
  } catch (error) {
    return Response.json(
      { ok: false, stage: 'exception', message: error instanceof Error ? error.message : 'unknown' },
      { status: 500, headers: { 'cache-control': 'no-store' } },
    );
  }
};

export const config = {
  path: '/_lh-diagnostic',
};
