const EXPECTED_PAYMENT_LINK = 'plink_1UDUtJFO5q7MQ7EmCAkOz9sB';
const EXPECTED_AMOUNT = 1900;
const EXPECTED_CURRENCY = 'usd';

async function getSession(sessionId){
  const secret = process.env.STRIPE_SECRET_KEY;
  if(!secret) throw new Error('Missing STRIPE_SECRET_KEY');
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sessionId), {
    headers: { Authorization: 'Bearer ' + secret }
  });
  if(!res.ok) throw new Error('Stripe verification failed');
  return res.json();
}

export const handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id;
  if(!sessionId || !sessionId.startsWith('cs_')){
    return {statusCode:400, headers:{'content-type':'application/json','cache-control':'no-store'}, body:JSON.stringify({paid:false})};
  }
  try{
    const s = await getSession(sessionId);
    const paid = s.payment_status === 'paid' &&
      s.mode === 'payment' &&
      s.payment_link === EXPECTED_PAYMENT_LINK &&
      s.amount_total === EXPECTED_AMOUNT &&
      s.currency === EXPECTED_CURRENCY;
    return {
      statusCode: paid ? 200 : 403,
      headers:{'content-type':'application/json','cache-control':'no-store'},
      body:JSON.stringify({paid})
    };
  }catch(err){
    console.error('verify-purchase', err.message);
    return {statusCode:500, headers:{'content-type':'application/json','cache-control':'no-store'}, body:JSON.stringify({paid:false})};
  }
};
