import { resolve, extname, basename, join } from 'path'
import { watch, promises as fsPromises } from 'fs'
import { argv } from 'process'
import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'

const { readFile, writeFile, copyFile, readdir, unlink } = fsPromises

// Arguments
const args = argv.slice(2)

// Paths
const srcPath = resolve(import.meta.dirname, '../src')
const nuxtWebPath = resolve(import.meta.dirname, '../nuxt-web')

// Functions
const functionPattern = /\/\*\*[\s\S]*?\*\/\s*(export\s+function\s+([a-zA-Z0-9_]+)\s*(?:<[^(]*?(?:\([^)]*\)[^(]*?)*>)?\s*\([\s\S]*?\)\s*:\s*([\w<>,[\]\s]+(?:\{[\s\S]*?})?)?)/gms
const metadataPattern = /\s+(title|description|lead):\s+([^\r\n]*)/g
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

    const componentName = getComponentName(functionName)
    imports.add(`import ${componentName} from '~/components/content/${componentDir}/${componentName}.vue'`)

    componentUsages.push({
      functionName,
      componentName,
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

    // Escape single quotes in params for Vue attribute binding (since we use single quotes for the attribute)
    // We need to escape single quotes with backslash for JavaScript string literals
    const escapedParams = usage.params.replace(/'/g, '\\\'')

    vueContent += `    <PageFunction\n`
    vueContent += `      name="${usage.functionName}"\n`
    vueContent += `      description="${escapedDescription}"\n`
    if (usage.info) {
      vueContent += `      info="${escapedInfo}"\n`
    }
    vueContent += `      :params='${escapedParams}'\n`
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

async function generateAll() {
  await Promise.all(files.map((file, index) => generateVue(join(srcPath, `${file}.ts`), `${String(index + 1).padStart(2, '0')}.${file}`)))
  await copyFile(join(srcPath, 'maps.ts'), join(nuxtWebPath, 'utils/mods/maps.ts'))
}

async function clearAll() {
  const [webFiles, docFiles] = await Promise.all([
    readdir(join(nuxtWebPath, 'utils/mods')).catch(() => []),
    readdir(join(nuxtWebPath, 'pages/docs')).catch(() => []),
  ])

  await Promise.all([
    ...webFiles.filter(file => file.endsWith('.ts')).map(file => unlink(join(nuxtWebPath, 'utils/mods', file))),
    ...docFiles.filter(file => file.endsWith('.vue') && files.includes(basename(file, '.vue'))).map(file => unlink(join(nuxtWebPath, 'pages/docs', file))),
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
