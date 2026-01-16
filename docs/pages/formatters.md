# Formatters

Wrangle wild data types into submission. Spruce up numbers, give strings smarts, and make complex content dazzle.

**Lead:** Format misbehaving content

## Overview

The Formatters module provides comprehensive formatting functions for numbers, currencies, dates, durations, file sizes, and text. All functions use the native Intl API for internationalization support and are optimized for performance.

## Functions

### `formatNumber(number: number, options?: { decimals?: number, locale?: string }): string`

Format numbers into neat and formatted strings for people.

**Parameters:**
- `number` (number): The number to format
- `options` (object, optional):
  - `decimals` (number, optional): Number of decimal places
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted number string

**Example:**
```typescript
import { formatNumber } from 'usemods'

formatNumber(1234567.89) // '1,234,567.89'
formatNumber(1234567.89, { decimals: 2 }) // '1,234,567.89'
formatNumber(1234567.89, { locale: 'de-DE' }) // '1.234.567,89'
```

---

### `formatCurrency(number: number, options?: { decimals?: number, locale?: string }): string`

Format numbers into local currency with extra smarts.

**Parameters:**
- `number` (number): The number to format
- `options` (object, optional):
  - `decimals` (number, optional): Number of decimal places
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted currency string

**Example:**
```typescript
import { formatCurrency } from 'usemods'

formatCurrency(1234.56) // '$1,234.56'
formatCurrency(1234.56, { locale: 'en-GB' }) // '£1,234.56'
formatCurrency(1234.56, { locale: 'de-DE' }) // '1.234,56 €'
```

---

### `formatValuation(number: number, options?: { decimals?: number, locale?: string, currency?: string }): string`

Format numbers into valuations displayed in thousands, millions or billions.

**Parameters:**
- `number` (number): The number to format
- `options` (object, optional):
  - `decimals` (number, optional): Number of decimal places. Defaults to `0`
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`
  - `currency` (string, optional): Currency code

**Returns:** Compact currency format (e.g., "$1.2M", "€500K")

**Example:**
```typescript
import { formatValuation } from 'usemods'

formatValuation(1200000) // '$1.2M'
formatValuation(500000) // '$500K'
formatValuation(5000000000) // '$5B'
```

---

### `formatUnit(number: number, options: { unit: string, decimals?: number, unitDisplay?: 'short' | 'long', locale?: string }): string`

Format a number into your unit of choice.

**Parameters:**
- `number` (number): The number to format
- `options` (object):
  - `unit` (string): Unit name (e.g., 'meter', 'kilogram', 'second')
  - `decimals` (number, optional): Number of decimal places
  - `unitDisplay` ('short' | 'long', optional): Unit display format. Defaults to `'long'`
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted unit string

**Example:**
```typescript
import { formatUnit } from 'usemods'

formatUnit(5, { unit: 'meter' }) // '5 meters'
formatUnit(5, { unit: 'meter', unitDisplay: 'short' }) // '5 m'
formatUnit(1.5, { unit: 'kilogram' }) // '1.5 kilograms'
```

---

### `formatPercentage(number: number, options?: { decimals?: number, locale?: string }): string`

Format a number into a percentage.

**Parameters:**
- `number` (number): The number to format (0.5 = 50%)
- `options` (object, optional):
  - `decimals` (number, optional): Number of decimal places
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted percentage string

**Example:**
```typescript
import { formatPercentage } from 'usemods'

formatPercentage(0.5) // '50%'
formatPercentage(0.1234) // '12.34%'
formatPercentage(0.1234, { decimals: 1 }) // '12.3%'
```

---

### `formatCombinedDates(from: Date | string | number, to: Date | string | number, options?: { locale?: string, format?: 'short' | 'long', timeZone?: string }): string`

Collapses two dates (or timestamps) into a human-readable string.

**Parameters:**
- `from` (Date | string | number): Start date
- `to` (Date | string | number): End date
- `options` (object, optional):
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`
  - `format` ('short' | 'long', optional): Date format. Defaults to `'long'`
  - `timeZone` (string, optional): Timezone string

**Returns:** Combined date range string

**Note:** Time is optional and will only be shown if day, month and year are the same.

**Example:**
```typescript
import { formatCombinedDates } from 'usemods'

const start = new Date('2024-01-15')
const end = new Date('2024-01-20')
formatCombinedDates(start, end) // 'January 15 - 20, 2024'

// Same day with different times
const sameDayStart = new Date('2024-01-15T10:00:00')
const sameDayEnd = new Date('2024-01-15T14:00:00')
formatCombinedDates(sameDayStart, sameDayEnd) 
// 'January 15, 2024, 10:00 AM - 2:00 PM'
```

---

### `formatDurationLabels(seconds: number, options?: { labels?: 'short' | 'long', round?: boolean, decimals?: number }): string`

Format time into a human-readable string.

