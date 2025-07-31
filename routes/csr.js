import express from 'express';
import fs from 'fs';
import path from 'path';

// import {userAuthMiddleware} from 'middleware/auth.js'
const router = express.Router();

router.get(/^(.*)$/, async (req, res) => {
  const url = req.originalUrl;
  const vite = req.vite;


  let template
  try {
    template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
  } catch (err) {
    console.error('無法讀取 index.html:', err);
    return res.status(500).send('Internal Server Error: index.html not found');
  }

  // let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
  if (vite) { //開發模式
    try {
      template = await vite.transformIndexHtml(url, template);
    } catch (e) {
      console.error('Vite 處理錯誤:', e);
      return res.status(500).send('Internal Server Error: Vite failed');
    }
    // template = await vite.transformIndexHtml(url, template);
  }

  res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
});


export default router;