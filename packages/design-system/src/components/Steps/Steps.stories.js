import { ref } from 'vue'
import Button from '../Button/Button.vue'
import Steps from './Steps.vue'

export default {
  title: 'Components/Steps',
  component: Steps,
  argTypes: {
    currentStep: {
      control: 'number',
    },
    steps: {
      control: 'object',
    },
  },
}

export const Default = () => ({
  components: {
    Steps,
    Button,
  },
  setup() {
    const currentStep = ref(0)
    const steps = [
      { title: 'Primeiro' },
      { title: 'Segundo' },
      { title: 'Terceiro' },
    ]
    return { currentStep, steps }
  },
  template: `
    <div style="text-align: center; padding: 20px;">
      <Steps :currentStep="currentStep" :steps="steps" />
      
      <div style="margin-top: 20px;">
        <Button 
          secondary
          @click="currentStep = Math.max(0, currentStep - 1)"
          :disabled="currentStep === 0"
          style="margin-right: 10px;"
        >
          Anterior
        </Button>
        <Button 
          @click="currentStep = Math.min(steps.length - 1, currentStep + 1)"
          :disabled="currentStep === steps.length - 1"
        >
          Próximo
        </Button>
      </div>
    </div>
  `,
})

export const SecondStep = () => ({
  components: {
    Steps,
  },
  setup() {
    const currentStep = ref(1)
    const steps = [{ title: 'Início' }, { title: 'Meio' }, { title: 'Fim' }]
    return { currentStep, steps }
  },
  template: `
    <div style="text-align: center; padding: 20px;">
      <Steps :currentStep="currentStep" :steps="steps" />
    </div>
  `,
})

export const TwoSteps = () => ({
  components: {
    Steps,
    Button,
  },
  setup() {
    const currentStep = ref(0)
    const steps = [{ title: 'Configurar' }, { title: 'Finalizar' }]
    return { currentStep, steps }
  },
  template: `
    <div style="text-align: center; padding: 20px;">
      <Steps :currentStep="currentStep" :steps="steps" />
      
      <div style="margin-top: 20px;">
        <Button @click="currentStep = currentStep === 0 ? 1 : 0">
          {{ currentStep === 0 ? 'Finalizar' : 'Voltar' }}
        </Button>
      </div>
    </div>
  `,
})

export const ManySteps = () => ({
  components: {
    Steps,
  },
  setup() {
    const currentStep = ref(2)
    const steps = [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
      { title: 'Step 4' },
    ]
    return { currentStep, steps }
  },
  template: `
    <div style="text-align: center; padding: 20px;">
      <Steps :currentStep="currentStep" :steps="steps" />
    </div>
  `,
})
