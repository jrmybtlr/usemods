// title: Generators
// description: A collection of magical functions that conjure data out of thin air.
// lead: Conjure data out of thin air

import { isServerSide } from './devices'

/**
 * Generate a random number
 */
export function generateNumber(length: number): number {
  if (!Number.isInteger(length) || length <= 0) {
    console.warn('[MODS] Warning: length must be a positive integer')
    return 0
  }
  const min = 10 ** (length - 1)
  const range = 9 * min
  const value = getSecureRandomValues(new Uint8Array(6))
    .reduce((acc, byte) => acc * 256 + byte, 0) % range
  return min + value
}

/**
 * Generate a random number within an inclusive range.
 */
export function generateNumberBetween(from: number, to: number): number {
  const min = Math.min(from, to)
  const max = Math.max(from, to)
  const range = max - min + 1
  const value = getSecureRandomValues(new Uint8Array(6))
    .reduce((acc, byte) => acc * 256 + byte, 0) % range
  return min + value
}

/**
 * Generate a Version 4 UUID using crypto.randomUUID() when available, falling back to manual generation
 */
export function generateUuid4(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  // Fallback to manual generation
  const bytes = new Uint8Array(16)
  getSecureRandomValues(bytes)

  // Set version 4 (random)
  bytes[6] = (bytes[6]! & 0x0f) | 0x40
  bytes[8] = (bytes[8]! & 0x3f) | 0x80

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0'))

  // Format the UUID as a standard string: 8-4-4-4-12.
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`
}

export const generateUuid = generateUuid4

/**
 * Generate a Version 7 UUID encoding a Unix timestamp in the first 6 bytes and filling the rest with random bytes.
 */
export function generateUuid7(): string {
  const now = Date.now() // milliseconds
  const subMillisecondNanoseconds = generateHighResolutionTime() % 1_000_000n // nanoseconds
  const fraction = Number((subMillisecondNanoseconds * 4096n) / 1_000_000n) & 0xfff // 12-bit fraction

  // Combine the timestamp and fraction into a 64-bit value
  const compositeTimestamp = (((BigInt(now) * 4096n) + BigInt(fraction)) << 4n)

  // Create a buffer to store the UUID with the timestamp.
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)

  // Set the composite timestamp into the buffer (first 6 bytes of the UUID).
  view.setBigUint64(0, compositeTimestamp, false)

  const timestampBytes = new Uint8Array(buffer)

  // Set version 7 (UUIDv7) in the timestamp (binary 01110000 in the high nibble of byte 6).
  timestampBytes[6] = (timestampBytes[6]! & 0x0f) | 0x70

  // Create an array for the full UUID (16 bytes total).
  const uuidBytes = new Uint8Array(16)
  uuidBytes.set(timestampBytes, 0)

  // Fill the remaining 8 bytes with random values.
  getSecureRandomValues(uuidBytes.subarray(8))

  // Set the variant for UUIDv7.
  uuidBytes[8] = (uuidBytes[8]! & 0x3f) | 0x80

  // Convert the UUID bytes to a hexadecimal string.
  const hex = Array.from(uuidBytes, b => b.toString(16).padStart(2, '0'))

  // Format the UUID as a standard string: 8-4-4-4-12.
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-')
}

/**
 * Decode a UUIDv7 string into a timestamp
 */
export function decodeUuid7(uuid: string): string {
  const hex = uuid.replaceAll('-', '')

  // Check if the UUID7 is valid
  if (!/^[0-9a-f]{32}$/i.test(hex)) {
    throw new Error('[MODS] Invalid UUID: not enough data to decode timestamp.')
  }

  // Check if it's a UUIDv7 by examining version bits
  const version = (parseInt(hex[12]!, 16) & 0xf)
  if (version !== 7) {
    throw new Error('[MODS] Invalid UUID7: version is not v7.')
  }

  // Decode the timestamp
  const timestamp = Number((BigInt(`0x${hex.slice(0, 16)}`) >> 4n) / 4096n)
  const date = new Date(timestamp)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new RangeError('[MODS] Invalid time value decoded from UUIDv7.')
  }

  // Return the date in ISO format
  return date.toISOString()
}

/**
 * Encodes a standard UUID (with dashes) into a URL-safe Base64 variant
 */
export function generateShortUuid(uuid: string): string {
  // Remove dashes and validate length
  const hex = uuid.replaceAll('-', '')
  if (hex.length !== 32) {
    throw new Error(`Invalid UUID: expected 32 hex chars, got length=${hex.length}.`)
  }

  // Convert each pair of hex digits to a byte (16 bytes total)
  const pairs = hex.match(/.{2}/g)!
  const bytes = pairs.map(pair => parseInt(pair, 16))

  // Convert bytes to binary string, then to Base64
  const binary = String.fromCharCode(...bytes)
  const base64 = btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
  return base64
}

/**
 * Decodes a short URL-safe Base64-encoded string back into a standard UUID
 */
export function decodeShortUuid(shortUuid: string): string {
  // Convert URL-safe chars back to normal Base64 and pad with '='
  let base64 = shortUuid.replaceAll('-', '+').replaceAll('_', '/')
  while (base64.length % 4 !== 0) {
    base64 += '='
  }

  // Decode Base64 → binary string
  const binary = atob(base64)
  if (binary.length !== 16) {
    throw new Error(`[MODS] Decoded data must be 16 bytes; got length=${binary.length}.`)
  }

  // Convert each byte to two hex digits
  const hex = Array.from(binary)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')

  // Insert dashes (8-4-4-4-12)
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join('-')
}

/**
 * Generate a unique short ID based on the current timestamp
 */
export function generateShortId(length: number = 19): string {
  const timestampPart = Math.floor(Date.now()).toString().toUpperCase()
  const randomPart = Math.random().toString(36).slice(2).toUpperCase()
  return (timestampPart + randomPart).slice(0, length)
}

/**
 * Generate a random, secure password with a mix of character types and pleasant special characters.
 * @info Don't forget to use our Password Checker in the Goodies section
 */
export function generatePassword(options: { length?: number, uppercase?: number, numbers?: number, number?: number, symbols?: number, special?: number } = {}): string {
  const length = options.length ?? 8
  const uppercase = options.uppercase ?? 0
  // Support both 'numbers' and legacy 'number'
  const numbers = options.numbers ?? options.number ?? 0
  // Support both 'symbols' and legacy 'special'
  const symbols = options.symbols ?? options.special ?? 0

  const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  // Build the character pool based on requirements
  let chars = lowerChars
  if (uppercase > 0) chars += upperChars
  if (numbers > 0) chars += numberChars
  if (symbols > 0) chars += symbolChars

  // Collect guaranteed characters
  const guaranteed: string[] = []
  for (let i = 0; i < uppercase; i++) {
    guaranteed.push(upperChars[Math.floor(Math.random() * upperChars.length)]!)
  }
  for (let i = 0; i < numbers; i++) {
    guaranteed.push(numberChars[Math.floor(Math.random() * numberChars.length)]!)
  }
  for (let i = 0; i < symbols; i++) {
    guaranteed.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]!)
  }

  // Fill the rest with random characters from the pool
  while (guaranteed.length < length) {
    guaranteed.push(chars[Math.floor(Math.random() * chars.length)]!)
  }

  // Shuffle the password to randomize the position of guaranteed characters
  for (let i = guaranteed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[guaranteed[i], guaranteed[j]] = [guaranteed[j]!, guaranteed[i]!]
  }

  return guaranteed.join('')
}

/**
 * Random number generator using cryptographic methods to avoid random().
 */
export function generateRandomIndex(max: number): number {
  if (max <= 0 || max > 256) {
    console.warn('[MODS] Max generateRandomIndex must be between 1 and 255')
    return 0
  }

  const range = 256 - (256 % max)
  const buffer = new Uint8Array(1)
  let randomValue: number

  do {
    randomValue = getSecureRandomValues(buffer)[0]!
  } while (randomValue >= range)

  return randomValue % max
}

/**
 * Generate Lorem Ipsum text in various formats.
 */
export function generateLoremIpsum(count: number = 5, options?: { format: 'words' | 'sentences' | 'paragraphs' }): string {
  const { format = 'words' } = options || {}
  const lorem = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ')

  function generateSentence() {
    const words = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => lorem[Math.floor(Math.random() * lorem.length)]).join(' ')
    return formatSentence(words)
  }

  function formatSentence(sentence: string) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
  }

  if (format === 'sentences') {
    return Array.from({ length: count }, generateSentence).join(' ')
  }
  else if (format === 'paragraphs') {
    return Array.from({ length: count }, () => Array.from({ length: Math.floor(Math.random() * 10) + 5 }, generateSentence).join(' ')).join('\n\n')
  }
  else {
    return Array.from({ length: count }, () => lorem[Math.floor(Math.random() * lorem.length)]).join(' ')
  }
}

/**
 * Helper function to get high-resolution time using modern performance APIs.
 * @info Uses performance.now() for high precision timing in microseconds
 */
export function generateHighResolutionTime(): bigint {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return BigInt(Math.floor(performance.now() * 1e6))
  }
  else {
    console.warn('[MODS] High-resolution timer is not available, using 0 as fallback')
    return 0n
  }
}

/**
  * Returns an array filled with cryptographic random bytes.
*/
export function getSecureRandomValues(buffer: Uint8Array): Uint8Array {
  if (!isServerSide() && window.crypto?.getRandomValues) {
    return window.crypto.getRandomValues(buffer)
  }
  else if (globalThis.crypto?.getRandomValues) {
    return globalThis.crypto.getRandomValues(buffer)
  }
  else {
    console.warn('[MODS] crypto.getRandomValues is not available. Using Math.random() fallback.')
    for (let i = 0; i < buffer.length; i++) {
      // fill each byte with a pseudorandom number between 0 and 255.
      buffer[i] = Math.floor(Math.random() * 256)
    }
    return buffer
  }
}
