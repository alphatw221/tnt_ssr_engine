Error.stackTraceLimit = 100;

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import ssrRoutes from '../routes/ssr.js';
import csrRoutes from '../routes/csr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const isProd = process.env.NODE_ENV === 'production';
const root = resolve(__dirname, '..');


const createServer = async ()=>{
  const app = express();

  if (!isProd) {
    // 開發模式：使用 Vite 作為 middleware
    const vite = await createViteServer({
      root,
      server: { middlewareMode: 'ssr' },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    // 將 Vite 注入給 SSR 路由使用
    app.use((req, res, next) => {
      req.vite = vite;
      next();
    });
  }else{
      app.use('/assets', express.static(resolve(root, 'dist/client/assets')));
  }

  app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // 204 = No Content
  });
  //   // CSR & SSR 路由
  app.use('/website_backend_v2', csrRoutes);
  app.use('/', ssrRoutes);
  

  const port = process.env.PORT || 3000;


  app.listen(port, () => {
    console.log(`🚀 SSR server running at http://localhost:${port}`);
  });
}

createServer()