/**
 * Regenerate only AI discovery assets (llms.txt, public markdown)
 * without rebuilding the full Vue docs surface.
 */
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import { promises as fsPromises } from 'fs'

const root = resolve(import.meta.dirname, '..')
const docsPagesDir = resolve(import.meta.dirname, 'pages')
const nuxtWebPath = resolve(root, 'nuxt-web')
const srcPath = resolve(root, 'src')

const metadataPattern = /\/\/\s+(title|description|lead):\s+([^\r\n]*)/g
const files = ['formatters', 'modifiers', 'generators', 'actions', 'numbers', 'data', 'validators', 'detections', 'devices', 'goodies', 'tailwind']

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
}

async function generatePublicAiDocs() {
  const publicDocsDir = join(nuxtWebPath, 'public', 'docs')
  const publicIntroDir = join(nuxtWebPath, 'public', 'intro')
  await fsPromises.mkdir(publicDocsDir, { recursive: true })
  await fsPromises.mkdir(publicIntroDir, { recursive: true })

  const docModules = files.filter(file => file !== 'tailwind')
  const tocEntries = []

  for (const file of docModules) {
    const sourcePath = join(docsPagesDir, `${file}.md`)
    const content = await fsPromises.readFile(sourcePath, 'utf8')
    await fsPromises.writeFile(join(publicDocsDir, `${file}.md`), content)
    const titleMatch = content.match(/^#\s+(.+)$/m)
    tocEntries.push({
      name: file,
      title: titleMatch?.[1]?.trim() || file,
      content,
    })
  }

  const introSources = [
    { source: join(nuxtWebPath, 'content', '1.intro', '1.introduction.md'), dest: 'introduction.md' },
    { source: join(nuxtWebPath, 'content', '1.intro', '2.installation.md'), dest: 'installation.md' },
  ]

  for (const intro of introSources) {
    const content = await fsPromises.readFile(intro.source, 'utf8')
    await fsPromises.writeFile(join(publicIntroDir, intro.dest), stripFrontmatter(content))
  }

  let allMarkdownContent = `# UseMods Documentation\n\n`
  allMarkdownContent += `Complete documentation for all UseMods functions, optimized for AI and LLM consumption.\n\n`
  allMarkdownContent += `## Table of Contents\n\n`
  for (const entry of tocEntries) {
    allMarkdownContent += `- [${entry.title}](#${entry.name})\n`
  }
  allMarkdownContent += `\n---\n\n`
  for (const entry of tocEntries) {
    allMarkdownContent += entry.content
    allMarkdownContent += `\n---\n\n`
  }

  await fsPromises.writeFile(join(publicDocsDir, 'all.md'), allMarkdownContent)
  console.log('Generated public/docs markdown')
}

async function generateLLMsTxt() {
  const baseUrl = 'https://usemods.com'
  const introLinks = [
    { path: '/intro/introduction.md', title: 'Introduction', lead: 'What UseMods is and why it exists.' },
    { path: '/intro/installation.md', title: 'Installation', lead: 'Install with npm, pnpm, yarn, bun, or the Nuxt module.' },
  ]

  const docLinks = []
  for (const file of files) {
    if (file === 'tailwind') continue
    const content = await fsPromises.readFile(join(srcPath, `${file}.ts`), 'utf8')
    const metadata = Object.fromEntries([...content.matchAll(metadataPattern)].map(match => [match[1], match[2]]))
    docLinks.push({
      path: `/docs/${file}.md`,
      title: metadata.title || file,
      lead: metadata.description || '',
    })
  }

  let llmsContent = `# UseMods\n\n`
  llmsContent += `> Zero-dependency JavaScript utility library with formatters, validators, generators, modifiers, and browser helpers for frontend and SSR apps.\n\n`
  llmsContent += `UseMods works with Nuxt, Next.js, Vue, React, Svelte, Solid, and Node. Prefer the markdown links below for LLM context; HTML docs are at the same paths without \`.md\`.\n\n`
  llmsContent += `- Package: \`usemods\` on npm\n`
  llmsContent += `- Nuxt module: \`usemods-nuxt\`\n`
  llmsContent += `- License: MIT\n`
  llmsContent += `- Repository: https://github.com/LittleFoxCompany/usemods\n\n`
  llmsContent += `## Getting Started\n\n`
  for (const link of introLinks) {
    llmsContent += `- [${link.title}](${baseUrl}${link.path}): ${link.lead}\n`
  }
  llmsContent += `\n## Documentation\n\n`
  for (const link of docLinks) {
    const note = link.lead ? `: ${link.lead}` : ''
    llmsContent += `- [${link.title}](${baseUrl}${link.path})${note}\n`
  }
  llmsContent += `\n## Full corpus\n\n`
  llmsContent += `- [Complete documentation](${baseUrl}/docs/all.md): All modules in one markdown file\n`
  llmsContent += `- [llms-full.txt](${baseUrl}/llms-full.txt): Full documentation corpus for RAG / agent ingest\n`
  llmsContent += `- [Documentation index API](${baseUrl}/api/docs/): JSON index of available markdown files\n\n`
  llmsContent += `## Optional\n\n`
  llmsContent += `- [HTML documentation home](${baseUrl}/intro/introduction): Human-oriented docs UI\n`
  llmsContent += `- [Sitemap](${baseUrl}/sitemap.xml): All indexable HTML pages\n`
  llmsContent += `- [GitHub repository](https://github.com/LittleFoxCompany/usemods): Source code and issues\n`

  await fsPromises.writeFile(join(nuxtWebPath, 'public', 'llms.txt'), llmsContent)
  console.log('Generated llms.txt')
}

async function generateLLMsFullTxt() {
  const baseUrl = 'https://usemods.com'
  const allMarkdownContent = await fsPromises.readFile(join(nuxtWebPath, 'public', 'docs', 'all.md'), 'utf8')
  let llmsFullContent = `# UseMods - Full Documentation\n\n`
  llmsFullContent += `Complete documentation for all UseMods functions, optimized for AI and LLM consumption.\n\n`
  llmsFullContent += `Base URL: ${baseUrl}\n`
  llmsFullContent += `Index: ${baseUrl}/llms.txt\n\n`
  llmsFullContent += `---\n\n`
  llmsFullContent += allMarkdownContent
  await fsPromises.writeFile(join(nuxtWebPath, 'public', 'llms-full.txt'), llmsFullContent)
  console.log('Generated llms-full.txt')
}

async function generateSitemap() {
  const baseUrl = 'https://usemods.com'
  const currentDate = new Date().toISOString()
  const docModules = files.filter(file => file !== 'tailwind')

  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  const urls = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/intro/introduction', priority: '0.9', changefreq: 'monthly' },
    { path: '/intro/installation', priority: '0.9', changefreq: 'monthly' },
    ...docModules.flatMap(file => [
      { path: `/docs/${file}`, priority: '0.8', changefreq: 'weekly' },
      { path: `/docs/${file}.md`, priority: '0.7', changefreq: 'weekly' },
    ]),
    { path: '/llms.txt', priority: '0.9', changefreq: 'weekly' },
    { path: '/llms-full.txt', priority: '0.8', changefreq: 'weekly' },
    { path: '/docs/all.md', priority: '0.8', changefreq: 'weekly' },
    { path: '/intro/introduction.md', priority: '0.7', changefreq: 'weekly' },
    { path: '/intro/installation.md', priority: '0.7', changefreq: 'weekly' },
  ]

  for (const page of urls) {
    sitemapContent += '  <url>\n'
    sitemapContent += `    <loc>${baseUrl}${page.path}</loc>\n`
    sitemapContent += `    <lastmod>${currentDate}</lastmod>\n`
    sitemapContent += `    <changefreq>${page.changefreq}</changefreq>\n`
    sitemapContent += `    <priority>${page.priority}</priority>\n`
    sitemapContent += '  </url>\n'
  }

  sitemapContent += '</urlset>\n'
  await fsPromises.writeFile(join(nuxtWebPath, 'public', 'sitemap.xml'), sitemapContent)
  console.log('Generated sitemap.xml')
}

export async function generateAiDiscoveryAssets() {
  await generatePublicAiDocs()
  await generateLLMsTxt()
  await generateLLMsFullTxt()
  await generateSitemap()
  console.log('AI discovery assets ready')
}

const isDirectRun = process.argv[1]
  && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))

if (isDirectRun) {
  await generateAiDiscoveryAssets()
}
