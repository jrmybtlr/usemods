import { expect, test } from 'vitest'
import * as mod from './validators'

test('isEmail', () => {
  // Valid email addresses
  expect(mod.isEmail('hello@email.com')).toBe(true)
  expect(mod.isEmail('john.doe+marketing@email.hospital')).toBe(true)
  expect(mod.isEmail('jane_d@example.abogado')).toBe(true)
  expect(mod.isEmail('first.last@sub.domain.com')).toBe(true)
  expect(mod.isEmail('_Yosemite.Sam@example.com')).toBe(true)
  expect(mod.isEmail('firstname-lastname@example.com')).toBe(true)
  expect(mod.isEmail('email@example.co.uk')).toBe(true)
  expect(mod.isEmail('1234567890@example.com')).toBe(true)
  expect(mod.isEmail('email@example.name')).toBe(true)
  expect(mod.isEmail('email@example.museum')).toBe(true)
  expect(mod.isEmail('email@example.travel')).toBe(true)
  // Invalid email addresses
  expect(mod.isEmail('helloemail.com')).toBe(false) // Missing @
  expect(mod.isEmail('plainaddress')).toBe(false) // Missing @ and domain
  expect(mod.isEmail('@missing-local-part.com')).toBe(false) // Missing local part
  expect(mod.isEmail('missing-at-sign.com')).toBe(false) // Missing @
  expect(mod.isEmail('missing-domain@.com')).toBe(false) // Missing domain
  expect(mod.isEmail('missing-tld@domain.')).toBe(false) // Missing TLD
  expect(mod.isEmail('missingdot@com')).toBe(false) // Missing dot in domain
  expect(mod.isEmail('two..dots@example.com')).toBe(false) // Consecutive dots in local part
  expect(mod.isEmail('john.doe@example..com')).toBe(false) // Consecutive dots in domain
  expect(mod.isEmail('jane_d@example.abogado@com')).toBe(false) // Two @ signs
  expect(mod.isEmail('hello@123.123.123.123')).toBe(false) // IP address instead of domain
  expect(mod.isEmail('john.doe.@example.com')).toBe(false) // Trailing dot in local part
  expect(mod.isEmail('john..doe@example.com')).toBe(false) // Consecutive dots in local part
  expect(mod.isEmail('john.doe@example')).toBe(false) // Missing TLD
  expect(mod.isEmail('jd+m@email.c')).toBe(false) // TLD too short
  expect(mod.isEmail('h#email.com')).toBe(false) // Invalid character in local part
})

test('isNumber', () => {
  expect(mod.isNumber(0)).toBe(true)
  expect(mod.isNumber(123)).toBe(true)
  expect(mod.isNumber('123')).toBe(false)
  expect(mod.isNumber('abc')).toBe(false)
})

test('isUrl', () => {
  expect(mod.isUrl('https://usemods.com')).toBe(true)
  expect(mod.isUrl('https://www.usemods.com')).toBe(true)
  expect(mod.isUrl('ftp://192.168.0.1')).toBe(true)
  expect(mod.isUrl('www.usemods')).toBe(false)
  expect(mod.isUrl('usemods.com')).toBe(false)
  expect(mod.isUrl('com.usemods')).toBe(false)
  expect(mod.isUrl('usemods')).toBe(false)
})

test('isUuid', () => {
  // Valid UUIDs
  expect(mod.isUuid('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')).toBe(true)
  // False positives
  expect(mod.isUuid('hello')).toBe(false)
  expect(mod.isUuid(1234567890)).toBe(false)
})

test('isJson', () => {
  expect(mod.isJson('{"hello": "world"}')).toBe(true)
  // False
  expect(mod.isJson('{"hello": world}')).toBe(false)
  expect(mod.isJson('hello')).toBe(false)
  expect(mod.isJson(123)).toBe(false)
})

test('isHex', () => {
  expect(mod.isHex('#ffffff')).toBe(true)
  expect(mod.isHex('#gggggg')).toBe(false)
})

