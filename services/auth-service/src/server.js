import express from 'express'
import { router } from './routes/index.js'
import { AppError } from './errors/app-error.js'

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use((error, _, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      type: error.type,
      ...(error?.data && { data: error?.data }),
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  })
})

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `🚀 Auth Service running on port ${PORT}`)
})
