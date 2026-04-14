import { expect, test } from 'vitest'
import * as mod from './dates'

const utc = { locale: 'en-US', timeZone: 'UTC' } as const
const sample = new Date('2025-06-15T12:00:00.000Z')

test('formatDate', () => {
  expect(mod.formatDate(sample, { ...utc, dateStyle: 'medium' })).toBe('Jun 15, 2025')
  expect(mod.formatDate('invalid')).toBe('')
})

test('formatTime', () => {
  expect(mod.formatTime(sample, { ...utc, timeStyle: 'short' })).toBe('12:00 PM')
  expect(mod.formatTime(sample, { ...utc, timeStyle: 'short', hour12: false })).toBe('12:00')
})

test('formatDateTime', () => {
  expect(mod.formatDateTime(sample, { ...utc, dateStyle: 'medium', timeStyle: 'short' })).toBe(
    'Jun 15, 2025, 12:00 PM',
  )
})

test('timeFrom', () => {
  const now = new Date('2025-06-15T12:00:00.000Z')
  expect(mod.timeFrom(new Date('2025-06-15T12:00:10.000Z'), { ...utc, now })).toBe('Now')
  expect(mod.timeFrom(new Date('2025-06-15T11:59:00.000Z'), { ...utc, now })).toBe('1 min ago')
  expect(mod.timeFrom(new Date('2025-06-15T13:00:00.000Z'), { ...utc, now })).toBe('in 1 hr')
  expect(mod.timeFrom(new Date('2025-10-15T12:00:00.000Z'), { ...utc, now })).toBe('in 4 months')
  expect(mod.timeFrom('invalid', { ...utc, now })).toBe('')
})

test('timeDifference', () => {
  const a = new Date('2025-01-01T00:00:00.000Z')
  const b = new Date('2025-01-11T00:00:00.000Z')
  expect(mod.timeDifference(a, b, { ...utc, unit: 'days' })).toBe('10 days')
  expect(mod.timeDifference(a, b, { ...utc, unit: 'hours' })).toBe('240 hours')
  expect(mod.timeDifference(a, b, { ...utc, unit: 'auto', style: 'short', maxUnits: 2 })).toBe('10 days')
  expect(mod.timeDifference('invalid', b, utc)).toBe('')
  const y1 = new Date('2020-01-01T00:00:00.000Z')
  const y2 = new Date('2021-11-13T14:00:00.000Z')
  expect(mod.timeDifference(y1, y2, { ...utc, unit: 'auto', style: 'long', maxUnits: 4 })).toBe(
    '1 year 10 months 17 days 14 hours',
  )
})
