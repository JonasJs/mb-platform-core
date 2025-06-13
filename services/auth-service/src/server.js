import express from 'express'
import { router } from './routes/index.js'

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `🚀 Auth Service running on port ${PORT}`)
})
