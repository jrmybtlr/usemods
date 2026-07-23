import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { existsSync } from 'fs'

/**
 * Serve markdown documentation for AI agents and humans.
 * Prefers static public/docs (Cloudflare-friendly), then content/2.docs.
 */
export default defineEventHandler(async (event) => {
  const file = event.context.params?.file

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File parameter is required',
    })
  }

  const fileName = file.endsWith('.md') ? file : `${file}.md`
  const candidates = [
    resolve(process.cwd(), 'public', 'docs', fileName),
    resolve(process.cwd(), 'content', '2.docs', fileName),
  ]

  const contentPath = candidates.find(path => existsSync(path))

  if (!contentPath) {
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${fileName}`,
    })
  }

  try {
    const content = await readFile(contentPath, 'utf-8')

    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Access-Control-Allow-Methods', 'GET')

    return content
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    })
  }
})
