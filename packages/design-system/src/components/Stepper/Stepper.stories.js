import { ref } from 'vue'
import Step from '../Step/Step.vue'
import Stepper from './Stepper.vue'

export default {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    modelValue: {
      control: 'number',
    },
  },
}

export const Default = () => ({
  components: {
    Stepper,
    Step,
  },
  setup() {
    const currentStep = ref(0)
    return { currentStep }
  },
  template: `
    <Stepper v-model="currentStep">
      <Step 
        title="Primeiro Step"
        labelNextButton="Próximo"
        :disableBackButton="true"
      >
        <p>Conteúdo do primeiro step</p>
      </Step>
      
      <Step 
        title="Segundo Step"
        labelBackButton="Voltar"
        labelNextButton="Próximo"
      >
        <p>Conteúdo do segundo step</p>
      </Step>
      
      <Step 
        title="Terceiro Step"
        labelBackButton="Voltar"
        labelNextButton="Finalizar"
      >
        <p>Conteúdo do terceiro step</p>
      </Step>
    </Stepper>
  `,
})

export const SecondStep = () => ({
  components: {
    Stepper,
    Step,
  },
  setup() {
    const currentStep = ref(1)
    return { currentStep }
  },
  template: `
    <Stepper v-model="currentStep">
      <Step title="Step 1" labelNextButton="Próximo">
        <p>Primeiro Step</p>
      </Step>
      
      <Step title="Step 2" labelBackButton="Voltar" labelNextButton="Próximo">
        <p>Segundo step (atual)</p>
      </Step>
      
      <Step title="Step 3" labelBackButton="Voltar" labelNextButton="Finalizar">
        <p>Terceiro step</p>
      </Step>
    </Stepper>
  `,
})

export const TwoSteps = () => ({
  components: {
    Stepper,
    Step,
  },
  setup() {
    const currentStep = ref(0)
    return { currentStep }
  },
  template: `
    <Stepper v-model="currentStep">
      <Step 
        title="Início"
        labelNextButton="Continuar"
        :disableBackButton="true"
      >
        <div>
          <h3>Bem-vindo!</h3>
          <p>Esta é o primeiro step.</p>
        </div>
      </Step>
      
      <Step 
        title="Fim"
        labelBackButton="Voltar"
        labelNextButton="Concluir"
      >
        <div>
          <h3>Final</h3>
          <p>Esta é o último step.</p>
        </div>
      </Step>
    </Stepper>
  `,
})
