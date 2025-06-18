import { ref } from 'vue'
import RadioButton from './RadioButton.vue'

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    label: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    modelValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

const Template = (args) => ({
  components: {
    RadioButton,
  },
  setup() {
    return { args }
  },
  template: '<RadioButton v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  label: 'Opção 1',
  value: 'option1',
  name: 'radioGroup',
  modelValue: null,
}

export const Selected = Template.bind({})
Selected.args = {
  label: 'Opção selecionada',
  value: 'selected',
  name: 'radioGroup',
  modelValue: 'selected',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Opção desabilitada',
  value: 'disabled',
  name: 'radioGroup',
  modelValue: null,
  disabled: true,
}

export const DisabledSelected = Template.bind({})
DisabledSelected.args = {
  label: 'Opção desabilitada e selecionada',
  value: 'disabledSelected',
  name: 'radioGroup',
  modelValue: 'disabledSelected',
  disabled: true,
}

export const MultipleRadioButtons = () => ({
  components: {
    RadioButton,
  },
  setup() {
    const selectedValue = ref('blue')
    return { selectedValue }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <h3>Escolha uma cor:</h3>
      <RadioButton
        label="Azul"
        value="blue"
        name="color"
        v-model="selectedValue"
      />
      <RadioButton
        label="Verde"
        value="green"
        name="color"
        v-model="selectedValue"
      />
      <RadioButton
        label="Vermelho"
        value="red"
        name="color"
        v-model="selectedValue"
      />
     <p :style="{ color: selectedValue, fontWeight: 'bold', fontSize: '18px' }">
      Selecionado: {{ selectedValue }}
     </p>
    </div>
  `,
})
