# Numbers

This file contains functions that are related to numbers.

**Lead:** Crunch crunchy numbers

## Overview

The Numbers module provides mathematical and statistical functions for working with arrays of numbers. These utilities help you calculate sums, averages, margins, statistical measures, and more.

## Functions

### `sum(numbers: number[]): number`

Calculates the sum of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers to sum

**Returns:** Sum of all numbers

**Example:**
```typescript
import { sum } from 'usemods'

sum([1, 2, 3, 4, 5]) // 15
sum([10, 20, 30]) // 60
```

---

### `mean(numbers: number[]): number`

Calculates the mean of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Mean (average) value

**Example:**
```typescript
import { mean } from 'usemods'

mean([1, 2, 3, 4, 5]) // 3
mean([10, 20, 30]) // 20
```

---

### `average(numbers: number[]): number`

Calculates the mean of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Average value (same as mean)

**Note:** This is an alias for `mean()`

**Example:**
```typescript
import { average } from 'usemods'

average([1, 2, 3, 4, 5]) // 3
```

---

### `margin(value: number, percentage: number): number`

Calculates the margin based on a percentage.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Margin amount

**Example:**
```typescript
import { margin } from 'usemods'

margin(100, 10) // 10 (10% of 100)
margin(50, 20) // 10 (20% of 50)
```

---

### `addMargin(value: number, percentage: number): number`

Adds the margin to the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Value with margin added

**Example:**
```typescript
import { addMargin } from 'usemods'

addMargin(100, 10) // 110 (100 + 10%)
addMargin(50, 20) // 60 (50 + 20%)
```

---

### `subtractMargin(value: number, percentage: number): number`

Subtracts the margin from the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Margin percentage

**Returns:** Value with margin subtracted

**Example:**
```typescript
import { subtractMargin } from 'usemods'

subtractMargin(100, 10) // 90 (100 - 10%)
subtractMargin(50, 20) // 40 (50 - 20%)
```

---

### `addMarkup(value: number, percentage: number): number`

Adds the markup to the value.

**Parameters:**
- `value` (number): Base value
- `percentage` (number): Markup percentage

**Returns:** Value with markup added (rounded to 2 decimals)

**Example:**
```typescript
import { addMarkup } from 'usemods'

addMarkup(100, 10) // 110 (100 * 1.10)
addMarkup(50, 25) // 62.5 (50 * 1.25)
```

---

### `subtractMarkup(value: number, percentage: number): number`

Calculates the markup based on a percentage.

**Parameters:**
- `value` (number): Value with markup
- `percentage` (number): Markup percentage

**Returns:** Original value before markup (rounded to 2 decimals)

**Example:**
```typescript
import { subtractMarkup } from 'usemods'

subtractMarkup(110, 10) // 100 (110 / 1.10)
subtractMarkup(62.5, 25) // 50 (62.5 / 1.25)
```

---

### `median(numbers: number[]): number`

Calculates the median of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Median value

**Example:**
```typescript
import { median } from 'usemods'

median([1, 2, 3, 4, 5]) // 3
median([1, 2, 3, 4]) // 2.5 (average of middle two)
median([10, 20, 30, 40, 50]) // 30
```

---

### `mode(numbers: number[]): number[] | null`

Calculates the mode of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Array of most frequent values, or null if no mode exists

**Example:**
```typescript
import { mode } from 'usemods'

mode([1, 2, 2, 3, 3, 3]) // [3]
mode([1, 2, 2, 3, 3]) // [2, 3] (multiple modes)
mode([1, 2, 3, 4, 5]) // null (no mode)
```

---

### `min(numbers: number[]): number`

Finds the minimum value in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Minimum value

**Example:**
```typescript
import { min } from 'usemods'

min([1, 2, 3, 4, 5]) // 1
min([10, 5, 20, 15]) // 5
```

---

### `max(numbers: number[]): number`

Finds the maximum value in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Maximum value

