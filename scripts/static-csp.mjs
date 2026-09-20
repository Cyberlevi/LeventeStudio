import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HASH_PLACEHOLDER = '__BUILD_SCRIPT_HASHES__';

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files.sort();
}

/** Authorize the exact inline scripts emitted by the final static build. */
export default function staticCsp() {
  return {
    name: 'levente-studio-static-csp',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outputDirectory = fileURLToPath(dir);
        const headersPath = join(outputDirectory, '_headers');
        const headers = await readFile(headersPath, 'utf8');
        if (headers.split(HASH_PLACEHOLDER).length !== 2) {
          throw new Error('The CSP header must contain exactly one build hash placeholder.');
        }

        const pages = await htmlFiles(outputDirectory);
        if (pages.length === 0) throw new Error('Cannot generate CSP without built HTML pages.');

        const hashes = new Set();
        for (const page of pages) {
          const html = await readFile(page, 'utf8');
          // These are trusted Astro-generated documents. Match script raw text
          // without trimming or decoding it: CSP hashes include all whitespace.
          for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
            if (/\bsrc\s*=/i.test(match[1]) || !match[2]) continue;
            hashes.add(`'sha256-${createHash('sha256').update(match[2], 'utf8').digest('base64')}'`);
          }
        }
        if (hashes.size === 0) throw new Error('Expected Astro inline scripts to authorize.');

        const rendered = headers.replace(HASH_PLACEHOLDER, [...hashes].sort().join(' '));
        const policy = rendered.split('\n').find(line => line.trim().startsWith('Content-Security-Policy:'));
        if (!policy || Buffer.byteLength(policy, 'utf8') > 7500) {
          throw new Error('Generated CSP header exceeds the static-site header budget.');
        }
        await writeFile(headersPath, rendered);
        logger.info(`CSP: ${hashes.size} script hashes verified across ${pages.length} HTML pages.`);
      },
    },
  };
}
