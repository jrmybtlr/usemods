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
