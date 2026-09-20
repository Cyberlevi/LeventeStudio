import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = join(process.cwd(), 'public', 'projects', 'responsive');

const projects = [
  {
    id: 'klimatisztak',
    url: 'https://klimatisztak.hu/',
    fallback: 'https://d33wubrfki0l68.cloudfront.net/6aa7727ca06f6a4ae42ef0e7/screenshot_2026-09-14-04-05-37-0000.webp',
  },
  {
    id: 'klima18ker',
    url: 'https://klima18ker.hu/',
    fallback: 'https://d33wubrfki0l68.cloudfront.net/6aa805a1031c990008cfc983/screenshot_2026-09-14-14-34-00-0000.webp',
  },
  {
    id: 'furatmester',
    url: 'https://lyukfurasbudapest.hu/',
    fallback: 'https://d33wubrfki0l68.cloudfront.net/6aaffa8ab15dfa0008c4789a/screenshot_2026-09-20-15-24-19-0000.webp',
  },
  {
    id: 'bundavarazs',
    url: 'https://bundavarazskutyakozmetika.hu/',
    fallback: 'https://d33wubrfki0l68.cloudfront.net/6aafdea445a27fc81c03df56/screenshot_2026-09-20-13-25-31-0000.webp',
  },
];

const viewports = [
  { name: 'tablet', width: 834, height: 1194 },
  { name: 'mobile', width: 390, height: 844 },
];

async function fetchImage(url, timeoutMs = 25_000) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'LeventeStudio/1.0 portfolio-preview' },
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) {
    throw new Error(`Unexpected content-type: ${type || 'unknown'}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1_000) {
    throw new Error(`Screenshot response too small: ${buffer.length} bytes`);
  }

  return buffer;
}

async function capture(project, viewport) {
  const endpoint = new URL('https://pageshot.site/v1/screenshot');
  endpoint.searchParams.set('url', project.url);
  endpoint.searchParams.set('width', String(viewport.width));
  endpoint.searchParams.set('height', String(viewport.height));
  endpoint.searchParams.set('format', 'webp');
  endpoint.searchParams.set('full_page', 'false');
  endpoint.searchParams.set('hide_banners', 'true');
  endpoint.searchParams.set('block_ads', 'true');

  const outputPath = join(outputDir, `${project.id}-${viewport.name}.webp`);

  try {
    const image = await fetchImage(endpoint.toString());
    await writeFile(outputPath, image);
    console.log(
      `[responsive-showcase] ${project.id} ${viewport.name}: ${viewport.width}x${viewport.height} (${image.length} bytes)`,
    );
  } catch (error) {
    console.warn(
      `[responsive-showcase] ${project.id} ${viewport.name} capture failed; using production screenshot fallback: ${error.message}`,
    );
    const fallback = await fetchImage(project.fallback);
    await writeFile(outputPath, fallback);
  }
}

await mkdir(outputDir, { recursive: true });

for (const project of projects) {
  await Promise.all(viewports.map((viewport) => capture(project, viewport)));
}

console.log('[responsive-showcase] responsive screenshots ready');
