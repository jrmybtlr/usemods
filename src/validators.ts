// title: Validators
// description: A collection of validators for common data types
// lead: Hmmmm what is that?

/**
 * Check if any given value is a valid email address.
 */
export function isEmail(value: string): boolean {
  const regex
    = /^(?!.*[._+-]{2})(?!.*[._+-]$)[a-zA-Z0-9._+-]+(?<!\.)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid number.
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Check if any given value is a valid URL.
 */
export function isUrl(value: string): boolean {
  const regex
    = /^(?:\w+:)?\/\/([^\s.]+\.\S{2,}|localhost[:?\d]*(?:[^:?\d]\S*)?)$/
  return regex.test(value)
}

/**
 * Check if any given string, array or object is empty.
 */
export function isEmpty(value: string | string[] | number[] | object | null | undefined): boolean {
  return (
    value === null
    || value === undefined
    || (typeof value === 'string' && value === '')
    || (Array.isArray(value) && value.length === 0)
    || (typeof value === 'object' && Object.keys(value).length === 0)
  )
}

/**
 * Check if any given value is a valid UUID.
 */
export function isUuid(value: unknown): boolean {
  if (typeof value !== 'string') return false
  const regex = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i
  return regex.test(value)
}

/**
 * Check if any given value is a valid JSON string.
 */
export function isJson(value: unknown): boolean {
  if (typeof value !== 'string') return false
  try {
    JSON.parse(value)
    return true
  }
  catch (error) {
    console.warn('[MODS] isJson Error:', error)
    return false
  }
}

/**
 * Check if any given value is an object.
 */
export function isObject(value: unknown): boolean {
  return value !== null && typeof value === 'object' && value.constructor === Object
}

/**
 * Check if any given value is an array.
 */
export function isArray(value: string[] | number[]): boolean {
  return Array.isArray(value)
}

/**
 * Check if any given value is a valid hexadecimal color code.
 */
export function isHex(value: string): boolean {
  const regex = /^#?([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
  return regex.test(value)
}

/**
 * Check if any given value contains only alphabetic characters.
 */
export function isAlphabetic(value: unknown): boolean {
  const regex = /^[a-zA-Z]+$/
  return regex.test(value as string)
}

/**
 * Check if any given value contains only alphanumeric characters.
 */
export function isAlphanumeric(value: unknown): boolean {
  const regex = /^[a-zA-Z0-9]+$/
  return regex.test(value as string)
}

/**
 * Check if any given value is a boolean value.
 */
export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean' || value === 'false' || value === 'true'
}

/**
 * Check if any given value is undefined.
 */
export function isUndefined(value: unknown): boolean {
  return value === undefined
}

/**
 * Check if any given value is null.
 */
export function isNull(value: unknown): boolean {
  return value === null
}

/**
 * Check if any given value is a valid Date object.
 */
export function isDate(value: unknown): boolean {
  if (value instanceof Date) return !isNaN(value.getTime())
  else if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value)
    return !isNaN(date.getTime())
  }
  return false
}

/**
 * Check if any given value is a valid time in HH:mm format.
 */
export function isTime(value: unknown): boolean {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9](?:\.\d{1,3})?)?$/
  return regex.test(value as string)
}

/**
 * Check if any given value year is a leap year.
 */
export function isLeapYear(value: number): boolean {
  return (value % 4 === 0 && value % 100 !== 0) || value % 400 === 0
}

/**
 * Check if the number is even.
 */
export function isEven(value: number): boolean {
  return value % 2 === 0
}

/**
 * Check if the number is odd.
 */
export function isOdd(value: number): boolean {
  return Math.abs(value % 2) === 1
}

/**
 * Check if the number is positive.
 */
export function isPositive(value: number): boolean {
  return Math.sign(value) === 1
}

/**
 * Check if the number is negative.
 */
export function isNegative(value: number): boolean {
  return Math.sign(value) === -1
}

/**
 * Check if the number is zero.
 */
export function isZero(value: number): boolean {
  return value === 0
}

/**
 * Check if the number is over 9000.
 */
export function isOver9000(value: number): boolean {
  return value > 9000
}

/**
 * Check if the number is a prime number.
 */
export function isPrime(value: number): boolean {
  const boundary = Math.floor(Math.sqrt(value))
  for (let i = 2; i <= boundary; i++) {
    if (value % i === 0) return false
  }
  return value >= 2
}

/**
 * Check if the number is an integer.
 */
export function isInteger(value: unknown): boolean {
  return Number.isInteger(value)
}

/**
 * Check if the number is a float.
 */
export function isFloat(value: unknown): boolean {
  if (typeof value !== 'number') return false
  return !isInteger(value)
}

/**
 * Check if the number is between the specified range.
 */
export function isBetween(value: number, min: number, max: number): boolean {
  if (min > max) {
    [min, max] = [max, min]
  }
  return value >= min && value <= max
}

/**
 * Check if the number is divisible by the specified number.
 */
export function isDivisibleBy(value: number, divisor: number): boolean {
  return value % divisor === 0
}

/**
 * Check if any given value is a valid credit card number.
 */
export function isCreditCard(value: unknown): boolean {
  if (typeof value === 'number') value = value.toString()
  if (typeof value !== 'string') return false
  const regex
    = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:0111|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid latitude-longitude coordinate in the format lat,lng or lat,lng.
 */
export function isLatLng(value: string): boolean {
  const regex
    = /^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)),\s*([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid latitude coordinate.
 */
export function isLatitude(value: string): boolean {
  const regex = /^[-+]?([1-8]?\d(\.\d{1,6})?|90(\.0{1,6})?)$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid longitude coordinate.
 */
export function isLongitude(value: string): boolean {
  const regex = /^[-+]?(180(\.0{1,6})?|((1[0-7]\d)|([1-9]?\d))(\.\d{1,6})?)$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid IP address.
 */
export function isIpAddress(value: string): boolean {
  const regex
    = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)((?::\d+)?|)$/
  return regex.test(value)
}

/**
 * Check if any given value is a valid port number.
 */
export function isPort(value: number): boolean {
  return value > 0 && value <= 65535
}

/**
 * Check if any given value is a valid MAC address.
 */
export function isMacAddress(value: string): boolean {
  const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return regex.test(value)
}
