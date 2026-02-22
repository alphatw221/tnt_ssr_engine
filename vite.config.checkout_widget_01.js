import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/widget',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'widgets/checkout-widget-01/index.jsx'),
      name: 'CheckoutWidget01',
      formats: ['iife'],
      fileName: () => 'checkout-widget-01.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';
          if (name.endsWith('.css')) return 'checkout-widget-01.css';
          return name;
        },
      },
    },
  },
});
