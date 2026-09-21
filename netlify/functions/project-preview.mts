function getProjectUrl(project: string): string | null {
  switch (project) {
    case 'klimatisztak':
      return 'https://klimatisztak.hu/';
    case 'klima18ker':
      return 'https://klima18ker.hu/';
    case 'furatmester':
      return 'https://lyukfurasbudapest.hu/';
    case 'bundavarazs':
      return 'https://bundavarazskutyakozmetika.hu/';
    default:
      return null;
  }
}

function getViewport(device: string): { width: number; height: number } | null {
  if (device === 'tablet') return { width: 834, height: 1194 };
  if (device === 'mobile') return { width: 390, height: 844 };
  return null;
}

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

export default async (request: Request) => {
  if (request.method !== 'GET') {
    return jsonError(405, 'Method not allowed');
  }

  const url = new URL(request.url);
  const project = url.searchParams.get('project') || '';
  const device = url.searchParams.get('device') || '';
  const projectUrl = getProjectUrl(project);
  const viewport = getViewport(device);

  if (!projectUrl || !viewport) {
    return jsonError(400, 'Unknown project or device');
  }

  const upstream = new URL('https://pageshot.site/v1/screenshot');
  upstream.searchParams.set('url', projectUrl);
  upstream.searchParams.set('width', String(viewport.width));
  upstream.searchParams.set('height', String(viewport.height));
  upstream.searchParams.set('format', 'webp');
  upstream.searchParams.set('full_page', 'false');
  upstream.searchParams.set('hide_banners', 'true');
  upstream.searchParams.set('block_ads', 'true');

  try {
    const response = await fetch(upstream, {
      headers: {
        'user-agent': 'LeventeStudio/1.0 project-preview-proxy',
        accept: 'image/webp,image/*;q=0.8',
      },
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok || !response.body) {
      return jsonError(502, 'Project preview is temporarily unavailable');
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return jsonError(502, 'Unexpected project preview response');
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
        'netlify-cdn-cache-control': 'public, durable, s-maxage=2592000, stale-while-revalidate=604800',
        'x-content-type-options': 'nosniff',
        'x-project-preview': `${project}/${device}`,
      },
    });
  } catch {
    return jsonError(504, 'Project preview timed out');
  }
};

export const config = {
  path: '/_project-preview',
};
