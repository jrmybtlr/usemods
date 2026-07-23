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

  return `${name}(${value}${optionsString})`
}
