import Koa from 'koa'
import Router from '@koa/router'
import { koaBody } from 'koa-body'
import cors from 'koa-cors'

import { fileRouter } from './routes/files'

const app = new Koa()
const router = new Router()

// Middleware
app.use(cors())
app.use(koaBody())

// Routes
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
