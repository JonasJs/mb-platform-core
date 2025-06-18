import vueConfig from '@mb-platform/eslint-config/vue.mjs'
import storybookPlugin from 'eslint-plugin-storybook'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...vueConfig,
  {
    files: ['**/*.stories.*'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
])
