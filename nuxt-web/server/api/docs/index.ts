import { readdir } from 'fs/promises'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const contentDir = resolve(process.cwd(), 'content', '2.docs')

  try {
    const files = await readdir(contentDir)
    const markdownFiles = files
      .filter(file => file.endsWith('.md') && file !== 'README.txt')
      .map(file => ({
        name: file,
        path: `/api/docs/${file}`,
        slug: file.replace('.md', ''),
      }))

    return {
      files: markdownFiles,
      all: '/api/docs/all.md',
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error reading directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
    })
  }
})
