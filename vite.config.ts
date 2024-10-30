import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3001, // 项目端口，可随意改为不冲突的一个
    proxy: {
      /*
      代理样例
      "/api": {
        target: "https://iot.will-tec.com/api", // 目标 API 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
       */
    },
    https: {
      // 配置https，需要自配证书
      // key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      // cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
  },
});
