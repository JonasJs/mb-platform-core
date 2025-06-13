import { Router } from 'express'
import { registrationRoutes } from './registration.routes.js'

const router = Router()

router.use('/registration', registrationRoutes)

export { router }
