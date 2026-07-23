// title: Modifiers
// description: Modify and transform your content with our collection of efficient and easy-to-use functions designed to dicipher, manipulate, and transform strings.
// lead: Bend content to your will

import * as map from './maps'

/**
 * Adds a prefix to a string if it doesn't already start with the prefix.
 */
export function startWith(text: string, start: string): string {
  if (text.startsWith(start)) return text
  return start + text
}

/**
 * Removes a prefix from a string if it starts with the prefix.
 */
export function startWithout(text: string, start: string): string {
  if (text.startsWith(start)) return text.slice(start.length)
  return text
}

/**
 * Adds a suffix to a string if it doesn't already end with the suffix.
 */
export function endWith(text: string, end: string): string {
  if (text.endsWith(end)) return text
  return text + end
}

/**
 * Removes a suffix from a string if it ends with the suffix.
 */
export function endWithout(text: string, end: string): string {
  if (!end || !text.endsWith(end)) return text
  return text.slice(0, -end.length)
}

/**
 * Adds a prefix and suffix to a string if it doesn't already start and end with them.
 */
export function surroundWith(text: string, start: string, end: string): string {
  if (text.startsWith(start) && text.endsWith(end)) return text
  if (text.startsWith(start)) return text + end
  if (text.endsWith(end)) return start + text
  return start + text + end
}

/**
 * Adds plurals to a string except for excluded words.
 * @info This handles most english pluralisation rules, but there are exceptions.
 */
export function pluralize(text: string, count: number): string {
  if (count === 1 || !text || typeof text !== 'string') return text

  text = text.trim().toLowerCase()
  if (map.unchangingPlurals.has(text)) return text
  if (map.irregularPlurals.has(text)) return map.irregularPlurals.get(text)!

  const suffixRules = new Map<string, string>([
    ['ch', 'ches'],
    ['ss', 'sses'],
    ['sh', 'shes'],
    ['x', 'xes'],
    ['s', 'ses'],
    ['z', 'zes'],
    ['o', 'oes'],
    ['us', 'i'],
    ['f', 'ves'],
    ['fe', 'ves'],
  ])

  if (text.endsWith('y')) {
    const beforeY = text.slice(-2, -1)
    if (!['a', 'e', 'i', 'o', 'u'].includes(beforeY)) {
      return text.slice(0, -1) + 'ies'
    }
  }

  for (const [suffix, replacement] of suffixRules) {
    if (text.endsWith(suffix)) {
      return text.slice(0, -suffix.length) + replacement
    }
  }

  return text + 's'
}

/**
 * Removes plurals from a string.
 * @info This handles most english pluralisation rules, but there are exceptions.
 */
export function singularize(text: string): string {
  text = text.trim().toLowerCase()

  if (map.unchangingPlurals.has(text)) return text

  for (const [singular, plural] of map.irregularPlurals) {
    if (plural === text) return singular
  }

  const singularRules = new Map<string, (value: string) => string>([
    ['ives', value => value.slice(0, -4) + 'ife'],
    ['ves', value => value.slice(0, -3) + 'f'],
    ['ies', (value) => {
      const beforeIes = value.slice(-4, -3)
      if (!['a', 'e', 'i', 'o', 'u'].includes(beforeIes)) {
        return value.slice(0, -3) + 'y'
      }
      return value.slice(0, -2)
    }],
    ['ches', value => value.slice(0, -2)],
    ['shes', value => value.slice(0, -2)],
    ['xes', value => value.slice(0, -2)],
    ['oes', value => value.slice(0, -2)],
    ['ses', value => value.slice(0, -2)],
    ['es', value => value.slice(0, -1)],
    ['i', value => value.slice(0, -1) + 'us'],
    ['a', value => value.slice(0, -1) + 'on'],
    ['s', value => value.length > 1 ? value.slice(0, -1) : value],
  ])

  for (const [suffix, transform] of singularRules) {
    if (text.endsWith(suffix)) {
      return transform(text)
    }
  }

  return text
}

/**
 * Converts a number to a string with ordinal suffix.
 */
export function ordinalize(number: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const remainder = number % 100
  return number + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes.at(0) || 'th')
}

/**
 * Strip HTML tags from a string efficiently, compatible with SSR.
 */
export function stripHtml(text: string): string {
  if (typeof text !== 'string') return ''

  // SSR-compatible HTML stripping
  const stripTags = (str: string) => {
    return str
      .split('<')
      .map((part, index) => {
        if (index === 0) return part
        const closingBracket = part.indexOf('>')
        return closingBracket >= 0 ? part.slice(closingBracket + 1) : part
      })
      .join('')
  }

  const decodeEntities = (str: string) => {
    return str
      // Handle numeric entities
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
      .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
      // Handle named entities
      .replace(/&([^;]+);/g, (match, entity) => {
        const entities: { [key: string]: string } = {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          apos: '\'',
          nbsp: ' ',
          copy: '©',
          reg: '®',
          trade: '™',
          deg: '°',
          pound: '£',
          euro: '€',
          cent: '¢',
          sect: '§',
          para: '¶',
          middot: '·',
          bull: '•',
          ndash: '–',
          mdash: '—',
          lsquo: '\'',
          rsquo: '\'',
          ldquo: '"',
          rdquo: '"',
        }
        return entities[entity] || match
      })
  };

  return decodeEntities(stripTags(text)).trim()
}

/**
 * Strips whitespace from a string.
 */
export function stripWhitespace(text: string): string {
  return text.replace(/\s+/g, '')
}

/**
 * Strips numbers from a string.
 */
export function stripNumbers(text: string): string {
  return text.replace(/[0-9]/g, '')
}

/**
 * Strips punctuation from a string.
 */
export function stripPunctuation(text: string): string {
  return text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
}

/**
 * Strips symbols from a string.
 */
export function stripSymbols(text: string): string {
  return text.replace(/[^\w\s]|_/g, '')
}

/**
 * Strips emojis from a string (requires ES6 Unicode support) 🦊.
 */
export function stripEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
}

/**
 * Converts a string to-a-slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

/**
 * Converts a slug to a string.
 */
export function deslugify(text: string): string {
  return text.toLowerCase().replaceAll('-', ' ')
}

/**
 * Removes spaces and capitalizes the first letter of each word except for the first word.
 */
export function camelCase(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .replace(/[^\w\s-]/g, '')
    .split(/[-\s]/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return `${word.at(0)?.toUpperCase() ?? ''}${word.slice(1).toLowerCase()}`
    })
    .join('')
}

/**
 * Removes spaces and capitalizes the first letter of each word.
 */
export function pascalCase(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .replace(/[^\w\s-]/g, '')
    .split(/[-\s]/)
    .map(word => `${word.at(0)?.toUpperCase() ?? ''}${word.slice(1).toLowerCase()}`)
    .join('')
}

/**
 * Replaces spaces with underscores and converts to lowercase.
 */
export function snakeCase(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

/**
 * Replaces spaces with hyphens and converts to lowercase.
 */
export function kebabCase(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Converts to title case by capitalizing the first letter of each word.
 */
export function titleCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase()
    })
    .replace(/\s+/g, ' ')
}

/**
 * Escape HTML entities in a string.
 */
export function escapeHtml(text: string): string {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/**
 * Unescape HTML entities in a string.
 */
export function unescapeHtml(text: string): string {
  return text.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}
