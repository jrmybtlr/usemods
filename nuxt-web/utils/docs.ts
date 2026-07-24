/**
 * Serializes a playground argument into valid JS source.
 * Arrays become comma-separated args (multi-parameter demos).
 */
function formatArg(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(formatArg).join(', ')
  }
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (value === undefined) {
    return 'undefined'
  }
  if (value === null) {
    return 'null'
  }
  return JSON.stringify(value)
}

/**
 * Builds a docs playground function call string.
 * Omits empty values and any option that matches its default.
 */
export function generateFormatterCode(
  name: string,
  value: any,
  options: Record<string, any> = {},
  defaults: Record<string, any> = {},
) {
  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(([key, val]) => {
      if (val === undefined || val === null || val === '') return false
      if (Object.prototype.hasOwnProperty.call(defaults, key) && val === defaults[key]) {
        return false
      }
      return true
    }),
  )

  const hasNonEmptyOptions = Object.keys(filteredOptions).length > 0

  const optionsString = hasNonEmptyOptions
    ? `, ${JSON.stringify(filteredOptions, (_key, value) => {
        if (value === undefined || value === null || value === '') {
          return undefined
        }
        if (typeof value === 'object' && value !== null) {
          return Object.entries(value).reduce<Record<string, unknown>>((acc, [k, v]) => {
            if (v !== undefined && v !== null && v !== '') {
              acc[k] = v
            }
            return acc
          }, {})
        }
        return value
      }).replace(/"([^"]+)":/g, '$1:')}`
    : ''

  return `${name}(${formatArg(value)}${optionsString})`
}
