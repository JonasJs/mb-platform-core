import { PERSON_TYPE_ENUM } from './CreateUser.schema.js'

export class CreateUserUseCase {
  async execute({
    email,
    personType,
    phone,
    password,
    companyName,
    cnpj,
    openingDate,
    name,
    cpf,
    birthDate,
  }) {
    if (personType === PERSON_TYPE_ENUM.COMPANY) {
      return {
        email,
        personType,
        phone,
        password,
        companyName,
        cnpj,
        openingDate,
      }
    }

    return {
      email,
      personType,
      phone,
      password,
      name,
      cpf,
      birthDate,
    }
  }
}
