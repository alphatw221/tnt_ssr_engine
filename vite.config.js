import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  base:'/',
  // build: {
  //   outDir: 'dist/website_editor',
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: 'index.html'
  //     },
  //   },
  // },
  // ssr: {
  //   external: ['react', 'react-dom'],
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

    },
  },
});