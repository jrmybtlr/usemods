import { readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  // Get the public directory path
  const publicPath = resolve(process.cwd(), 'public', 'llms.txt')

  // Check if file exists
  if (!existsSync(publicPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'llms.txt not found. Please run the docs build script first.',
    })
  }

  try {
    const content = await readFile(publicPath, 'utf-8')

    // Set proper headers for LLMs.txt
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    // Allow CORS for AI/LLM consumption
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Access-Control-Allow-Methods', 'GET')

    return content
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error reading llms.txt: ${error instanceof Error ? error.message : 'Unknown error'}`,
    })
  }
})
