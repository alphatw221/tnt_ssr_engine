import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'widgets/checkout-widget-01'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envDir: __dirname,
  server: {
    port: 5174,
    open: true,
  },
});
