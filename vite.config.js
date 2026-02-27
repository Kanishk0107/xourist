import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/pages',
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        charDham: resolve(__dirname, 'src/pages/char-dham.html'),
        kailash: resolve(__dirname, 'src/pages/kailash.html'),
        privacy: resolve(__dirname, 'src/pages/privacy.html'),
        terms: resolve(__dirname, 'src/pages/terms.html'),
      }
    }
  },
  server: {
    open: true
  }
});
