// title: Formatters
// description: Wrangle wild data types into submission. Spruce up numbers, give strings smarts, and make complex content dazzle.
// lead: Format misbehaving content

import * as map from './maps'

/**
 * Format numbers into neat and formatted strings for people
 */
export function formatNumber(
  number: number,
  options?: {
    decimals?: number
    locale?: string
  },
): string {
  const decimalPlaces = (number.toString().split('.')[1] || '').length
  const safeDecimals = Math.min(options?.decimals ?? decimalPlaces, decimalPlaces)

  const config: Intl.NumberFormatOptions = {
    style: 'decimal',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
  }

  return new Intl.NumberFormat(options?.locale ?? 'en-US', config).format(number)
}

/**
 * Format numbers into local currency with extra smarts
 */
export function formatCurrency(
  number: number,
  options?: {
    decimals?: number
    locale?: string
  },
): string {
  const decimalPlaces = (number.toString().split('.')[1] || '0').padEnd(2, '0').length
  const safeDecimals = Math.min(options?.decimals ?? decimalPlaces, decimalPlaces)

  const config: Intl.NumberFormatOptions = {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
    currency: map.currencySymbols.get(options?.locale ?? 'en-US') || 'USD',
  }

  return new Intl.NumberFormat(options?.locale ?? 'en-US', config).format(number)
}

/**
 * Format numbers into valuations displayed in thousands, millions or billions
 */
export function formatValuation(
  number: number,
  options?: {
    decimals?: number
    locale?: string
    currency?: string
  },
): string {
  const safeDecimals = Math.max(0, Math.min(options?.decimals ?? 0, 20))
  const locale = options?.locale ?? 'en-US'

  const config: Intl.NumberFormatOptions = {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
    currency: options?.currency ?? map.currencySymbols.get(locale) ?? 'USD',
  }

  return new Intl.NumberFormat(locale, config).format(number)
}

/**
 * Format a number into a your unit of choice
 */
export function formatUnit(
  number: number,
  options: {
    unit: string
    decimals?: number
    unitDisplay?: 'short' | 'long'
    locale?: string
  },
): string {
  const decimalPlaces = (number.toString().split('.')[1] || '').length
  const safeDecimals = Math.min(options?.decimals ?? 21, decimalPlaces)

  const config: Intl.NumberFormatOptions = {
    unit: options.unit,
    style: 'unit',
    unitDisplay: options.unitDisplay ?? 'long',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
  }

  return new Intl.NumberFormat(options.locale ?? 'en-US', config).format(number)
}

/**
 * Format a number into a percentage
 */
export function formatPercentage(
  number: number,
  options?: {
    decimals?: number
    locale?: string
  },
): string {
  const decimalPlaces = (number.toString().split('.')[1] || '').length
  const safeDecimals = Math.max(0, Math.min(options?.decimals ?? decimalPlaces, decimalPlaces))

  const config: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
  }

  let formattedNumber = new Intl.NumberFormat(options?.locale ?? 'en-US', config).format(number)
  formattedNumber = formattedNumber.replace(/(\.\d*?[1-9])0+%$/, '$1%').replace(/\.0+%$/, '%')

  return formattedNumber
}

/**
 * Combines two dates into a human-readable string.
 */
