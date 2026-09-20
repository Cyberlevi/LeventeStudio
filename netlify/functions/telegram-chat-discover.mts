export default async () => {
  const token = Netlify.env.get('TELEGRAM_BOT_TOKEN');
  if (!token) {
    return Response.json({ ok: false, error: 'telegram_not_configured' }, { status: 503 });
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  if (!response.ok) {
    return Response.json({ ok: false, error: 'telegram_api_failed' }, { status: 502 });
  }

  const data = await response.json() as { ok?: boolean; result?: Array<any> };
  const updates = Array.isArray(data.result) ? data.result : [];
  const latest = [...updates].reverse().find(update => update?.message?.chat?.id);

  if (!latest) {
    return Response.json({ ok: false, error: 'no_chat_found' }, { status: 404 });
  }

  const chat = latest.message.chat;
  return Response.json({
    ok: true,
    chat_id: String(chat.id),
    chat_type: chat.type || null,
    chat_name: [chat.first_name, chat.last_name].filter(Boolean).join(' ') || chat.title || null,
  });
};

export const config = {
  path: '/api/telegram-chat-discover',
};