**Parameters:**
- `seconds` (number): Duration in seconds
- `options` (object, optional):
  - `labels` ('short' | 'long', optional): Label format. Defaults to `'long'`
  - `round` (boolean, optional): Round to largest unit
  - `decimals` (number, optional): Decimal places for rounding

**Returns:** Human-readable duration string

**Example:**
```typescript
import { formatDurationLabels } from 'usemods'

formatDurationLabels(3661) // '1 hour 1 minute 1 second'
formatDurationLabels(3661, { labels: 'short' }) // '1 hr 1 min 1 sec'
formatDurationLabels(3661, { round: true }) // '1 hour'
```

---

### `formatDurationNumbers(seconds: number): string`

Format time into duration 00:00:00.

**Parameters:**
- `seconds` (number): Duration in seconds

**Returns:** Duration in HH:MM:SS format

**Example:**
```typescript
import { formatDurationNumbers } from 'usemods'

formatDurationNumbers(3661) // '01:01:01'
formatDurationNumbers(125) // '00:02:05'
```

---

### `formatFileSize(number: number, options?: { decimals?: number, inputUnit?: string, outputUnit?: string, unitDisplay?: 'short' | 'long', locale?: string }): string`

Format and auto calculate file size into human-readable string.

**Parameters:**
- `number` (number): File size value
- `options` (object, optional):
  - `decimals` (number, optional): Decimal places
  - `inputUnit` (string, optional): Input unit. Defaults to `'byte'`
  - `outputUnit` (string, optional): Output unit or 'auto'. Defaults to `'auto'`
  - `unitDisplay` ('short' | 'long', optional): Unit display. Defaults to `'short'`
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted file size string

**Example:**
```typescript
import { formatFileSize } from 'usemods'

formatFileSize(1024) // '1 KB'
formatFileSize(1048576) // '1 MB'
formatFileSize(1024, { inputUnit: 'kilobyte' }) // '1 MB'
```

---

### `formatLength(number: number, options?: { decimals?: number, inputUnit?: string, outputUnit?: string, unitDisplay?: 'short' | 'long', locale?: string }): string`

Format and auto calculate length into human-readable string.

**Parameters:**
- `number` (number): Length value
- `options` (object, optional):
  - `decimals` (number, optional): Decimal places
  - `inputUnit` (string, optional): Input unit. Defaults to `'millimeter'`
  - `outputUnit` (string, optional): Output unit or 'auto'. Defaults to `'auto'`
  - `unitDisplay` ('short' | 'long', optional): Unit display. Defaults to `'short'`
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted length string

**Example:**
```typescript
import { formatLength } from 'usemods'

formatLength(1000, { inputUnit: 'millimeter' }) // '1 m'
formatLength(1, { inputUnit: 'meter', outputUnit: 'centimeter' }) // '100 cm'
```

---

### `formatTemperature(number: number, options?: { decimals?: number, inputUnit?: string, outputUnit?: string, unitDisplay?: 'short' | 'long', locale?: string }): string`

Format and auto calculate temperature into human-readable string.

**Parameters:**
- `number` (number): Temperature value
- `options` (object, optional):
  - `decimals` (number, optional): Decimal places
  - `inputUnit` (string, optional): Input unit. Defaults to `'celsius'`
  - `outputUnit` (string, optional): Output unit. Defaults to `'celsius'`
  - `unitDisplay` ('short' | 'long', optional): Unit display. Defaults to `'short'`
  - `locale` (string, optional): Locale string. Defaults to `'en-US'`

**Returns:** Formatted temperature string

**Example:**
```typescript
import { formatTemperature } from 'usemods'

formatTemperature(25) // '25°C'
formatTemperature(25, { outputUnit: 'fahrenheit' }) // '77°F'
formatTemperature(77, { inputUnit: 'fahrenheit', outputUnit: 'celsius' }) // '25°C'
```

---

### `formatNumberToWords(number: number): string`

Format numbers into words.

**Parameters:**
- `number` (number): The number to convert

**Returns:** Number in words

**Example:**
```typescript
import { formatNumberToWords } from 'usemods'

formatNumberToWords(123) // 'one hundred and twenty-three'
formatNumberToWords(1000) // 'one thousand'
```

---

### `formatParagraphs(text: string, options?: { minSentenceCount?: number, minCharacterCount?: number }): string`

Formats content into paragraphs with a minimum number of characters per sentence and minimum number of sentences per paragraph.

**Parameters:**
- `text` (string): The text to format
- `options` (object, optional):
  - `minSentenceCount` (number, optional): Minimum sentences per paragraph. Defaults to `3`
  - `minCharacterCount` (number, optional): Minimum characters per sentence. Defaults to `100`

**Returns:** Formatted text with paragraph breaks

**Note:** Use `whitespace-pre-wrap` to ensure the whitespace is preserved.

