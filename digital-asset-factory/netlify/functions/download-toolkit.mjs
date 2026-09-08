import { readFile } from 'node:fs/promises';
import path from 'node:path';

const EXPECTED_PAYMENT_LINK = 'plink_1UDUtJFO5q7MQ7EmCAkOz9sB';
const EXPECTED_AMOUNT = 1900;
const EXPECTED_CURRENCY = 'usd';

async function validPurchase(sessionId){
  const secret = process.env.STRIPE_SECRET_KEY;
  if(!secret) throw new Error('Missing STRIPE_SECRET_KEY');
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sessionId), {
    headers: { Authorization: 'Bearer ' + secret }
  });
  if(!res.ok) return false;
  const s = await res.json();
  return s.payment_status === 'paid' &&
    s.mode === 'payment' &&
    s.payment_link === EXPECTED_PAYMENT_LINK &&
    s.amount_total === EXPECTED_AMOUNT &&
    s.currency === EXPECTED_CURRENCY;
}

export const handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id;
  if(!sessionId || !sessionId.startsWith('cs_')){
    return {statusCode:400, body:'Invalid checkout session.'};
  }
  try{
    if(!(await validPurchase(sessionId))){
      return {statusCode:403, body:'A completed purchase is required.'};
    }
    const filePath = path.resolve(process.cwd(), 'premium/service-profit-toolkit-premium.html');
    const file = await readFile(filePath, 'utf8');
    return {
      statusCode:200,
      headers:{
        'content-type':'text/html; charset=utf-8',
        'content-disposition':'attachment; filename="service-profit-toolkit-lifetime.html"',
        'cache-control':'private, no-store, max-age=0',
        'x-content-type-options':'nosniff'
      },
      body:file
    };
  }catch(err){
    console.error('download-toolkit', err.message);
    return {statusCode:500, body:'Download service is temporarily unavailable.'};
  }
};
