import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [preact()],
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/widget/index.tsx"),
      name: "FeedbackWidget",
      fileName: "feedback-widget",
      formats: ["iife"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        extend: true,
        assetFileNames: "feedback-widget.[ext]",
      },
    },
    emptyOutDir: true,
  },
});
