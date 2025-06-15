import { isValidEmail, isNotEmpty } from './validations.js'

export const VALIDATIONS_ENUM = {
  EMAIL: 'email',
  NOT_EMPTY: 'notEmpty',
}

export function buildValidations() {
  return {
    [VALIDATIONS_ENUM.EMAIL]: isValidEmail,
    [VALIDATIONS_ENUM.NOT_EMPTY]: isNotEmpty,
  }
}
