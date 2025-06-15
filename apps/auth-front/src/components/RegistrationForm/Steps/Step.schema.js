import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'

export const welcomeSchema = {
  fields: {
    email: {
      type: 'string',
      required: true,
    },
    personType: {
      type: 'string',
      required: true,
      enum: Object.values(PERSON_TYPE_ENUM),
    },
  },
}
