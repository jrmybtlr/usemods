/**
 * Ensure AI-facing markdown and discovery files are CORS-friendly
 * with correct content types for agent fetchers.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname

  const isMarkdown = path.endsWith('.md')
    && (path.startsWith('/docs/') || path.startsWith('/intro/') || path.startsWith('/api/docs/'))
  const isLlms = path === '/llms.txt' || path === '/llms-full.txt'
  const isRobots = path === '/robots.txt'

  if (!isMarkdown && !isLlms && !isRobots) {
    return
  }

  setHeader(event, 'Access-Control-Allow-Origin', '*')
  setHeader(event, 'Access-Control-Allow-Methods', 'GET')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  if (isMarkdown) {
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  }
  else {
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  }
})
