// title: Dates
// description: Locale-aware dates and times via Intl.DateTimeFormat—readable strings without reaching for options objects every time.
// lead: Calendar clarity

type LocaleTimeZone = {
  locale?: string
  timeZone?: string
}

function parseDateInput(value: Date | string | number): Date | null {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  return date
}

function baseLocaleTimeZone(options?: LocaleTimeZone): { locale: string, timeZone: string | undefined } {
  return {
    locale: options?.locale ?? 'en-US',
    timeZone: options?.timeZone,
  }
}

/**
 * Format the calendar date using a preset date style.
 */
export function formatDate(
  date: Date | string | number,
  options?: LocaleTimeZone & {
    dateStyle?: 'full' | 'long' | 'medium' | 'short'
  },
): string {
  const parsed = parseDateInput(date)
  if (!parsed) {
    return ''
  }
  const { locale, timeZone } = baseLocaleTimeZone(options)
  const config: Intl.DateTimeFormatOptions = {
    dateStyle: options?.dateStyle ?? 'medium',
    timeZone,
  }
  return new Intl.DateTimeFormat(locale, config).format(parsed)
}

/**
 * Format the time-of-day using a preset time style.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat Intl.DateTimeFormat} (MDN)
 */
export function formatTime(
  date: Date | string | number,
  options?: LocaleTimeZone & {
    timeStyle?: 'full' | 'long' | 'medium' | 'short'
    hour12?: boolean
  },
): string {
  const parsed = parseDateInput(date)
  if (!parsed) {
    return ''
  }
  const { locale, timeZone } = baseLocaleTimeZone(options)
  const config: Intl.DateTimeFormatOptions = {
    timeStyle: options?.timeStyle ?? 'short',
    timeZone,
  }
  if (options?.hour12 !== undefined) {
    config.hour12 = options.hour12
  }
  return new Intl.DateTimeFormat(locale, config).format(parsed)
}

/**
 * Format date and time together using preset styles.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat Intl.DateTimeFormat} (MDN)
 */
export function formatDateTime(
  date: Date | string | number,
  options?: LocaleTimeZone & {
    dateStyle?: 'full' | 'long' | 'medium' | 'short'
    timeStyle?: 'full' | 'long' | 'medium' | 'short'
    hour12?: boolean
  },
): string {
  const parsed = parseDateInput(date)
  if (!parsed) {
    return ''
  }
  const { locale, timeZone } = baseLocaleTimeZone(options)
  const config: Intl.DateTimeFormatOptions = {
    dateStyle: options?.dateStyle ?? 'medium',
    timeStyle: options?.timeStyle ?? 'short',
    timeZone,
  }
  if (options?.hour12 !== undefined) {
    config.hour12 = options.hour12
  }
  return new Intl.DateTimeFormat(locale, config).format(parsed)
}

export type TimeFromOptions = LocaleTimeZone & {
  /**
   * Base time (defaults to now).
   */
  now?: Date | string | number

  /**
   * Intl.RelativeTimeFormat style (non-English locales only; English uses compact phrases).
   */
  style?: 'long' | 'short' | 'narrow'

  /**
   * Label when the difference is within {@link TimeFromOptions.nowThresholdSeconds}.
   */
  nowLabel?: string

  /**
   * Whether to treat near-zero differences as "now".
   */
  includeNow?: boolean

  /**
   * Threshold (in seconds) to consider the event "now".
   */
  nowThresholdSeconds?: number
}

function isEnglishLocale(locale: string): boolean {
  return /^en([_-]|$)/i.test(locale)
}

/**
 * Compact English phrases like "1 min ago", "in 4 months" (no "min." punctuation).
 * Other locales use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat Intl.RelativeTimeFormat} (MDN).
 */
function timeFromEnglishCompact(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
): string {
  const n = Math.abs(value)
  const pr = new Intl.PluralRules('en-US')
  const rule = pr.select(n)
  const pick = (one: string, other: string): string => (rule === 'one' ? one : other)

  const label = ((): string => {
    switch (unit) {
      case 'year':
        return pick('year', 'years')
      case 'month':
        return pick('month', 'months')
      case 'week':
        return pick('week', 'weeks')
      case 'day':
        return pick('day', 'days')
      case 'hour':
        return pick('hr', 'hrs')
      case 'minute':
        return pick('min', 'mins')
      case 'second':
        return pick('sec', 'secs')
      default:
        return unit
    }
  })()

  if (value < 0) {
    return `${n} ${label} ago`
  }
  return `in ${n} ${label}`
}

/**
 * Relative time from a reference instant (defaults to now): "Now", "1 min ago", "in 4 months".
 * English locales use compact labels; others use `Intl.RelativeTimeFormat`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat Intl.RelativeTimeFormat} (MDN)
 */
