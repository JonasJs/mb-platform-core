import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioButton from './RadioButton.vue'

describe('RadioButton', () => {
  it('should render radio button with label', () => {
    const wrapper = mount(RadioButton, {
      props: {
        label: 'Test Label',
        value: 'test-value',
        name: 'test-group',
        modelValue: null,
      },
    })
    const label = wrapper.find('label')
    const span = wrapper.find('span')

    expect(label.exists()).toBe(true)
    expect(span.text()).toContain('Test Label')
  })

  it('should emit update:modelValue when radio changes', async () => {
    const wrapper = mount(RadioButton, {
      props: {
        label: 'Test Option',
        value: 'test-value',
        name: 'test-group',
        modelValue: null,
      },
    })
    const input = wrapper.find('input[type="radio"]')
    await input.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test-value'])
  })

  it('should apply disabled class when disabled prop is true', () => {
    const wrapper = mount(RadioButton, {
      props: {
        label: 'Disabled Option',
        value: 'disabled-value',
        name: 'test-group',
        modelValue: null,
        disabled: true,
      },
    })

    const label = wrapper.find('label')
    const input = wrapper.find('input[type="radio"]')

    expect(label.classes()).toContain('radio-disabled')
    expect(input.attributes('disabled')).toBeDefined()
  })
})