**Example:**
```typescript
import { formatParagraphs } from 'usemods'

const text = 'Sentence one. Sentence two. Sentence three. Sentence four.'
formatParagraphs(text, { minSentenceCount: 2 })
```

---

### `formatInitials(text: string, options?: { length?: number }): string`

Generate initials from any string while ignoring common titles.

**Parameters:**
- `text` (string): The text to extract initials from
- `options` (object, optional):
  - `length` (number, optional): Number of initials. Defaults to `2`

**Returns:** Initials string

**Example:**
```typescript
import { formatInitials } from 'usemods'

formatInitials('John Doe') // 'JD'
formatInitials('Dr. Jane Smith') // 'JS'
formatInitials('Mary Jane Watson', { length: 3 }) // 'MJW'
```

---

### `formatUnixTime(timestamp?: number): string`

Format Unix timestamp into a datetime string.

**Parameters:**
- `timestamp` (number, optional): Unix timestamp in milliseconds

**Returns:** ISO datetime string (YYYY-MM-DD HH:mm:ss)

**Example:**
```typescript
import { formatUnixTime } from 'usemods'

formatUnixTime(1609459200000) // '2021-01-01 00:00:00'
```

---

### `formatList(items: string | object | string[], options?: { limit?: number, conjunction?: string }): string`

Create a string of comma-separated values from an array, object, or string with an optional limit and conjunction.

**Parameters:**
- `items` (string | object | string[]): Items to format
- `options` (object, optional):
  - `limit` (number, optional): Maximum items to show
  - `conjunction` (string, optional): Conjunction word. Defaults to `'and'`

**Returns:** Formatted list string

**Example:**
```typescript
import { formatList } from 'usemods'

formatList(['apple', 'banana', 'cherry']) // 'apple, banana and cherry'
formatList(['apple', 'banana', 'cherry'], { limit: 2 }) // 'apple, banana and 1 more'
formatList('apple, banana, cherry') // 'apple, banana and cherry'
```

---

### `formatTitle(text: string): string`

Converts a string to title case following the Chicago Manual of Style rules.

**Parameters:**
- `text` (string): The text to format

**Returns:** Title case string

**Example:**
```typescript
import { formatTitle } from 'usemods'

formatTitle('the great gatsby') // 'The Great Gatsby'
formatTitle('a tale of two cities') // 'A Tale of Two Cities'
```

---

### `formatSentenceCase(text: string): string`

Format a sentence case string.

**Parameters:**
- `text` (string): The text to format

**Returns:** Sentence case string

**Example:**
```typescript
import { formatSentenceCase } from 'usemods'

formatSentenceCase('hello world. how are you?') 
// 'Hello world. How are you?'
```

---

### `formatTextWrap(text: string): string`

Adds a space between the last two words in a string to prevent lonely words.

**Parameters:**
- `text` (string): The text to format

**Returns:** Text with non-breaking space between last two words

**Note:** Remember `text-wrap: pretty` and `text-wrap: balance` are available for most browsers.

**Example:**
```typescript
import { formatTextWrap } from 'usemods'

formatTextWrap('This is a long title that might wrap') 
// 'This is a long title that might&nbsp;wrap'
```

---

## Usage Examples

### Currency and Number Formatting

```typescript
import { formatNumber, formatCurrency, formatValuation } from 'usemods'

// Format large numbers
formatNumber(1234567.89) // '1,234,567.89'

// Format currency
formatCurrency(1234.56) // '$1,234.56'
formatCurrency(1234.56, { locale: 'en-GB' }) // '£1,234.56'

// Format valuations
formatValuation(1200000) // '$1.2M'
formatValuation(5000000000) // '$5B'
```

### Date and Time Formatting

```typescript
import { formatCombinedDates, formatDurationLabels, formatUnixTime } from 'usemods'

// Date ranges
const start = new Date('2024-01-15')
const end = new Date('2024-01-20')
formatCombinedDates(start, end) // 'January 15 - 20, 2024'

// Durations
formatDurationLabels(3661) // '1 hour 1 minute 1 second'
formatDurationLabels(3661, { round: true }) // '1 hour'

// Unix timestamps
formatUnixTime(1609459200000) // '2021-01-01 00:00:00'
```

### File Sizes and Units

```typescript
import { formatFileSize, formatLength, formatTemperature } from 'usemods'

// File sizes
formatFileSize(1048576) // '1 MB'
formatFileSize(1024, { inputUnit: 'kilobyte' }) // '1 MB'

// Lengths
formatLength(1000, { inputUnit: 'millimeter' }) // '1 m'

// Temperature
formatTemperature(25) // '25°C'
formatTemperature(25, { outputUnit: 'fahrenheit' }) // '77°F'
```

---

## Notes

- All formatting functions use the native Intl API for internationalization
- Currency symbols are automatically determined by locale
- File size and length units support automatic conversion
- Temperature conversion handles Celsius and Fahrenheit
- Date formatting respects timezone settings
- All functions are SSR-compatible
