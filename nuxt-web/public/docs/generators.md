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
