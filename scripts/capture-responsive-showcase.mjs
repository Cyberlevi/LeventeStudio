import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = join(process.cwd(), 'public', 'projects', 'responsive');

const projects = [
  { id: 'klimatisztak', url: 'https://klimatisztak.hu/' },
  { id: 'klima18ker', url: 'https://klima18ker.hu/' },
  { id: 'furatmester', url: 'https://lyukfurasbudapest.hu/' },
  { id: 'bundavarazs', url: 'https://bundavarazskutyakozmetika.hu/' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 930 },
  { name: 'tablet', width: 834, height: 1194 },
  { name: 'mobile', width: 390, height: 844 },
];

const ATTEMPTS = 2;
const RETRY_DELAY_MS = 1_000;

function readWebPDimensions(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    throw new Error('Screenshot response is not a valid WebP container');
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === 'VP8X' && chunkSize >= 10 && dataOffset + 10 <= buffer.length) {
      const width = 1 + buffer.readUIntLE(dataOffset + 4, 3);
      const height = 1 + buffer.readUIntLE(dataOffset + 7, 3);
      return { width, height };
    }

    if (chunkType === 'VP8 ' && chunkSize >= 10 && dataOffset + 10 <= buffer.length) {
      const syncCode =
        buffer[dataOffset + 3] === 0x9d &&
        buffer[dataOffset + 4] === 0x01 &&
        buffer[dataOffset + 5] === 0x2a;

      if (syncCode) {
        const width = buffer.readUInt16LE(dataOffset + 6) & 0x3fff;
        const height = buffer.readUInt16LE(dataOffset + 8) & 0x3fff;
        return { width, height };
      }
    }

    if (chunkType === 'VP8L' && chunkSize >= 5 && dataOffset + 5 <= buffer.length) {
      if (buffer[dataOffset] === 0x2f) {
        const bits = buffer.readUInt32LE(dataOffset + 1);
        const width = (bits & 0x3fff) + 1;
        const height = ((bits >> 14) & 0x3fff) + 1;
        return { width, height };
      }
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  throw new Error('Unable to read WebP dimensions');
}

async function fetchImage(url, timeoutMs = 12_000) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'LeventeStudio/1.0 responsive-portfolio-capture' },
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
  if (buffer.length < 5_000) {
    throw new Error(`Screenshot response too small: ${buffer.length} bytes`);
  }

  return buffer;
}

function assertViewport(image, viewport) {
  const dimensions = readWebPDimensions(image);
  const expectedRatio = viewport.width / viewport.height;
  const actualRatio = dimensions.width / dimensions.height;
  const ratioDelta = Math.abs(actualRatio - expectedRatio);

  if (ratioDelta > 0.025) {
    throw new Error(
      `Wrong screenshot aspect ratio: expected ${viewport.width}x${viewport.height} (${expectedRatio.toFixed(3)}), got ${dimensions.width}x${dimensions.height} (${actualRatio.toFixed(3)})`,
    );
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  let lastError;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const image = await fetchImage(endpoint.toString());
      assertViewport(image, viewport);
      await writeFile(outputPath, image);

      console.log(
        `[responsive-showcase] ${project.id} ${viewport.name}: ${viewport.width}x${viewport.height} (${image.length} bytes)`,
      );
      return {
        ok: true,
        project: project.id,
        viewport: viewport.name,
        width: viewport.width,
        height: viewport.height,
        bytes: image.length,
      };
    } catch (error) {
      lastError = error;
      console.warn(
        `[responsive-showcase] ${project.id} ${viewport.name} attempt ${attempt}/${ATTEMPTS} failed: ${error.message}`,
      );

      if (attempt < ATTEMPTS) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  return {
    ok: false,
    project: project.id,
    viewport: viewport.name,
    error: lastError?.message || 'unknown error',
  };
}

async function writeFallback(project, viewport, error) {
  const sourcePath = join(process.cwd(), 'public', 'projects', `showcase-${project.id}.webp`);
  const outputPath = join(outputDir, `${project.id}-${viewport.name}.webp`);
  await copyFile(sourcePath, outputPath);
  console.warn(
    `[responsive-showcase] ${project.id} ${viewport.name}: using local fallback (${error || 'capture unavailable'})`,
  );
}

await mkdir(outputDir, { recursive: true });

for (const project of projects) {
  const results = await Promise.all(viewports.map((viewport) => capture(project, viewport)));
  for (let index = 0; index < results.length; index += 1) {
    const result = results[index];
    if (!result?.ok) {
      await writeFallback(project, viewports[index], result?.error);
    }
  }
}

console.log('[responsive-showcase] desktop, tablet and mobile assets ready');
