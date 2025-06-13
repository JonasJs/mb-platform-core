import { validateSchema } from '@mb-platform/form-guard'
import { CreateUserUseCase } from './CreateUserUseCase.js'
import { AppError } from '../../../../errors/app-error.js'
import { buildCreateUserSchema } from './CreateUser.schema.js'

export class CreateUserController {
  async handle(req, res) {
    const payload = req.body

    const schema = buildCreateUserSchema(payload?.personType)

    const validateResult = validateSchema({
      schema,
      data: payload,
    })

    if (!validateResult.success) {
      throw new AppError('Invalid fields', 400, validateResult?.formattedError)
    }

    const createUserUseCase = new CreateUserUseCase()

    const result = await createUserUseCase.execute(payload)

    return res.status(201).json(result)
  }
}
