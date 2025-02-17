import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [
        ['@swc/plugin-emotion', { 
          autoLabel: 'dev-only',
          labelFormat: '[dirname]-[filename]-[local]'
        }]
      ]
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  preview: {
    port: 4173
  }
});
