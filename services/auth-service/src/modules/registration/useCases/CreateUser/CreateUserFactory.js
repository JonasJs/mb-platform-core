import { RegistrationRepository } from '../../repositories/RegistrationRepository.js'
import { RegistrationRepositoryForm } from '../../repositories/RegistrationRepositoryForm.js'
import { CreateUserUseCase } from './CreateUserUseCase.js'

export function createUserFactory() {
  /**
   * Crie um factory pois caso no futuro queira mudar o repository fica
   * mais simples apenas mudar para onde queremos utilizar
   */

  const isProd = process.env.NODE_ENV === 'production'

  // Crie apenas um exemplo de uso, aqui em tempo de dev usamos o repository do form
  const registrationRepository = isProd
    ? new RegistrationRepository()
    : new RegistrationRepositoryForm()

  const createUserUseCaseFactory = new CreateUserUseCase(registrationRepository)

  return createUserUseCaseFactory
}
