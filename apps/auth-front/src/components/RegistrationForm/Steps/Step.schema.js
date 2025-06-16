import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import { validations, VALIDATIONS_ENUM } from '@mb-platform/form-guard'

export const welcomeSchema = {
  fields: {
    email: {
      type: 'string',
      required: true,
      validation: {
        validate: (value) => {
          return validations.isNotEmpty && validations.isValidEmail(value)
        },
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

export const individualStepSchema = {
  fields: {
    name: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Nome é obrigatório!',
      },
    },
    cpf: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_CPF,
        message: 'CPF inválido!',
      },
    },
    birthDate: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Data de nascimento é obrigatória!',
      },
    },
    phone: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Telefone é obrigatório!',
      },
    },
  },
}

export const companyStepSchema = {
  fields: {
    companyName: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Nome é obrigatório!',
      },
    },
    cnpj: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'CNPJ é obrigatório!',
      },
    },
    openingDate: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Data de abertura é obrigatória!',
      },
    },
  },
}

export const passwordStepSchema = {
  fields: {
    password: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Senha obrigatória!',
      },
    },
  },
}