**Example:**
```typescript
import { max } from 'usemods'

max([1, 2, 3, 4, 5]) // 5
max([10, 5, 20, 15]) // 20
```

---

### `minMax(numbers: number[]): [number, number]`

Returns the minimum and maximum values in an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Tuple [min, max]

**Example:**
```typescript
import { minMax } from 'usemods'

minMax([1, 2, 3, 4, 5]) // [1, 5]
minMax([10, 5, 20, 15]) // [5, 20]
```

---

### `range(numbers: number[]): number`

Returns the difference between two values, expressed as a positive number.

**Parameters:**
- `numbers` (number[]): Array of numbers

**Returns:** Range (max - min), or NaN if array is empty

**Example:**
```typescript
import { range } from 'usemods'

range([1, 2, 3, 4, 5]) // 4 (5 - 1)
range([10, 5, 20, 15]) // 15 (20 - 5)
```

---

### `standardDeviation(numbers: number[], options?: { method?: 'sample' | 'population' }): number`

Returns the standard deviation of an array of numbers.

**Parameters:**
- `numbers` (number[]): Array of numbers
- `options` (object, optional):
  - `method` ('sample' | 'population', optional): Calculation method. Defaults to `'population'`

**Returns:** Standard deviation, or NaN if array is empty

**Example:**
```typescript
import { standardDeviation } from 'usemods'

standardDeviation([1, 2, 3, 4, 5]) // ~1.41
standardDeviation([1, 2, 3, 4, 5], { method: 'sample' }) // ~1.58
```

---

### `skewness(numbers: number[]): number`

Returns the measure of asymmetry of the probability distribution of an array of numbers. The skewness value can be positive, zero, negative, or undefined.

**Parameters:**
- `numbers` (number[]): Array of numbers (requires at least 3)

**Returns:** Skewness value, or NaN if insufficient data

**Example:**
```typescript
import { skewness } from 'usemods'

skewness([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // ~0 (symmetric)
skewness([1, 2, 3, 4, 5, 10, 10, 10]) // Positive (right-skewed)
```

---

## Usage Examples

### Basic Calculations

```typescript
import { sum, mean, median, min, max } from 'usemods'

const scores = [85, 90, 78, 92, 88, 95, 87]

const total = sum(scores) // 615
const average = mean(scores) // ~87.86
const middle = median(scores) // 88
const lowest = min(scores) // 78
const highest = max(scores) // 95
```

### Pricing Calculations

```typescript
import { addMargin, subtractMargin, addMarkup, subtractMarkup } from 'usemods'

// Cost with margin
const cost = 100
const priceWithMargin = addMargin(cost, 20) // 120

// Price with markup
const priceWithMarkup = addMarkup(cost, 25) // 125

// Reverse calculations
const originalCost = subtractMarkup(125, 25) // 100
```

### Statistical Analysis

```typescript
import { mean, median, mode, standardDeviation, skewness } from 'usemods'

const data = [10, 12, 14, 15, 16, 18, 20, 22, 24, 25]

const avg = mean(data) // 17.6
const med = median(data) // 17
const mostFrequent = mode(data) // null or array
const stdDev = standardDeviation(data) // ~5.05
const skew = skewness(data) // Measure of asymmetry
```

### Range and Spread

```typescript
import { minMax, range } from 'usemods'

const temperatures = [20, 22, 18, 25, 21, 23, 19]

const [min, max] = minMax(temperatures) // [18, 25]
const tempRange = range(temperatures) // 7
```

---

## Notes

- All functions handle empty arrays gracefully (returning 0, NaN, or null as appropriate)
- `min` and `max` use optimized methods for large arrays (>65536 elements)
- `mode` returns an array if multiple values have the same highest frequency
- `standardDeviation` supports both population and sample methods
- `skewness` requires at least 3 values to calculate
- Margin and markup functions use different calculation methods (additive vs multiplicative)
