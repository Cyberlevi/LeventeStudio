import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  if(!sessionId || !sessionId.startsWith('cs_')){
    return new Response('Invalid checkout session.', {status:400});
  }
  try{
    const store = getStore('service-profit-entitlements-test', {consistency:'strong'});
    const record = await store.get(sessionId, {type:'json'});
    if(record?.paid !== true || record.session_id !== sessionId){
      return new Response('A completed purchase is required.', {status:403, headers:{'cache-control':'no-store'}});
    }

    const filePath = path.resolve(process.cwd(), 'premium/service-profit-toolkit-premium.html');
    const file = await readFile(filePath, 'utf8');
    return new Response(file, {
      status:200,
      headers:{
        'content-type':'text/html; charset=utf-8',
        'content-disposition':'attachment; filename="service-profit-toolkit-lifetime.html"',
        'cache-control':'private, no-store, max-age=0',
        'x-content-type-options':'nosniff'
      }
    });
  }catch(err){
    console.error('download-toolkit', err.message);
    return new Response('Download service is temporarily unavailable.', {status:500, headers:{'cache-control':'no-store'}});
  }
};

export const config = { path:'/api/download-toolkit' };