export function timeFrom(
  date: Date | string | number,
  options?: TimeFromOptions,
): string {
  const parsed = parseDateInput(date)
  if (!parsed) {
    return ''
  }

  const nowParsed = options?.now ? parseDateInput(options.now) : new Date()
  const now = nowParsed ?? new Date()

  const diffMs = parsed.getTime() - now.getTime()
  const diffSeconds = diffMs / 1000

  const includeNow = options?.includeNow ?? true
  const nowThresholdSeconds = options?.nowThresholdSeconds ?? 30
  const nowLabel = options?.nowLabel ?? 'Now'
  if (includeNow && Math.abs(diffSeconds) < nowThresholdSeconds) {
    return nowLabel
  }

  const { locale } = baseLocaleTimeZone(options)
  const style = options?.style ?? 'short'

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

  if (isEnglishLocale(locale)) {
    return timeFromEnglishCompact(value, division.unit)
  }

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style,
  })
  return rtf.format(value, division.unit)
}

export type TimeDifferenceUnit = 'auto' | 'days' | 'hours' | 'minutes' | 'seconds'

export type TimeDifferenceOptions = LocaleTimeZone & {
  /**
   * Output unit. "auto" will emit a multi-part result like
   * "1 year 11 months 12 days 14 hrs" (depending on style/limits).
   */
  unit?: TimeDifferenceUnit

  /**
   * Label style for auto mode.
   */
  style?: 'long' | 'short' | 'narrow'

  /**
   * Maximum number of units to include in auto mode (e.g. 2 => "1 yr 11 mo").
   */
  maxUnits?: number

  /**
   * Rounding behavior when `unit` is not "auto".
   */
  rounding?: 'floor' | 'ceil' | 'round'
}

/**
 * Difference between two datetimes.
 * - `unit: "auto"` → multi-part output (years/months/days/hours/minutes/seconds)
 * - `unit: "days"` (etc) → single-unit output like "6212 days"
 */
export function timeDifference(
  from: Date | string | number,
  to: Date | string | number,
  options?: TimeDifferenceOptions,
): string {
  const fromDate = parseDateInput(from)
  const toDate = parseDateInput(to)
  if (!fromDate || !toDate) {
    return ''
  }

  const diffMsRaw = toDate.getTime() - fromDate.getTime()
  const absMs = Math.abs(diffMsRaw)

  const unit = options?.unit ?? 'auto'
  const rounding: NonNullable<TimeDifferenceOptions['rounding']> = options?.rounding ?? 'round'

  const roundValue = (value: number): number => {
    if (rounding === 'floor') return Math.floor(value)
    if (rounding === 'ceil') return Math.ceil(value)
    return Math.round(value)
  }

  type DurationKind = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

  const durationLabel = (
    locale: string,
    value: number,
    style: NonNullable<TimeDifferenceOptions['style']>,
    kind: DurationKind,
  ): string => {
    const pr = new Intl.PluralRules(locale)
    const rule = pr.select(value)
    const isOne = rule === 'one'

    if (style === 'long') {
      const long: Record<DurationKind, readonly [string, string]> = {
        year: ['year', 'years'],
        month: ['month', 'months'],
        day: ['day', 'days'],
        hour: ['hour', 'hours'],
        minute: ['minute', 'minutes'],
        second: ['second', 'seconds'],
      }
      const [singular, plural] = long[kind]
      return isOne ? singular : plural
    }

    if (style === 'short') {
      const short: Record<DurationKind, readonly [string, string]> = {
        year: ['yr', 'yrs'],
        month: ['mo', 'mos'],
        day: ['day', 'days'],
        hour: ['hr', 'hrs'],
        minute: ['min', 'mins'],
        second: ['sec', 'secs'],
      }
      const [singular, plural] = short[kind]
      return isOne ? singular : plural
    }

    const narrow: Record<DurationKind, string> = {
      year: 'y',
      month: 'mo',
      day: 'd',
      hour: 'h',
      minute: 'm',
      second: 's',
    }
    return narrow[kind]
  }

  const formatAutoSegment = (
    locale: string,
    nf: Intl.NumberFormat,
    value: number,
    kind: DurationKind,
    style: NonNullable<TimeDifferenceOptions['style']>,
  ): string => {
    const label = durationLabel(locale, value, style, kind)
    if (style === 'narrow') {
      return `${nf.format(value)}${label}`
    }
    return `${nf.format(value)} ${label}`
  }

  const { locale } = baseLocaleTimeZone(options)
  const nf = new Intl.NumberFormat(locale)

  if (unit !== 'auto') {
    const seconds = absMs / 1000
    const value
      = unit === 'seconds'
        ? roundValue(seconds)
        : unit === 'minutes'
          ? roundValue(seconds / 60)
          : unit === 'hours'
            ? roundValue(seconds / (60 * 60))
            : roundValue(seconds / (60 * 60 * 24))

    const kind: DurationKind
      = unit === 'seconds'
        ? 'second'
        : unit === 'minutes'
          ? 'minute'
          : unit === 'hours'
            ? 'hour'
            : 'day'

    const labelWord = durationLabel(locale, value, 'long', kind)
    return `${nf.format(value)} ${labelWord}`
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
    return formatAutoSegment(locale, nf, 0, 'second', style)
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
    parts.push(formatAutoSegment(locale, nf, value, u.kind, style))
  }

  if (parts.length === 0) {
    return formatAutoSegment(locale, nf, 0, 'second', style)
  }
  return parts.join(' ')
}
