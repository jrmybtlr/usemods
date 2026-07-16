import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { existsSync } from 'fs'

/**
 * Serve /docs/:name.md for AI agents (llmstxt.org page.md convention).
 */
export default defineEventHandler(async (event) => {
  const name = event.context.params?.name

  if (!name || name.includes('/') || name.includes('..')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid documentation name',
    })
  }

  const fileName = `${name}.md`
  const candidates = [
    resolve(process.cwd(), 'public', 'docs', fileName),
    resolve(process.cwd(), 'content', '2.docs', fileName),
  ]
  const contentPath = candidates.find(path => existsSync(path))

  if (!contentPath) {
    throw createError({
      statusCode: 404,
      statusMessage: `Documentation not found: ${fileName}`,
    })
  }

  const content = await readFile(contentPath, 'utf-8')
  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET')
  return content
})
