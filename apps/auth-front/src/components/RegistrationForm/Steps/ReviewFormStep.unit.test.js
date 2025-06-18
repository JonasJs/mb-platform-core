import { Input, RadioButton, Step } from '@mb-platform/design-system'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import ReviewFormStep from './ReviewFormStep.vue'

function shallowMountComponent(props, global) {
  return shallowMount(ReviewFormStep, {
    props: {
      title: 'Confirmação dos dados',
      formData: {
        email: 'email@email.com',
        personType: PERSON_TYPE_ENUM.INDIVIDUAL,
        name: 'Jonas Alves',
        cpf: '123.456.789-00',
        birthDate: '01/01/1990',
        phone: '(11) 99999-9999',
        password: 'senhaSegura123',
        ...props?.formData,
      },
      ...props,
    },
    global: {
      ...global,
    },
  })
}

describe('ReviewFormStep', () => {
  it('should render all inputs disabled', () => {
    const wrapper = shallowMountComponent()

    const inputs = wrapper.findAllComponents(Input)

    inputs.forEach((input) => {
      expect(input.props().disabled).toBe(true)
    })
  })

  it('should not render only the fields in formData', () => {
    const formData = {
      email: 'email@test.com',
      personType: 'COMPANY',
    }

    const wrapper = shallowMountComponent(
      { formData },
      {
        stubs: {
          Step: {
            template: '<div><slot /></div>',
          },
          RadioButton: true,
        },
      }
    )

    const inputs = wrapper.findAllComponents(Input)
    const radioButtons = wrapper.findAllComponents(RadioButton)

    radioButtons.forEach((radioButton) => {
      if (radioButton.props().value === PERSON_TYPE_ENUM.COMPANY) {
        expect(radioButton.props().disabled).toBe(true)
        expect(radioButton.props().value).toBe(PERSON_TYPE_ENUM.COMPANY)
      }
    })
    expect(inputs.length).toBe(1)
  })

  it('should emit "form-submitted" when next action is called and return a Promise', async () => {
    const wrapper = shallowMountComponent()

    const step = wrapper.findComponent(Step)
    const nextAction = step.props().nextAction

    const promise = nextAction()

    expect(promise).toBeInstanceOf(Promise)
    expect(wrapper.emitted('form-submitted')).toBeTruthy()

    const emittedEvent = wrapper.emitted('form-submitted')[0][0]

    expect(emittedEvent).toHaveProperty('resolve')
    expect(emittedEvent).toHaveProperty('reject')
    expect(typeof emittedEvent.resolve).toBe('function')
    expect(typeof emittedEvent.reject).toBe('function')

    emittedEvent.resolve()
    await promise
  })
})