export function formatCombinedDates(
  from: Date | string | number | null,
  to: Date | string | number | null,
  options?: { 
    locale?: string, 
    format?: 'short' | 'long',
    includeTime?: boolean 
  },
): string {
  const fromDate = from ? new Date(from) : new Date()
  const toDate = to ? new Date(to) : new Date()

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return ''
  }

  const safeLocale = options?.locale || 'en-US'
  const dateTimeFormatter = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(safeLocale, opts)
  const monthFormat = options?.format ?? 'long'
  const fullFormat = { day: 'numeric', month: monthFormat, year: 'numeric' } as const
  const shortFormat = { day: 'numeric', month: monthFormat } as const
  const timeFormat = { hour: 'numeric', minute: 'numeric' } as const
  const fullTimeFormat = { ...fullFormat, ...timeFormat } as const

  // Check if dates are the same
  if (fromDate.toISOString().split('T')[0] === toDate.toISOString().split('T')[0]) {
    // If times are different and includeTime is true, show time range
    if (options?.includeTime && 
        (fromDate.getHours() !== toDate.getHours() || 
         fromDate.getMinutes() !== toDate.getMinutes())) {
      return `${dateTimeFormatter(fullFormat).format(fromDate)}, ${dateTimeFormatter(timeFormat).format(fromDate)} - ${dateTimeFormatter(timeFormat).format(toDate)}`
    }
    // If includeTime is true but times are the same, show single time
    if (options?.includeTime) {
      return dateTimeFormatter(fullTimeFormat).format(fromDate)
    }
    // Otherwise just show the date
    return dateTimeFormatter(fullFormat).format(fromDate)
  }

  // Check if dates are in the same month
  const isSameYear = fromDate.getFullYear() === toDate.getFullYear()
  const isSameMonth = isSameYear && fromDate.getMonth() === toDate.getMonth()

  if (isSameMonth) {
    const monthYear = dateTimeFormatter({ month: monthFormat, year: 'numeric' }).format(fromDate)
    return `${fromDate.getDate()}-${toDate.getDate()} ${monthYear}`
  }

  // Check if dates are in the same year
  if (isSameYear) {
    return `${dateTimeFormatter(shortFormat).format(fromDate)} - ${dateTimeFormatter(shortFormat).format(toDate)}, ${fromDate.getFullYear()}`
  }

  // Different years format
  return `${dateTimeFormatter({ day: 'numeric', month: monthFormat, year: 'numeric' }).format(fromDate).replace(',', '')} - ${dateTimeFormatter(fullFormat).format(toDate)}`.replace(',', '')
}

/**
 * Format time into a human-readable string
 */
export function formatDurationLabels(
  seconds: number,
  options?: {
    labels?: 'short' | 'long'
    round?: boolean
    decimals?: number
  },
): string {
  if (seconds <= 0) return formatUnit(0, { unit: 'second', decimals: 0, unitDisplay: options?.labels ?? 'long' })

  const units = [
    { unit: 'year', value: 31536000 },
    { unit: 'day', value: 86400 },
    { unit: 'hour', value: 3600 },
    { unit: 'minute', value: 60 },
    { unit: 'second', value: 1 },
    { unit: 'millisecond', value: 1 / 1000 },
  ]

  if (options?.round) {
    for (const { unit, value } of units) {
      if (seconds >= value) {
        const unitValue = seconds / value
        const hasDecimal = unitValue % 1 !== 0
        const decimals = hasDecimal && unitValue.toFixed(1).endsWith('.0') ? 0 : hasDecimal ? 1 : 0
        return formatUnit(unitValue, { unit, decimals, unitDisplay: options?.labels ?? 'long' })
      }
    }
  }

  const labels = options?.labels ?? 'long'
  const results = []

  units.forEach(({ unit, value }) => {
    const unitValue = Math.floor(seconds / value)
    if (unitValue > 0) {
      results.push(formatUnit(unitValue, { unit, decimals: 0, unitDisplay: labels }))
      seconds %= value
    }
  })

  const milliseconds = Math.floor((seconds % 1) * 1000)
  if (milliseconds > 0) results.push(formatUnit(milliseconds, { unit: 'millisecond', decimals: 0, unitDisplay: labels }))
  return results.join(' ')
}

/**
 * Format time into duration 00:00:00
 */
export function formatDurationNumbers(
  seconds: number,
): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  const timeParts = [h, m, s].map(value => value.toString().padStart(2, '0'))

  if (ms > 0) {
    const msString = Math.floor(ms / 10).toString().padStart(2, '0')
    timeParts.push(msString)
  }

  return timeParts.join(':')
}

/**
 * Format and auto calculate file size into human-readable string
 */
