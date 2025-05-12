import Koa from 'koa'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'

import { fileRouter } from './routes/files'

const app = new Koa()

// Middleware
app.use(cors())
app.use(koaBody())

// Routes
app.use(fileRouter.allowedMethods())
app.use(fileRouter.routes())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
