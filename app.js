import express from 'express'
import { fileRouter } from './routes/file-route.js'

const app = express()
const PORT = 5200

app.disable('x-powered-by')

app.use('/files', fileRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
