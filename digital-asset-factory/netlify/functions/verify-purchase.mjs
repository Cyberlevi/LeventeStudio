import { connectLambda, getStore } from '@netlify/blobs';

export const handler = async (event) => {
  connectLambda(event);
  const sessionId = event.queryStringParameters?.session_id;
  if(!sessionId || !sessionId.startsWith('cs_')){
    return {statusCode:400, headers:{'content-type':'application/json','cache-control':'no-store'}, body:JSON.stringify({paid:false})};
  }
  try{
    const store = getStore('service-profit-entitlements');
    const raw = await store.get(sessionId, {consistency:'strong'});
    const record = raw ? JSON.parse(raw) : null;
    const paid = record?.paid === true && record.session_id === sessionId;
    return {
      statusCode: paid ? 200 : 404,
      headers:{'content-type':'application/json','cache-control':'no-store'},
      body:JSON.stringify({paid})
    };
  }catch(err){
    console.error('verify-purchase', err.message);
    return {statusCode:500, headers:{'content-type':'application/json','cache-control':'no-store'}, body:JSON.stringify({paid:false})};
  }
};
