import Button from './Button.vue'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    primary: {
      control: 'boolean',
    },
    secondary: {
      control: 'boolean',
    },
  },
}

const Template = (args) => ({
  components: {
    Button,
  },
  setup() {
    return { args }
  },
  template:
    '<Button v-bind="args" @click="onClick">{{ args.label || "Button" }}</Button>',
  methods: {
    onClick() {
      console.log('Button clicked!')
    },
  },
})

export const Default = Template.bind({})
Default.args = {
  label: 'Default Button',
}

export const Primary = Template.bind({})

Primary.args = {
  primary: true,
  secondary: false,
  label: 'Primary Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  primary: false,
  secondary: true,
  label: 'Secondary Button',
}
