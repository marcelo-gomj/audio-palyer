const { defineConfig } = require('vite');
const react = require("@vitejs/plugin-react");

// import commomjs from "vite-plugin-commonjs";
import svgx from "@svgx/vite-plugin-react";
import electron from "vite-plugin-electron";
import tsconfigPaths from "vite-tsconfig-paths";

module.exports = defineConfig({
  root: "./src",
  plugins: [
    react(),
    tsconfigPaths(),
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
