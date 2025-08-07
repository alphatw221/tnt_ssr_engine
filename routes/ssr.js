import express from 'express';
import fs from 'fs';
import path from 'path';
import redis from '../src/lib/utils/redisClient.js';

const router = express.Router();


const getHtmlCacheKey = (host)=>{ return `website_uuid:${host}`}
const getWebsiteUUIDCacheKey = (websiteUUID, webpageName, objectUUID)=>{ return `html:${websiteUUID}:${webpageName||''}:${objectUUID||''}`}

router.get([
    '/', 
    '/:webpageName', 
    '/:webpageName/:objectUUID'
], async (req, res, next) => {
  try {
    const { webpageName, objectUUID } = req.params;



    const url = req.originalUrl;
    const vite = req.vite;


    const fullUrl = req.get('host') + req.originalUrl;



    // await redis.del(fullUrl);
    const websiteUUIDCacheKey = getHtmlCacheKey(req.get('host'))
    const websiteUUID = await redis.get(websiteUUIDCacheKey);
    if(websiteUUID){
      const htmlCacheKey = getWebsiteUUIDCacheKey(websiteUUID, webpageName, objectUUID)
      const cachedHtml = await redis.get(htmlCacheKey);
      if (cachedHtml) {
        console.log(`[Cache] 命中 ${req.get('host')} ${htmlCacheKey}`);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(cachedHtml);
        return 
      }

    }
    
    console.log(`[Cache] 未命中 ${fullUrl}，開始 SSR`);



    const templatePath = path.resolve('index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');


    // SSR 模組（透過 Vite 或預編譯載入）
    let render;
    if (vite) { //開發模式
      console.log('開發模式')
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).getWebpageHtml;
    } else {
      console.log('生產模式')
      render = (await import('../../dist/server/entry-server.jsx')).getWebpageHtml;
    }


    const {head, body, websiteUUID:uncachedWebsiteUUID} = await render(webpageName, objectUUID);

    const safeParams = JSON.stringify({ webpageName, objectUUID }).replace(/</g, '\\u003c');
    const finalHTML = template.replace(`<!--app-head-->`, head).replace(`<!--app-body-->`, body).replace(`'__SSR_PARAMS_PLACEHOLDER__'`, safeParams);
    const htmlCacheKey = getWebsiteUUIDCacheKey(uncachedWebsiteUUID, webpageName, objectUUID)

    

    await redis.set(htmlCacheKey, finalHTML)
    await redis.set(websiteUUIDCacheKey, uncachedWebsiteUUID)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHTML);
  } catch (err) {
    req.vite?.ssrFixStacktrace(err);
    next(err);
  }
});

export default router;