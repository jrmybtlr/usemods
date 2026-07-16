# UseMods Documentation

Complete documentation for all UseMods functions, optimized for AI and LLM consumption.

## Table of Contents

- [Formatters](#formatters)
- [Modifiers](#modifiers)
- [Generators](#generators)
- [Actions](#actions)
- [Numbers](#numbers)
- [Data](#data)
- [Validators](#validators)
- [Detections](#detections)
- [Devices](#devices)
- [Goodies](#goodies)

---

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

---

# Modifiers

Modify and transform your content with our collection of efficient and easy-to-use functions designed to decipher, manipulate, and transform strings.

**Lead:** Bend content to your will

## Overview

The Modifiers module provides comprehensive string manipulation functions. These utilities help you add/remove prefixes and suffixes, handle pluralization, strip content, convert case formats, and escape HTML. All functions are optimized for performance and SSR compatibility.

## Functions

### `startWith(value: string, start: string): string`

Adds a prefix to a string if it doesn't already start with the prefix.

**Parameters:**
- `value` (string): The string to modify
- `start` (string): The prefix to add

**Returns:** String with prefix added if needed

**Example:**
```typescript
import { startWith } from 'usemods'

startWith('example.com', 'https://') // 'https://example.com'
startWith('https://example.com', 'https://') // 'https://example.com' (unchanged)
```

---

### `startWithout(value: string, start: string): string`

Removes a prefix from a string if it starts with the prefix.

**Parameters:**
- `value` (string): The string to modify
- `start` (string): The prefix to remove

**Returns:** String with prefix removed if present

**Example:**
```typescript
import { startWithout } from 'usemods'

startWithout('https://example.com', 'https://') // 'example.com'
startWithout('example.com', 'https://') // 'example.com' (unchanged)
```

---

### `endWith(text: string, end: string): string`

Adds a suffix to a string if it doesn't already end with the suffix.

**Parameters:**
- `text` (string): The string to modify
- `end` (string): The suffix to add

**Returns:** String with suffix added if needed

**Example:**
```typescript
import { endWith } from 'usemods'

endWith('example', '.com') // 'example.com'
endWith('example.com', '.com') // 'example.com' (unchanged)
```

---

### `endWithout(text: string, end: string): string`

Removes a suffix from a string if it ends with the suffix.

**Parameters:**
- `text` (string): The string to modify
- `end` (string): The suffix to remove

**Returns:** String with suffix removed if present

**Example:**
```typescript
import { endWithout } from 'usemods'

endWithout('example.com', '.com') // 'example'
endWithout('example', '.com') // 'example' (unchanged)
```

---

### `surroundWith(text: string, start: string, end: string): string`

Adds a prefix and suffix to a string if it doesn't already start and end with them.

**Parameters:**
- `text` (string): The string to modify
- `start` (string): The prefix to add
- `end` (string): The suffix to add

**Returns:** String with prefix and suffix added if needed

**Example:**
```typescript
import { surroundWith } from 'usemods'

surroundWith('content', '[', ']') // '[content]'
surroundWith('[content]', '[', ']') // '[content]' (unchanged)
```

---

### `pluralize(word: string, count: number): string`

Adds plurals to a string except for excluded words.

**Parameters:**
- `word` (string): The word to pluralize
- `count` (number): The count to determine if pluralization is needed

**Returns:** Pluralized word if count is not 1, otherwise returns the original word

**Note:** This handles most English pluralization rules, but there are exceptions.

**Example:**
```typescript
import { pluralize } from 'usemods'

pluralize('cat', 1) // 'cat'
pluralize('cat', 2) // 'cats'
pluralize('child', 2) // 'children' (irregular)
pluralize('box', 2) // 'boxes'
pluralize('city', 2) // 'cities'
```

---

### `singularize(value: string): string`

Removes plurals from a string.

**Parameters:**
- `value` (string): The word to singularize

**Returns:** Singular form of the word

**Note:** This handles most English pluralization rules, but there are exceptions.

**Example:**
```typescript
import { singularize } from 'usemods'

singularize('cats') // 'cat'
singularize('children') // 'child' (irregular)
singularize('boxes') // 'box'
singularize('cities') // 'city'
```

---

### `ordinalize(value: number): string`

Converts a number to a string with ordinal suffix.

**Parameters:**
- `value` (number): The number to convert

**Returns:** String with ordinal suffix (1st, 2nd, 3rd, 4th, etc.)

**Example:**
```typescript
import { ordinalize } from 'usemods'

ordinalize(1) // '1st'
ordinalize(2) // '2nd'
ordinalize(3) // '3rd'
ordinalize(4) // '4th'
ordinalize(21) // '21st'
ordinalize(22) // '22nd'
```

---

### `stripHtml(text: string): string`

Strip HTML tags from a string efficiently, compatible with SSR.

**Parameters:**
- `text` (string): The HTML string to strip

**Returns:** Plain text without HTML tags

**Example:**
```typescript
import { stripHtml } from 'usemods'

stripHtml('<p>Hello <strong>world</strong>!</p>') // 'Hello world!'
stripHtml('&lt;script&gt;alert("xss")&lt;/script&gt;') // 'alert("xss")'
```

---

### `stripWhitespace(text: string): string`

Strips whitespace from a string.

**Parameters:**
- `text` (string): The string to process

**Returns:** String with all whitespace removed

**Example:**
```typescript
import { stripWhitespace } from 'usemods'

stripWhitespace('hello world') // 'helloworld'
stripWhitespace('  hello   world  ') // 'helloworld'
```

---

### `stripNumbers(text: string): string`

Strips numbers from a string.

**Parameters:**
- `text` (string): The string to process

**Returns:** String with all numbers removed

**Example:**
```typescript
import { stripNumbers } from 'usemods'

stripNumbers('abc123def456') // 'abcdef'
```

---

### `stripPunctuation(text: string): string`

Strips punctuation from a string.

**Parameters:**
- `text` (string): The string to process

**Returns:** String with all punctuation removed

**Example:**
```typescript
import { stripPunctuation } from 'usemods'

stripPunctuation('Hello, world!') // 'Hello world'
```

---

### `stripSymbols(text: string): string`

Strips symbols from a string.

**Parameters:**
- `text` (string): The string to process

**Returns:** String with all symbols removed

**Example:**
```typescript
import { stripSymbols } from 'usemods'

stripSymbols('hello@world#123') // 'helloworld123'
```

---

### `stripEmojis(text: string): string`

Strips emojis from a string (requires ES6 Unicode support).

**Parameters:**
- `text` (string): The string to process

**Returns:** String with all emojis removed

**Example:**
```typescript
import { stripEmojis } from 'usemods'

stripEmojis('Hello 🦊 world!') // 'Hello  world!'
```

---

### `slugify(text: string): string`

Converts a string to-a-slug.

**Parameters:**
- `text` (string): The string to convert

**Returns:** URL-friendly slug

**Example:**
```typescript
import { slugify } from 'usemods'

slugify('Hello World!') // 'hello-world'
slugify('My Awesome Post 2024') // 'my-awesome-post-2024'
```

---

### `deslugify(text: string): string`

Converts a slug to a string.

**Parameters:**
- `text` (string): The slug to convert

**Returns:** Human-readable string

**Example:**
```typescript
import { deslugify } from 'usemods'

deslugify('hello-world') // 'hello world'
deslugify('my-awesome-post') // 'my awesome post'
```

---

### `camelCase(text: string): string`

Removes spaces and capitalizes the first letter of each word except for the first word.

**Parameters:**
- `text` (string): The string to convert

**Returns:** camelCase string

**Example:**
```typescript
import { camelCase } from 'usemods'

camelCase('hello world') // 'helloWorld'
camelCase('my awesome post') // 'myAwesomePost'
```

---

### `pascalCase(text: string): string`

Removes spaces and capitalizes the first letter of each word.

**Parameters:**
- `text` (string): The string to convert

**Returns:** PascalCase string

**Example:**
```typescript
import { pascalCase } from 'usemods'

pascalCase('hello world') // 'HelloWorld'
pascalCase('my awesome post') // 'MyAwesomePost'
```

---

### `snakeCase(text: string): string`

Replaces spaces with underscores and converts to lowercase.

**Parameters:**
- `text` (string): The string to convert

**Returns:** snake_case string

**Example:**
```typescript
import { snakeCase } from 'usemods'

snakeCase('hello world') // 'hello_world'
snakeCase('My Awesome Post') // 'my_awesome_post'
```

---

### `kebabCase(text: string): string`

Replaces spaces with hyphens and converts to lowercase.

**Parameters:**
- `text` (string): The string to convert

**Returns:** kebab-case string

**Example:**
```typescript
import { kebabCase } from 'usemods'

kebabCase('hello world') // 'hello-world'
kebabCase('My Awesome Post') // 'my-awesome-post'
```

---

### `titleCase(text: string): string`

Converts to title case by capitalizing the first letter of each word.

**Parameters:**
- `text` (string): The string to convert

**Returns:** Title Case string

**Example:**
```typescript
import { titleCase } from 'usemods'

titleCase('hello world') // 'Hello World'
titleCase('my awesome post') // 'My Awesome Post'
```

---

### `escapeHtml(text: string): string`

Escape HTML entities in a string.

**Parameters:**
- `text` (string): The string to escape

**Returns:** String with HTML entities escaped

**Example:**
```typescript
import { escapeHtml } from 'usemods'

escapeHtml('<script>alert("xss")</script>') // '&lt;script&gt;alert("xss")&lt;/script&gt;'
```

---

### `unescapeHtml(text: string): string`

Unescape HTML entities in a string.

**Parameters:**
- `text` (string): The string to unescape

**Returns:** String with HTML entities unescaped

**Example:**
```typescript
import { unescapeHtml } from 'usemods'

unescapeHtml('&lt;script&gt;') // '<script>'
```

---

## Usage Examples

### URL Manipulation

```typescript
import { startWith, endWith, surroundWith } from 'usemods'

// Ensure URL has protocol
const url = 'example.com'
const fullUrl = startWith(url, 'https://') // 'https://example.com'

// Ensure path has trailing slash
const path = '/api/users'
const normalizedPath = endWith(path, '/') // '/api/users/'

// Wrap content in brackets
const content = 'important'
const wrapped = surroundWith(content, '[', ']') // '[important]'
```

### Content Sanitization

```typescript
import { stripHtml, stripEmojis, stripPunctuation } from 'usemods'

// Clean user input
const userInput = '<p>Hello 🦊 world!</p>'
const clean = stripHtml(userInput) // 'Hello 🦊 world!'
const cleaner = stripEmojis(clean) // 'Hello  world!'
const cleanest = stripPunctuation(cleaner) // 'Hello  world'
```

### Case Conversion

```typescript
import { camelCase, pascalCase, snakeCase, kebabCase, titleCase } from 'usemods'

const text = 'my awesome post title'

camelCase(text)   // 'myAwesomePostTitle'
pascalCase(text)   // 'MyAwesomePostTitle'
snakeCase(text)   // 'my_awesome_post_title'
kebabCase(text)   // 'my-awesome-post-title'
titleCase(text)   // 'My Awesome Post Title'
```

### Pluralization

```typescript
import { pluralize, singularize } from 'usemods'

// Dynamic pluralization
const count = 5
const item = 'cat'
const message = `You have ${count} ${pluralize(item, count)}` // 'You have 5 cats'

// Convert to singular
const plural = 'children'
const singular = singularize(plural) // 'child'
```

---

## Notes

- All string manipulation functions are SSR-compatible
- `pluralize` and `singularize` handle most English rules but may have edge cases
- `stripHtml` decodes HTML entities automatically
- Case conversion functions handle hyphens, spaces, and underscores
- `slugify` removes special characters and converts to lowercase with hyphens
- All functions preserve the original string if no changes are needed

---

# Generators

A collection of magical functions that conjure data out of thin air.

**Lead:** Conjure data out of thin air

## Overview

The Generators module provides functions for generating random numbers, UUIDs, passwords, and placeholder content. All random generation uses cryptographic methods for security.

## Functions

### `generateNumber(length: number): number`

Generate a random number.

**Parameters:**
- `length` (number): The number of digits in the generated number

**Returns:** Random number with specified length

**Example:**
```typescript
import { generateNumber } from 'usemods'

generateNumber(5) // 12345 (5-digit number)
generateNumber(3) // 456 (3-digit number)
```

---

### `generateNumberBetween(from: number, to: number): number`

Generate a random number within an inclusive range.

**Parameters:**
- `from` (number): Start of range
- `to` (number): End of range

**Returns:** Random number within the range (inclusive)

**Example:**
```typescript
import { generateNumberBetween } from 'usemods'

generateNumberBetween(1, 10) // Random number between 1 and 10
generateNumberBetween(100, 200) // Random number between 100 and 200
```

---

### `generateUuid4(): string`

Generate a Version 4 UUID (cryptographically random).

**Returns:** UUID v4 string

**Example:**
```typescript
import { generateUuid4 } from 'usemods'

generateUuid4() // '550e8400-e29b-41d4-a716-446655440000'
```

**Alias:** `generateUuid()` is also available

---

### `generateUuid7(): string`

Generate a Version 7 UUID encoding a Unix timestamp in the first 6 bytes and filling the rest with random bytes.

**Returns:** UUID v7 string

**Example:**
```typescript
import { generateUuid7 } from 'usemods'

generateUuid7() // '018e1234-5678-7abc-def0-123456789abc'
```

**Note:** UUID v7 includes timestamp information, making it sortable by creation time.

---

### `decodeUuid7(uuid: string): string`

Decode a UUIDv7 string into a timestamp.

**Parameters:**
- `uuid` (string): UUID v7 string

**Returns:** ISO timestamp string

**Throws:** Error if UUID is invalid or not v7

**Example:**
```typescript
import { generateUuid7, decodeUuid7 } from 'usemods'

const uuid = generateUuid7()
const timestamp = decodeUuid7(uuid) // '2024-01-15T10:30:00.000Z'
```

---

### `generateShortUuid(uuid: string): string`

Encodes a standard UUID (with dashes) into a URL-safe Base64 variant.

**Parameters:**
- `uuid` (string): Standard UUID string

**Returns:** Short URL-safe Base64 encoded UUID

**Throws:** Error if UUID is invalid

**Example:**
```typescript
import { generateUuid4, generateShortUuid } from 'usemods'

const uuid = generateUuid4()
const short = generateShortUuid(uuid) // 'VQ6EAOKbQdSnFkRlZUQAAA'
```

---

### `decodeShortUuid(shortUuid: string): string`

Decodes a short URL-safe Base64-encoded string back into a standard UUID.

**Parameters:**
- `shortUuid` (string): Short Base64 encoded UUID

**Returns:** Standard UUID string

**Throws:** Error if short UUID is invalid

**Example:**
```typescript
import { generateUuid4, generateShortUuid, decodeShortUuid } from 'usemods'

const uuid = generateUuid4()
const short = generateShortUuid(uuid)
const decoded = decodeShortUuid(short) // Original UUID
```

---

### `generateShortId(length?: number): string`

Generate a unique short ID based on the current timestamp.

**Parameters:**
- `length` (number, optional): Length of the ID. Defaults to `19`

**Returns:** Short alphanumeric ID

**Example:**
```typescript
import { generateShortId } from 'usemods'

generateShortId() // '170531234567890ABCDEF'
generateShortId(10) // '1705312345'
```

---

### `generatePassword(options?: { length?: number, uppercase?: number, numbers?: number, symbols?: number, special?: number }): string`

Generate a random, secure password with a mix of character types and pleasant special characters.

**Parameters:**
- `options` (object, optional):
  - `length` (number, optional): Password length. Defaults to `8`
  - `uppercase` (number, optional): Number of uppercase letters. Defaults to `0`
  - `numbers` (number, optional): Number of digits. Defaults to `0`
  - `symbols` (number, optional): Number of special characters. Defaults to `0`
  - `special` (number, optional): Alias for `symbols`

**Returns:** Generated password string

**Note:** Don't forget to use our Password Checker in the Goodies section

**Example:**
```typescript
import { generatePassword } from 'usemods'

generatePassword() // 'abcdefgh'
generatePassword({ length: 12, uppercase: 2, numbers: 2, symbols: 1 })
// 'Ab1@cdefghij'
```

---

### `generateRandomIndex(max: number): number`

Random number generator using cryptographic methods to avoid random().

**Parameters:**
- `max` (number): Maximum value (exclusive, must be between 1 and 255)

**Returns:** Random index between 0 and max-1

**Example:**
```typescript
import { generateRandomIndex } from 'usemods'

generateRandomIndex(10) // Random number 0-9
generateRandomIndex(100) // Random number 0-99
```

---

### `generateLoremIpsum(count?: number, options?: { format?: 'words' | 'sentences' | 'paragraphs' }): string`

Generate Lorem Ipsum text in various formats.

**Parameters:**
- `count` (number, optional): Number of words/sentences/paragraphs. Defaults to `5`
- `options` (object, optional):
  - `format` ('words' | 'sentences' | 'paragraphs', optional): Output format. Defaults to `'words'`

**Returns:** Lorem Ipsum text

**Example:**
```typescript
import { generateLoremIpsum } from 'usemods'

generateLoremIpsum(10) // 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do'
generateLoremIpsum(3, { format: 'sentences' })
// 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor.'

generateLoremIpsum(2, { format: 'paragraphs' })
// 'Lorem ipsum dolor sit amet...\n\nConsectetur adipiscing elit...'
```

---

### `generateHighResolutionTime(): bigint`

Helper function to get high-resolution time using process.hrtime, or performance.now as a fallback.

**Returns:** High-resolution timestamp in nanoseconds (bigint)

**Note:** Node.js times generated are in nanoseconds, browser-based falls back to converting performance.now to microseconds.

**Example:**
```typescript
import { generateHighResolutionTime } from 'usemods'

const start = generateHighResolutionTime()
// ... do work ...
const end = generateHighResolutionTime()
const duration = end - start // Duration in nanoseconds
```

---

### `getSecureRandomValues(buffer: Uint8Array): Uint8Array`

Returns an array filled with cryptographic random bytes.

**Parameters:**
- `buffer` (Uint8Array): Buffer to fill with random values

**Returns:** Buffer filled with random values

**Example:**
```typescript
import { getSecureRandomValues } from 'usemods'

const buffer = new Uint8Array(16)
getSecureRandomValues(buffer) // Buffer filled with random bytes
```

---

## Usage Examples

### Generating IDs and UUIDs

```typescript
import { generateUuid4, generateUuid7, generateShortId } from 'usemods'

// Standard UUID v4
const id1 = generateUuid4() // '550e8400-e29b-41d4-a716-446655440000'

// Time-ordered UUID v7
const id2 = generateUuid7() // Sortable by creation time

// Short ID
const shortId = generateShortId(10) // '1705312345'
```

### Password Generation

```typescript
import { generatePassword } from 'usemods'

// Basic password
const basic = generatePassword({ length: 8 })

// Strong password
const strong = generatePassword({
  length: 16,
  uppercase: 3,
  numbers: 3,
  symbols: 2
})
```

### Placeholder Content

```typescript
import { generateLoremIpsum } from 'usemods'

// Words
const words = generateLoremIpsum(20)

// Sentences
const sentences = generateLoremIpsum(5, { format: 'sentences' })

// Paragraphs
const paragraphs = generateLoremIpsum(3, { format: 'paragraphs' })
```

### Random Numbers

```typescript
import { generateNumber, generateNumberBetween } from 'usemods'

// Fixed length number
const pin = generateNumber(4) // 4-digit PIN

// Range-based number
const dice = generateNumberBetween(1, 6) // Dice roll
const percentage = generateNumberBetween(0, 100) // Percentage
```

---

## Notes

- All random generation uses cryptographic methods (`crypto.getRandomValues`)
- UUID v7 includes timestamp information for sortability
- Short UUIDs are URL-safe Base64 encoded
- Password generation ensures required character types are included
- Lorem Ipsum uses the classic "lorem ipsum dolor sit amet..." text
- High-resolution time is available in both Node.js and browser environments

---

# Actions

A stack of handy functions you could write yourself, but don't want to.

**Lead:** JS karate chops

## Overview

The Actions module provides utility functions for common browser interactions, form handling, scrolling, and function control (debounce/throttle). These functions are designed to work seamlessly in both client-side and server-side environments where applicable.

## Functions

### `scrollToAnchor(id: string): Promise<void>`

Smoothly scrolls to the element with the specified ID without scuffing up your URLs.

**Parameters:**
- `id` (string): The ID of the element to scroll to (without the `#` prefix)

**Returns:** Promise that resolves when scrolling is complete

**Example:**
```typescript
import { scrollToAnchor } from 'usemods'

await scrollToAnchor('section-1')
```

---

### `toggleBodyScroll(className?: string, action?: 'add' | 'remove' | 'toggle'): Promise<void>`

Toggles the body scroll with specified class names and returns a promise.

**Parameters:**
- `className` (string, optional): CSS class name to apply. Defaults to `'fixed'`
- `action` ('add' | 'remove' | 'toggle', optional): Action to perform. Defaults to `'toggle'`

**Returns:** Promise that resolves when the action is complete

**Note:** Use your own class names, or ensure fixed is within your Tailwindcss JIT

**Example:**
```typescript
import { toggleBodyScroll } from 'usemods'

// Toggle scroll lock
await toggleBodyScroll()

// Add scroll lock
await toggleBodyScroll('fixed', 'add')

// Remove scroll lock
await toggleBodyScroll('fixed', 'remove')
```

---

### `toggleElementScroll(element: HTMLElement): Promise<void>`

Toggles the element scroll with specified class names and returns a promise.

**Parameters:**
- `element` (HTMLElement): The HTML element to toggle scroll for

**Returns:** Promise that resolves when the action is complete

**Example:**
```typescript
import { toggleElementScroll } from 'usemods'

const modal = document.querySelector('.modal')
await toggleElementScroll(modal)
```

---

### `copyToClipboard(value: string | number): Promise<void>`

Copies a converted string to the clipboard.

**Parameters:**
- `value` (string | number): The value to copy to clipboard

**Returns:** Promise that resolves when copy is complete, rejects on error

**Example:**
```typescript
import { copyToClipboard } from 'usemods'

await copyToClipboard('Hello, world!')
await copyToClipboard(12345)
```

---

### `toggleFullScreen(): Promise<void>`

Toggles the fullscreen mode.

**Returns:** Promise that resolves when fullscreen toggle is complete

**Example:**
```typescript
import { toggleFullScreen } from 'usemods'

await toggleFullScreen()
```

---

### `resetForm(form: HTMLFormElement): Promise<void>`

Resets a form to its initial state.

**Parameters:**
- `form` (HTMLFormElement): The form element to reset

**Returns:** Promise that resolves when form is reset

**Example:**
```typescript
import { resetForm } from 'usemods'

const form = document.querySelector('form')
await resetForm(form)
```

---

### `focusOnInvalid(container: HTMLElement): Promise<void>`

Focuses on and scrolls to the first invalid input, select, or textarea element within a form.

**Parameters:**
- `container` (HTMLElement): The container element (usually a form) to search for invalid elements

**Returns:** Promise that resolves when focus is set

**Example:**
```typescript
import { focusOnInvalid } from 'usemods'

const form = document.querySelector('form')
await focusOnInvalid(form)
```

---

### `focusOnNth(container: HTMLElement, index?: number): Promise<void>`

Focuses on the nth element within the specified form, where 0 is the first element and -1 is the last element.

**Parameters:**
- `container` (HTMLElement): The container element to search for focusable elements
- `index` (number, optional): Index of the element to focus. 0 is first, -1 is last. Defaults to `0`

**Returns:** Promise that resolves when focus is set, rejects if index is out of bounds

**Example:**
```typescript
import { focusOnNth } from 'usemods'

const form = document.querySelector('form')
await focusOnNth(form, 0)  // Focus first element
await focusOnNth(form, -1) // Focus last element
```

---

### `focusTrap(container: HTMLElement): void`

Sets up a keyboard trap within an HTML element, allowing the focus to cycle between the first and last focusable elements when the Tab key is pressed.

**Parameters:**
- `container` (HTMLElement): The container element to trap focus within

**Returns:** void

**Example:**
```typescript
import { focusTrap } from 'usemods'

const modal = document.querySelector('.modal')
focusTrap(modal)
```

---

### `debounce<T extends (...args: unknown[]) => unknown>(func: T, delay: number, options?: { leading?: boolean, trailing?: boolean }): ((...args: Parameters<T>) => void) & { cancel: () => void }`

Runs a function only if there are no new calls during the delay.

**Parameters:**
- `func` (T): The function to debounce
- `delay` (number): Delay in milliseconds
- `options` (object, optional):
  - `leading` (boolean, optional): Execute on the leading edge. Defaults to `false`
  - `trailing` (boolean, optional): Execute on the trailing edge. Defaults to `true`

**Returns:** Debounced function with a `cancel()` method

**Example:**
```typescript
import { debounce } from 'usemods'

const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query)
}, 300)

debouncedSearch('hello')
debouncedSearch('world') // Only this will execute after 300ms

// Cancel pending execution
debouncedSearch.cancel()
```

---

### `throttle<T extends (...args: unknown[]) => void>(fn: T, threshold: number): ((...args: Parameters<T>) => void) & { cancel: () => void }`

Throttles a function to ensure it only runs once per threshold.

**Parameters:**
- `fn` (T): The function to throttle
- `threshold` (number): Time threshold in milliseconds

**Returns:** Throttled function with a `cancel()` method

**Example:**
```typescript
import { throttle } from 'usemods'

const throttledScroll = throttle(() => {
  console.log('Scrolled!')
}, 100)

window.addEventListener('scroll', throttledScroll)

// Cancel pending execution
throttledScroll.cancel()
```

---

## Usage Examples

### Complete Form Handling Example

```typescript
import { resetForm, focusOnInvalid, focusOnNth } from 'usemods'

const form = document.querySelector('form')

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  if (!form.checkValidity()) {
    await focusOnInvalid(form)
    return
  }
  
  // Process form...
  
  // Reset after successful submission
  await resetForm(form)
  await focusOnNth(form, 0) // Focus first field
})
```

### Modal with Scroll Lock and Focus Trap

```typescript
import { toggleBodyScroll, focusTrap, toggleFullScreen } from 'usemods'

const modal = document.querySelector('.modal')
const openButton = document.querySelector('.open-modal')

openButton.addEventListener('click', async () => {
  modal.style.display = 'block'
  await toggleBodyScroll('fixed', 'add')
  focusTrap(modal)
})

const closeButton = modal.querySelector('.close')
closeButton.addEventListener('click', async () => {
  modal.style.display = 'none'
  await toggleBodyScroll('fixed', 'remove')
})
```

### Debounced Search Input

```typescript
import { debounce } from 'usemods'

const searchInput = document.querySelector('input[type="search"]')
const resultsDiv = document.querySelector('.results')

const performSearch = debounce(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`).then(r => r.json())
  resultsDiv.innerHTML = results.map(r => `<div>${r.title}</div>`).join('')
}, 300)

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value)
})
```

---

## Notes

- All functions that interact with the DOM require a browser environment
- Functions return Promises for better async/await support
- The `debounce` and `throttle` functions include a `cancel()` method to cancel pending executions
- `focusTrap` automatically handles Tab and Shift+Tab key navigation
- `scrollToAnchor` includes a small delay (180ms) to ensure smooth scrolling

---

# Numbers

This file contains functions that are related to numbers.

**Lead:** Crunch crunchy numbers

## Overview

The Numbers module provides mathematical and statistical functions for working with arrays of numbers. These utilities help you calculate sums, averages, margins, statistical measures, and more.

## Functions

### `sum(numbers: number[]): number`

Calculates the sum of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers to sum

**Returns:** Sum of all numbers

**Example:**
```typescript
import { sum } from 'usemods'

sum([1, 2, 3, 4, 5]) // 15
sum([10, 20, 30]) // 60
```

---

### `mean(numbers: number[]): number`

Calculates the mean of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Mean (average) value

**Example:**
```typescript
import { mean } from 'usemods'

mean([1, 2, 3, 4, 5]) // 3
mean([10, 20, 30]) // 20
```

---

### `average(numbers: number[]): number`

Calculates the mean of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Average value (same as mean)

**Note:** This is an alias for `mean()`

**Example:**
```typescript
import { average } from 'usemods'

average([1, 2, 3, 4, 5]) // 3
```

---

### `margin(value: number, percentage: number): number`

Calculates the margin based on a percentage.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Margin amount

**Example:**
```typescript
import { margin } from 'usemods'

margin(100, 10) // 10 (10% of 100)
margin(50, 20) // 10 (20% of 50)
```

---

### `addMargin(value: number, percentage: number): number`

Adds the margin to the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Value with margin added

**Example:**
```typescript
import { addMargin } from 'usemods'

addMargin(100, 10) // 110 (100 + 10%)
addMargin(50, 20) // 60 (50 + 20%)
```

---

### `subtractMargin(value: number, percentage: number): number`

Subtracts the margin from the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Value with margin subtracted

**Example:**
```typescript
import { subtractMargin } from 'usemods'

subtractMargin(100, 10) // 90 (100 - 10%)
subtractMargin(50, 20) // 40 (50 - 20%)
```

---

### `addMarkup(value: number, percentage: number): number`

Adds the markup to the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Markup percentage

**Returns:** Value with markup added (rounded to 2 decimals)

**Example:**
```typescript
import { addMarkup } from 'usemods'

addMarkup(100, 10) // 110 (100 * 1.10)
addMarkup(50, 25) // 62.5 (50 * 1.25)
```

---

### `subtractMarkup(value: number, percentage: number): number`

Calculates the markup based on a percentage.

**Parameters:**
- `value` (number): Value with markup
- `percentage` (number): Markup percentage

**Returns:** Original value before markup (rounded to 2 decimals)

**Example:**
```typescript
import { subtractMarkup } from 'usemods'

subtractMarkup(110, 10) // 100 (110 / 1.10)
subtractMarkup(62.5, 25) // 50 (62.5 / 1.25)
```

---

### `median(numbers: number[]): number`

Calculates the median of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Median value

**Example:**
```typescript
import { median } from 'usemods'

median([1, 2, 3, 4, 5]) // 3
median([1, 2, 3, 4]) // 2.5 (average of middle two)
median([10, 20, 30, 40, 50]) // 30
```

---

### `mode(numbers: number[]): number[] | null`

Calculates the mode of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Array of most frequent values, or null if no mode exists

**Example:**
```typescript
import { mode } from 'usemods'

mode([1, 2, 2, 3, 3, 3]) // [3]
mode([1, 2, 2, 3, 3]) // [2, 3] (multiple modes)
mode([1, 2, 3, 4, 5]) // null (no mode)
```

---

### `min(numbers: number[]): number`

Finds the minimum value in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Minimum value

**Example:**
```typescript
import { min } from 'usemods'

min([1, 2, 3, 4, 5]) // 1
min([10, 5, 20, 15]) // 5
```

---

### `max(numbers: number[]): number`

Finds the maximum value in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Maximum value

**Example:**
```typescript
import { max } from 'usemods'

max([1, 2, 3, 4, 5]) // 5
max([10, 5, 20, 15]) // 20
```

---

### `minMax(numbers: number[]): [number, number]`

Returns the minimum and maximum values in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Tuple [min, max]

**Example:**
```typescript
import { minMax } from 'usemods'

minMax([1, 2, 3, 4, 5]) // [1, 5]
minMax([10, 5, 20, 15]) // [5, 20]
```

---

### `range(numbers: number[]): number`

Returns the difference between two values, expressed as a positive number.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Range (max - min), or NaN if array is empty

**Example:**
```typescript
import { range } from 'usemods'

range([1, 2, 3, 4, 5]) // 4 (5 - 1)
range([10, 5, 20, 15]) // 15 (20 - 5)
```

---

### `standardDeviation(numbers: number[], options?: { method?: 'sample' | 'population' }): number`

Returns the standard deviation of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers
- `options` (object, optional):
  - `method` ('sample' | 'population', optional): Calculation method. Defaults to `'population'`

**Returns:** Standard deviation, or NaN if array is empty

**Example:**
```typescript
import { standardDeviation } from 'usemods'

standardDeviation([1, 2, 3, 4, 5]) // ~1.41
standardDeviation([1, 2, 3, 4, 5], { method: 'sample' }) // ~1.58
```

---

### `skewness(numbers: number[]): number`

Returns the measure of asymmetry of the probability distribution of an array of numbers. The skewness value can be positive, zero, negative, or undefined.

**Parameters:**
- `numbers` (number[]): Array of numbers (requires at least 3)

**Returns:** Skewness value, or NaN if insufficient data

**Example:**
```typescript
import { skewness } from 'usemods'

skewness([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // ~0 (symmetric)
skewness([1, 2, 3, 4, 5, 10, 10, 10]) // Positive (right-skewed)
```

---

## Usage Examples

### Basic Calculations

```typescript
import { sum, mean, median, min, max } from 'usemods'

const scores = [85, 90, 78, 92, 88, 95, 87]

const total = sum(scores) // 615
const average = mean(scores) // ~87.86
const middle = median(scores) // 88
const lowest = min(scores) // 78
const highest = max(scores) // 95
```

### Pricing Calculations

```typescript
import { addMargin, subtractMargin, addMarkup, subtractMarkup } from 'usemods'

// Cost with margin
const cost = 100
const priceWithMargin = addMargin(cost, 20) // 120

// Price with markup
const priceWithMarkup = addMarkup(cost, 25) // 125

// Reverse calculations
const originalCost = subtractMarkup(125, 25) // 100
```

### Statistical Analysis

```typescript
import { mean, median, mode, standardDeviation, skewness } from 'usemods'

const data = [10, 12, 14, 15, 16, 18, 20, 22, 24, 25]

const avg = mean(data) // 17.6
const med = median(data) // 17
const mostFrequent = mode(data) // null or array
const stdDev = standardDeviation(data) // ~5.05
const skew = skewness(data) // Measure of asymmetry
```

### Range and Spread

```typescript
import { minMax, range } from 'usemods'

const temperatures = [20, 22, 18, 25, 21, 23, 19]

const [min, max] = minMax(temperatures) // [18, 25]
const tempRange = range(temperatures) // 7
```

---

## Notes

- All functions handle empty arrays gracefully (returning 0, NaN, or null as appropriate)
- `min` and `max` use optimized methods for large arrays (>65536 elements)
- `mode` returns an array if multiple values have the same highest frequency
- `standardDeviation` supports both population and sample methods
- `skewness` requires at least 3 values to calculate
- Margin and markup functions use different calculation methods (additive vs multiplicative)

---

# Data

A collection of functions for formatting, filtering and taming wild arrays and objects.

**Lead:** Arrays and objects, oh my!

## Overview

The Data module provides utilities for manipulating arrays and objects. These functions help you sort, reverse, flatten, remove duplicates, and filter data structures efficiently. All functions use native JavaScript methods and are optimized for performance.

## Functions

### `dataSortBy(items: object | string[] | number[], options?: { property?: string, order?: 'asc' | 'desc' }): object | string[] | number[]`

Sort an array or object by a property.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to sort
- `options` (object, optional):
  - `property` (string, optional): Property name to sort by (for objects/arrays of objects)
  - `order` ('asc' | 'desc', optional): Sort order. Defaults to `'asc'`

**Returns:** Sorted array or object (immutable)

**Example:**
```typescript
import { dataSortBy } from 'usemods'

// Sort array of numbers
const numbers = [3, 1, 4, 1, 5]
dataSortBy(numbers) // [1, 1, 3, 4, 5]
dataSortBy(numbers, { order: 'desc' }) // [5, 4, 3, 1, 1]

// Sort array of objects
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
]
dataSortBy(users, { property: 'age' }) // Sorted by age ascending
dataSortBy(users, { property: 'name', order: 'desc' }) // Sorted by name descending
```

---

### `dataReverse<T extends object | string[] | number[]>(items: T): T`

Reverse an array or object.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to reverse

**Returns:** Reversed array or object (immutable)

**Example:**
```typescript
import { dataReverse } from 'usemods'

// Reverse array
const arr = [1, 2, 3, 4, 5]
dataReverse(arr) // [5, 4, 3, 2, 1]

// Reverse object (order of keys)
const obj = { a: 1, b: 2, c: 3 }
dataReverse(obj) // { c: 3, b: 2, a: 1 }
```

---

### `dataRemoveDuplicates<T extends string | number>(...arrays: T[][]): T[]`

Returns single unique values within an array or object.

**Parameters:**
- `...arrays` (T[][]): One or more arrays to combine and deduplicate

**Returns:** Array of unique values

**Example:**
```typescript
import { dataRemoveDuplicates } from 'usemods'

const arr1 = [1, 2, 3, 4]
const arr2 = [3, 4, 5, 6]
const arr3 = [5, 6, 7, 8]

dataRemoveDuplicates(arr1, arr2, arr3) // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

### `dataFlatten<T extends object | string[] | number[]>(items: T): T`

Flatten an array of arrays or an object of objects into a single array or object.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to flatten

**Returns:** Flattened array or object

**Example:**
```typescript
import { dataFlatten } from 'usemods'

// Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]]
dataFlatten(nested) // [1, 2, 3, 4, 5, 6]

// Flatten nested objects
const nestedObj = {
  user: {
    name: 'Alice',
    address: {
      city: 'New York',
      zip: '10001'
    }
  }
}
dataFlatten(nestedObj) 
// {
//   'user.name': 'Alice',
//   'user.address.city': 'New York',
//   'user.address.zip': '10001'
// }
```

---

### `dataWithout<T extends object | string[] | number[]>(items: T, properties: string | number | string[] | number[]): T`

Returns an array without a property or properties.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to filter
- `properties` (string | number | string[] | number[]): Property name(s) or value(s) to exclude

**Returns:** Filtered array or object

**Example:**
```typescript
import { dataWithout } from 'usemods'

// Remove values from array
const arr = [1, 2, 3, 4, 5]
dataWithout(arr, 3) // [1, 2, 4, 5]
dataWithout(arr, [2, 4]) // [1, 3, 5]

// Remove properties from object
const obj = { a: 1, b: 2, c: 3, d: 4 }
dataWithout(obj, 'b') // { a: 1, c: 3, d: 4 }
dataWithout(obj, ['b', 'd']) // { a: 1, c: 3 }
```

---

## Usage Examples

### Sorting and Filtering Data

```typescript
import { dataSortBy, dataWithout, dataRemoveDuplicates } from 'usemods'

// Process user data
const users = [
  { id: 1, name: 'Alice', age: 30, role: 'admin' },
  { id: 2, name: 'Bob', age: 25, role: 'user' },
  { id: 3, name: 'Charlie', age: 35, role: 'admin' },
  { id: 4, name: 'Diana', age: 28, role: 'user' }
]

// Sort by age descending
const sortedByAge = dataSortBy(users, { property: 'age', order: 'desc' })

// Remove admin users
const regularUsers = users.filter(u => u.role !== 'admin')

// Get unique roles
const roles = dataRemoveDuplicates(users.map(u => u.role))
```

### Flattening Nested Structures

```typescript
import { dataFlatten } from 'usemods'

// Flatten API response
const apiResponse = {
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ],
    meta: {
      page: 1,
      total: 2
    }
  }
}

const flattened = dataFlatten(apiResponse)
// {
//   'data.users.0.id': 1,
//   'data.users.0.name': 'Alice',
//   'data.users.1.id': 2,
//   'data.users.1.name': 'Bob',
//   'data.meta.page': 1,
//   'data.meta.total': 2
// }
```

### Combining and Deduplicating Arrays

```typescript
import { dataRemoveDuplicates, dataSortBy } from 'usemods'

// Combine tags from multiple posts
const post1Tags = ['javascript', 'react', 'typescript']
const post2Tags = ['react', 'vue', 'javascript']
const post3Tags = ['angular', 'typescript', 'vue']

const allTags = dataRemoveDuplicates(post1Tags, post2Tags, post3Tags)
// ['javascript', 'react', 'typescript', 'vue', 'angular']

const sortedTags = dataSortBy(allTags)
// ['angular', 'javascript', 'react', 'typescript', 'vue']
```

---

## Notes

- All functions use immutable operations (ES2023 methods like `toSorted` and `toReversed` when available, with fallbacks)
- Functions work with both arrays and objects where applicable
- `dataFlatten` for objects creates dot-notation keys for nested properties
- `dataSortBy` uses native JavaScript comparison, so strings are sorted alphabetically and numbers numerically
- Empty arrays/objects return as-is without warnings (except `dataReverse` which warns on empty input)

---

# Validators

A collection of validators for common data types.

**Lead:** Hmmmm what is that?

## Overview

The Validators module provides comprehensive validation functions for checking data types, formats, and values. These utilities help you validate emails, URLs, numbers, dates, coordinates, and more.

## Functions

### `isEmail(value: string): boolean`

Check if any given value is a valid email address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid email, false otherwise

**Example:**
```typescript
import { isEmail } from 'usemods'

isEmail('user@example.com') // true
isEmail('invalid.email') // false
isEmail('user@domain') // false
```

---

### `isNumber(value: unknown): boolean`

Check if any given value is a valid number.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid finite number, false otherwise

**Example:**
```typescript
import { isNumber } from 'usemods'

isNumber(123) // true
isNumber('123') // false
isNumber(NaN) // false
isNumber(Infinity) // false
```

---

### `isUrl(value: string): boolean`

Check if any given value is a valid URL.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid URL, false otherwise

**Example:**
```typescript
import { isUrl } from 'usemods'

isUrl('https://example.com') // true
isUrl('http://localhost:3000') // true
isUrl('not-a-url') // false
```

---

### `isEmpty(value: string | string[] | number[] | object | null | undefined): boolean`

Check if any given string, array or object is empty.

**Parameters:**
- `value` (string | string[] | number[] | object | null | undefined): Value to check

**Returns:** true if empty, false otherwise

**Example:**
```typescript
import { isEmpty } from 'usemods'

isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(null) // true
isEmpty('hello') // false
isEmpty([1, 2, 3]) // false
```

---

### `isUuid(value: unknown): boolean`

Check if any given value is a valid UUID.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid UUID, false otherwise

**Example:**
```typescript
import { isUuid } from 'usemods'

isUuid('550e8400-e29b-41d4-a716-446655440000') // true
isUuid('invalid-uuid') // false
```

---

### `isJson(value: unknown): boolean`

Check if any given value is a valid JSON string.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid JSON, false otherwise

**Example:**
```typescript
import { isJson } from 'usemods'

isJson('{"key": "value"}') // true
isJson('{"invalid": json}') // false
isJson('plain string') // false
```

---

### `isObject(value: unknown): boolean`

Check if any given value is an object.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if plain object, false otherwise

**Example:**
```typescript
import { isObject } from 'usemods'

isObject({}) // true
isObject({ key: 'value' }) // true
isObject([]) // false (arrays are not plain objects)
isObject(null) // false
```

---

### `isArray(value: string[] | number[]): boolean`

Check if any given value is an array.

**Parameters:**
- `value` (string[] | number[]): Value to validate

**Returns:** true if array, false otherwise

**Example:**
```typescript
import { isArray } from 'usemods'

isArray([1, 2, 3]) // true
isArray([]) // true
isArray({}) // false
```

---

### `isHex(value: string): boolean`

Check if any given value is a valid hexadecimal color code.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid hex color, false otherwise

**Example:**
```typescript
import { isHex } from 'usemods'

isHex('#FF0000') // true
isHex('#fff') // true
isHex('#ff0000ff') // true (with alpha)
isHex('invalid') // false
```

---

### `isAlphabetic(value: unknown): boolean`

Check if any given value contains only alphabetic characters.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if only letters, false otherwise

**Example:**
```typescript
import { isAlphabetic } from 'usemods'

isAlphabetic('Hello') // true
isAlphabetic('Hello123') // false
isAlphabetic('Hello World') // false (space)
```

---

### `isAlphanumeric(value: unknown): boolean`

Check if any given value contains only alphanumeric characters.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if only letters and numbers, false otherwise

**Example:**
```typescript
import { isAlphanumeric } from 'usemods'

isAlphanumeric('Hello123') // true
isAlphanumeric('Hello 123') // false (space)
isAlphanumeric('Hello-123') // false (hyphen)
```

---

### `isBoolean(value: unknown): boolean`

Check if any given value is a boolean value.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if boolean or string 'true'/'false', false otherwise

**Example:**
```typescript
import { isBoolean } from 'usemods'

isBoolean(true) // true
isBoolean(false) // true
isBoolean('true') // true
isBoolean('false') // true
isBoolean(1) // false
```

---

### `isUndefined(value: unknown): boolean`

Check if any given value is undefined.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if undefined, false otherwise

**Example:**
```typescript
import { isUndefined } from 'usemods'

isUndefined(undefined) // true
isUndefined(null) // false
isUndefined('') // false
```

---

### `isNull(value: unknown): boolean`

Check if any given value is null.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if null, false otherwise

**Example:**
```typescript
import { isNull } from 'usemods'

isNull(null) // true
isNull(undefined) // false
isNull('') // false
```

---

### `isDate(value: unknown): boolean`

Check if any given value is a valid Date object.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid date, false otherwise

**Example:**
```typescript
import { isDate } from 'usemods'

isDate(new Date()) // true
isDate('2024-01-15') // true
isDate(1609459200000) // true
isDate('invalid') // false
```

---

### `isTime(value: unknown): boolean`

Check if any given value is a valid time in HH:mm format.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid time format, false otherwise

**Example:**
```typescript
import { isTime } from 'usemods'

isTime('12:30') // true
isTime('23:59:59') // true
isTime('24:00') // false
isTime('12:60') // false
```

---

### `isLeapYear(value: number): boolean`

Check if any given value year is a leap year.

**Parameters:**
- `value` (number): Year to check

**Returns:** true if leap year, false otherwise

**Example:**
```typescript
import { isLeapYear } from 'usemods'

isLeapYear(2024) // true
isLeapYear(2023) // false
isLeapYear(2000) // true
isLeapYear(1900) // false
```

---

### `isEven(value: number): boolean`

Check if the number is even.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if even, false otherwise

**Example:**
```typescript
import { isEven } from 'usemods'

isEven(2) // true
isEven(3) // false
isEven(0) // true
```

---

### `isOdd(value: number): boolean`

Check if the number is odd.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if odd, false otherwise

**Example:**
```typescript
import { isOdd } from 'usemods'

isOdd(3) // true
isOdd(2) // false
isOdd(1) // true
```

---

### `isPositive(value: number): boolean`

Check if the number is positive.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if positive, false otherwise

**Example:**
```typescript
import { isPositive } from 'usemods'

isPositive(5) // true
isPositive(-5) // false
isPositive(0) // false
```

---

### `isNegative(value: number): boolean`

Check if the number is negative.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if negative, false otherwise

**Example:**
```typescript
import { isNegative } from 'usemods'

isNegative(-5) // true
isNegative(5) // false
isNegative(0) // false
```

---

### `isZero(value: number): boolean`

Check if the number is zero.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if zero, false otherwise

**Example:**
```typescript
import { isZero } from 'usemods'

isZero(0) // true
isZero(1) // false
isZero(-0) // true
```

---

### `isOver9000(value: number): boolean`

Check if the number is over 9000.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if over 9000, false otherwise

**Example:**
```typescript
import { isOver9000 } from 'usemods'

isOver9000(9001) // true
isOver9000(9000) // false
isOver9000(100) // false
```

---

### `isPrime(value: number): boolean`

Check if the number is a prime number.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if prime (>= 2), false otherwise

**Example:**
```typescript
import { isPrime } from 'usemods'

isPrime(2) // true
isPrime(3) // true
isPrime(4) // false
isPrime(17) // true
```

---

### `isInteger(value: unknown): boolean`

Check if the number is an integer.

**Parameters:**
- `value` (unknown): Value to check

**Returns:** true if integer, false otherwise

**Example:**
```typescript
import { isInteger } from 'usemods'

isInteger(5) // true
isInteger(5.5) // false
isInteger('5') // false
```

---

### `isFloat(value: unknown): boolean`

Check if the number is a float.

**Parameters:**
- `value` (unknown): Value to check

**Returns:** true if float, false otherwise

**Example:**
```typescript
import { isFloat } from 'usemods'

isFloat(5.5) // true
isFloat(5) // false
isFloat('5.5') // false
```

---

### `isBetween(value: number, min: number, max: number): boolean`

Check if the number is between the specified range.

**Parameters:**
- `value` (number): Number to check
- `min` (number): Minimum value
- `max` (number): Maximum value

**Returns:** true if within range (inclusive), false otherwise

**Example:**
```typescript
import { isBetween } from 'usemods'

isBetween(5, 1, 10) // true
isBetween(5, 10, 1) // true (automatically swaps min/max)
isBetween(0, 1, 10) // false
```

---

### `isDivisibleBy(value: number, divisor: number): boolean`

Check if the number is divisible by the specified number.

**Parameters:**
- `value` (number): Number to check
- `divisor` (number): Divisor

**Returns:** true if divisible, false otherwise

**Example:**
```typescript
import { isDivisibleBy } from 'usemods'

isDivisibleBy(10, 2) // true
isDivisibleBy(10, 3) // false
isDivisibleBy(15, 5) // true
```

---

### `isCreditCard(value: unknown): boolean`

Check if any given value is a valid credit card number.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid credit card format, false otherwise

**Example:**
```typescript
import { isCreditCard } from 'usemods'

isCreditCard('4111111111111111') // true (Visa format)
isCreditCard('5500000000000004') // true (Mastercard format)
isCreditCard('1234567890') // false
```

---

### `isLatLng(value: string): boolean`

Check if any given value is a valid latitude-longitude coordinate in the format lat,lng.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid lat/lng format, false otherwise

**Example:**
```typescript
import { isLatLng } from 'usemods'

isLatLng('40.7128, -74.0060') // true
isLatLng('40.7128,-74.0060') // true
isLatLng('invalid') // false
```

---

### `isLatitude(value: string): boolean`

Check if any given value is a valid latitude coordinate.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid latitude (-90 to 90), false otherwise

**Example:**
```typescript
import { isLatitude } from 'usemods'

isLatitude('40.7128') // true
isLatitude('91') // false
isLatitude('-90') // true
```

---

### `isLongitude(value: string): boolean`

Check if any given value is a valid longitude coordinate.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid longitude (-180 to 180), false otherwise

**Example:**
```typescript
import { isLongitude } from 'usemods'

isLongitude('-74.0060') // true
isLongitude('181') // false
isLongitude('180') // true
```

---

### `isIpAddress(value: string): boolean`

Check if any given value is a valid IP address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid IP address, false otherwise

**Example:**
```typescript
import { isIpAddress } from 'usemods'

isIpAddress('192.168.1.1') // true
isIpAddress('256.1.1.1') // false
isIpAddress('192.168.1.1:8080') // true (with port)
```

---

### `isPort(value: number): boolean`

Check if any given value is a valid port number.

**Parameters:**
- `value` (number): Value to validate

**Returns:** true if valid port (1-65535), false otherwise

**Example:**
```typescript
import { isPort } from 'usemods'

isPort(8080) // true
isPort(65536) // false
isPort(0) // false
```

---

### `isMacAddress(value: string): boolean`

Check if any given value is a valid MAC address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid MAC address, false otherwise

**Example:**
```typescript
import { isMacAddress } from 'usemods'

isMacAddress('00:1B:44:11:3A:B7') // true
isMacAddress('00-1B-44-11-3A-B7') // true
isMacAddress('invalid') // false
```

---

## Usage Examples

### Form Validation

```typescript
import { isEmail, isUrl, isEmpty } from 'usemods'

function validateForm(data: { email: string, website: string, name: string }) {
  const errors = []
  
  if (isEmpty(data.name)) {
    errors.push('Name is required')
  }
  
  if (!isEmail(data.email)) {
    errors.push('Invalid email address')
  }
  
  if (data.website && !isUrl(data.website)) {
    errors.push('Invalid website URL')
  }
  
  return errors
}
```

### Data Type Checking

```typescript
import { isNumber, isArray, isObject, isDate } from 'usemods'

function processData(data: unknown) {
  if (isNumber(data)) {
    return data * 2
  }
  
  if (isArray(data)) {
    return data.length
  }
  
  if (isObject(data)) {
    return Object.keys(data).length
  }
  
  if (isDate(data)) {
    return data.toISOString()
  }
  
  return 'Unknown type'
}
```

### Number Validation

```typescript
import { isEven, isPrime, isBetween, isDivisibleBy } from 'usemods'

function validateNumber(num: number) {
  const checks = {
    isEven: isEven(num),
    isPrime: isPrime(num),
    isInRange: isBetween(num, 1, 100),
    isDivisibleBy5: isDivisibleBy(num, 5)
  }
  
  return checks
}
```

---

## Notes

- Email validation uses a comprehensive regex pattern
- URL validation supports both http and https protocols
- UUID validation checks standard UUID format
- Credit card validation checks format only, not Luhn algorithm
- Coordinate validation ensures values are within valid ranges
- All validators return boolean values for easy use in conditionals

---

# Detections

Client-side detections for various user and browser information. Perfect for personalisation, analytics or debugging weird and wonderful bugs. You will need to add a listeners for reactivity.

**Lead:** Listen to your clients

## Overview

The Detections module provides functions to detect various browser and user environment information. These utilities help you detect scroll position, mouse position, window size, color scheme, timezone, breakpoints, network status, and URL information.

## Functions

### `detectScrollPosition(): { x: number, y: number } | null`

Detect the current scroll position of the window.

**Returns:** Object with x and y scroll positions, or null if server-side

**Example:**
```typescript
import { detectScrollPosition } from 'usemods'

const position = detectScrollPosition()
// { x: 0, y: 150 }

// For reactivity, add a scroll listener
window.addEventListener('scroll', () => {
  const pos = detectScrollPosition()
  console.log('Scrolled to:', pos)
})
```

---

### `detectMousePosition(event: MouseEvent): { x: number, y: number } | null`

Detect the absolute mouse position with the page.

**Parameters:**
- `event` (MouseEvent): Mouse event from mousemove listener

**Returns:** Object with x and y page coordinates, or null if server-side

**Note:** Don't forget to add a mousemove event listener to the window

**Example:**
```typescript
import { detectMousePosition } from 'usemods'

window.addEventListener('mousemove', (event) => {
  const position = detectMousePosition(event)
  // { x: 500, y: 300 }
})
```

---

### `detectRelativeMousePosition(event: MouseEvent): { x: number, y: number } | null`

Detect the relative mouse position with the window size and returns a percentage value.

**Parameters:**
- `event` (MouseEvent): Mouse event from mousemove listener

**Returns:** Object with x and y as percentages (0-1), or null if server-side

**Note:** Don't forget to add a mousemove event listener to the window

**Example:**
```typescript
import { detectRelativeMousePosition } from 'usemods'

window.addEventListener('mousemove', (event) => {
  const position = detectRelativeMousePosition(event)
  // { x: 0.5, y: 0.3 } (50% from left, 30% from top)
})
```

---

### `detectWindowSize(): { width: number, height: number } | null`

Detect the browser's window size.

**Returns:** Object with width and height, or null if server-side

**Example:**
```typescript
import { detectWindowSize } from 'usemods'

const size = detectWindowSize()
// { width: 1920, height: 1080 }

// For reactivity, add a resize listener
window.addEventListener('resize', () => {
  const size = detectWindowSize()
  console.log('Window size:', size)
})
```

---

### `detectScreenSize(): { width: number, height: number } | null`

Detect the screen or monitor size.

**Returns:** Object with screen width and height, or null if server-side

**Example:**
```typescript
import { detectScreenSize } from 'usemods'

const screen = detectScreenSize()
// { width: 2560, height: 1440 }
```

---

### `detectActiveBrowser(): boolean`

Detect if the browser window is currently active or hidden.

**Returns:** true if active, false if hidden, or false if server-side

**Example:**
```typescript
import { detectActiveBrowser } from 'usemods'

const isActive = detectActiveBrowser() // true or false

// For reactivity, add visibility change listener
document.addEventListener('visibilitychange', () => {
  const isActive = detectActiveBrowser()
  console.log('Browser active:', isActive)
})
```

---

### `detectColorScheme(): string | null`

Detect the current color scheme (Light or Dark).

**Returns:** 'dark' or 'light', or null if server-side

**Example:**
```typescript
import { detectColorScheme } from 'usemods'

const scheme = detectColorScheme() // 'dark' or 'light'

// For reactivity, add a media query listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const scheme = detectColorScheme()
  console.log('Color scheme:', scheme)
})
```

---

### `detectUserTimezone(): string | null`

Detect the current user's Timezone.

**Returns:** Timezone string (e.g., 'America/New_York'), or null if server-side

**Example:**
```typescript
import { detectUserTimezone } from 'usemods'

const timezone = detectUserTimezone()
// 'America/New_York'
```

---

### `detectBreakpoint(): string | null`

Detect the current breakpoint based on Tailwind CSS breakpoints.

**Returns:** Breakpoint name ('xs', 'sm', 'md', 'lg', 'xl', '2xl'), or null if server-side

**Note:** Add a listener to the window resize event to detect changes

**Example:**
```typescript
import { detectBreakpoint } from 'usemods'

const breakpoint = detectBreakpoint()
// 'md', 'lg', etc.

// For reactivity
window.addEventListener('resize', () => {
  const bp = detectBreakpoint()
  console.log('Breakpoint:', bp)
})
```

**Breakpoints:**
- `xs`: < 640px
- `sm`: 640px - 767px
- `md`: 768px - 1023px
- `lg`: 1024px - 1279px
- `xl`: 1280px - 1535px
- `2xl`: >= 1536px

---

### `detectContainerBreakpoint(element: HTMLElement): string | null`

Detect any container breakpoint based on Tailwind CSS breakpoints.

**Parameters:**
- `element` (HTMLElement): Container element to measure

**Returns:** Container breakpoint name ('@xs', '@sm', etc.), or null if server-side

**Note:** Add a listener to the window resize event to detect changes

**Example:**
```typescript
import { detectContainerBreakpoint } from 'usemods'

const container = document.querySelector('.container')
const breakpoint = detectContainerBreakpoint(container)
// '@md', '@lg', etc.
```

**Container Breakpoints:**
- `@xs`: < 320px
- `@sm`: 320px - 383px
- `@md`: 384px - 447px
- `@lg`: 448px - 511px
- `@xl`: 512px - 575px
- `@2xl`: 576px - 671px
- `@3xl`: 672px - 767px
- `@4xl`: 768px - 895px
- `@5xl`: 896px - 1023px
- `@6xl`: 1024px - 1151px
- `@7xl`: >= 1152px

---

### `detectNetworkStatus(): string | null`

Detect the current network status of the user (Online or Offline).

**Returns:** 'Online' or 'Offline', or null if server-side

**Example:**
```typescript
import { detectNetworkStatus } from 'usemods'

const status = detectNetworkStatus() // 'Online' or 'Offline'

// For reactivity
window.addEventListener('online', () => {
  console.log('Online')
})
window.addEventListener('offline', () => {
  console.log('Offline')
})
```

---

### `detectUrl(): string | null`

Returns the current URL.

**Returns:** Full URL string, or null if server-side

**Example:**
```typescript
import { detectUrl } from 'usemods'

const url = detectUrl()
// 'https://example.com/page?query=value#hash'
```

---

### `detectUrlPath(format?: 'array' | 'string'): string[] | string | null`

Returns the path of the current URL as an array or string.

**Parameters:**
- `format` ('array' | 'string', optional): Output format. Defaults to `'array'`

**Returns:** Path as array or string, or null if server-side

**Example:**
```typescript
import { detectUrlPath } from 'usemods'

// URL: https://example.com/users/123/profile
detectUrlPath() // ['users', '123', 'profile']
detectUrlPath('string') // 'users/123/profile'
```

---

### `detectUrlParams(format?: 'string' | 'object'): ({ [key: string]: string }[] | string) | null`

Returns a value from the URL by name.

**Parameters:**
- `format` ('string' | 'object', optional): Output format. Defaults to `'string'`

**Returns:** Query string or array of objects, or null if server-side

**Example:**
```typescript
import { detectUrlParams } from 'usemods'

// URL: https://example.com?name=John&age=30
detectUrlParams() // [{ name: 'John' }, { age: '30' }]
detectUrlParams('string') // 'name=John&age=30'
```

---

### `detectUrlHash(): string | null`

Returns a value from the URL hash by name.

**Returns:** Hash value without '#', or null if server-side

**Example:**
```typescript
import { detectUrlHash } from 'usemods'

// URL: https://example.com#section1
detectUrlHash() // 'section1'
```

---

### `detectHost(): string | null`

Returns the current host or domain name from the URL.

**Returns:** Host string (e.g., 'example.com:8080'), or null if server-side

**Example:**
```typescript
import { detectHost } from 'usemods'

detectHost() // 'example.com:8080'
```

---

### `detectHostName(): string | null`

Returns the current hostname from the URL.

**Returns:** Hostname string (e.g., 'example.com'), or null if server-side

**Example:**
```typescript
import { detectHostName } from 'usemods'

detectHostName() // 'example.com'
```

---

### `detectPort(): string | null`

Returns the current port.

**Returns:** Port string, or empty string if default port, or null if server-side

**Example:**
```typescript
import { detectPort } from 'usemods'

detectPort() // '8080' or '' (if default port)
```

---

## Usage Examples

### Responsive Design with Breakpoints

```typescript
import { detectBreakpoint, detectContainerBreakpoint } from 'usemods'

// Window breakpoint
window.addEventListener('resize', () => {
  const bp = detectBreakpoint()
  if (bp === 'md' || bp === 'lg') {
    // Tablet/desktop layout
  } else {
    // Mobile layout
  }
})

// Container breakpoint
const container = document.querySelector('.sidebar')
window.addEventListener('resize', () => {
  const containerBp = detectContainerBreakpoint(container)
  // Adjust layout based on container size
})
```

### Scroll and Mouse Tracking

```typescript
import { detectScrollPosition, detectMousePosition, detectRelativeMousePosition } from 'usemods'

// Track scroll
window.addEventListener('scroll', () => {
  const scroll = detectScrollPosition()
  // Update UI based on scroll position
})

// Track mouse
window.addEventListener('mousemove', (event) => {
  const absolute = detectMousePosition(event)
  const relative = detectRelativeMousePosition(event)
  // Use for parallax effects, tooltips, etc.
})
```

### URL and Navigation

```typescript
import { detectUrl, detectUrlPath, detectUrlParams, detectUrlHash } from 'usemods'

// Get current URL components
const url = detectUrl()
const path = detectUrlPath() // ['users', '123']
const params = detectUrlParams() // [{ id: '123' }]
const hash = detectUrlHash() // 'section1'

// Use for routing, analytics, etc.
```

### Environment Detection

```typescript
import { detectColorScheme, detectUserTimezone, detectNetworkStatus } from 'usemods'

// Color scheme
const scheme = detectColorScheme()
if (scheme === 'dark') {
  // Apply dark theme
}

// Timezone
const tz = detectUserTimezone()
// Use for date formatting

// Network status
const network = detectNetworkStatus()
if (network === 'Offline') {
  // Show offline message
}
```

---

## Notes

- All functions return `null` in server-side environments
- For reactivity, you need to add appropriate event listeners
- Breakpoint detection uses Tailwind CSS default breakpoints
- Container breakpoints use Tailwind's container query breakpoints
- URL detection functions work with the current browser URL
- Mouse position functions require a MouseEvent from a mousemove listener
- Network status can change, so use online/offline event listeners for reactivity

---

# Devices

Client-side detections user's machines.

**Lead:** Nice device you got there!

## Overview

The Devices module provides functions to detect user's device type, operating system, browser, and other device-related information. These utilities help you personalize experiences, add device-specific classes, and handle device-specific logic.

## Functions

### `isServerSide(): boolean`

Check if you're a server-side user.

**Returns:** true if server-side, false if client-side

**Example:**
```typescript
import { isServerSide } from 'usemods'

if (isServerSide()) {
  // Server-side code
} else {
  // Client-side code
}
```

---

### `detectUserDevice(userAgent?: string): object | string`

Detects the user's device based on the user agent string and returns the information as an object.

**Parameters:**
- `userAgent` (string, optional): User agent string. If not provided, uses navigator.userAgent

**Returns:** Object with os, browser, and device, or 'server' if server-side

**Example:**
```typescript
import { detectUserDevice } from 'usemods'

const device = detectUserDevice()
// {
//   os: 'Mac',
//   browser: 'Chrome',
//   device: 'Desktop'
// }
```

---

### `addDeviceClasses(userAgent?: string): void`

Adds detected devices as classes to your project's body class.

**Parameters:**
- `userAgent` (string, optional): User agent string. If not provided, uses navigator.userAgent

**Returns:** void

**Example:**
```typescript
import { addDeviceClasses } from 'usemods'

addDeviceClasses()
// Adds classes like 'mac', 'chrome', 'desktop' to document.body
```

---

### `detectDevice(userAgent?: string): string`

Detect the current device type (Mobile or Desktop).

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** 'Mobile' or 'Desktop', or 'server' if server-side without userAgent

**Example:**
```typescript
import { detectDevice } from 'usemods'

detectDevice() // 'Desktop' or 'Mobile'
```

---

### `detectBrowser(userAgent?: string): string`

Detect the current browser.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** Browser name ('Chrome', 'Firefox', 'Safari', 'Edge'), 'unknown', or 'server'

**Example:**
```typescript
import { detectBrowser } from 'usemods'

detectBrowser() // 'Chrome', 'Firefox', 'Safari', 'Edge', etc.
```

---

### `detectOS(userAgent?: string): string`

Detect the current operating system.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** OS name ('iOS', 'Android', 'Windows', 'Mac', 'Linux', 'UNIX'), 'unknown', or 'server'

**Example:**
```typescript
import { detectOS } from 'usemods'

detectOS() // 'Mac', 'Windows', 'iOS', 'Android', etc.
```

---

### `isIos(userAgent?: string): boolean`

Check if you're a passionate iPhone fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if iOS device, false otherwise

**Example:**
```typescript
import { isIos } from 'usemods'

if (isIos()) {
  // iOS-specific code
}
```

---

### `isAndroid(userAgent?: string): boolean`

Check if you're a zealous Android fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Android device, false otherwise

**Example:**
```typescript
import { isAndroid } from 'usemods'

if (isAndroid()) {
  // Android-specific code
}
```

---

### `isMac(userAgent?: string): boolean`

Check if you're a staunch Mac fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Mac, false otherwise

**Example:**
```typescript
import { isMac } from 'usemods'

if (isMac()) {
  // Mac-specific code
}
```

---

### `isWindows(userAgent?: string): boolean`

Check if you're a fervent Windows fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Windows, false otherwise

**Example:**
```typescript
import { isWindows } from 'usemods'

if (isWindows()) {
  // Windows-specific code
}
```

---

### `isLinux(userAgent?: string): boolean`

Check if you're a devoted Linux fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Linux, false otherwise

**Note:** Fun fact, most Linux users will tell you they have Linux before the function does.

**Example:**
```typescript
import { isLinux } from 'usemods'

if (isLinux()) {
  // Linux-specific code
}
```

---

### `isChrome(userAgent?: string): boolean`

Check if you're a die-hard Chrome fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Chrome, false otherwise

**Example:**
```typescript
import { isChrome } from 'usemods'

if (isChrome()) {
  // Chrome-specific code
}
```

---

### `isFirefox(userAgent?: string): boolean`

Check if you're a dedicated Firefox fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Firefox, false otherwise

**Example:**
```typescript
import { isFirefox } from 'usemods'

if (isFirefox()) {
  // Firefox-specific code
}
```

---

### `isSafari(userAgent?: string): boolean`

Check if you're a lonely Safari fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Safari, false otherwise

**Example:**
```typescript
import { isSafari } from 'usemods'

if (isSafari()) {
  // Safari-specific code
}
```

---

### `isEdge(userAgent?: string): boolean`

Check if you're an ardent Edge fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Edge, false otherwise

**Example:**
```typescript
import { isEdge } from 'usemods'

if (isEdge()) {
  // Edge-specific code
}
```

---

### `isMobile(userAgent?: string): boolean`

Check if you're rocking a mobile.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if mobile device, false otherwise

**Example:**
```typescript
import { isMobile } from 'usemods'

if (isMobile()) {
  // Mobile-specific code
}
```

---

### `isTablet(userAgent?: string): boolean`

Check if you're tablet user.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if tablet, false otherwise

**Example:**
```typescript
import { isTablet } from 'usemods'

if (isTablet()) {
  // Tablet-specific code
}
```

---

### `isDesktop(userAgent?: string): boolean`

Check if you're pro desktop user.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if desktop, false otherwise

**Example:**
```typescript
import { isDesktop } from 'usemods'

if (isDesktop()) {
  // Desktop-specific code
}
```

---

### `isPortrait(win?: { innerWidth: number, innerHeight: number }): boolean`

Check if you're portrait.

**Parameters:**
- `win` (object, optional): Window-like object for testability

**Returns:** true if portrait orientation, false otherwise

**Example:**
```typescript
import { isPortrait } from 'usemods'

if (isPortrait()) {
  // Portrait layout
}

// For reactivity
window.addEventListener('resize', () => {
  if (isPortrait()) {
    // Adjust layout
  }
})
```

---

### `isLandscape(win?: { innerWidth: number, innerHeight: number }): boolean`

Check if you're landscape.

**Parameters:**
- `win` (object, optional): Window-like object for testability

**Returns:** true if landscape orientation, false otherwise

**Example:**
```typescript
import { isLandscape } from 'usemods'

if (isLandscape()) {
  // Landscape layout
}
```

---

### `isBot(userAgent?: string): boolean`

Check if you're a cyborg or a bot.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if bot, false otherwise

**Example:**
```typescript
import { isBot } from 'usemods'

if (isBot()) {
  // Bot-specific handling
}
```

---

### `isHuman(userAgent?: string): boolean`

Check if you're a human.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if human (not bot), false otherwise

**Example:**
```typescript
import { isHuman } from 'usemods'

if (isHuman()) {
  // Human-specific code
}
```

---

### `isDeveloper(): boolean`

Check if you're a developer by checking the environment variable.

**Returns:** true if NODE_ENV is 'development', false otherwise

**Example:**
```typescript
import { isDeveloper } from 'usemods'

if (isDeveloper()) {
  // Development-only code
  console.log('Debug mode enabled')
}
```

---

## Usage Examples

### Device-Specific Styling

```typescript
import { addDeviceClasses, detectUserDevice } from 'usemods'

// Add device classes to body
addDeviceClasses()
// Now you can use CSS like: .mobile .header { ... }

// Or check device programmatically
const device = detectUserDevice()
if (device.device === 'Mobile') {
  // Mobile-specific logic
}
```

### Platform Detection

```typescript
import { isIos, isAndroid, isMac, isWindows } from 'usemods'

if (isIos()) {
  // iOS-specific features
} else if (isAndroid()) {
  // Android-specific features
} else if (isMac()) {
  // Mac-specific features
} else if (isWindows()) {
  // Windows-specific features
}
```

### Browser Detection

```typescript
import { isChrome, isFirefox, isSafari, isEdge } from 'usemods'

if (isChrome()) {
  // Chrome-specific code
} else if (isFirefox()) {
  // Firefox-specific code
} else if (isSafari()) {
  // Safari-specific code (often needs special handling)
} else if (isEdge()) {
  // Edge-specific code
}
```

### Responsive Detection

```typescript
import { isMobile, isTablet, isDesktop, isPortrait, isLandscape } from 'usemods'

// Device type
if (isMobile()) {
  // Mobile layout
} else if (isTablet()) {
  // Tablet layout
} else if (isDesktop()) {
  // Desktop layout
}

// Orientation
window.addEventListener('resize', () => {
  if (isPortrait()) {
    // Portrait layout
  } else if (isLandscape()) {
    // Landscape layout
  }
})
```

### Bot Detection

```typescript
import { isBot, isHuman } from 'usemods'

if (isBot()) {
  // Don't load heavy resources for bots
  // Or provide simplified content
} else if (isHuman()) {
  // Full experience for humans
}
```

### Development Detection

```typescript
import { isDeveloper } from 'usemods'

if (isDeveloper()) {
  // Show debug panels
  // Enable verbose logging
  // Add development tools
}
```

---

## Notes

- All detection functions work with user agent strings
- Functions return appropriate defaults in server-side environments
- `addDeviceClasses()` automatically adds lowercase class names to body
- Device detection uses user agent parsing, which may not be 100% accurate
- Bot detection uses common bot user agent patterns
- Orientation detection requires window resize listeners for reactivity
- All functions accept optional userAgent parameter for testing or SSR

---

# Goodies

A collection neat little functions that don't belong anywhere else.

**Lead:** A growing pile of treats.

## Overview

The Goodies module provides miscellaneous utility functions for text manipulation, password checking, field merging, reading time calculation, counting, and text animation. These are helpful utilities that don't fit into other categories.

## Functions

### `splitByWords(text: string): string`

Wraps each word, sentence or paragraph in a string with a tag.

**Parameters:**
- `text` (string): Text to split and wrap

**Returns:** HTML string with wrapped words and sentences

**Note:** Don't forget to render the HTML safely.

**Example:**
```typescript
import { splitByWords } from 'usemods'

const text = 'Hello world. How are you?'
const wrapped = splitByWords(text)
// '<span class="sentence sentence-1"><span class="word word-1">Hello</span> <span class="word word-2">world.</span></span><span class="sentence sentence-2">...</span>'
```

---

### `checkPasswordStrength(text: string, options?: { length?: number, uppercase?: number, number?: number, special?: number }): object`

Check the strength of a password against a given policy.

**Parameters:**
- `text` (string): Password to check
- `options` (object, optional):
  - `length` (number, optional): Minimum length. Defaults to `8`
  - `uppercase` (number, optional): Minimum uppercase letters. Defaults to `1`
  - `number` (number, optional): Minimum numbers. Defaults to `1`
  - `special` (number, optional): Minimum special characters. Defaults to `1`

**Returns:** Object with `score` (0-4) and `label` (string)

**Note:** Don't forget to use our Password Generator in the Generators section

**Example:**
```typescript
import { checkPasswordStrength } from 'usemods'

const result = checkPasswordStrength('MyP@ssw0rd', {
  length: 8,
  uppercase: 1,
  number: 1,
  special: 1
})
// { score: 4, label: 'Very Strong' }

// Possible labels:
// - 'Very Weak' (score: 0)
// - 'Weak' (score: 1)
// - 'Medium' (score: 2)
// - 'Strong' (score: 3)
// - 'Very Strong' (score: 4)
// Or policy violation messages
```

---

### `mergeFields(text: string, fields: Record<string | number, string | number>): string`

Replaces placeholders in a string with values from an object.

**Parameters:**
- `text` (string): Template string with {{placeholder}} syntax
- `fields` (Record<string | number, string | number>): Object with replacement values

**Returns:** String with placeholders replaced

**Example:**
```typescript
import { mergeFields } from 'usemods'

const template = 'Hello {{name}}, you have {{count}} messages.'
const result = mergeFields(template, {
  name: 'Alice',
  count: 5
})
// 'Hello Alice, you have 5 messages.'
```

---

### `readingTime(text: string, wordsPerMinute?: number): string`

Returns the reading time of a string in Hours, Minutes, and Seconds.

**Parameters:**
- `text` (string): Text to calculate reading time for
- `wordsPerMinute` (number, optional): Reading speed. Defaults to `200`

**Returns:** Human-readable duration string

**Example:**
```typescript
import { readingTime } from 'usemods'

const article = 'Long article text here...'
const time = readingTime(article)
// '5 minutes' or '1 hour 2 minutes' etc.

const fastTime = readingTime(article, 300) // Faster reader
```

---

### `countBy(text: string, options?: { by?: 'character' | 'word' | 'sentence' | 'paragraph' | 'unique', searchFor?: string }): number`

Count by character, word, sentence, paragraph or unique string.

**Parameters:**
- `text` (string): Text to count
- `options` (object, optional):
  - `by` ('character' | 'word' | 'sentence' | 'paragraph' | 'unique', optional): Count type. Defaults to `'character'`
  - `searchFor` (string, optional): String to search for when using 'unique'

**Returns:** Count number

**Example:**
```typescript
import { countBy } from 'usemods'

const text = 'Hello world. How are you? Fine, thanks.'

countBy(text) // 42 (characters)
countBy(text, { by: 'word' }) // 7 (words)
countBy(text, { by: 'sentence' }) // 2 (sentences)
countBy(text, { by: 'paragraph' }) // 1 (paragraph)

// Count occurrences of a string
countBy('hello hello world', { by: 'unique', searchFor: 'hello' }) // 2
```

---

### `animateText(text: string, options?: { splitBy?: 'word' | 'character', time?: number, unit?: 'ms' | 's', class?: string }): string`

Animate text by wrapping each character in a span with a delay.

**Parameters:**
- `text` (string): Text to animate
- `options` (object, optional):
  - `splitBy` ('word' | 'character', optional): Split method. Defaults to `'character'`
  - `time` (number, optional): Delay between elements. Defaults to `0.1`
  - `unit` ('ms' | 's', optional): Time unit. Defaults to `'s'`
  - `class` (string, optional): Additional CSS class

**Returns:** HTML string with animation-ready spans

**Example:**
```typescript
import { animateText } from 'usemods'

const animated = animateText('Hello World', {
  splitBy: 'character',
  time: 0.1,
  unit: 's',
  class: 'fade-in'
})

// Returns HTML with spans that have animation-delay styles
// You'll need CSS animations to make it work
```

**CSS Example:**
```css
.translate {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Usage Examples

### Password Validation

```typescript
import { checkPasswordStrength } from 'usemods'

function validatePassword(password: string) {
  const result = checkPasswordStrength(password, {
    length: 12,
    uppercase: 2,
    number: 2,
    special: 1
  })
  
  if (result.score < 3) {
    return { valid: false, message: result.label }
  }
  
  return { valid: true, message: result.label }
}
```

### Template Merging

```typescript
import { mergeFields } from 'usemods'

// Email template
const emailTemplate = `
  Hi {{name}},
  
  Your order #{{orderId}} has been shipped!
  Expected delivery: {{deliveryDate}}
  
  Thanks,
  {{companyName}}
`

const email = mergeFields(emailTemplate, {
  name: 'John Doe',
  orderId: '12345',
  deliveryDate: '2024-01-20',
  companyName: 'Acme Corp'
})
```

### Reading Time Display

```typescript
import { readingTime, countBy } from 'usemods'

function ArticleMeta({ content }: { content: string }) {
  const time = readingTime(content)
  const wordCount = countBy(content, { by: 'word' })
  
  return (
    <div>
      <span>{wordCount} words</span>
      <span> • </span>
      <span>{time} read</span>
    </div>
  )
}
```

### Text Animation

```typescript
import { animateText } from 'usemods'

// Character-by-character animation
const title = animateText('Welcome to our site', {
  splitBy: 'character',
  time: 0.05,
  unit: 's'
})

// Word-by-word animation
const subtitle = animateText('Discover amazing features', {
  splitBy: 'word',
  time: 0.2,
  unit: 's',
  class: 'slide-in'
})
```

### Text Analysis

```typescript
import { countBy, splitByWords } from 'usemods'

function analyzeText(text: string) {
  return {
    characters: countBy(text),
    words: countBy(text, { by: 'word' }),
    sentences: countBy(text, { by: 'sentence' }),
    paragraphs: countBy(text, { by: 'paragraph' }),
    // Count specific word
    helloCount: countBy(text, { by: 'unique', searchFor: 'hello' })
  }
}

// For word-by-word highlighting
const highlighted = splitByWords(text)
// Use with CSS for hover effects, etc.
```

---

## Notes

- `splitByWords` returns HTML that should be rendered safely (use v-html in Vue, dangerouslySetInnerHTML in React, etc.)
- `checkPasswordStrength` returns both a score and descriptive label
- `mergeFields` uses `{{key}}` syntax for placeholders
- `readingTime` uses 200 words per minute as default reading speed
- `countBy` with 'unique' requires the `searchFor` parameter
- `animateText` requires CSS animations to work - it only generates the HTML structure
- All functions handle empty strings gracefully

---

