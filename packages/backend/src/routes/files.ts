import Router from '@koa/router'
import { FileService } from '../services/fileService'
import { Context } from 'koa'

const router = new Router({
  prefix: '/api/files'
})

const fileService = new FileService()

// Get directory contents
router.get('/list/:path*', async (ctx: Context) => {
  try {
    const fullPath = (ctx.params.path ?? '') + (ctx.params[0] ?? '')
    const contents = await fileService.getDirectoryContents(fullPath || '/')
    ctx.type = 'application/json'
    ctx.body = JSON.stringify(contents)
  } catch (error) {
    ctx.status = 500
    ctx.type = 'application/json'
    ctx.body = JSON.stringify({ error: (error as Error).message })
  }
})

// Download file
router.get('/download/:path*', async (ctx: Context) => {
  try {
    const fullPath = ctx.params.path + (ctx.params[0] ?? '')
    const file = await fileService.getFile(fullPath)
    ctx.type = 'application/octet-stream'
    ctx.body = file.content
    ctx.attachment(file.name)
  } catch (error) {
    ctx.status = 500
    ctx.type = 'application/json'
    ctx.body = JSON.stringify({ error: (error as Error).message })
  }
})

export const fileRouter = router
