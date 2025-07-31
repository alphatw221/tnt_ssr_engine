import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist/server',
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'index.html'),
        main: 'src/entry-client.jsx'
      },
    },
  },
  ssr: {
    external: ['react', 'react-dom'],
    // noExternal: ['prop-types'], // ✅ 加這行
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

    },
  },
});