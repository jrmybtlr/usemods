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
