import { expect, test, describe } from 'vitest'
import * as mod from './generators'

test('generateNumber', () => {
  expect(mod.generateNumber(1).toString()).toHaveLength(1)
  expect(mod.generateNumber(2).toString()).toHaveLength(2)
  expect(mod.generateNumber(3).toString()).toHaveLength(3)
  expect(mod.generateNumber(4).toString()).toHaveLength(4)
  expect(mod.generateNumber(5).toString()).toHaveLength(5)
  expect(mod.generateNumber(10).toString()).toHaveLength(10)
  expect(mod.generateNumber(0)).toBe(0)
})

test('generateNumberBetween', () => {
  expect(mod.generateNumberBetween(5, 10)).toBeGreaterThanOrEqual(5)
  expect(mod.generateNumberBetween(5, 10)).toBeLessThanOrEqual(10)
  expect(mod.generateNumberBetween(10, 15)).toBeGreaterThanOrEqual(10)
  expect(mod.generateNumberBetween(10, 15)).toBeLessThanOrEqual(15)
  expect(mod.generateNumberBetween(15, 10)).toBeLessThanOrEqual(15)
  expect(mod.generateNumberBetween(1, 1)).toBe(1)
})

test('generateUuid', () => {
  expect(mod.generateUuid()).toHaveLength(36)
  expect(mod.generateUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
})

test('generateShortId', () => {
  expect(mod.generateShortId(19)).toHaveLength(19)
  expect(mod.generateShortId(19)).toMatch(/^[0-9a-zA-Z]{19}$/)
})

test('generatePassword', () => {
  expect(mod.generatePassword()).toHaveLength(8)
  expect(mod.generatePassword({length: 12})).toHaveLength(12)
  expect(mod.generatePassword({length: 8})).toHaveLength(8)
  expect(mod.generatePassword({length: 12, special: 1})).toMatch(new RegExp(/^[0-9a-zA-Z!@#$%^&*()]{12}$/))
  expect(mod.generatePassword({length: 8, special: 1})).toMatch(new RegExp(/^[0-9a-zA-Z!@#$%^&*()]{8}$/))
})
