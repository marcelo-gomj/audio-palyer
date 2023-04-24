const { defineConfig } = require('vite');
const react = require("@vitejs/plugin-react");

import svgx from "@svgx/vite-plugin-react";
import electron from "vite-plugin-electron";

module.exports = defineConfig({
  root: "./src",
  plugins: [
    react(),
    svgx(),
    electron({
      entry: "./src/main.js",
    })
  ],
  build: {
    sourcemap: true,
    outDir: 'dist',
  }
})
