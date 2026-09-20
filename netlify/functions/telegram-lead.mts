function safe(value: unknown, max = 1200): string {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value: unknown, max = 1200): string {
  return safe(value, max)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value: unknown, max = 1200): string {
  const text = escapeHtml(value, max);
  return text ? `<b>${label}:</b> ${text}` : '';
}

async function sendTelegram(token: string, chatId: string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    console.error(`Telegram notification failed: ${response.status}`);
  }
}

export default {
  async formSubmitted(event: { data: Record<string, string> }) {
    const token = Netlify.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Netlify.env.get('TELEGRAM_CHAT_ID');

    if (!token || !chatId) {
      console.error('Telegram lead notification is not configured.');
      return;
    }

    const data = event.data ?? {};
    if (safe(data['form-name']) && safe(data['form-name']) !== 'system-diagnostic') return;

    const receivedAt = new Intl.DateTimeFormat('hu-HU', {
      timeZone: 'Europe/Budapest',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    const mainMessage = [
      '🔥 <b>ÚJ LEVENTE STUDIO AJÁNLATKÉRÉS</b>',
      `🕒 <b>Érkezett:</b> ${escapeHtml(receivedAt)}`,
      '',
      '👤 <b>KAPCSOLAT</b>',
      row('Név', data.name),
      row('E-mail', data.email),
      row('Vállalkozás', data.business_type),
      row('Weboldal', data.website),
      '',
      '🎯 <b>IGÉNY</b>',
      row('Mit szeretne', data.primary_goal),
      row('Ajánlott rendszer', data.recommended_system),
      row('Választott csomag', data.selected_package),
      row('Referencia', data.reference_project),
      '',
      '📍 <b>FORRÁS / MARKETING</b>',
      row('Forrásoldal', data.source_page),
      row('Belépőoldal', data.entry_page),
      row('UTM source', data.utm_source),
      row('UTM medium', data.utm_medium),
      row('UTM campaign', data.utm_campaign),
      row('UTM term', data.utm_term),
      row('UTM content', data.utm_content),
      row('GCLID', data.gclid),
      '',
      '✅ <b>Hozzájárulás:</b> ' + (safe(data.privacy_acknowledged) ? 'igen' : 'nincs jelölve'),
    ].filter(Boolean).join('\n');

    await sendTelegram(token, chatId, mainMessage);

    const note = escapeHtml(data.note, 3000);
    if (note) {
      const noteMessage = [
        '📝 <b>MEGJEGYZÉS / ELKÉPZELÉS</b>',
        '',
        note,
      ].join('\n');
      await sendTelegram(token, chatId, noteMessage);
    }
  },
};
