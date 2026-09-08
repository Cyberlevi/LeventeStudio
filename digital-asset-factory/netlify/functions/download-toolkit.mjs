import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { connectLambda, getStore } from '@netlify/blobs';

async function hasEntitlement(sessionId){
  const store = getStore('service-profit-entitlements');
  const raw = await store.get(sessionId, {consistency:'strong'});
  if(!raw) return false;
  try{
    const record = JSON.parse(raw);
    return record?.paid === true && record.session_id === sessionId;
  }catch{
    return false;
  }
}

export const handler = async (event) => {
  connectLambda(event);
  const sessionId = event.queryStringParameters?.session_id;
  if(!sessionId || !sessionId.startsWith('cs_')){
    return {statusCode:400, body:'Invalid checkout session.'};
  }
  try{
    if(!(await hasEntitlement(sessionId))){
      return {statusCode:403, headers:{'cache-control':'no-store'}, body:'A completed purchase is required.'};
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
    return {statusCode:500, headers:{'cache-control':'no-store'}, body:'Download service is temporarily unavailable.'};
  }
};
