import path from 'path'
import express, { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

// eslint-disable-next-line @stylistic/max-len
import { CreateUserController } from '@modules/registration/useCases/CreateUser/CreateUserController'

const registrationRoutes = Router()
const authFrontDist = path.resolve(
  path.resolve(),
  '../../apps/auth-front/dist'
)
const isProd = process.env.NODE_ENV === 'production'

// Controllers
const createUserController = new CreateUserController()

// Routes
registrationRoutes.post('/', createUserController.handle)

// Front routes
if (isProd) {
  registrationRoutes.use(express.static(authFrontDist))
  registrationRoutes.get('/', (_req, res) => {
    res.sendFile(path.join(authFrontDist, 'index.html'))
  })
} else {
  registrationRoutes.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173/registration',
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
      filter: (pathname, req) => req.method === 'GET',
      pathRewrite: { '^/': '' },
    })
  )
}

export { registrationRoutes }
