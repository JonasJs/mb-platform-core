import { validations, VALIDATIONS_ENUM } from '@mb-platform/form-guard'

export const PERSON_TYPE_ENUM = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
}

export const createUserCompanySchema = {
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

export const createUserIndivisualSchema = {
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
  },
}

export const createUserBaseSchema = {
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
    phone: {
      type: 'string',
      required: true,
      validation: {
        validate: VALIDATIONS_ENUM.IS_NOT_EMPTY,
        message: 'Telefone é obrigatório!',
      },
    },
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

const conditionalFieldsMap = {
  [PERSON_TYPE_ENUM.COMPANY]: createUserCompanySchema.fields,
  [PERSON_TYPE_ENUM.INDIVIDUAL]: createUserIndivisualSchema.fields,
}

export function buildCreateUserSchema(personType) {
  const extraFields = conditionalFieldsMap[personType] ?? {}

  return {
    fields: {
      ...createUserBaseSchema.fields,
      ...extraFields,
    },
  }
}
