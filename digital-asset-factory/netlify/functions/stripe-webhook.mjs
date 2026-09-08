import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

function verifyStripeSignature(rawBody, signatureHeader, secret){
  if(!rawBody || !signatureHeader || !secret) return false;
  const parts = signatureHeader.split(',');
  const timestampPart = parts.find(p => p.startsWith('t='));
  const signatures = parts.filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  if(!timestampPart || signatures.length === 0) return false;
  const timestamp = Number(timestampPart.slice(2));
  if(!Number.isFinite(timestamp)) return false;
  if(Math.abs(Math.floor(Date.now()/1000) - timestamp) > 300) return false;

  const expected = crypto.createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  return signatures.some(sig => {
    try{
      const actual = Buffer.from(sig, 'hex');
      return actual.length === expectedBuffer.length && crypto.timingSafeEqual(actual, expectedBuffer);
    }catch{
      return false;
    }
  });
}

export default async (req) => {
  if(req.method !== 'POST') return new Response('Method not allowed', {status:405});

  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');
  const secret = Netlify.env.get('STRIPE_WEBHOOK_SECRET');
  if(!verifyStripeSignature(rawBody, signature, secret)){
    return new Response('Invalid signature', {status:400});
  }

  let stripeEvent;
  try{ stripeEvent = JSON.parse(rawBody); }
  catch{ return new Response('Invalid JSON', {status:400}); }

  if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(stripeEvent.type)){
    return new Response('Ignored');
  }

  const s = stripeEvent.data?.object;
  const valid = s &&
    s.object === 'checkout.session' &&
    s.payment_status === 'paid' &&
    s.mode === 'payment' &&
    s.payment_link === 'plink_1UDUtJFO5q7MQ7EmCAkOz9sB' &&
    s.amount_total === 1900 &&
    s.currency === 'usd';

  if(!valid) return new Response('Not an eligible purchase');

  const store = getStore('service-profit-entitlements-test', {consistency:'strong'});
  await store.setJSON(s.id, {
    paid:true,
    session_id:s.id,
    payment_link:s.payment_link,
    amount_total:s.amount_total,
    currency:s.currency,
    customer_email:s.customer_details?.email || null,
    created:s.created || Math.floor(Date.now()/1000),
    recorded_at:new Date().toISOString()
  });

  return new Response('Entitlement recorded');
};

export const config = { path:'/api/stripe-webhook' };
