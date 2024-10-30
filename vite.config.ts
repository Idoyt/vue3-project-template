import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/global.scss";`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "https://iot.will-tec.com/api", // 目标 API 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/wss": {
        target: "https://iot.will-tec.com/ws/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "./certification/localhost-key.pem"),
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "./certification/localhost.pem"),
      ),
    },
  },
  build: {
    outDir: "dist",
  },
});
