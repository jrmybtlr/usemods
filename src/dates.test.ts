import { expect, test, vi } from 'vitest'
import * as mod from './dates'

const localeOpts = { locale: 'en-US' } as const

test('isToday', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))
  expect(mod.isToday(new Date(2025, 5, 15, 23, 59, 0))).toBe(true)
  expect(mod.isToday(new Date(2025, 5, 16, 0, 0, 0))).toBe(false)
  expect(mod.isToday('invalid')).toBe(false)
  vi.useRealTimers()
})

test('isPast and isFuture', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2025-06-15T12:00:00.000Z'))
  expect(mod.isPast(new Date('2025-06-15T11:00:00.000Z'))).toBe(true)
  expect(mod.isPast(new Date('2025-06-15T13:00:00.000Z'))).toBe(false)
  expect(mod.isFuture(new Date('2025-06-15T13:00:00.000Z'))).toBe(true)
  expect(mod.isFuture(new Date('2025-06-15T11:00:00.000Z'))).toBe(false)
  vi.useRealTimers()
})

test('isSameDay and isSameMonth', () => {
  const a = new Date(2025, 5, 15, 8, 0, 0)
  const b = new Date(2025, 5, 15, 20, 0, 0)
  const c = new Date(2025, 6, 15, 8, 0, 0)
  expect(mod.isSameDay(a, b)).toBe(true)
  expect(mod.isSameDay(a, c)).toBe(false)
  expect(mod.isSameMonth(a, c)).toBe(false)
  expect(mod.isSameMonth(a, b)).toBe(true)
})

test('isDateBetween', () => {
  const start = new Date('2025-01-01T00:00:00.000Z')
  const end = new Date('2025-01-10T00:00:00.000Z')
  const inside = new Date('2025-01-05T12:00:00.000Z')
  const outside = new Date('2025-01-11T00:00:00.000Z')
  expect(mod.isDateBetween(inside, start, end)).toBe(true)
  expect(mod.isDateBetween(outside, start, end)).toBe(false)
  expect(mod.isDateBetween(start, start, end)).toBe(true)
  expect(mod.isDateBetween(end, start, end, { inclusive: false })).toBe(false)
  expect(mod.isDateBetween(inside, end, start)).toBe(true)
})

test('timeFrom', () => {
  const now = new Date('2025-06-15T12:00:00.000Z')
  expect(mod.timeFrom(new Date('2025-06-15T12:00:10.000Z'), { ...localeOpts, now })).toBe('Now')
  expect(mod.timeFrom(new Date('2025-06-15T11:59:00.000Z'), { ...localeOpts, now })).toBe('1 minute ago')
  expect(mod.timeFrom(new Date('2025-06-15T13:00:00.000Z'), { ...localeOpts, now })).toBe('in 1 hour')
  expect(mod.timeFrom(new Date('2025-10-15T12:00:00.000Z'), { ...localeOpts, now })).toBe('in 4 months')
  expect(mod.timeFrom(new Date('2025-06-18T12:00:00.000Z'), { ...localeOpts, now, style: 'long' })).toBe('in 3 days')
  expect(mod.timeFrom(new Date('2025-06-12T12:00:00.000Z'), { ...localeOpts, now, style: 'long' })).toBe('3 days ago')
  expect(mod.timeFrom(new Date('2025-06-18T12:00:00.000Z'), { ...localeOpts, now, style: 'short' })).toBe('in 3d')
  expect(mod.timeFrom(new Date('2025-06-12T12:00:00.000Z'), { ...localeOpts, now, style: 'short' })).toBe('3d ago')
  expect(mod.timeFrom(new Date('2025-06-15T11:00:00.000Z'), { ...localeOpts, now, style: 'short' })).toBe('1h ago')
  expect(mod.timeFrom(new Date('2025-06-15T11:00:00.000Z'), { ...localeOpts, now, style: 'narrow' })).toBe('1h ago')
  expect(mod.timeFrom('invalid', { ...localeOpts, now })).toBe('')
})

