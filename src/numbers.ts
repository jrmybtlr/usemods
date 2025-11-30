// title: Numbers
// description: This file contains functions that are related to numbers.
// lead: Crunch crunchy numbers

/**
 * Calculates the sum of an array of numbers.
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0)
}

/**
 * Calculates the mean of an array of numbers.
 */
export function mean(numbers: number[]): number {
  if (numbers.length === 0) {
    console.log('[MODS] mean array is empty.')
    return 0
  }
  return sum(numbers) / numbers.length
}

/**
 * Calculates the mean of an array of numbers.
 */
export function average(numbers: number[]): number {
  return mean(numbers)
}

/**
 * Calculates the margin based on a percentage.
 */
export function margin(value: number, percentage: number): number {
  return (value * percentage) / 100
}

/**
 * Adds the margin to the value.
 */
export function addMargin(value: number, percentage: number): number {
  return value + margin(value, percentage)
}

/**
 * Subtracts the margin from the value.
 */
export function subtractMargin(value: number, percentage: number): number {
  return value - margin(value, percentage)
}

/**
 * Adds the markup to the value.
 */
export function addMarkup(value: number, percentage: number): number {
  if (value === 0) {
    console.log('[MODS] addMarkup value is 0.')
    return 0
  }
  return Math.round(value * (1 + percentage / 100) * 100) / 100
}

/**
 * Calculates the markup based on a percentage.
 */
export function subtractMarkup(value: number, percentage: number): number {
  if (value === 0) {
    console.log('[MODS] subtractMarkup value is 0.')
    return 0
  }
  return Math.round((value / (1 + percentage / 100)) * 100) / 100
}

/**
 * Calculates the median of an array of numbers.
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sorted = numbers.slice().sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

/**
 * Calculates the mode of an array of numbers.
 */
export function mode(numbers: number[]): number[] | null {
  if (numbers.length === 0) return null
  if (numbers.length === 1) return [numbers[0]]

  const frequencyMap = new Map<number, number>()
  let maxFrequency = 0

  numbers.forEach((num) => {
    const frequency = (frequencyMap.get(num) || 0) + 1
    frequencyMap.set(num, frequency)
    if (frequency > maxFrequency) {
      maxFrequency = frequency
    }
  })

  if (maxFrequency === 1) return null

  const modes = [...frequencyMap.entries()]
    .filter(([_, freq]) => freq === maxFrequency)
    .map(([num, _]) => num)

  return modes
}

/**
 * Finds the minimum value in an array of numbers.
 */
export function min(numbers: number[]): number {
  if (numbers.length === 0) {
    console.log('[MODS] min array is empty.')
    return 0
  }
  // Use reduce for large arrays to avoid stack overflow with spread operator
  return numbers.length > 65536
    ? numbers.reduce((a, b) => (a < b ? a : b))
    : Math.min(...numbers)
}

/**
 * Finds the maximum value in an array of numbers.
 */
export function max(numbers: number[]): number {
  if (numbers.length === 0) {
    console.log('[MODS] max array is empty.')
    return 0
  }
  // Use reduce for large arrays to avoid stack overflow with spread operator
  return numbers.length > 65536
    ? numbers.reduce((a, b) => (a > b ? a : b))
    : Math.max(...numbers)
}

/**
 * Returns the minimum and maximum values in an array of numbers.
 */
export function minMax(numbers: number[]): [number, number] {
  if (numbers.length === 0) {
    console.log('[MODS] minMax array is empty.')
    return [0, 0]
  }
  return [min(numbers), max(numbers)]
}

/**
 * Returns the difference between two values, expressed as a positive number.
 */
export function range(numbers: number[]): number {
  if (numbers.length === 0) {
    console.log('[MODS] range array is empty.')
    return NaN
  }
  return max(numbers) - min(numbers)
}

/**
 * Returns the standard deviation of an array of numbers.
 */
export function standardDeviation(numbers: number[], options?: { method: 'sample' | 'population' }): number {
  if (numbers.length === 0) {
    console.log('[MODS] standardDeviation array is empty.')
    return NaN
  }
  options = options || { method: 'population' }
  const meanValue = mean(numbers)
  const n = options.method === 'sample' ? numbers.length - 1 : numbers.length
  const sum = numbers.reduce((acc, num) => acc + (num - meanValue) ** 2, 0)
  return Math.sqrt(sum / n)
}

/**
 * Returns the measure of asymmetry of the probability distribution of an array of numbers. The skewness value can be positive, zero, negative, or undefined.
 */
export function skewness(numbers: number[]): number {
  const n = numbers.length
  if (n < 3) {
    console.log('[MODS] skewness requires at least 3 numbers.')
    return NaN
  }

  const meanValue = mean(numbers)
  const stdDev = standardDeviation(numbers)
  if (stdDev === 0) return 0

  const sumCubedDeviations = numbers.reduce((acc, num) => acc + (num - meanValue) ** 3, 0)
  return (n / ((n - 1) * (n - 2))) * (sumCubedDeviations / (stdDev ** 3))
}
