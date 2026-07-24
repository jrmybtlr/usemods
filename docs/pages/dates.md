# Dates

Compare dates, show relative time, and measure durations. Helpful helpers when Intl alone is not quite enough.

## Functions

### timeFrom

**Description:** Show how long ago or how far away a date is, like "Now", "1 minute ago", or "in 4 months". Use style "long" for "10 days ago", "short" for "10d ago". Other locales use Intl.RelativeTimeFormat.

**Parameters:**
- `date` (`DateInput`)
- `options?` (`TimeFromOptions`)

**Returns:** `string`

### timeDifference

**Description:** Measure the gap between two dates. With unit set to "auto", you get a breakdown like "2 days 5 hrs". Pick a single unit like "days" to get something like "6212 days".

**Parameters:**
- `from` (`DateInput`)
- `to` (`DateInput`)
- `options?` (`TimeDifferenceOptions`)

**Returns:** `string`

### combineDates

**Description:** Collapses two dates (or timestamps) into a human-readable string

**Info:** Times always show for same-day different clocks; for other ranges set showTime: true

**Parameters:**
- `from` (`DateInput`)
- `to` (`DateInput`)
- `options?` (`CombinedDatesOptions`)

**Returns:** `string`

**Alias:** `formatCombinedDates`

### isToday

**Description:** Check if a date is today

**Parameters:**
- `date` (`DateInput`)

**Returns:** `boolean`

### isPast

**Description:** Check if a date is in the past.

**Parameters:**
- `date` (`DateInput`)

**Returns:** `boolean`

### isFuture

**Description:** Check if a date is in the future

**Parameters:**
- `date` (`DateInput`)

**Returns:** `boolean`

### isSameDay

**Description:** Check if two dates fall on the same calendar day in local time.

**Parameters:**
- `a` (`DateInput`)
- `b` (`DateInput`)

**Returns:** `boolean`

### isSameMonth

**Description:** Check if two dates fall in the same calendar month in local time.

**Parameters:**
- `a` (`DateInput`)
- `b` (`DateInput`)

**Returns:** `boolean`

### isDateBetween

**Description:** Check if a date falls between a start and end date by timestamp.

**Parameters:**
- `date` (`DateInput`)
- `start` (`DateInput`)
- `end` (`DateInput`)
- `options?` (`DateRangeOptions`)

**Returns:** `boolean`

