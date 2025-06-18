import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Steps from './Steps.vue'

const STEPS_MOCK = [
  {
    title: 'Primeiro Passo',
  },
  {
    title: 'Segundo Passo',
  },
  {
    title: 'Terceiro Passo',
  },
]

describe('Steps', () => {
  it('should render current step and total steps', () => {
    const wrapper = mount(Steps, {
      props: {
        currentStep: 0,
        steps: STEPS_MOCK,
      },
    })

    expect(wrapper.text()).toContain('Etapa 1 de 3')
  })

  it('should display the correct step title', () => {
    const wrapper = mount(Steps, {
      props: {
        currentStep: 1,
        steps: STEPS_MOCK,
      },
    })

    expect(wrapper.find('h2').text()).toBe('Segundo Passo')
  })

  it('should update step number when currentStep changes', () => {
    const wrapper = mount(Steps, {
      props: {
        currentStep: 2,
        steps: STEPS_MOCK,
      },
    })

    expect(wrapper.text()).toContain('Etapa 3 de 3')
  })

  it('should handle empty step title gracefully', () => {
    const wrapper = mount(Steps, {
      props: {
        currentStep: 0,
        steps: [{}],
      },
    })

    expect(wrapper.find('h2').text()).toBe('')
  })

  it('should calculate total steps correctly', () => {
    const wrapper = mount(Steps, {
      props: {
        currentStep: 0,
        steps: STEPS_MOCK,
      },
    })

    expect(wrapper.text()).toContain('de 3')
  })

  it('should use default currentStep value when not provided', () => {
    const wrapper = mount(Steps, {
      props: {
        steps: STEPS_MOCK,
      },
    })

    expect(wrapper.text()).toContain('Etapa 1 de 3')
    expect(wrapper.find('h2').text()).toBe('Primeiro Passo')
  })
})
