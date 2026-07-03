export function generateFormatterCode(name: string, value: any, options: Record<string, any> = {}) {
  // Check if options object has any non-empty values
  const hasNonEmptyOptions = Object.values(options).some(val => val !== undefined && val !== null && val !== '');

  const optionsString = hasNonEmptyOptions
    ? `, ${JSON.stringify(options, (key, value) => {
        if (value === undefined || value === null || value === '') {
          return undefined;
        }
        if (typeof value === 'object' && value !== null) {
          return Object.entries(value).reduce<Record<string, unknown>>((acc, [k, v]) => {
            if (v !== undefined && v !== null && v !== '') {
              acc[k] = v
            }
            return acc
          }, {})
        }
        return value;
      }).replace(/"([^"]+)":/g, '$1:')}`
    : '';

  return `${name}(${value}${optionsString})`;
}

