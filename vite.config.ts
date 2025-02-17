import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false, // Disable sourcemaps for production
    minify: "terser", // Advanced minification
    terserOptions: {
      compress: {
        drop_console: true // Remove console logs
      }
    }
  },
  preview: {
    port: 4173 // Explicit preview port
  }
});
