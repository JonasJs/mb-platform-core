import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('should render button value', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Test Button',
      },
    })
    expect(wrapper.text()).toContain('Test Button')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('should apply "mb-secondary" class when secondary prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        secondary: true,
      },
    })
    const classes = wrapper.classes()
    expect(classes).toContain('mb-secondary')
  })

  it('should disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
