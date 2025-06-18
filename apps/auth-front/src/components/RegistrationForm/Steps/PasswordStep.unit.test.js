import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PasswordStep from './PasswordStep.vue'
import { Input, Step } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'

vi.mock('@mb-platform/form-guard')

function shallowMountComponent(props, global) {
  return shallowMount(PasswordStep, {
    props: {
      title: 'Senha de acesso',
      ...props,
    },
    global: {
      ...global,
    },
  })
}

describe('PasswordStep', () => {
  it('should render title and input', () => {
    const formData = {
      password: '123456',
    }

    const wrapper = shallowMountComponent(
      { formData },
      {
        stubs: {
          Step: {
            template: '<div><slot /></div>',
          },
        },
      }
    )

    const input = wrapper.findComponent(Input)

    expect(input.exists()).toBe(true)
    expect(input.props().modelValue).toBe(formData.password)
  })

  it('should show errors when validation is not success', async () => {
    const formData = {
      password: '',
    }

    const errors = {
      password: 'Senha obrigatória',
    }

    validateSchema.mockReturnValue({ success: false, errors })

    const wrapper = shallowMountComponent(
      { formData },
      {
        stubs: {
          Step: {
            props: ['nextAction'],
            template: '<div><slot /></div>',
          },
        },
      }
    )
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).rejects.toThrow('Validation failed')

    const input = wrapper.findComponent(Input)
    expect(input.props().error).toBe(errors.password)
  })

  it('should clear errors after successful validation', async () => {
    const formData = {
      password: '123456',
    }
    validateSchema.mockReturnValue({ success: true, errors: {} })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).resolves.toBeUndefined()
    expect(wrapper.vm.errors).toEqual({})
  })
})
