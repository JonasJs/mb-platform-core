import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stepper from './Stepper.vue'
import Steps from '../Steps/Steps.vue'

function mountComponent(props) {
  return mount(Stepper, {
    props: {
      modelValue: 0,
      ...props,
    },
    slots: {
      default: () => [
        { props: { title: 'Step 1' } },
        { props: { title: 'Step 2' } },
        { props: { title: 'Step 3' } },
      ],
    },
    global: {
      components: {
        Steps,
      },
    },
  })
}

describe('Stepper', () => {
  it('should render stepper component', () => {
    const wrapper = mountComponent()

    const stepper = wrapper.find('.stepper')
    const steps = wrapper.findComponent(Steps)

    expect(stepper.exists()).toBe(true)
    expect(steps.exists()).toBe(true)
  })

  it('should emit update:modelValue when modelValue changes', async () => {
    const wrapper = mountComponent()

    await wrapper.setProps({ modelValue: 1 })

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([1])
  })

  it('should go to next step', () => {
    const wrapper = mountComponent()

    wrapper.vm.handleNext()

    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('should go to previous step', () => {
    const wrapper = mountComponent({ modelValue: 1 })

    wrapper.vm.handleBack()

    expect(wrapper.vm.currentStep).toBe(0)
  })
})
