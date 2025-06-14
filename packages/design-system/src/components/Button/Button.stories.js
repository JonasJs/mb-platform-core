import MyButton from './Button.vue'

export default {
  title: 'Example/MyButton',
  component: MyButton,
  argTypes: {
    label: { control: 'text' },
    primary: { control: 'boolean' },
    click: { action: 'clicked' },
  },
}

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args }
  },
  template: '<MyButton v-bind="args" @click="args.click" />',
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Primary Button',
  primary: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Secondary Button',
  primary: false,
}
