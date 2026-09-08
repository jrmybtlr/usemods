// title: Dates
// description: Compare dates, show relative time, and measure durations. Helpful helpers when Intl alone is not quite enough.
// lead: Calendar clarity

import { parseDate } from './validators'

export type DateInput = Date | string | number

export interface LocaleTimeZone {
  locale?: string
}

export type DateRangeOptions = {
  inclusive?: boolean
}

type CalendarParts = {
  year: number
  month: number
  day: number
}

function baseLocale(options?: LocaleTimeZone): string {
  return options?.locale ?? 'en-US'
}

/**
 * Calendar Y/M/D via Intl so local and timeZone-aware callers share one path.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
 */
function calendarParts(date: Date, timeZone?: string): CalendarParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone,
  }).formatToParts(date)

  const year = Number(parts.find(part => part.type === 'year')?.value)
  const month = Number(parts.find(part => part.type === 'month')?.value)
  const day = Number(parts.find(part => part.type === 'day')?.value)
  return { year, month, day }
}

function resolveTimeFromNow(options?: Pick<TimeFromOptions, 'now'>): Date {
  const parsed = options?.now ? parseDate(options.now) : new Date()
  return parsed ?? new Date()
}

function isEnglishLocale(locale: string): boolean {
  return /^en([_-]|$)/i.test(locale)
}

export type TimeFromStyle = 'long' | 'short' | 'narrow'

export type TimeFromOptions = LocaleTimeZone & {
  // Base time (defaults to now).
  now?: DateInput

  // Output style. English: long "10 days ago", short/narrow "10d ago". Other locales use Intl.RelativeTimeFormat.
  style?: TimeFromStyle

  // Label when the difference is within threshold seconds.
  nowLabel?: string

  // Whether to treat near-zero differences as "now".
  includeNow?: boolean

  // Threshold in seconds to treat the difference as "now".
  threshold?: number
}

/**
 * Show how long ago or how far away a date is, like "Now", "1 minute ago", or "in 4 months". Use style "long" for "10 days ago", "short" for "10d ago". Other locales use Intl.RelativeTimeFormat.
 */
