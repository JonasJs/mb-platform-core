import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/registration',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: [
      {
        context: /^\/$/,
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'info',
        rewrite: () => '/registration',
      },
      {
        context: /^\/registration/,
        target: 'http://localhost:3001',
        changeOrigin: true,
        logLevel: 'info',
      }
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
