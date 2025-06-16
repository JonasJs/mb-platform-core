import { isValidEmail, isNotEmpty, isCpf, isCnpj } from './validations.js'

export const VALIDATIONS_ENUM = {
  EMAIL: 'email',
  IS_NOT_EMPTY: 'notEmpty',
  IS_CPF: 'isCpf',
  IS_CNPJ: 'isCnpj',
}

export function buildValidations() {
  return {
    [VALIDATIONS_ENUM.EMAIL]: isValidEmail,
    [VALIDATIONS_ENUM.IS_NOT_EMPTY]: isNotEmpty,
    [VALIDATIONS_ENUM.IS_CPF]: isCpf,
    [VALIDATIONS_ENUM.IS_CNPJ]: isCnpj,
  }
}
