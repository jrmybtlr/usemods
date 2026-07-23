import { readdir } from 'fs/promises'
import { resolve } from 'path'
import { existsSync } from 'fs'

/**
 * JSON index of markdown docs for AI agents.
 */
export default defineEventHandler(async () => {
  const candidates = [
    resolve(process.cwd(), 'public', 'docs'),
    resolve(process.cwd(), 'content', '2.docs'),
  ]

  const contentDir = candidates.find(path => existsSync(path))

  if (!contentDir) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Documentation directory not found',
    })
  }

  try {
    const files = await readdir(contentDir)
    const markdownFiles = files
      .filter(file => file.endsWith('.md') && file !== 'README.txt')
      .map(file => ({
        name: file,
        path: `/docs/${file}`,
        apiPath: `/api/docs/${file}`,
        slug: file.replace('.md', ''),
      }))

    return {
      files: markdownFiles,
      all: '/docs/all.md',
      llms: '/llms.txt',
      llmsFull: '/llms-full.txt',
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error reading directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
    })
  }
})
