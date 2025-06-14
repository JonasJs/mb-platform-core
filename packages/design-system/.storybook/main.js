/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|vue)'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