test('isEmpty', () => {
  expect(mod.isEmpty('')).toBe(true)
  expect(mod.isEmpty([])).toBe(true)
  expect(mod.isEmpty({})).toBe(true)
  expect(mod.isEmpty(null)).toBe(true)
  expect(mod.isEmpty(undefined)).toBe(true)
  expect(mod.isEmpty('hello')).toBe(false)
  expect(mod.isEmpty([1])).toBe(false)
  expect(mod.isEmpty({ key: 'value' })).toBe(false)
})

test('isAlphabetic', () => {
  expect(mod.isAlphabetic('hello')).toBe(true)
  expect(mod.isAlphabetic('hello123')).toBe(false)
  expect(mod.isAlphabetic(123)).toBe(false)
  expect(mod.isAlphabetic(['a', 'b', 'c'])).toBe(false)
})

test('isAlphanumeric', () => {
  expect(mod.isAlphanumeric('hello')).toBe(true)
  // @ts-expect-error - Testing invalid input
  expect(mod.isAlphanumeric(123)).toBe(true)
  expect(mod.isAlphanumeric('hello123')).toBe(true)
  expect(mod.isAlphanumeric('hello!')).toBe(false)
  // @ts-expect-error - Testing invalid input
  expect(mod.isAlphanumeric(['a', 2, '!'])).toBe(false)
})

test('isArray', () => {
  expect(mod.isArray([])).toBe(true)
  expect(mod.isArray(['hello'])).toBe(true)
  // @ts-expect-error - Testing invalid input
  expect(mod.isArray('hello')).toBe(false)
})

test('isObject', () => {
  expect(mod.isObject({ hello: 'world' })).toBe(true)
  expect(mod.isObject('hello')).toBe(false)
})

test('isBoolean', () => {
  expect(mod.isBoolean(true)).toBe(true)
  // @ts-expect-error - Testing invalid input
  expect(mod.isBoolean(1)).toBe(false)
  // @ts-expect-error - Testing invalid input
  expect(mod.isBoolean('hello')).toBe(false)
})

test('parseDate', () => {
  const d = new Date('2024-01-01T00:00:00.000Z')
  expect(mod.parseDate(d)).toBe(d)
  expect(mod.parseDate('2024-01-01')?.getFullYear()).toBe(2024)
  expect(mod.parseDate(0)?.getTime()).toBe(0)
  expect(mod.parseDate('2024-01-day')).toBeNull()
  expect(mod.parseDate('hello')).toBeNull()
  expect(mod.parseDate({ year: 2024, month: 1, day: 1 })).toBeNull()
})

test('isDate', () => {
  expect(mod.isDate(new Date())).toBe(true)
  expect(mod.isDate('2024-01-01')).toBe(true)
  expect(mod.isDate('2024-01-day')).toBe(false)
  expect(mod.isDate('hello')).toBe(false)
  // @ts-expect-error - Testing invalid date object
  expect(mod.isDate({ year: 2024, month: 1, day: 1 })).toBe(false)
})

test('isPort', () => {
  expect(mod.isPort(80)).toBe(true)
  expect(mod.isPort(65535)).toBe(true)
  expect(mod.isPort(65536)).toBe(false)
  expect(mod.isPort(-1)).toBe(false)
  // @ts-expect-error - Testing invalid input
  expect(mod.isPort('hello')).toBe(false)
})

test('isUndefined', () => {
  expect(mod.isUndefined(undefined)).toBe(true)
  // @ts-expect-error - Testing invalid input
  expect(mod.isUndefined('hello')).toBe(false)
})

test('isNull', () => {
  expect(mod.isNull(null)).toBe(true)
  // @ts-expect-error - Testing invalid input
  expect(mod.isNull('hello')).toBe(false)
})

test('isTime', () => {
  expect(mod.isTime('12:00')).toBe(true)
  expect(mod.isTime('12:00:00')).toBe(true)
  expect(mod.isTime('12:00:00.123')).toBe(true)
  expect(mod.isTime('hello')).toBe(false)
})

test('isLeapYear', () => {
  expect(mod.isLeapYear(2020)).toBe(true)
  expect(mod.isLeapYear(2021)).toBe(false)
})

