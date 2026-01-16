import { readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  const file = event.context.params?.file

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File parameter is required',
    })
  }

  // Ensure the file has .md extension
  const fileName = file.endsWith('.md') ? file : `${file}.md`

  // Get the content directory path relative to the nuxt-web directory
  // In Nuxt, server routes run from the project root (nuxt-web)
  const contentPath = resolve(process.cwd(), 'content', '2.docs', fileName)

  // Check if file exists
  if (!existsSync(contentPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${fileName}`,
    })
  }

  try {
    const content = await readFile(contentPath, 'utf-8')

    // Set proper headers for markdown
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    // Allow CORS for AI/LLM consumption
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
