import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [react(),
    //需要replace 因為redux有問題
    replace({
      preventAssignment: true,

      // ✅ 強制取代所有來源（含 node_modules）
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],

  build: {
    outDir: 'dist/express/assets',
    emptyOutDir: true,
    manifest: true,
    // define: {//redux 裡面有server code?
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    // },
    lib: {
      entry: {
        'entry-client': path.resolve(__dirname, 'src/entry-client.jsx'),
        'entry-server': path.resolve(__dirname, 'src/entry-server.jsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // input: {
      //   'entry-client': path.resolve(__dirname, 'src/entry-client.jsx'),
      //   'entry-server': path.resolve(__dirname, 'src/entry-server.jsx'),
      // },

      output: {
        // format: 'esm',

        // ✅ entry file 不要 hash
        entryFileNames: '[name].js',

        // ✅ chunks 有 hash
        chunkFileNames: 'chunks/[name].[hash].js',

        // ✅ assets (css, images) 有 hash
        assetFileNames: '[name][extname]',  //hash拿掉 重新build過後網站cache不用清除
      },
    },
  },

  // ssr: {
  //   noExternal: true, // 確保 server build 可以打包所有依賴
  // },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

//vite build --config vite.config.js