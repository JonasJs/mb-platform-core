import path from 'path'
import express, { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const registrationRoutes = Router()
const authFrontDist = path.resolve(
  path.resolve(),
  '../../apps/auth-front/dist'
)
const isProd = process.env.NODE_ENV === 'production'

registrationRoutes.post('/check', (_req, res) => {
  res.json({ message: 'registration check' })
})

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
