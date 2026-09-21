import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const target = 'https://leventestudio.app/diagnosztika-lighthouse/';
const outDir = path.resolve('netlify/functions');

const response = await fetch(target, {
  headers: { accept: 'text/html' },
  signal: AbortSignal.timeout(20_000),
});

const html = await response.text();
const match = html.match(/<pre>([\s\S]*?)<\/pre>/i);

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

if (!response.ok || !match) {
  await emit('lhdiag-fetch-or-parse-failed', {
    status: response.status,
    hasPre: Boolean(match),
    preview: html.slice(0, 300),
  });
  process.exit(0);
}

const decoded = match[1]
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

let parsed;
try {
  parsed = JSON.parse(decoded);
} catch (error) {
  await emit('lhdiag-json-parse-failed', { message: error instanceof Error ? error.message : String(error) });
  process.exit(0);
}

await emit(`lhdiag-score-a${Math.round((parsed?.scores?.accessibility ?? 0) * 100)}-b${Math.round((parsed?.scores?.bestPractices ?? 0) * 100)}`, {
  scores: parsed?.scores,
});

for (const audit of parsed?.accessibility ?? []) {
  await emit(`lhdiag-a11y-${safeId(audit.id)}`, {
    id: audit.id,
    title: audit.title,
    score: audit.score,
    items: (audit.items ?? []).slice(0, 5),
  });
}

for (const audit of parsed?.bestPractices ?? []) {
  await emit(`lhdiag-bp-${safeId(audit.id)}`, {
    id: audit.id,
    title: audit.title,
    score: audit.score,
    items: (audit.items ?? []).slice(0, 5),
  });
}

console.log('[lh-diag] materialized audit functions');
