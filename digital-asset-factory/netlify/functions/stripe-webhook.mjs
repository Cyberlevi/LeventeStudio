import crypto from 'node:crypto';
import { connectLambda, getStore } from '@netlify/blobs';

const EXPECTED_PAYMENT_LINK = 'plink_1UDUtJFO5q7MQ7EmCAkOz9sB';
const EXPECTED_AMOUNT = 1900;
const EXPECTED_CURRENCY = 'usd';
const TOLERANCE_SECONDS = 300;

function verifyStripeSignature(rawBody, signatureHeader, secret){
  if(!rawBody || !signatureHeader || !secret) return false;
  const parts = signatureHeader.split(',');
  const timestampPart = parts.find(p => p.startsWith('t='));
  const signatures = parts.filter(p => p.startsWith('v1=')).map(p => p.slice(3));
  if(!timestampPart || signatures.length === 0) return false;
  const timestamp = Number(timestampPart.slice(2));
  if(!Number.isFinite(timestamp)) return false;
  if(Math.abs(Math.floor(Date.now()/1000) - timestamp) > TOLERANCE_SECONDS) return false;

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

export const handler = async (event) => {
  connectLambda(event);
  if(event.httpMethod !== 'POST') return {statusCode:405, body:'Method not allowed'};
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = event.headers?.['stripe-signature'] || event.headers?.['Stripe-Signature'];
  if(!verifyStripeSignature(event.body, sig, secret)){
    return {statusCode:400, body:'Invalid signature'};
  }

  let stripeEvent;
  try{ stripeEvent = JSON.parse(event.body); }
  catch{ return {statusCode:400, body:'Invalid JSON'}; }

  const accepted = new Set(['checkout.session.completed','checkout.session.async_payment_succeeded']);
  if(!accepted.has(stripeEvent.type)) return {statusCode:200, body:'Ignored'};

  const s = stripeEvent.data?.object;
  const valid = s &&
    s.object === 'checkout.session' &&
    s.payment_status === 'paid' &&
    s.mode === 'payment' &&
    s.payment_link === EXPECTED_PAYMENT_LINK &&
    s.amount_total === EXPECTED_AMOUNT &&
    s.currency === EXPECTED_CURRENCY;

  if(!valid) return {statusCode:200, body:'Not an eligible purchase'};

  const store = getStore('service-profit-entitlements');
  await store.set(s.id, JSON.stringify({
    paid:true,
    session_id:s.id,
    payment_link:s.payment_link,
    amount_total:s.amount_total,
    currency:s.currency,
    customer_email:s.customer_details?.email || null,
    created:s.created || Math.floor(Date.now()/1000),
    recorded_at:new Date().toISOString()
  }));

  return {statusCode:200, body:'Entitlement recorded'};
};
