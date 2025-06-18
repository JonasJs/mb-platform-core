import { AppError } from '../../../../errors/app-error.js'
import { PERSON_TYPE_ENUM } from './CreateUser.schema.js'
export class CreateUserUseCase {
  constructor(registrationRepository) {
    this.registrationRepository = registrationRepository
  }

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
    try {
      await this.registrationRepository.createUser({
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
      })

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
    } catch (error) {
      throw new AppError('Create user error', 400)
    }
  }
}
