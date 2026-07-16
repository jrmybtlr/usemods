import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { existsSync } from 'fs'

/**
 * Serve /intro/:name.md for AI agents (llmstxt.org page.md convention).
 */
export default defineEventHandler(async (event) => {
  const name = event.context.params?.name

  if (!name || name.includes('/') || name.includes('..')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid intro page name',
    })
  }

  const fileName = `${name}.md`
  const contentPath = resolve(process.cwd(), 'public', 'intro', fileName)

  if (!existsSync(contentPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Intro page not found: ${fileName}`,
    })
  }

  const content = await readFile(contentPath, 'utf-8')
  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET')
  return content
})
