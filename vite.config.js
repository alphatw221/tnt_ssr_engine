import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  base:'/ssr_engine_vite',
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      },
    },
  },
  ssr: {
    external: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

    },
  },
});