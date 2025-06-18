import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || 'localhost'
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || '3001'

export default defineConfig({
  base: '/registration',
  plugins: [vue(), vueDevTools()],
  server: {
    proxy: [
      // {
      //   context: /^\/$/,
      //   target: `http://${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
      //   changeOrigin: true,
      //   logLevel: 'info',
      //   rewrite: () => '/registration',
      // },
      {
        context: /^\/registration/,
        target: `${AUTH_SERVICE_HOST}:${AUTH_SERVICE_PORT}`,
        changeOrigin: true,
        logLevel: 'info',
      },
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{js,jsx}', '**/*.unit.test.{js,jsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.vue', 'src/**/*.js'],
      exclude: ['node_modules/', 'tests/', '**/*.test.*'],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
})