test('isEven', () => {
  expect(mod.isEven(2)).toBe(true)
  expect(mod.isEven(3)).toBe(false)
})

test('isOdd', () => {
  expect(mod.isOdd(2)).toBe(false)
  expect(mod.isOdd(3)).toBe(true)
})

test('isPositive', () => {
  expect(mod.isPositive(2)).toBe(true)
  expect(mod.isPositive(-2)).toBe(false)
})

test('isNegative', () => {
  expect(mod.isNegative(2)).toBe(false)
  expect(mod.isNegative(-2)).toBe(true)
})

test('isPrime', () => {
  expect(mod.isPrime(2)).toBe(true)
  expect(mod.isPrime(4)).toBe(false)
})

test('isInteger', () => {
  expect(mod.isInteger(2)).toBe(true)
  expect(mod.isInteger(-2)).toBe(true)
  expect(mod.isInteger(2.5)).toBe(false)
  expect(mod.isInteger('hello')).toBe(false)
  expect(mod.isInteger('2')).toBe(false)
  expect(mod.isInteger({})).toBe(false)
  expect(mod.isInteger([])).toBe(false)
  expect(mod.isInteger(null)).toBe(false)
  expect(mod.isInteger(true)).toBe(false)
  expect(mod.isInteger(undefined)).toBe(false)
})

test('isFloat', () => {
  expect(mod.isFloat(2.5)).toBe(true)
  expect(mod.isFloat(2)).toBe(false)
  expect(mod.isFloat('hello')).toBe(false)
  expect(mod.isFloat({})).toBe(false)
  expect(mod.isFloat([])).toBe(false)
  expect(mod.isFloat(null)).toBe(false)
  expect(mod.isFloat(true)).toBe(false)
  expect(mod.isFloat(undefined)).toBe(false)
})

test('isBetween', () => {
  expect(mod.isBetween(4, 2, 6)).toBe(true)
  expect(mod.isBetween(4, 6, 2)).toBe(true)
  expect(mod.isBetween(4, 6, 8)).toBe(false)
})

test('isDivisibleBy', () => {
  expect(mod.isDivisibleBy(4, 2)).toBe(true)
  expect(mod.isDivisibleBy(4, 3)).toBe(false)
})

test('isOver9000', () => {
  expect(mod.isOver9000(9001)).toBe(true)
  expect(mod.isOver9000(9000)).toBe(false)
})

test('isCreditCard', () => {
  expect(mod.isCreditCard('4111111111111111')).toBe(true)
  expect(mod.isCreditCard(4111111111111111)).toBe(true)
  expect(mod.isCreditCard('hello')).toBe(false)
  expect(mod.isCreditCard({})).toBe(false)
  expect(mod.isCreditCard(1234567890123456)).toBe(false)
})

test('isZero', () => {
  expect(mod.isZero(0)).toBe(true)
  expect(mod.isZero(1)).toBe(false)
})

test('isIpAddress', () => {
  expect(mod.isIpAddress('192.168.0.1')).toBe(true)
  expect(mod.isIpAddress('192.168.0.1:3000')).toBe(true)
  expect(mod.isIpAddress('00:00:00:00:00:00')).toBe(false)
  expect(mod.isIpAddress('hello')).toBe(false)
})

test('isMacAddress', () => {
  expect(mod.isMacAddress('00:00:00:00:00:00')).toBe(true)
  expect(mod.isMacAddress('hello')).toBe(false)
})

test('isLatLng', () => {
  expect(mod.isLatLng('12.345678,-98.765432')).toBe(true)
  expect(mod.isLatLng('12.345678, -98.765432')).toBe(true)
  expect(mod.isLatLng('98.765432,12.345678')).toBe(false)
  expect(mod.isLatLng('hello')).toBe(false)
})

test('isLatitude', () => {
  expect(mod.isLatitude('12.345678')).toBe(true)
  expect(mod.isLatitude('hello')).toBe(false)
})

test('isLongitude', () => {
  expect(mod.isLongitude('-98.765432')).toBe(true)
  expect(mod.isLongitude('hello')).toBe(false)
})
