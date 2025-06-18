import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import IndividualStep from './IndividualStep.vue'
import { Input, Step } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { maskCPF, maskPhone, maskDate } from '@/utils/masks'

vi.mock('@mb-platform/form-guard')
vi.mock('@/utils/masks')

const PERSON_MOCK = {
  name: 'Fulano da Silva',
  cpf: '123.456.789-00',
  birthDate: '16/06/1999',
  phone: '(21) 99999-9999',
}

function shallowMountComponent(props, global) {
  return shallowMount(IndividualStep, {
    props: {
      title: 'Pessoa Física',
      ...props,
    },
    global: {
      ...global,
    },
  })
}

describe('IndividualStep', () => {
  it('should render the title', async () => {
    const wrapper = shallowMountComponent({ formData: {} })
    await nextTick()
    expect(wrapper.props().title).toBe('Pessoa Física')
  })

  it('should render all inputs', async () => {
    const formData = PERSON_MOCK
    const wrapper = shallowMountComponent(
      { formData },
      {
        stubs: {
          props: ['nextAction'],
          Step: {
            template: '<div><slot /></div>',
          },
        },
      }
    )

    const inputs = wrapper.findAllComponents(Input)
    expect(inputs).toHaveLength(4)

    expect(inputs[0].props().modelValue).toBe(formData.name)
    expect(inputs[1].props().mask).toBe(maskCPF)
    expect(inputs[2].props().mask).toBe(maskDate)
    expect(inputs[3].props().mask).toBe(maskPhone)
  })

  it('should show errors when validation is not success', async () => {
    const formData = {
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
    }

    const errors = {
      name: 'Nome obrigatório',
      cpf: 'CPF obrigatório',
      birthDate: 'Data obrigatória',
      phone: 'Telefone obrigatório',
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

    const inputs = wrapper.findAllComponents(Input)
    expect(inputs[0].props().error).toBe(errors.name)
    expect(inputs[1].props().error).toBe(errors.cpf)
    expect(inputs[2].props().error).toBe(errors.birthDate)
    expect(inputs[3].props().error).toBe(errors.phone)
  })

  it('should clear errors after successful validation', async () => {
    const formData = PERSON_MOCK
    validateSchema.mockReturnValue({ success: true, errors: {} })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).resolves.toBeUndefined()
    expect(wrapper.vm.errors).toEqual({})
  })

  it('should not show input errors when validation succeeds', async () => {
    const formData = PERSON_MOCK
    validateSchema.mockReturnValue({ success: true, errors: {} })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).resolves.toBeUndefined()

    const inputs = wrapper.findAllComponents(Input)
    inputs.forEach((input) => {
      expect(input.props().error).toBeUndefined()
    })
  })
})
