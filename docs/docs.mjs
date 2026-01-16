import { resolve, extname, basename, join } from 'path'
import { watch, promises as fsPromises } from 'fs'
import { argv } from 'process'
import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'

const { readFile, writeFile, copyFile, readdir, unlink, access } = fsPromises

// Arguments
const args = argv.slice(2)

// Paths
const srcPath = resolve(import.meta.dirname, '../src')
const nuxtWebPath = resolve(import.meta.dirname, '../nuxt-web')

// Functions
const functionPattern = /\/\*\*[\s\S]*?\*\/\s*(export\s+function\s+([a-zA-Z0-9_]+)\s*(?:<[^(]*?(?:\([^)]*\)[^(]*?)*>)?\s*\([\s\S]*?\)\s*:\s*([\w<>,[\]\s]+(?:\{[\s\S]*?})?)?)/gms
const metadataPattern = /\/\/\s+(title|description|lead):\s+([^\r\n]*)/g
const jsdocPattern = /\/\*\*([\s\S]*?)\*\//g

// Files
const files = ['formatters', 'modifiers', 'generators', 'actions', 'numbers', 'data', 'validators', 'detections', 'devices', 'goodies', 'tailwind']

// Map file names to component directory names
const componentDirMap = {
  formatters: 'formatters',
  modifiers: 'modifiers',
  generators: 'generators',
  actions: 'actions',
  numbers: 'numbers',
  data: 'data',
  validators: 'validators',
  detections: 'dectectors', // Note: typo in directory name
  devices: 'devices',
  goodies: 'goodies',
}

// Parse TypeScript function parameters, handling nested types
function parseParams(paramsString) {
  const params = []
  let current = ''
  let depth = 0
  let inString = false
  let stringChar = null

  for (let i = 0; i < paramsString.length; i++) {
    const char = paramsString[i]
    const prevChar = i > 0 ? paramsString[i - 1] : ''

    // Handle string literals
    if ((char === '"' || char === '\'') && prevChar !== '\\') {
      if (!inString) {
        inString = true
        stringChar = char
      }
      else if (char === stringChar) {
        inString = false
        stringChar = null
      }
      current += char
      continue
    }

    if (inString) {
      current += char
      continue
    }

    // Track depth for nested braces, brackets, and parentheses
    if (char === '{' || char === '[' || char === '(') {
      depth++
      current += char
    }
    else if (char === '}' || char === ']' || char === ')') {
      depth--
      current += char
    }
    else if (char === ',' && depth === 0) {
      // At top level, split on comma
      const trimmed = current.trim()
      if (trimmed) {
        const colonIndex = trimmed.indexOf(':')
        if (colonIndex > 0) {
          const name = trimmed.substring(0, colonIndex).trim()
          const type = trimmed.substring(colonIndex + 1).trim()
          params.push({ name, type })
        }
      }
      current = ''
    }
    else {
      current += char
    }
  }

  // Handle last parameter
  if (current.trim()) {
    const trimmed = current.trim()
    const colonIndex = trimmed.indexOf(':')
    if (colonIndex > 0) {
      const name = trimmed.substring(0, colonIndex).trim()
      const type = trimmed.substring(colonIndex + 1).trim()
      params.push({ name, type })
    }
  }

  return params
}

// Convert function name to component name
// Some components use PascalCase, some use camelCase
function getComponentName(functionName) {
  // Check common camelCase exceptions (exact function names that match component files)
  const camelCaseExceptions = [
    'formatList', 'formatSentenceCase',
    'deslugify', 'slugify', 'stripNumbers', 'surroundWith',
    'EndWith', 'EndWithout', 'StartWith', 'StartWithout',
    'decodeShortUuid', 'decodeUuid7', 'generateHash', 'generateHighResolutionTime',
    'generateRandomIndex', 'generateShortUuid', 'GetSecureRandomValues',
  ]

  if (camelCaseExceptions.includes(functionName)) {
    return functionName
  }

  // Default to PascalCase
  return functionName.charAt(0).toUpperCase() + functionName.slice(1)
}

async function generateVue(file, name) {
  const content = await readFile(file, 'utf8')
  const metadata = Object.fromEntries([...content.matchAll(metadataPattern)].map(match => [match[1], match[2]]))
  await copyFile(file, join(nuxtWebPath, 'utils/mods', basename(file)))

  // If Tailwind stop here
  // If you're reading this...it's a great first fix to contribute to the project.

  if (name === '11.tailwind') return

  const fileBaseName = basename(file, extname(file))
  const category = fileBaseName
  const componentDir = componentDirMap[category] || category

  // Functions
  const functions = [...content.matchAll(functionPattern)]
  const toc = functions.map(match => match[2])

  // Build imports
  const imports = new Set()
  const componentUsages = []

  for (const match of functions) {
    const [full] = match.slice(0)
    const [, functionName] = match.slice(1)
    const jsdoc = full.match(jsdocPattern)[0]
    const description = jsdoc.replace(/\/\*\*|\*\/|\*/g, '').replace(/@\w+.*$/gm, '').trim()
    const info = (jsdoc.match(/@info\s+(.*)/) || [])[1]?.trim() || ''

    // Extract function signature
    const signatureMatch = full.match(/export function \w+\s*\(([\s\S]*?)\):\s*([^{]+)/)
    const params = signatureMatch
      ? parseParams(signatureMatch[1])
      : []

    let componentName = getComponentName(functionName)
    const componentDirPath = join(nuxtWebPath, 'components/content', componentDir)

    // Find the actual component file name by checking what exists
    let componentSuffix = '.vue'
    let actualComponentName = componentName
    
    // Normalize function name for comparison (lowercase, remove special chars)
    const normalizeName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const targetNormalized = normalizeName(functionName)
    
    // List all files in the component directory
    let componentFiles = []
    try {
      componentFiles = await readdir(componentDirPath)
    }
    catch {
      console.warn(`Warning: Component directory not found: ${componentDirPath}`)
    }
    
    // Find matching component file (case-insensitive match)
    let found = false
    for (const file of componentFiles) {
      if (!file.endsWith('.vue')) continue
      
      const baseName = file.replace(/\.(client\.)?vue$/, '')
      const normalizedBase = normalizeName(baseName)
      
      // Check if this file matches the function name
      if (normalizedBase === targetNormalized || 
          normalizeName(componentName) === normalizedBase ||
          normalizeName(functionName) === normalizedBase) {
        actualComponentName = baseName
        componentSuffix = file.endsWith('.client.vue') ? '.client.vue' : '.vue'
        found = true
        break
      }
    }
    
    if (!found) {
      // Fallback: try common naming patterns
      const patterns = [componentName, functionName]
      
      // Add acronym variations
      if (functionName.includes('Ip')) patterns.push(functionName.replace(/Ip/g, 'IP'))
      if (functionName.includes('Id')) patterns.push(functionName.replace(/Id/g, 'ID'))
      if (functionName.includes('Url')) patterns.push(functionName.replace(/Url/g, 'URL'))
      if (functionName.includes('Uuid')) patterns.push(functionName.replace(/Uuid/g, 'UUID'))
      
      for (const pattern of patterns) {
        const clientPath = join(componentDirPath, `${pattern}.client.vue`)
        const regularPath = join(componentDirPath, `${pattern}.vue`)
        
        try {
          await access(clientPath)
          actualComponentName = pattern
          componentSuffix = '.client.vue'
          found = true
          break
        }
        catch {
          try {
            await access(regularPath)
            actualComponentName = pattern
            found = true
            break
          }
          catch {
            // Continue
          }
        }
      }
    }
    
    if (!found) {
      console.warn(`Warning: Component not found for ${functionName} in ${componentDir}, using ${actualComponentName}`)
    }

    // Use PascalCase for component name in template and import (Vue convention)
    // but keep the actual file name for the import path
    const templateComponentName = actualComponentName.charAt(0).toUpperCase() + actualComponentName.slice(1)
    
    imports.add(`import ${templateComponentName} from '~/components/content/${componentDir}/${actualComponentName}${componentSuffix}'`)
    
    componentUsages.push({
      functionName,
      componentName: templateComponentName,
      description,
      info,
      params: JSON.stringify(params),
    })
  }

  // Generate Vue SFC
  let vueContent = '<template>\n'
  vueContent += '  <DocsLayout>\n'
  vueContent += '    <PageTitle>\n'
  vueContent += `      <h1>${metadata.title}</h1>\n`
  vueContent += `      <p>${metadata.description}</p>\n`
  vueContent += '    </PageTitle>\n\n'

  for (const usage of componentUsages) {
    const escapedDescription = usage.description
      .replace(/"/g, '&quot;')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    const escapedInfo = usage.info
      .replace(/"/g, '&quot;')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    // Use single-quoted HTML attribute with JSON inside (JSON uses double quotes naturally)
    // Escape single quotes using HTML entity &#39; since HTML doesn't use backslash escaping
    const escapedParams = usage.params.replace(/'/g, '&#39;')

    vueContent += `    <PageFunction\n`
    vueContent += `      name="${usage.functionName}"\n`
    vueContent += `      description="${escapedDescription}"\n`
    if (usage.info) {
      vueContent += `      info="${escapedInfo}"\n`
    }
    vueContent += `      params='${escapedParams}'\n`
    vueContent += '    >\n'
    vueContent += `      <${usage.componentName} />\n`
    vueContent += '    </PageFunction>\n\n'
  }

  vueContent += '  </DocsLayout>\n'
  vueContent += '</template>\n\n'

  vueContent += '<script setup lang="ts">\n'
  vueContent += 'import DocsLayout from \'~/components/DocsLayout.vue\'\n'
  vueContent += 'import PageTitle from \'~/components/content/PageTitle.vue\'\n'
  vueContent += 'import PageFunction from \'~/components/content/PageFunction.vue\'\n'
  for (const importLine of Array.from(imports).sort()) {
    vueContent += importLine + '\n'
  }
  vueContent += '\n'
  vueContent += `const toc = ${JSON.stringify(toc)}\n`
  vueContent += `const pageId = '${fileBaseName}'\n`
  vueContent += '\n'
  vueContent += 'provide(\'toc\', toc)\n'
  vueContent += 'provide(\'pageId\', pageId)\n'
  vueContent += '</script>\n'

  // Ensure docs directory exists
  const docsDir = join(nuxtWebPath, 'pages', 'docs')
  try {
    await fsPromises.mkdir(docsDir, { recursive: true })
  }
  catch {
    // Directory might already exist
  }

  await writeFile(join(docsDir, `${fileBaseName}.vue`), vueContent)
}

async function generateMarkdown(file, name) {
  const content = await readFile(file, 'utf8')
  const metadata = Object.fromEntries([...content.matchAll(metadataPattern)].map(match => [match[1], match[2]]))

  // If Tailwind stop here (same as Vue generation)
  if (name === '11.tailwind') return

  const fileBaseName = basename(file, extname(file))

  // Functions
  const functions = [...content.matchAll(functionPattern)]

  // Build markdown content
  let markdownContent = `# ${metadata.title || fileBaseName}\n\n`
  markdownContent += `${metadata.description || ''}\n\n`
  markdownContent += `## Functions\n\n`

  for (const match of functions) {
    const [full] = match.slice(0)
    const [, functionName] = match.slice(1)
    const jsdoc = full.match(jsdocPattern)?.[0] || ''
    const description = jsdoc.replace(/\/\*\*|\*\/|\*/g, '').replace(/@\w+.*$/gm, '').trim()
    const info = (jsdoc.match(/@info\s+(.*)/) || [])[1]?.trim() || ''

    // Extract function signature for return type
    const signatureMatch = full.match(/export function \w+\s*\(([\s\S]*?)\):\s*([^{]+)/)
    const params = signatureMatch
      ? parseParams(signatureMatch[1])
      : []
    const returnType = signatureMatch?.[2]?.trim() || 'void'

    markdownContent += `### ${functionName}\n\n`
    markdownContent += `**Description:** ${description || 'No description available.'}\n\n`

    if (params.length > 0) {
      markdownContent += `**Parameters:**\n`
      for (const param of params) {
        markdownContent += `- \`${param.name}\` (\`${param.type}\`)\n`
      }
      markdownContent += `\n`
    }

    markdownContent += `**Returns:** \`${returnType}\`\n\n`

    if (info) {
      markdownContent += `${info}\n\n`
    }
  }

  // Ensure content directory exists
  const contentDir = join(nuxtWebPath, 'content', '2.docs')
  try {
    await fsPromises.mkdir(contentDir, { recursive: true })
  }
  catch {
    // Directory might already exist
  }

  await writeFile(join(contentDir, `${fileBaseName}.md`), markdownContent)
}

async function generateAllMarkdown() {
  const contentDir = join(nuxtWebPath, 'content', '2.docs')
  
  // Ensure content directory exists
  try {
    await fsPromises.mkdir(contentDir, { recursive: true })
  }
  catch {
    // Directory might already exist
  }

  // Get all markdown files (excluding all.md and README.txt)
  const allFiles = files.filter(file => file !== 'tailwind')
  const markdownFiles = []
  const tocEntries = []

  // Read metadata for table of contents
  for (const file of allFiles) {
    const filePath = join(srcPath, `${file}.ts`)
    try {
      const content = await readFile(filePath, 'utf8')
      const metadata = Object.fromEntries([...content.matchAll(metadataPattern)].map(match => [match[1], match[2]]))
      tocEntries.push({
        name: file,
        title: metadata.title || file,
      })
    }
    catch {
      // File might not exist, skip
    }
  }

  // Build table of contents
  let allMarkdownContent = `# UseMods Documentation\n\n`
  allMarkdownContent += `Complete documentation for all UseMods functions, optimized for AI and LLM consumption.\n\n`
  allMarkdownContent += `## Table of Contents\n\n`
  for (const entry of tocEntries) {
    // Create anchor-friendly slug from title
    const anchor = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    allMarkdownContent += `- [${entry.title}](#${anchor})\n`
  }
  allMarkdownContent += `\n---\n\n`

  // Read and combine all markdown files
  for (const file of allFiles) {
    const markdownPath = join(contentDir, `${file}.md`)
    try {
      const content = await readFile(markdownPath, 'utf8')
      allMarkdownContent += content
      allMarkdownContent += `\n---\n\n`
    }
    catch {
      // Markdown file might not exist yet, skip
      console.warn(`Warning: Markdown file not found: ${markdownPath}`)
    }
  }

  await writeFile(join(contentDir, 'all.md'), allMarkdownContent)
}

async function generateSitemap() {
  const baseUrl = 'https://usemods.com'
  const currentDate = new Date().toISOString()
  
  // Helper function to get file modification time
  async function getFileModTime(filePath) {
    try {
      const stats = await fsPromises.stat(filePath)
      return stats.mtime.toISOString()
    }
    catch {
      return currentDate
    }
  }
  
  // Start XML sitemap
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add homepage
  sitemapContent += '  <url>\n'
  sitemapContent += `    <loc>${baseUrl}/</loc>\n`
  sitemapContent += `    <lastmod>${currentDate}</lastmod>\n`
  sitemapContent += '    <changefreq>weekly</changefreq>\n'
  sitemapContent += '    <priority>1.0</priority>\n'
  sitemapContent += '  </url>\n'
  
  // Add intro pages
  const introPages = [
    { path: '/intro/introduction', file: '1.intro/1.introduction.md', priority: '0.9' },
    { path: '/intro/installation', file: '1.intro/2.installation.md', priority: '0.9' }
  ]
  
  for (const page of introPages) {
    const contentPath = join(nuxtWebPath, 'content', page.file)
    const lastmod = await getFileModTime(contentPath)
    
    sitemapContent += '  <url>\n'
    sitemapContent += `    <loc>${baseUrl}${page.path}</loc>\n`
    sitemapContent += `    <lastmod>${lastmod}</lastmod>\n`
    sitemapContent += '    <changefreq>monthly</changefreq>\n'
    sitemapContent += `    <priority>${page.priority}</priority>\n`
    sitemapContent += '  </url>\n'
  }
  
  // Add doc pages (excluding tailwind)
  const docFiles = files.filter(file => file !== 'tailwind')
  for (const file of docFiles) {
    const srcPath = join(nuxtWebPath, '../src', `${file}.ts`)
    const lastmod = await getFileModTime(srcPath)
    
    sitemapContent += '  <url>\n'
    sitemapContent += `    <loc>${baseUrl}/docs/${file}</loc>\n`
    sitemapContent += `    <lastmod>${lastmod}</lastmod>\n`
    sitemapContent += '    <changefreq>weekly</changefreq>\n'
    sitemapContent += '    <priority>0.8</priority>\n'
    sitemapContent += '  </url>\n'
  }
  
  // Close XML
  sitemapContent += '</urlset>'
  
  // Write sitemap to public directory
  const publicDir = join(nuxtWebPath, 'public')
  try {
    await fsPromises.mkdir(publicDir, { recursive: true })
  }
  catch (err) {
    // Only ignore EEXIST errors, log others
    if (err.code !== 'EEXIST') {
      console.error('Error creating public directory:', err)
      throw err
    }
  }
  
  await writeFile(join(publicDir, 'sitemap.xml'), sitemapContent)
  console.log('Generated sitemap.xml')
}

async function generateNavigation() {
  const docLinks = []

  for (const file of files) {
    // Skip tailwind as it's not a doc page
    if (file === 'tailwind') continue

    const filePath = join(srcPath, `${file}.ts`)
    const content = await readFile(filePath, 'utf8')
    const metadata = Object.fromEntries([...content.matchAll(metadataPattern)].map(match => [match[1], match[2]]))

    const link = {
      path: `/docs/${file}`,
      title: metadata.title || file,
      lead: metadata.description || '',
    }

    // Only add icon if lead metadata exists
    if (metadata.lead) {
      link.icon = metadata.lead
    }

    docLinks.push(link)
  }

  // Sort docLinks to match the files array order (excluding tailwind)
  const sortedDocLinks = files
    .filter(file => file !== 'tailwind')
    .map(file => docLinks.find(link => link.path === `/docs/${file}`))
    .filter(Boolean)

  // Format docLinks array as TypeScript
  const docLinksString = sortedDocLinks.map((link) => {
    const parts = [
      `    path: "${link.path}",`,
      `    title: "${link.title}",`,
      `    lead: "${link.lead.replace(/"/g, '\\"')}",`,
    ]
    if (link.icon) {
      parts.push(`    icon: "${link.icon.replace(/"/g, '\\"')}",`)
    }
    return `  {\n${parts.join('\n')}\n  }`
  }).join(',\n')

  const navigationContent = `interface NavLink {
  id?: string;
  path: string;
  title: string;
  lead: string;
  icon?: string;
}

export const introLinks: NavLink[] = [
  {
    id: "introduction",
    path: "/intro/introduction",
    title: "Introduction",
    lead: "UseMods is a mighty set of missing functions for your frontend, framework and SSR applications. All the bells, whistles, and scooter mirrors you'll ever need.",
  },
  {
    id: "installation",
    path: "/intro/installation",
    title: "Installation",
    lead: "Running and loving mods",
  },
];

export const docLinks: NavLink[] = [
${docLinksString}
];
`

  const navigationPath = join(nuxtWebPath, 'utils', 'navigation.ts')
  await writeFile(navigationPath, navigationContent)
}

async function generateAll() {
  await Promise.all(files.map((file, index) => generateVue(join(srcPath, `${file}.ts`), `${String(index + 1).padStart(2, '0')}.${file}`)))
  await Promise.all(files.map((file, index) => generateMarkdown(join(srcPath, `${file}.ts`), `${String(index + 1).padStart(2, '0')}.${file}`)))
  await copyFile(join(srcPath, 'maps.ts'), join(nuxtWebPath, 'utils/mods/maps.ts'))
  await generateNavigation()
  await generateAllMarkdown()
  await generateSitemap()
}

async function clearAll() {
  const [webFiles, docFiles, contentFiles] = await Promise.all([
    readdir(join(nuxtWebPath, 'utils/mods')).catch(() => []),
    readdir(join(nuxtWebPath, 'pages/docs')).catch(() => []),
    readdir(join(nuxtWebPath, 'content/2.docs')).catch(() => []),
  ])

  await Promise.all([
    ...webFiles.filter(file => file.endsWith('.ts')).map(file => unlink(join(nuxtWebPath, 'utils/mods', file))),
    ...docFiles.filter(file => file.endsWith('.vue') && files.includes(basename(file, '.vue'))).map(file => unlink(join(nuxtWebPath, 'pages/docs', file))),
    ...contentFiles.filter(file => (file.endsWith('.md') && files.includes(basename(file, '.md'))) || file === 'all.md').map(file => unlink(join(nuxtWebPath, 'content/2.docs', file))),
  ])
}

// Clear and Generate on State
clearAll().then(generateAll)

// Watch for Changes
if (args.includes('--watch')) {
  watch(srcPath, { recursive: true }, async () => {
    await generateAll()
    console.log('Generated all files')
  })
}
else if (args.includes('--bundle')) {
  generateBundle()
  console.log('Generated bundle')
}
else if (args.includes('--build')) {
  generateAll()
  console.log('Generated all files')
}
else {
  console.log('No valid command provided. Use --watch or --build.')
}

async function generateBundle() {
  const bundle = await rollup({
    input: resolve(srcPath, 'index.ts'),
    plugins: [
      typescript({
        tsconfig: resolve(srcPath, '..', 'tsconfig.json'),
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
  })
  await bundle.write({
    file: resolve(srcPath, '..', 'dist', 'index.js'),
    format: 'esm',
    plugins: [terser()],
  })

  console.log('dist bundle created')
}
