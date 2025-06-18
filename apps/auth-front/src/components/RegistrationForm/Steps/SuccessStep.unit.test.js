import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import SuccessStep from './SuccessStep.vue'
import { Step } from '@mb-platform/design-system'

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
})

function shallowMountComponent(props = {}) {
  return shallowMount(SuccessStep, {
    props: {
      title: 'Cadastro realizado com sucesso!',
      ...props,
    },
    global: {
      stubs: {
        Step: {
          template: '<div><slot /></div>',
          props: ['title', 'showBackButton', 'showNextButton'],
        },
        Button: {
          template: '<button><slot /></button>',
        },
      },
    },
  })
}

describe('SuccessStep.vue', () => {
  beforeEach(() => {
    window.location.href = ''
  })

  it('should render title', async () => {
    const wrapper = shallowMountComponent({
      title: 'Rendered title',
    })

    await nextTick()

    expect(wrapper.props().title).toBe('Rendered title')
  })

  it('should render Step component', async () => {
    const wrapper = shallowMountComponent()
    const step = wrapper.findComponent(Step)

    expect(step.exists()).toBe(true)
    expect(step.props().showBackButton).toBe(false)
    expect(step.props().showNextButton).toBe(false)
  })

  it('redirects to /registration when button is clicked', async () => {
    const wrapper = shallowMountComponent()
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(window.location.href).toBe('/registration')
  })
})
