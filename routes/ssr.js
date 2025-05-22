import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get([
    '/', 
    '/:pageName', 
    '/:pageName/:objectUUID'
], async (req, res, next) => {
  try {
    const { pageName, objectUUID } = req.params;

    console.log(pageName)
    console.log(objectUUID)

    const url = req.originalUrl;
    const vite = req.vite;

    const templatePath = path.resolve('index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // SSR 模組（透過 Vite 或預編譯載入）
    let render;
    if (vite) { //開發模式
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      render = (await import('../../dist/server/entry-server.js')).render;
    }

    const {html} = await render(url);
    const finalHTML = template.replace(`<!--app-html-->`, html);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHTML);
  } catch (err) {
    req.vite?.ssrFixStacktrace(err);
    next(err);
  }
});

export default router;