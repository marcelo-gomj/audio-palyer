const { defineConfig } = require('vite');
const react = require("@vitejs/plugin-react");
import svgx from "@svgx/vite-plugin-react";

module.exports = defineConfig({
  root: "./src",
  plugins: [
    react(),
    svgx()
  ],
  build: {
    sourcemap: true,
    outDir: 'dist',
  }
})
