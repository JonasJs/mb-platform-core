import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

function maskPhoneMock(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

describe('Input', () => {
  it('should render input with label', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Test Label',
        modelValue: 'Test Value',
      },
    })
    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.text()).toContain('Test Label')
    expect(input.element.value).toBe('Test Value')
  })

  it('should emit update:modelValue when input changes', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('new value')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value'])
  })

  it('should apply error class when error prop is true', () => {
    const wrapper = mount(Input, {
      props: {
        error: 'Error message',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    const error = wrapper.find('.error-message')

    expect(input.classes()).toContain('input-error')
    expect(error.text()).toBe('Error message')
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('should apply mask function', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        mask: maskPhoneMock,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('21999999999')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([
      '(21) 99999-9999',
    ])
  })
})
