import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get(['/'], async (req, res) => {
  const url = req.originalUrl;
  const vite = req.vite;

  const templatePath = path.resolve('index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  if (vite) { //開發模式
    template = await vite.transformIndexHtml(url, template);
  }

  res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
});

export default router;