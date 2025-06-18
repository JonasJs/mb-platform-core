import Button from '../Button/Button.vue'
import Step from './Step.vue'

export default {
  title: 'Components/Step',
  component: Step,
  argTypes: {
    labelBackButton: { control: 'text' },
    labelNextButton: { control: 'text' },
    disableBackButton: { control: 'boolean' },
    disableNextButton: { control: 'boolean' },
  },
}

const Template = (args) => ({
  components: { Step },
  setup() {
    return { args }
  },
  template: `
    <Step v-bind="args">
      <p style="padding: 16px;">Contéudo do Step</p>
    </Step>
  `,
})

export const Default = Template.bind({})
Default.args = {
  labelBackButton: 'Voltar',
  labelNextButton: 'Avançar',
  disableBackButton: false,
  disableNextButton: false,
}

export const DisabledButtons = Template.bind({})
DisabledButtons.args = {
  labelBackButton: 'Voltar',
  labelNextButton: 'Avançar',
  disableBackButton: true,
  disableNextButton: true,
}

export const WithCustomSlots = () => ({
  components: { Step, Button },
  setup() {
    function logNext() {
      alert('Avançar...')
    }

    function logBack() {
      alert('Voltar...')
    }

    return { logNext, logBack }
  },
  template: `
    <Step
      :nextAction="logNext"
      :backAction="logBack"
      labelNextButton="Próximo"
      labelBackButton="Anterior"
    >
      <template #default>
        <p style="padding: 16px;">Step com botões customizados</p>
      </template>

      <template #left-button="{ back }">
        <Button secondary @click="back">Voltar Personalizado</Button>
      </template>

      <template #right-button="{ next }">
        <Button @click="next">Avançar</Button>
      </template>
    </Step>
  `,
})
