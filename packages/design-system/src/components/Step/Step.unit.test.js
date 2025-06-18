import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Step from './Step.vue'
import Button from '../Button/Button.vue'

function mountComponent(props) {
  return mount(Step, {
    props: {
      labelBackButton: 'Voltar',
      labelNextButton: 'Próximo',
      ...props,
    },
    slots: {
      default: '<div>Step content</div>',
    },
    global: {
      components: { Button },
    },
  })
}

describe('Step', () => {
  it('should render step component with content', () => {
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Step content')
  })

  it('should render back and next buttons', () => {
    const wrapper = mountComponent()

    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Voltar')
    expect(buttons[1].text()).toBe('Próximo')
  })

  it('should disable buttons when props are set', () => {
    const wrapper = mountComponent({
      disableBackButton: true,
      disableNextButton: true,
    })

    const buttons = wrapper.findAll('button')

    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
  })

  it('should emit events when buttons are clicked', async () => {
    const wrapper = mountComponent()

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('back')
    expect(wrapper.emitted()).toHaveProperty('next')
  })

  it('should call action functions', async () => {
    const nextAction = vi.fn().mockResolvedValue()
    const backAction = vi.fn().mockResolvedValue()

    const wrapper = mountComponent({ nextAction, backAction })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(backAction).toHaveBeenCalled()
    expect(nextAction).toHaveBeenCalled()
  })
})