export function formatFileSize(
  number: number,
  options?: {
    decimals?: number
    inputUnit?: string
    outputUnit?: string
    unitDisplay?: 'short' | 'long'
    locale?: string
  },
): string {
  const { decimals = undefined, unitDisplay = 'short', locale = 'en-US', inputUnit = 'byte', outputUnit = 'auto' } = options || {}
  const valueInBytes = number * (map.bytesInUnit.get(inputUnit) || 1)

  const targetUnit = outputUnit === 'auto'
    ? Array.from(map.bytesInUnit.keys())
      .reverse()
      .find(unit => valueInBytes >= (map.bytesInUnit.get(unit) || 0)) || inputUnit
    : outputUnit

  return formatUnit(valueInBytes / (map.bytesInUnit.get(targetUnit) || 1), { unit: targetUnit, decimals, unitDisplay, locale })
}

/**
 * Format and auto calculate length into human-readable string
 */
export function formatLength(
  number: number,
  options?: {
    decimals?: number
    inputUnit?: string
    outputUnit?: string
    unitDisplay?: 'short' | 'long'
    locale?: string
  },
): string {
  const { decimals = undefined, unitDisplay = 'short', locale = 'en-US', inputUnit = 'millimeter', outputUnit = 'auto' } = options || {}
  const inputUnitValue = map.lengthUnitConversions.get(inputUnit)

  if (!inputUnitValue) {
    console.warn(`[MODS] Unsupported input unit: ${inputUnit}`)
    return String(number)
  }

  const valueInMillimeters = number * inputUnitValue.value

  const targetUnit = outputUnit === 'auto'
    ? Array.from(map.lengthUnitConversions.keys())
      .filter(unit => map.lengthUnitConversions.get(unit)?.system === inputUnitValue.system)
      .reverse()
      .find(unit => valueInMillimeters >= (map.lengthUnitConversions.get(unit)?.value || 0)) || inputUnit
    : outputUnit

  return formatUnit(valueInMillimeters / (map.lengthUnitConversions.get(targetUnit)?.value || 1), { unit: targetUnit, decimals, unitDisplay, locale })
}

/**
 * Format and auto calculate temperature into human-readable string
 */
export function formatTemperature(
  number: number,
  options?: {
    decimals?: number
    inputUnit?: string
    outputUnit?: string
    unitDisplay?: 'short' | 'long'
    locale?: string
  },
): string {
  const { decimals, unitDisplay = 'short', locale = 'en-US', inputUnit = 'celsius', outputUnit = 'celsius' } = options || {}

  const validUnits = new Set(['auto', 'celsius', 'fahrenheit'])

  if (!validUnits.has(inputUnit) || !validUnits.has(outputUnit)) {
    console.warn('[MODS] Unsupported temperature unit')
    return String(number)
  }

  if (inputUnit === outputUnit || inputUnit === 'auto' || outputUnit === 'auto') {
    return formatUnit(number, { unit: inputUnit, decimals, unitDisplay, locale })
  }
  else {
    let convertedNumber = number
    if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
      convertedNumber = (number * 9 / 5) + 32
    }
    else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
      convertedNumber = (number - 32) * 5 / 9
    }
    return formatUnit(convertedNumber, { unit: outputUnit, decimals, unitDisplay, locale })
  }
}

/**
 * Format numbers into words
 */
export function formatNumberToWords(
  number: number,
): string {
  if (number === 0) return map.numberUnderTwenty[0]

  const formatGroup = (num: number): string => {
    if (num < 20) return map.numberUnderTwenty[num]
    if (num < 100) return `${map.numberTens[Math.floor(num / 10) - 2]}${num % 10 ? '-' + map.numberUnderTwenty[num % 10] : ''}`
    return `${map.numberUnderTwenty[Math.floor(num / 100)]} hundred${num % 100 ? ` and ${formatGroup(num % 100)}` : ''}`
  }

  let result = ''
  let scaleIndex = 0

  while (number > 0) {
    const groupValue = number % 1000
    if (groupValue > 0) {
      result = `${formatGroup(groupValue)}${map.numberScales[scaleIndex]}${result ? ', ' + result : ''}`
    }
    number = Math.floor(number / 1000)
    scaleIndex++
  }

  return result.trim()
}

/**
 * Formats content into paragraphs with a minimum number of characters per sentence and minimum number of sentences per paragraph
 * @info Use whitespace-pre-wrap to ensure the whitespace is preserved
 */
