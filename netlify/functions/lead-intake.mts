function safe(value: unknown, max = 1200): string {
  return String(value ?? '').trim().slice(0, max);
}

const allowedGoals = new Set([
  'audit',
  'presence',
  'rebuild',
  'more-leads',
  'measurement',
  'automation',
  'maintenance',
  'unknown',
]);

const allowedOrigins = new Set([
  'https://leventestudio.app',
  'https://www.leventestudio.app',
  'https://leventestudio.netlify.app',
]);

function isAllowedOrigin(origin: string): boolean {
  if (allowedOrigins.has(origin)) return true;
  if (/^https:\/\/deploy-preview-\d+--leventestudio\.netlify\.app$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+--leventestudio\.netlify\.app$/.test(origin)) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function headersFor(origin: string): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
  };
  if (isAllowedOrigin(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function json(origin: string, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: headersFor(origin) });
}

function isValidLead(data: URLSearchParams): boolean {
  const email = safe(data.get('email'), 254);
  const required =
    Boolean(safe(data.get('name'), 120)) &&
    Boolean(email) &&
    Boolean(safe(data.get('business_type'), 200)) &&
    allowedGoals.has(safe(data.get('primary_goal'), 80)) &&
    safe(data.get('privacy_acknowledged'), 16) === 'yes';

  return required &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    !safe(data.get('bot-field'), 32);
}

export default async (req: Request) => {
  const origin = req.headers.get('origin') ?? '';

  if (req.method === 'OPTIONS') {
    if (!isAllowedOrigin(origin)) return new Response(null, { status: 403 });
    return new Response(null, {
      status: 204,
      headers: {
        ...headersFor(origin),
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (req.method !== 'POST') return json(origin, { ok: false, error: 'method_not_allowed' }, 405);
  if (!isAllowedOrigin(origin)) return json(origin, { ok: false, error: 'origin_not_allowed' }, 403);

  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/x-www-form-urlencoded')) {
    return json(origin, { ok: false, error: 'unsupported_content_type' }, 415);
  }

  let bodyText = '';
  try {
    bodyText = await req.text();
  } catch {
    return json(origin, { ok: false, error: 'invalid_body' }, 400);
  }

  if (!bodyText || bodyText.length > 24_000) {
    return json(origin, { ok: false, error: 'invalid_body' }, 400);
  }

  const data = new URLSearchParams(bodyText);
  if (safe(data.get('form-name'), 80) !== 'system-diagnostic') {
    return json(origin, { ok: false, error: 'invalid_form' }, 400);
  }
  if (!isValidLead(data)) {
    return json(origin, { ok: false, error: 'invalid_lead' }, 422);
  }

  try {
    const upstream = await fetch('https://leventestudio.netlify.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'LeventeStudioLeadBridge/1.0',
      },
      body: data.toString(),
      redirect: 'follow',
    });

    if (!upstream.ok) {
      console.error(`Netlify Forms upstream failed: ${upstream.status}`);
      return json(origin, { ok: false, error: 'forms_upstream_failed' }, 502);
    }

    return json(origin, { ok: true, accepted: true }, 202);
  } catch (error) {
    console.error('Netlify Forms upstream request failed.', error);
    return json(origin, { ok: false, error: 'forms_upstream_unreachable' }, 502);
  }
};
