import Router from '@koa/router'
import { FileService } from '../services/fileService'

const router = new Router({
  prefix: '/api/files'
})

const fileService = new FileService()

// Get directory contents
router.get('/:path*', async (ctx) => {
  try {
    console.log(`Fetching contents of directory: ${ctx.params.path}`)
    const fullPath = ctx.params.path + (ctx.params[0] || '')
    const contents = await fileService.getDirectoryContents(fullPath)
    ctx.body = contents
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: (error as Error).message }
  }
})

// Download file
router.get('/download/:path*', async (ctx) => {
  try {
    const fullPath = ctx.params.path + (ctx.params[0] || '')
    const file = await fileService.getFile(fullPath)
    ctx.body = file.content
    ctx.attachment(file.name)
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: (error as Error).message }
  }
})

export const fileRouter = router
