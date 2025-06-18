import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { Step } from '@mb-platform/design-system'
import WellcomeStep from './WellcomeStep.vue'
import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils'
import { validateSchema } from '@mb-platform/form-guard'

vi.mock('@mb-platform/form-guard')

function shallowMountComponent(props) {
  return shallowMount(WellcomeStep, {
    props: {
      title: 'Bem-vindo',
      ...props,
    },
  })
}

describe('WellcomeStep', () => {
  it('should render title', async () => {
    const wrapper = shallowMountComponent({
      title: 'Rendered title',
      formData: {},
    })
    const step = wrapper.findComponent(Step)

    await nextTick()

    expect(step.exists()).toBe(true)
    expect(wrapper.props().title).toBe('Rendered title')
  })

  it('should show errors when fields are empty', async () => {
    const errors = {
      email: 'E-mail é obrigatório',
      personType: 'Tipo de pessoa é obrigatório',
    }
    const formData = { email: '', personType: '' }

    validateSchema.mockReturnValue({
      success: false,
      errors,
    })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)

    const nextAction = step.props().nextAction
    await expect(nextAction).rejects.toThrow('Validation failed')

    await nextTick()

    expect(wrapper.vm.errors.email).toBe(errors.email)
    expect(wrapper.vm.errors.personType).toBe(errors.personType)
  })

  it('should clear errors after successful validation', async () => {
    const formData = {
      email: 'valid@example.com',
      personType: PERSON_TYPE_ENUM.COMPANY,
    }
    validateSchema.mockReturnValue({
      success: true,
      errors: {},
    })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).resolves.toBeUndefined()
    expect(wrapper.vm.errors).toEqual({})
  })
})
