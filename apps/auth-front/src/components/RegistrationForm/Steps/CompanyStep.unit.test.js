import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import CompanyStep from './CompanyStep.vue'
import { Input, Step } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { maskCNPJ, maskDate, maskPhone } from '@/utils/masks'

vi.mock('@mb-platform/form-guard')
vi.mock('@/utils/masks')

const COMPANY_MOCK = {
  companyName: 'Empresa Teste',
  cnpj: '12.345.678/0001-90',
  openingDate: '16/06/1999',
  phone: '(21) 99999-9999',
}

function shallowMountComponent(props, global) {
  return shallowMount(CompanyStep, {
    props: {
      title: 'Pessoa Jurídica',
      ...props,
    },
    global: {
      ...global,
    },
  })
}

describe('CompanyStep', () => {
  it('should render title', async () => {
    const wrapper = shallowMountComponent({
      title: 'Rendered title',
      formData: {},
    })

    await nextTick()

    expect(wrapper.props().title).toBe('Rendered title')
  })

  it('should render inputs', async () => {
    const formData = COMPANY_MOCK

    const stups = {
      stubs: {
        Step: {
          template: '<div><slot /></div>',
        },
      },
    }
    const wrapper = shallowMountComponent({ formData }, stups)
    const inputs = wrapper.findAllComponents(Input)

    expect(inputs).toHaveLength(4)
    expect(inputs[0].props().modelValue).toBe(formData.companyName)
    expect(inputs[1].props().mask).toBe(maskCNPJ)
    expect(inputs[1].props().modelValue).toBe(formData.cnpj)
    expect(inputs[2].props().mask).toBe(maskDate)
    expect(inputs[2].props().modelValue).toBe(formData.openingDate)
    expect(inputs[3].props().mask).toBe(maskPhone)
    expect(inputs[3].props().modelValue).toBe(formData.phone)
  })

  it('should show errors when fields are empty', async () => {
    const errors = {
      companyName: 'Nome da empresa é obrigatório',
      cnpj: 'CNPJ é obrigatório',
      openingDate: 'Data de abertura é obrigatória',
    }
    const formData = {
      companyName: '',
      cnpj: '',
      openingDate: '',
    }

    validateSchema.mockReturnValue({
      success: false,
      errors,
    })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)

    const nextAction = step.props().nextAction
    await expect(nextAction()).rejects.toThrow('Validation failed')

    expect(wrapper.vm.errors.companyName).toBe(errors.companyName)
    expect(wrapper.vm.errors.cnpj).toBe(errors.cnpj)
    expect(wrapper.vm.errors.openingDate).toBe(errors.openingDate)
  })

  it('should clear errors after successful validation', async () => {
    const formData = COMPANY_MOCK
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

  it('should display errors in inputs when validation fails', async () => {
    const errors = {
      companyName: 'Nome da empresa é obrigatório',
      cnpj: 'CNPJ é obrigatório',
      openingDate: 'Data de abertura é obrigatória',
    }
    const formData = COMPANY_MOCK
    validateSchema.mockReturnValue({
      success: false,
      errors,
    })

    const stups = {
      stubs: {
        Step: {
          props: ['nextAction'],
          template: '<div><slot /></div>',
        },
      },
    }

    const wrapper = shallowMountComponent({ formData }, stups)
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).rejects.toThrow('Validation failed')

    const inputs = wrapper.findAllComponents(Input)

    expect(inputs[0].props().error).toBe(errors.companyName)
    expect(inputs[1].props().error).toBe(errors.cnpj)
    expect(inputs[2].props().error).toBe(errors.openingDate)
  })

  it('should not show errors when validation is success', async () => {
    const formData = COMPANY_MOCK
    validateSchema.mockReturnValue({
      success: true,
      errors: {},
    })

    const wrapper = shallowMountComponent({ formData })
    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    await expect(nextAction()).resolves.toBeUndefined()

    const inputs = wrapper.findAllComponents(Input)
    inputs.forEach((input) => {
      expect(input.props().error).toBeUndefined()
    })
  })

  it('should execute handleSubmit successfully', async () => {
    const formData = COMPANY_MOCK
    validateSchema.mockReturnValue({ success: true, errors: {} })

    const wrapper = shallowMountComponent({ formData })

    await expect(wrapper.vm.handleSubmit()).resolves.toBeUndefined()
  })
})
