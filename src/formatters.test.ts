import { expect, test } from 'vitest'
import * as mod from './formatters'

test('formatNumber', () => {
  expect(mod.formatNumber(0)).toBe('0')
  expect(mod.formatNumber(1000.95)).toBe('1,000.95')
  expect(mod.formatNumber(1000.95, { decimals: 20 })).toBe('1,000.95')
  expect(mod.formatNumber(1000.95, { decimals: 1 })).toBe('1,001.0')
  expect(mod.formatNumber(1000.95, { decimals: 1 })).toBe('1,001.0')
  expect(mod.formatNumber(1000.95, { decimals: 2 })).toBe('1,000.95')
  expect(mod.formatNumber(1000.95, { decimals: 0 })).toBe('1,001')
  expect(mod.formatNumber(1000.95, { decimals: 1 })).toBe('1,001.0')
  expect(mod.formatNumber(1000.95, { decimals: 2, locale: 'id-ID' })).toBe('1.000,95')
})

test('formatCombinedDates', () => {
  // Same Day with different times
  expect(mod.formatCombinedDates(new Date('2025-01-01T00:00:00'), new Date('2025-01-01T08:00:00'))).toBe('January 1, 2025, 12:00 AM - 8:00 AM')
  expect(mod.formatCombinedDates(new Date('2025-01-01T00:00:00'), new Date('2025-01-01T08:00:00'), { locale: 'en-AU', format: 'short' })).toBe('1 Jan 2025, 12:00 am - 8:00 am')
  expect(mod.formatCombinedDates(new Date('2025-01-01T09:00:00'), new Date('2025-01-01T14:30:00'), { locale: 'en-AU', format: 'short' })).toBe('1 Jan 2025, 9:00 am - 2:30 pm')

  // Same month
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2025-01-31'))).toBe('1-31 January 2025')
  // Same year
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2025-01-31'))).toBe('1-31 January 2025')
  // Same year, different month
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2025-02-01'))).toBe('January 1 - February 1, 2025')
  // Leap year
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2025-02-29'))).toBe('January 1 - March 1, 2025')
  // Different year
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2026-01-31'))).toBe('January 1, 2025 - January 31, 2026')
  // Same Date
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('2025-01-01'))).toBe('January 1, 2025')
  // Invalid Date
  expect(mod.formatCombinedDates(new Date('2025-01-01'), new Date('invalid'))).toBe('')
})