test('timeDifference', () => {
  const a = new Date('2025-01-01T00:00:00.000Z')
  const b = new Date('2025-01-11T00:00:00.000Z')
  expect(mod.timeDifference(a, b, { ...localeOpts, unit: 'days' })).toBe('10 days')
  expect(mod.timeDifference(a, b, { ...localeOpts, unit: 'hours' })).toBe('240 hours')
  expect(mod.timeDifference(a, b, { ...localeOpts, unit: 'auto', style: 'short', maxUnits: 2 })).toBe('10 days')
  expect(mod.timeDifference('invalid', b, localeOpts)).toBe('')
  const y1 = new Date('2020-01-01T00:00:00.000Z')
  const y2 = new Date('2021-11-13T14:00:00.000Z')
  expect(mod.timeDifference(y1, y2, { ...localeOpts, unit: 'auto', style: 'long', maxUnits: 4 })).toBe(
    '1 year 10 months 17 days 14 hours',
  )
})

test('combineDates', () => {
  // Same Day with different times
  expect(mod.combineDates(new Date('2025-01-01T00:00:00Z'), new Date('2025-01-01T08:00:00Z'), { timeZone: 'UTC' })).toBe('January 1, 2025, 12:00 AM to 8:00 AM')
  expect(mod.combineDates(new Date('2025-01-01T00:00:00Z'), new Date('2025-01-01T08:00:00Z'), { locale: 'en-AU', format: 'short', timeZone: 'UTC' })).toBe('1 Jan 2025, 12:00 am to 8:00 am')
  expect(mod.combineDates(new Date('2025-01-01T09:00:00Z'), new Date('2025-01-01T14:30:00Z'), { locale: 'en-AU', format: 'short', timeZone: 'UTC' })).toBe('1 Jan 2025, 9:00 am to 2:30 pm')

  // Same month
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('2025-01-31T12:00:00Z'), { timeZone: 'UTC' })).toBe('1-31 January 2025')
  // Same year
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('2025-01-31T12:00:00Z'), { timeZone: 'UTC' })).toBe('1-31 January 2025')
  // Same year, different month
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('2025-02-01T12:00:00Z'), { timeZone: 'UTC' })).toBe('January 1 - February 1, 2025')
  // Leap year (2024 is a leap year, not 2025)
  expect(mod.combineDates(new Date('2024-01-01T12:00:00Z'), new Date('2024-02-29T12:00:00Z'), { timeZone: 'UTC' })).toBe('January 1 - February 29, 2024')
  // Different year
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('2026-01-31T12:00:00Z'), { timeZone: 'UTC' })).toBe('January 1, 2025 - January 31, 2026')
  // Same Date
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('2025-01-01T12:00:00Z'), { timeZone: 'UTC' })).toBe('January 1, 2025')
  // Invalid Date
  expect(mod.combineDates(new Date('2025-01-01T12:00:00Z'), new Date('invalid'), { timeZone: 'UTC' })).toBe('')

  // Multi-day with showTime (times always short; em dash between halves)
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2025-01-31T11:00:00Z'), { locale: 'en-AU', timeZone: 'UTC', showTime: true })).toBe('1 January 10:00 am — 31 January 2025 11:00 am')
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2025-02-01T11:00:00Z'), { locale: 'en-AU', timeZone: 'UTC', showTime: true })).toBe('1 January 10:00 am — 1 February 2025 11:00 am')
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2026-01-31T11:00:00Z'), { locale: 'en-AU', timeZone: 'UTC', showTime: true })).toBe('1 January 2025 10:00 am — 31 January 2026 11:00 am')
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2025-01-31T11:00:00Z'), { timeZone: 'UTC', showTime: true })).toBe('January 1 10:00 AM — January 31, 2025 11:00 AM')
  expect(mod.combineDates(new Date('2025-02-01T10:00:00Z'), new Date('2026-01-31T14:30:00Z'), { format: 'short', timeZone: 'UTC', showTime: true })).toBe('Feb 1, 2025 10:00 AM — Jan 31, 2026 2:30 PM')
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2025-01-31T11:00:00Z'), { locale: 'en-AU', format: 'short', timeZone: 'UTC', showTime: true })).toBe('1 Jan 10:00 am — 31 Jan 2025 11:00 am')
  // Multi-day without showTime still omits times
  expect(mod.combineDates(new Date('2025-01-01T10:00:00Z'), new Date('2025-01-31T11:00:00Z'), { timeZone: 'UTC' })).toBe('1-31 January 2025')

  // Alias fallback
  expect(mod.formatCombinedDates).toBe(mod.combineDates)
})
