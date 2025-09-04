import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress", // bisa juga 'gzip'
      ext: ".br", // ekstensi hasil kompresi
      deleteOriginFile: false, // true kalau mau hapus file asli
      threshold: 1024, // hanya file >1kb yang dikompres
    }),
    visualizer({
      filename: "bundle-stats.html", // hasil report
      template: "treemap", // bentuk visualisasi: sunburst | treemap | network
      gzipSize: true,
      brotliSize: true,
      open: true, // auto buka browser setelah build
    }),
  ],
});
