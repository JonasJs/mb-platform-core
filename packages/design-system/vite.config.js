import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MBDesignSystem',
      fileName: (format) => `mb-design-system.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
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
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})
