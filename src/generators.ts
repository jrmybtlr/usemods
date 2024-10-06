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
  const max = 10 ** length - 1
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generate a random number between two values
 */
export function generateNumberBetween(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1) + from)
}

/**
 * Generate a universally unique identifier (UUID).
 */
export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generate a unique short ID based on the current timestamp
 */
export function generateShortId(length: number = 19): string {
  const timestampPart = Math.floor(Date.now()).toString().toUpperCase()
  const randomPart = Math.random().toString().slice(2).toUpperCase()
  return (timestampPart + randomPart).slice(0, length)
}

/**
 * Generate a random, secure password with a mix of character types and pleasant special characters.
 * @info Don't forget to use our Password Checker in the Goodies section
 */
export function generatePassword(options?: { length?: number, uppercase?: number, number?: number, special?: number }): string {
  const { length = 8, uppercase = 1, number = 1, special = 1 } = options || {}
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const specialChars = '!@#$%&()_+?'
  const allChars = 'abcdefghijklmnopqrstuvwxyz' + uppercaseChars + numberChars + specialChars

  let password = ''

  // Ensure the first character is a letter
  password += allChars.charAt(generateRandomIndex(52)) // Selects a random letter from the first 52 characters (lowercase + uppercase)

  for (let i = 1; i < length; i++) {
    password += allChars.charAt(generateRandomIndex(allChars.length))
  }

  // Ensure the password meets the criteria
  const ensureCriteria = (regex: RegExp, chars: string, count: number) => {
    while ((password.match(regex) || []).length < count) {
      const randomIndex = generateRandomIndex(password.length)
      password = password.substring(0, randomIndex) + chars.charAt(Math.floor(generateRandomIndex(chars.length))) + password.substring(randomIndex + 1)
    }
  }

  ensureCriteria(/[A-Z]/g, uppercaseChars, uppercase)
  ensureCriteria(/[0-9]/g, numberChars, number)
  ensureCriteria(/[^a-zA-Z0-9]/g, specialChars, special)

  return password
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
  let randomValue
  
  function getRandomValue() {
    if (!isServerSide() && window.crypto && window.crypto.getRandomValues) {
      return window.crypto.getRandomValues(new Uint8Array(1))[0]
    } else if (globalThis.crypto && globalThis.crypto.getRandomValues) {
      return globalThis.crypto.getRandomValues(new Uint8Array(1))[0]
    } else {
      console.warn('[MODS] crypto.getRandomValues is not available. Using random() fallback.')
      return Math.floor(Math.random() * max)
    }
  }
  do {
    randomValue = getRandomValue()
  } while (randomValue === undefined || randomValue >= range)

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
  } else if (format === 'paragraphs') {
    return Array.from({ length: count }, () => Array.from({ length: Math.floor(Math.random() * 10) + 5 }, generateSentence).join(' ')).join('\n\n')
  } else {
    return Array.from({ length: count }, () => lorem[Math.floor(Math.random() * lorem.length)]).join(' ')
  }
}