export function timeFrom(
  date: DateInput,
  options?: TimeFromOptions,
): string {
  const parsed = parseDate(date)
  if (!parsed) {
    return ''
  }

  const now = resolveTimeFromNow(options)

  const diffMs = parsed.getTime() - now.getTime()
  const diffSeconds = diffMs / 1000

  const includeNow = options?.includeNow ?? true
  const threshold = options?.threshold ?? 30
  const nowLabel = options?.nowLabel ?? 'Now'
  if (includeNow && Math.abs(diffSeconds) < threshold) {
    return nowLabel
  }

  const locale = baseLocale(options)
  const style = options?.style ?? 'long'

  const absSeconds = Math.abs(diffSeconds)
  const divisions: ReadonlyArray<{ unit: Intl.RelativeTimeFormatUnit, seconds: number }> = [
    { unit: 'year', seconds: 60 * 60 * 24 * 365 },
    { unit: 'month', seconds: 60 * 60 * 24 * 30 },
    { unit: 'week', seconds: 60 * 60 * 24 * 7 },
    { unit: 'day', seconds: 60 * 60 * 24 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ]

  const division = divisions.find(d => absSeconds >= d.seconds) ?? divisions[divisions.length - 1]
  const value = Math.round(diffSeconds / division.seconds)

  // English short historically means compact "3d ago"; RTF's narrow style matches that.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
  const rtfStyle: Intl.RelativeTimeFormatStyle
    = isEnglishLocale(locale) && style === 'short' ? 'narrow' : style

  return new Intl.RelativeTimeFormat(locale, {
    numeric: isEnglishLocale(locale) ? 'always' : 'auto',
    style: rtfStyle,
  }).format(value, division.unit)
}

export type TimeDifferenceUnit = 'auto' | 'days' | 'hours' | 'minutes' | 'seconds'

export type TimeDifferenceOptions = LocaleTimeZone & {
  // Output unit. "auto" emits a multi-part result; "days" (etc) emits a single unit.
  unit?: TimeDifferenceUnit

  // Label style for auto mode.
  style?: 'long' | 'short' | 'narrow'

  // Maximum unit segments in auto mode (default 6). Example: 10-day gap with maxUnits 2 → "10 days".
  maxUnits?: number

  // Rounding behavior when unit is not "auto".
  rounding?: 'floor' | 'ceil' | 'round'
}

type DurationKind = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

type NonAutoTimeDifferenceUnit = Exclude<TimeDifferenceUnit, 'auto'>

type TimeDifferenceStyle = NonNullable<TimeDifferenceOptions['style']>

function secondsPerDifferenceUnit(unit: NonAutoTimeDifferenceUnit): number {
  switch (unit) {
    case 'seconds':
      return 1
    case 'minutes':
      return 60
    case 'hours':
      return 60 * 60
    case 'days':
      return 60 * 60 * 24
  }
}

function durationKindForDifferenceUnit(unit: NonAutoTimeDifferenceUnit): DurationKind {
  switch (unit) {
    case 'seconds':
      return 'second'
    case 'minutes':
      return 'minute'
    case 'hours':
      return 'hour'
    case 'days':
      return 'day'
  }
}

/**
 * Format a duration segment with Intl unit style (locale-aware pluralization).
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
function formatDurationUnit(
  locale: string,
  value: number,
  kind: DurationKind,
  style: TimeDifferenceStyle,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: kind,
    unitDisplay: style,
  }).format(value)
}

/**
 * Measure the gap between two dates. With unit set to "auto", you get a breakdown like "2 days 5 hr". Pick a single unit like "days" to get something like "6212 days".
 */
export function timeDifference(
  from: DateInput,
  to: DateInput,
  options?: TimeDifferenceOptions,
): string {
  const fromDate = parseDate(from)
  const toDate = parseDate(to)
  if (!fromDate || !toDate) {
    return ''
  }

  const diffMsRaw = toDate.getTime() - fromDate.getTime()
  const absMs = Math.abs(diffMsRaw)

  const unit = options?.unit ?? 'auto'
  const rounding: NonNullable<TimeDifferenceOptions['rounding']> = options?.rounding ?? 'round'
  const locale = baseLocale(options)

  function roundValue(value: number): number {
    if (rounding === 'floor') {
      return Math.floor(value)
    }
    if (rounding === 'ceil') {
      return Math.ceil(value)
    }
    return Math.round(value)
  }

  if (unit !== 'auto') {
    const seconds = absMs / 1000
    const divisor = secondsPerDifferenceUnit(unit)
    const value = roundValue(seconds / divisor)
    const kind = durationKindForDifferenceUnit(unit)
    return formatDurationUnit(locale, value, kind, 'long')
  }

  const maxUnits = Math.max(1, options?.maxUnits ?? 6)
  const style = options?.style ?? 'short'

  // Approximate calendar units for "auto" mode (month=30d, year=365d).
  const units: ReadonlyArray<{ kind: DurationKind, ms: number }> = [
    { kind: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { kind: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { kind: 'day', ms: 1000 * 60 * 60 * 24 },
    { kind: 'hour', ms: 1000 * 60 * 60 },
    { kind: 'minute', ms: 1000 * 60 },
    { kind: 'second', ms: 1000 },
  ]

  if (absMs === 0) {
    return formatDurationUnit(locale, 0, 'second', style)
  }

  let remaining = absMs
  const parts: string[] = []
  for (const u of units) {
    if (parts.length >= maxUnits) {
      break
    }
    const value = Math.floor(remaining / u.ms)
    if (value <= 0) {
      continue
    }
    remaining -= value * u.ms
    parts.push(formatDurationUnit(locale, value, u.kind, style))
  }

  if (parts.length === 0) {
    return formatDurationUnit(locale, 0, 'second', style)
  }
  return parts.join(' ')
}

export type CombinedDatesFormat = 'short' | 'long'

export type CombinedDatesOptions = {
  locale?: string
  display?: CombinedDatesFormat
  /** @deprecated Use `display` */
  format?: CombinedDatesFormat
  timeZone?: string
  /** Include times on multi-day ranges. Same-day different times always show times. */
  showTime?: boolean
}

/**
 * Collapses two dates (or timestamps) into a human-readable string
 * @info Times always show for same-day different clocks; for other ranges set showTime: true
 */
export function combineDates(
  from: DateInput,
  to: DateInput,
  options: CombinedDatesOptions = { locale: 'en-US', display: 'long' },
): string {
  const fromDate = new Date(from ?? Date.now())
  const toDate = new Date(to ?? Date.now())

  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) return ''

  const fromComponents = calendarParts(fromDate, options.timeZone)
  const toComponents = calendarParts(toDate, options.timeZone)

  const sameYear = fromComponents.year === toComponents.year
  const sameMonth = sameYear && fromComponents.month === toComponents.month
  const sameDay = sameMonth && fromComponents.day === toComponents.day
  const sameTime = sameDay && fromDate.getTime() === toDate.getTime()

  // Prefer display; keep format as a legacy alias
  const monthFormat = options.display ?? options.format ?? 'long'
  const locale = options.locale ?? 'en-US'
  const showTime = options.showTime === true

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  const format = (date: Date, opts: Intl.DateTimeFormatOptions): string =>
    new Intl.DateTimeFormat(locale, { ...opts, timeZone: options.timeZone }).format(date)

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_timestyle
  const formatTime = (date: Date): string =>
    format(date, { timeStyle: 'short' })

  // Same day
  if (sameDay) {
    if (sameTime) {
      return format(fromDate, { day: 'numeric', month: monthFormat, year: 'numeric' })
    }
    return `${format(fromDate, { day: 'numeric', month: monthFormat, year: 'numeric' })}, ${formatTime(fromDate)} to ${formatTime(toDate)}`
  }

  // Multi-day with times: "February 1, 2025 10:00 AM — January 31, 2026 2:30 PM"
  if (showTime) {
    const fromDatePart = sameYear
      ? format(fromDate, { day: 'numeric', month: monthFormat })
      : format(fromDate, { day: 'numeric', month: monthFormat, year: 'numeric' })
    const toDatePart = format(toDate, { day: 'numeric', month: monthFormat, year: 'numeric' })
    return `${fromDatePart} ${formatTime(fromDate)} — ${toDatePart} ${formatTime(toDate)}`
  }

  if (sameMonth) {
    return `${fromComponents.day}-${toComponents.day} ${format(fromDate, { month: monthFormat, year: 'numeric' })}`
  }

  if (sameYear) {
    const yearStr = format(fromDate, { year: 'numeric' })
    return `${format(fromDate, { day: 'numeric', month: monthFormat })} - ${format(toDate, { day: 'numeric', month: monthFormat })}, ${yearStr}`
  }

  return `${format(fromDate, { day: 'numeric', month: monthFormat, year: 'numeric' })} - ${format(toDate, { day: 'numeric', month: monthFormat, year: 'numeric' })}`
}

/** @deprecated Use {@link combineDates} instead */
export const formatCombinedDates = combineDates

/**
 * Check if a date is today
 */
export function isToday(date: DateInput): boolean {
  const parsed = parseDate(date)
  if (!parsed) {
    return false
  }
  const a = calendarParts(parsed)
  const b = calendarParts(new Date())
  return a.year === b.year && a.month === b.month && a.day === b.day
}

/**
 * Check if a date is in the past.
 */
export function isPast(date: DateInput): boolean {
  const parsed = parseDate(date)
  if (!parsed) {
    return false
  }
  return parsed.getTime() < Date.now()
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: DateInput): boolean {
  const parsed = parseDate(date)
  if (!parsed) {
    return false
  }
  return parsed.getTime() > Date.now()
}

/**
 * Check if two dates fall on the same calendar day in local time.
 */
export function isSameDay(a: DateInput, b: DateInput): boolean {
  const parsedA = parseDate(a)
  const parsedB = parseDate(b)
  if (!parsedA || !parsedB) {
    return false
  }
  const partsA = calendarParts(parsedA)
  const partsB = calendarParts(parsedB)
  return partsA.year === partsB.year && partsA.month === partsB.month && partsA.day === partsB.day
}

/**
 * Check if two dates fall in the same calendar month in local time.
 */
export function isSameMonth(a: DateInput, b: DateInput): boolean {
  const parsedA = parseDate(a)
  const parsedB = parseDate(b)
  if (!parsedA || !parsedB) {
    return false
  }
  const partsA = calendarParts(parsedA)
  const partsB = calendarParts(parsedB)
  return partsA.year === partsB.year && partsA.month === partsB.month
}

/**
 * Check if a date falls between a start and end date by timestamp.
 */
export function isDateBetween(
  date: DateInput,
  start: DateInput,
  end: DateInput,
  options?: DateRangeOptions,
): boolean {
  const parsed = parseDate(date)
  const parsedStart = parseDate(start)
  const parsedEnd = parseDate(end)
  if (!parsed || !parsedStart || !parsedEnd) {
    return false
  }

  const inclusive = options?.inclusive ?? true

  const t = parsed.getTime()
  const low = Math.min(parsedStart.getTime(), parsedEnd.getTime())
  const high = Math.max(parsedStart.getTime(), parsedEnd.getTime())
  if (inclusive) {
    return t >= low && t <= high
  }
  return t > low && t < high
}
