function safe(value: unknown): string {
  return String(value ?? '').trim().slice(0, 240);
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

    const goal = safe(data.primary_goal);
    const selectedPackage = safe(data.selected_package);
    const sourcePage = safe(data.source_page);
    const entryPage = safe(data.entry_page);
    const campaign = [data.utm_source, data.utm_medium, data.utm_campaign]
      .map(safe)
      .filter(Boolean)
      .join(' / ');

    const message = [
      '🔥 <b>ÚJ LEVENTE STUDIO LEAD</b>',
      '',
      goal ? `<b>Igény:</b> ${goal}` : '',
      selectedPackage ? `<b>Csomag:</b> ${selectedPackage}` : '',
      sourcePage ? `<b>Forrás:</b> ${sourcePage}` : '',
      entryPage && entryPage !== sourcePage ? `<b>Belépőoldal:</b> ${entryPage}` : '',
      campaign ? `<b>Kampány:</b> ${campaign}` : '',
      '',
      'A kapcsolati adatok a Netlify Formsban vannak.',
    ].filter(Boolean).join('\n');

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      console.error(`Telegram notification failed: ${response.status}`);
    }
  },
};
