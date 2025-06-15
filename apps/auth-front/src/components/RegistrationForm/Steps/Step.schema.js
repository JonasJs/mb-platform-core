import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import { VALIDATIONS_ENUM } from '@mb-platform/form-guard'

export const welcomeSchema = {
  fields: {
    email: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.EMAIL,
        message: 'e-mail inválido!',
      },
    },
    personType: {
      type: 'string',
      required: true,
      enum: Object.values(PERSON_TYPE_ENUM),
    },
  },
}
