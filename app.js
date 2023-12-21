import express from 'express'
import { corsMiddlewares } from './middlewares/cors.js'
import { fileRouter } from './routes/file-route.js'

const app = express()
const PORT = 5200

app.disable('x-powered-by')

app.use(corsMiddlewares())
app.use('/files', fileRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
