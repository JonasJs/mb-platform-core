const PERSON_TYPE_ENUM = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
}

export const createUserCompanySchema = {
  fields: {
    companyName: {
      type: 'string',
      required: true,
    },
    cnpj: {
      type: 'string',
      required: true,
    },
    openingDate: {
      type: 'string',
      required: true,
    },
  },
}

export const createUserIndivisualSchema = {
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    cpf: {
      type: 'string',
      required: true,
    },
    birthDate: {
      type: 'string',
      required: true,
    },
  },
}

export const createUserBaseSchema = {
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
    phone: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
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
