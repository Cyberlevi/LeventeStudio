function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function line(label: string, value: unknown): string {
  const text = String(value ?? '').trim();
  return text ? `<b>${escapeHtml(label)}:</b> ${escapeHtml(text)}` : '';
}

export default async (req: Request) => {
  if (req.method === 'GET') {
    return Response.json({
      ok: true,
      configured: Boolean(Netlify.env.get('TELEGRAM_BOT_TOKEN') && Netlify.env.get('TELEGRAM_CHAT_ID')),
    });
  }

  if (req.method !== 'POST') {
    return Response.json({ ok: false, error: 'method_not_allowed' }, { status: 405 });
  }

  const secFetchSite = req.headers.get('sec-fetch-site');
  if (secFetchSite && secFetchSite !== 'same-origin' && secFetchSite !== 'same-site') {
    return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const token = Netlify.env.get('TELEGRAM_BOT_TOKEN');
  const chatId = Netlify.env.get('TELEGRAM_CHAT_ID');
  if (!token || !chatId) {
    console.error('Telegram lead notification is not configured.');
    return Response.json({ ok: false, error: 'telegram_not_configured' }, { status: 503 });
  }

  try {
    const data = await req.json() as Record<string, unknown>;
    const name = String(data.name ?? '').trim();
    const email = String(data.email ?? '').trim();

    if (name.length < 2 || !email.includes('@')) {
      return Response.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
    }

    const packageValue = String(data.selected_package ?? '').trim();
    const reference = String(data.reference_project ?? '').trim();
    const sourcePage = String(data.source_page ?? '').trim();
    const entryPage = String(data.entry_page ?? '').trim();
    const campaign = [data.utm_source, data.utm_medium, data.utm_campaign]
      .map(value => String(value ?? '').trim())
      .filter(Boolean)
      .join(' / ');

    const message = [
      '🔥 <b>ÚJ LEVENTE STUDIO AJÁNLATKÉRÉS</b>',
      '',
      line('Név', name),
      line('E-mail', email),
      line('Vállalkozás', data.business_type),
      line('Weboldal', data.website),
      line('Igény', data.primary_goal),
      packageValue ? line('Csomag', packageValue) : '',
      reference ? line('Referencia', reference) : '',
      '',
      line('Forrásoldal', sourcePage),
      entryPage && entryPage !== sourcePage ? line('Belépőoldal', entryPage) : '',
      campaign ? line('Kampány', campaign) : '',
      data.gclid ? line('GCLID', data.gclid) : '',
      '',
      data.note ? `<b>Megjegyzés:</b>\n${escapeHtml(data.note)}` : '',
    ].filter(Boolean).join('\n');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text();
      console.error(`Telegram notification failed: ${telegramResponse.status} ${error}`);
      return Response.json({ ok: false, error: 'telegram_failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Telegram lead notification exception:', error);
    return Response.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
};

export const config = {
  path: '/api/telegram-lead',
};