test('formatCurrency', () => {
  expect(mod.formatCurrency(0.00)).toBe('$0.00')
  expect(mod.formatCurrency(0.10)).toBe('$0.10')
  expect(mod.formatCurrency(0)).toBe('$0.00')
  expect(mod.formatCurrency(0, { decimals: 0 })).toBe('$0')
  expect(mod.formatCurrency(0.000009876)).toBe('$0.000009876')
  expect(mod.formatCurrency(0.000009876, { decimals: 7 })).toBe('$0.0000099')
  expect(mod.formatCurrency(1000.95)).toBe('$1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2 })).toBe('$1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-GB' })).toBe('£1,000.95')
  expect(mod.formatCurrency(1000, { decimals: 0, locale: 'ja-JP' })).toBe('￥1,000')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-GB' })).toBe('£1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-au' })).toBe('$1,000.95')
})

test('formatValuation', () => {
  expect(mod.formatValuation(0)).toBe('$0')
  expect(mod.formatValuation(12345678)).toBe('$12M')
  expect(mod.formatValuation(12345678, { decimals: 0 })).toBe('$12M')
  expect(mod.formatValuation(12345678, { decimals: 0, locale: 'en-GB' })).toBe('£12M')
  expect(mod.formatValuation(12345678, { decimals: 2, locale: 'en-GB' })).toBe('£12.35M')
})

test('formatDurationLabels', () => {
  expect(mod.formatDurationLabels(0)).toBe('0 seconds')
  expect(mod.formatDurationLabels(0, { labels: 'short' })).toBe('0 sec')
  expect(mod.formatDurationLabels(0.005)).toBe('5 milliseconds')
  expect(mod.formatDurationLabels(0.5)).toBe('500 milliseconds')
  expect(mod.formatDurationLabels(3600)).toBe('1 hour')
  expect(mod.formatDurationLabels(3600 * 2, { labels: 'short' })).toBe('2 hr')
  expect(mod.formatDurationLabels(3600 * 2, { labels: 'long' })).toBe('2 hours')
  expect(mod.formatDurationLabels(3600 * 2 + 60)).toBe('2 hours 1 minute')
  expect(mod.formatDurationLabels(3600 * 2 + 60 + 1.5)).toBe('2 hours 1 minute 1 second 500 milliseconds')
  expect(mod.formatDurationLabels(3600 * 400 + 60 + 1)).toBe('16 days 16 hours 1 minute 1 second')
  expect(mod.formatDurationLabels(3600 * 400 + 60 + 1, { round: true })).toBe('16.7 days')
  expect(mod.formatDurationLabels(9241233, { round: true })).toBe('107 days')
})

test('formatDurationNumbers', () => {
  expect(mod.formatDurationNumbers(0)).toBe('00:00:00')
  expect(mod.formatDurationNumbers(0.5)).toBe('00:00:00:50')
  expect(mod.formatDurationNumbers(3600)).toBe('01:00:00')
  expect(mod.formatDurationNumbers(3600 * 2)).toBe('02:00:00')
  expect(mod.formatDurationNumbers(3600 * 2 + 60)).toBe('02:01:00')
  expect(mod.formatDurationNumbers(3600 * 2 + 60 + 1.5)).toBe('02:01:01:50')
  expect(mod.formatDurationNumbers(3600 * 400 + 60 + 1)).toBe('400:01:01')
  expect(mod.formatDurationNumbers(3600 * 400 + 60 + 1)).toBe('400:01:01')
})

test('formatPercentage', () => {
  expect(mod.formatPercentage(0)).toBe('0%')
  expect(mod.formatPercentage(0.1234, { decimals: 0 })).toBe('12%')
  expect(mod.formatPercentage(0.1234)).toBe('12.34%')
  expect(mod.formatPercentage(0.125, { decimals: 0 })).toBe('13%')
})

test('formatUnit', () => {
  expect(mod.formatUnit(0, { unit: 'meter' })).toBe('0 meters')
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 0 })).toBe('1,000 meters')
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 0 })).toBe('1,000 meters')
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 2, unitDisplay: 'short' })).toBe('1,000 m')
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 2, unitDisplay: 'long' })).toBe('1,000 meters')
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 2, locale: 'en-AU', unitDisplay: 'long' })).toBe('1,000 metres')
  // No UnitDisplay
  expect(mod.formatUnit(1000, { unit: 'meter', decimals: 2, locale: 'en-AU' })).toBe('1,000 metres')
})

test('formatList', () => {
  expect(mod.formatList(['Apple'])).toBe('Apple')
  expect(mod.formatList('Apple, Oranges')).toBe('Apple and Oranges')
  expect(mod.formatList({ 0: 'Apple', 1: 'Oranges' })).toBe('Apple and Oranges')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Grapefruit'])).toBe('Apple, Oranges, Bananas and Grapefruit')
  expect(mod.formatList(['Apple', 'Oranges'], { limit: 2 })).toBe('Apple and Oranges')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas'], { limit: 2 })).toBe('Apple, Oranges and 1 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas'], { limit: 3, conjunction: 'or' })).toBe('Apple, Oranges or Bananas')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears'], { limit: 2 })).toBe('Apple, Oranges and 2 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears', 'Grapes'], { limit: 2 })).toBe('Apple, Oranges and 3 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears', 'Grapes'], { limit: 2, conjunction: 'or' })).toBe('Apple, Oranges or 3 more')
  expect(mod.formatList([], { limit: 2, conjunction: 'or' })).toBe('')
})

test('formatTitle', () => {
  expect(mod.formatTitle('hello world')).toBe('Hello World')
  expect(mod.formatTitle('welcome to the jungle')).toBe('Welcome to the Jungle')
  expect(mod.formatTitle('the quick brown fox jumps over the lazy dog')).toBe('The Quick Brown Fox Jumps Over the Lazy Dog')
  expect(mod.formatTitle('UseMods is cooler than a vegan leather jacket')).toBe('UseMods is Cooler than a Vegan Leather Jacket')
  // @ts-expect-error: null is not a valid input for formatTitle
  expect(mod.formatTitle(null)).toBe('')
  // @ts-expect-error: undefined is not a valid input for formatTitle
  expect(mod.formatTitle(undefined)).toBe('')
})

