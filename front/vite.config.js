// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.ts 或 vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  open: true,
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // FastAPI 服务器地址
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),  // 如果你的 FastAPI 路径是以 /api 开头，可以进行路径重写
      },
    },
  },
});
