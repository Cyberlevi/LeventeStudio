import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = path.resolve('assets/showcase-base64');
const outputDir = path.resolve('public/projects');
// KlímaTiszták and Bundavarázs use tracked high-quality WebP assets.\n// Only the remaining legacy showcase assets are materialized from Base64 chunks.\nconst projects = ['klima18ker', 'furatmester'];

await mkdir(outputDir, { recursive: true });

for (const project of projects) {
  const prefix = `${project}.`;
  const chunks = (await readdir(sourceDir))
    .filter((name) => name.startsWith(prefix) && name.endsWith('.txt'))
    .sort((a, b) => {
      const aIndex = Number(a.split('.')[1]);
      const bIndex = Number(b.split('.')[1]);
      return aIndex - bIndex;
    });

  if (chunks.length === 0) {
    throw new Error(`Missing showcase asset chunks for ${project}`);
  }

  const encodedParts = await Promise.all(
    chunks.map((name) => readFile(path.join(sourceDir, name), 'utf8')),
  );
  const encoded = encodedParts.join('').replace(/\s+/g, '');
  const image = Buffer.from(encoded, 'base64');

  if (image.length < 10_000) {
    throw new Error(`Decoded showcase asset for ${project} is unexpectedly small`);
  }

  await writeFile(path.join(outputDir, `showcase-${project}.webp`), image);
  console.log(`showcase asset: ${project} (${Math.round(image.length / 1024)} KB)`);
}
