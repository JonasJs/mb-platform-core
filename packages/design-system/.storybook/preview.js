import '../src/styles/index.css'
import './preview.css'

export const parameters = {
  backgrounds: {
    default: 'light',
  },
}

export const decorators = [
  (story) => ({
    components: { Story: story() },
    template: `
      <div class="container">
        <Story />
      </div>
    `,
  }),
]
