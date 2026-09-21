import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceUrl = 'https://deploy-preview-63--leventestudio.netlify.app/lh-diagnostic.txt';
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
  console.log('[lhcap]', name);
}

let response;
let text;

try {
  response = await fetch(sourceUrl, {
    headers: { accept: 'application/json,text/plain' },
    signal: AbortSignal.timeout(20_000),
  });
  text = await response.text();
} catch (error) {
  await emit('lhcap-fetch-exception', {
    message: error instanceof Error ? error.message : String(error),
  });
  process.exit(0);
}

if (!response.ok) {
  await emit(`lhcap-http-${response.status}`, {
    status: response.status,
    preview: text.slice(0, 300),
  });
  process.exit(0);
}

let data;
try {
  data = JSON.parse(text);
} catch (error) {
  await emit('lhcap-json-parse-failed', {
    message: error instanceof Error ? error.message : String(error),
    preview: text.slice(0, 300),
  });
  process.exit(0);
}

if (data?.ok === false) {
  const stage = safeId(data?.stage || 'unknown-stage', 48);
  await emit(`lhcap-error-${stage}`, {
    ok: data?.ok,
    stage: data?.stage,
    error: data?.error,
    reportPath: data?.reportPath,
    publishDir: data?.publishDir,
    markers: data?.markers,
    bytes: data?.bytes,
  });

  if (data?.error) {
    await emit(`lhcap-error-msg-${safeId(data.error, 80)}`, { error: data.error });
  }

  if (data?.markers) {
    await emit(`lhcap-markers-w${data.markers.windowMarker ? 1 : 0}-g${data.markers.genericMarker ? 1 : 0}-v${data.markers.versionMarker ? 1 : 0}`, data.markers);
  }

  process.exit(0);
}

const a = Math.round((data?.scores?.accessibility ?? 0) * 100);
const b = Math.round((data?.scores?.bestPractices ?? 0) * 100);

await emit(`lhcap-score-a${a}-b${b}`, { scores: data?.scores, ok: data?.ok });

for (const audit of data?.accessibility ?? []) {
  const auditId = safeId(audit?.id);
  await emit(`lhcap-a11y-${auditId}`, {
    id: audit?.id,
    title: audit?.title,
    score: audit?.score,
    displayValue: audit?.displayValue,
  });

  for (let i = 0; i < Math.min(4, audit?.items?.length ?? 0); i += 1) {
    const item = audit.items[i] ?? {};
    const selector = safeId(item?.selector || item?.nodeLabel || item?.url || item?.source || 'item', 44);
    await emit(`lhcap-a11y-${auditId}-i${i+1}-${selector}`, {
      audit: audit?.id,
      item,
    });
  }
}

for (const audit of data?.bestPractices ?? []) {
  const auditId = safeId(audit?.id);
  await emit(`lhcap-bp-${auditId}`, {
    id: audit?.id,
    title: audit?.title,
    score: audit?.score,
    displayValue: audit?.displayValue,
  });

  for (let i = 0; i < Math.min(4, audit?.items?.length ?? 0); i += 1) {
    const item = audit.items[i] ?? {};
    const selector = safeId(item?.selector || item?.nodeLabel || item?.url || item?.source || 'item', 44);
    await emit(`lhcap-bp-${auditId}-i${i+1}-${selector}`, {
      audit: audit?.id,
      item,
    });
  }
}

console.log('[lhcap] captured Lighthouse diagnostics materialized');
