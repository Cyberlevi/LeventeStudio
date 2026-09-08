import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  if(!sessionId || !sessionId.startsWith('cs_')){
    return Response.json({paid:false}, {status:400, headers:{'cache-control':'no-store'}});
  }
  try{
    const store = getStore('service-profit-entitlements-test', {consistency:'strong'});
    const record = await store.get(sessionId, {type:'json'});
    const paid = record?.paid === true && record.session_id === sessionId;
    return Response.json({paid}, {status:paid ? 200 : 404, headers:{'cache-control':'no-store'}});
  }catch(err){
    console.error('verify-purchase', err.message);
    return Response.json({paid:false}, {status:500, headers:{'cache-control':'no-store'}});
  }
};

export const config = { path:'/api/verify-purchase' };
