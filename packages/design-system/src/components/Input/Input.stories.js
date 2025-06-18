import Input from './Input.vue'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    modelValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
  },
}

const Template = (args) => ({
  components: {
    Input,
  },
  setup() {
    return { args }
  },
  template: '<Input v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  label: 'Nome',
  placeholder: 'Digite seu nome',
  modelValue: '',
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Digite seu email',
  modelValue: 'email-invalido',
  error: 'Email deve ter um formato válido',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Campo desabilitado',
  placeholder: 'Este campo está desabilitado',
  modelValue: 'Valor fixo',
  disabled: true,
}

export const Password = Template.bind({})
Password.args = {
  label: 'Senha',
  type: 'password',
  placeholder: 'Digite sua senha',
  modelValue: '',
}