test('formatNumberToWord', () => {
  expect(mod.formatNumberToWords(0)).toBe('zero')
  expect(mod.formatNumberToWords(1)).toBe('one')
  expect(mod.formatNumberToWords(12)).toBe('twelve')
  expect(mod.formatNumberToWords(100)).toBe('one hundred')
  expect(mod.formatNumberToWords(200)).toBe('two hundred')
  expect(mod.formatNumberToWords(300)).toBe('three hundred')
  expect(mod.formatNumberToWords(123)).toBe('one hundred and twenty-three')
  expect(mod.formatNumberToWords(1234)).toBe('one thousand, two hundred and thirty-four')
  expect(mod.formatNumberToWords(12345)).toBe('twelve thousand, three hundred and forty-five')
  expect(mod.formatNumberToWords(123456)).toBe('one hundred and twenty-three thousand, four hundred and fifty-six')
  expect(mod.formatNumberToWords(1234567)).toBe('one million, two hundred and thirty-four thousand, five hundred and sixty-seven')
  expect(mod.formatNumberToWords(12345678)).toBe('twelve million, three hundred and forty-five thousand, six hundred and seventy-eight')
  expect(mod.formatNumberToWords(123456789)).toBe('one hundred and twenty-three million, four hundred and fifty-six thousand, seven hundred and eighty-nine')
  expect(mod.formatNumberToWords(1234567890)).toBe('one billion, two hundred and thirty-four million, five hundred and sixty-seven thousand, eight hundred and ninety')
  expect(mod.formatNumberToWords(12345678901)).toBe('twelve billion, three hundred and forty-five million, six hundred and seventy-eight thousand, nine hundred and one')
  expect(mod.formatNumberToWords(123456789012)).toBe('one hundred and twenty-three billion, four hundred and fifty-six million, seven hundred and eighty-nine thousand, twelve')
  expect(mod.formatNumberToWords(1234567890123)).toBe(
    'one trillion, two hundred and thirty-four billion, five hundred and sixty-seven million, eight hundred and ninety thousand, one hundred and twenty-three',
  )
})

test('formatParagraphs', () => {
  const singleParagraph = 'This is a test. This is another test. This is a third test.'
  expect(mod.formatParagraphs(singleParagraph)).toBe(singleParagraph)

  const input = 'This is a test. This is another test. This is a third test.'
  const expected = [
    'This is a test. This is another test.',
    'This is a third test.',
  ].join('\n\n')

  expect(mod.formatParagraphs(input, { minSentenceCount: 2, minCharacterCount: 10 })).toBe(expected)
})

test('formatUnixTime', () => {
  expect(mod.formatUnixTime(0)).toBe('1970-01-01 00:00:00.000')
  expect(mod.formatUnixTime(-10)).toBe('-10')
  expect(mod.formatUnixTime(1739410018494)).toBe('2025-02-13 01:26:58.494')
  expect(mod.formatUnixTime(undefined)).toBe('')
})

test('formatInitials', () => {
  expect(mod.formatInitials('Penelope Pitstop')).toBe('PP')
  expect(mod.formatInitials('Zippy')).toBe('Z')
  expect(mod.formatInitials('Dr. Robotnik')).toBe('R')
  expect(mod.formatInitials('Mrs. Marple')).toBe('M')
  expect(mod.formatInitials('William W Whittle', { length: 3 })).toBe('WWW')
  expect(mod.formatInitials('William Snrmadeup', { length: 2 })).toBe('WS')
  expect(mod.formatInitials('William Stan', { length: 2 })).toBe('WS')
  // @ts-expect-error: undefined is not a valid input for formatInitials
  expect(mod.formatInitials(undefined)).toBe('')
  // @ts-expect-error: null is not a valid input for formatInitials
  expect(mod.formatInitials(null)).toBe('')
})