export function formatParagraphs(
  text: string,
  options?: {
    minSentenceCount?: number
    minCharacterCount?: number
  },
): string {
  const { minSentenceCount = 3, minCharacterCount = 100 } = options || {}
  function isValidSentenceEnd(text: string, index: number): boolean {
    return text[index] === '.' && (index === text.length - 1 || text[index + 1] === ' ') && !/\d\.\d/.test(text.slice(index - 1, index + 2))
  }

  const sentences = text.split(/(?<=\.)\s+/).filter(Boolean)

  const paragraphs: string[] = []
  let currentParagraph: string[] = []
  let currentSentenceCount = 0

  for (const sentence of sentences) {
    if (sentence.length >= minCharacterCount || isValidSentenceEnd(sentence, sentence.length - 1)) {
      currentSentenceCount++
    }

    currentParagraph.push(sentence)

    if (currentSentenceCount >= minSentenceCount) {
      paragraphs.push(currentParagraph.join(' '))
      currentParagraph = []
      currentSentenceCount = 0
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(' '))
  }

  return paragraphs.join('\n\n')
}

/**
 * Generate initials from any string while ignoring common titles
 */
export function formatInitials(
  text: string,
  options?: { length?: number },
): string {
  if (!text) return ''
  text = text.replace(/\b(Mrs|Mr|Ms|Dr|Jr|Sr|Prof|Hon|Snr|Jnr|St)\b\.?/g, ' ').trim()

  return text
    .split(' ')
    .filter(word => !['the', 'third'].includes(word.toLowerCase()))
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, options?.length ?? 2)
}

/**
 * Format Unix timestamp into a datetime string
 */
export function formatUnixTime(timestamp?: number): string {
  if (timestamp == null) {
    return ''
  }
  if (isNaN(timestamp) || timestamp < 0) {
    console.warn('[MODS] Invalid Unix timestamp:', timestamp)
    return String(timestamp)
  }
  return new Date(timestamp).toISOString().replace('T', ' ').replace('Z', '')
}

/**
 * Create a string of comma-separated values from an array, object, or string with an optional limit and conjunction
 */
export function formatList(
  items: string | object | string[],
  options?: {
    limit?: number
    conjunction?: string
  },
): string {
  if (typeof items === 'string') items = items.split(',').map(item => item.trim())
  if (typeof items === 'object' && !Array.isArray(items)) items = Object.values(items)
  if (!Array.isArray(items) || items.length === 0) return ''
  if (items.length <= 2) return items.join(items.length === 2 ? ` ${options?.conjunction || 'and'} ` : '')

  const effectiveLimit = options?.limit ?? items.length
  if (items.length <= effectiveLimit) return items.slice(0, -1).join(', ') + ` ${options?.conjunction || 'and'} ` + items.slice(-1)

  const listedItems = items.slice(0, effectiveLimit).join(', ')
  const remaining = items.length - effectiveLimit
  return `${listedItems} ${options?.conjunction || 'and'} ${remaining} more`
}

/**
 * Converts a string to title case following the Chicago Manual of Style rules.
 */
export function formatTitle(
  text: string,
): string {
  if (!text) return ''

  return text
    .split(' ')
    .map((word, index, wordsArray) => {
      const lowerWord = word.toLowerCase()
      if (index === 0 || index === wordsArray.length - 1 || !map.formatTitleExceptions.has(lowerWord)) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return lowerWord
    })
    .join(' ')
}

/**
 * Format a sentence case string
 */
export function formatSentenceCase(
  text: string,
): string {
  if (!text) {
    console.warn('[MODS] Empty formatSentenceCase text')
    return ''
  }
  return text
    .split('\n\n')
    .map(paragraph =>
      paragraph
        .split('. ')
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. '))
    .join('\n\n')
}

/**
 * Adds a space between the last two words in a string to prevent lonely words.
 * @info Remember `text-wrap: pretty` and `text-wrap: balance` are available for most browsers.
 */
export function formatTextWrap(
  text: string,
): string {
  if (!text) {
    console.warn('[MODS] Empty formatTextWrap text')
    return ''
  }
  const space: number = text.lastIndexOf(' ')
  if (space !== -1) return text.substring(0, space) + '&nbsp;' + text.substring(space + 1)
  return text
}