test('formatSentenceCase', () => {
  expect(mod.formatSentenceCase('')).toBe('')
  expect(mod.formatSentenceCase('hello world')).toBe('Hello world')
  expect(mod.formatSentenceCase('welcome to the jungle')).toBe('Welcome to the jungle')
  expect(mod.formatSentenceCase('the quick brown fox jumps over the lazy dog')).toBe('The quick brown fox jumps over the lazy dog')
  expect(mod.formatSentenceCase('UseMods is cooler than a vegan leather jacket')).toBe('UseMods is cooler than a vegan leather jacket')
  // @ts-expect-error: null is not a valid input for formatSentenceCase
  expect(mod.formatSentenceCase(null)).toBe('')
  // @ts-expect-error: undefined is not a valid input for formatSentenceCase
  expect(mod.formatSentenceCase(undefined)).toBe('')
})

test('formatTextWrap', () => {
  expect(mod.formatTextWrap('')).toBe('')
  expect(mod.formatTextWrap('hello world')).toBe('hello&nbsp;world')
  expect(mod.formatTextWrap('hello world how are you')).toBe('hello world how are&nbsp;you')
  expect(mod.formatTextWrap('This is a test')).toBe('This is a&nbsp;test')
  expect(mod.formatTextWrap('Test')).toBe('Test')
  expect(mod.formatTextWrap('TestTest')).toBe('TestTest')
  expect(mod.formatTextWrap('')).toBe('')
})

test('formatFileSize', () => {
  expect(mod.formatFileSize(1024)).toBe('1 kB')
  expect(mod.formatFileSize(1024, { inputUnit: 'byte' })).toBe('1 kB')
  expect(mod.formatFileSize(1024, { inputUnit: 'byte', outputUnit: 'megabyte' })).toBe('0.0009765625 MB')
  expect(mod.formatFileSize(1024, { outputUnit: 'megabyte' })).toBe('0.0009765625 MB')
  expect(mod.formatFileSize(1024, { inputUnit: 'byte', outputUnit: 'megabyte', decimals: 2 })).toBe('0.00 MB')
  // Invalid input unit
  expect(mod.formatFileSize(1024, { inputUnit: 'kbdd' })).toBe('1 kB')
})

test('formatLength', () => {
  expect(mod.formatLength(1500, { outputUnit: 'auto' })).toBe('1.5 m')
  expect(mod.formatLength(1500, { outputUnit: 'kilometer' })).toBe('0.0015 km')
  expect(mod.formatLength(1500, { inputUnit: 'kilometer', outputUnit: 'kilometer' })).toBe('1,500 km')
  expect(mod.formatLength(1500, { outputUnit: 'kilometer', locale: 'ar-SA' })).toBe('٠٫٠٠١٥ كم')
  expect(mod.formatLength(1500, { outputUnit: 'inch' })).toBe('59.05511811023622 in')
  expect(mod.formatLength(1500, { outputUnit: 'inch', decimals: 2 })).toBe('59.06 in')
  // Invalid input unit
  expect(mod.formatLength(1500, { inputUnit: 'kbdd' })).toBe('1500')
})

test('formatTemperature', () => {
  expect(mod.formatTemperature(0)).toBe('0°C')
  expect(mod.formatTemperature(0, { unitDisplay: 'long' })).toBe('0 degrees Celsius')
  expect(mod.formatTemperature(0, { unitDisplay: 'short' })).toBe('0°C')
  expect(mod.formatTemperature(0, { inputUnit: 'celsius', outputUnit: 'fahrenheit' })).toBe('32°F')
  expect(mod.formatTemperature(0, { inputUnit: 'celsius', outputUnit: 'fahrenheit', unitDisplay: 'long' })).toBe('32 degrees Fahrenheit')
  expect(mod.formatTemperature(0, { inputUnit: 'celsius', outputUnit: 'fahrenheit', unitDisplay: 'short' })).toBe('32°F')
  expect(mod.formatTemperature(0, { inputUnit: 'fahrenheit', outputUnit: 'celsius', unitDisplay: 'short' })).toBe('-17.77777777777778°C')
  expect(mod.formatTemperature(0, { inputUnit: 'fahrenheit', outputUnit: 'celsius', unitDisplay: 'short', decimals: 2 })).toBe('-17.78°C')
  // Invalid input unit
  expect(mod.formatTemperature(0, { inputUnit: 'kbdd' })).toBe('0')
})
