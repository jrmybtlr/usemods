// title: Data
// description: A collection of functions for formatting, filtering and taming wild arrays and objects.
// lead: Arrays and objects, oh my!

import { isObject } from './validators'

// Element type of an array, or `never` for non-arrays.
type ItemOf<T> = T extends readonly (infer Item)[] ? Item : never

function compareValues(a: unknown, b: unknown): number {
  // Values are compared with the native relational operators (numbers, strings, dates)
  const left = a as number
  const right = b as number
  if (left < right) return -1
  if (left > right) return 1
  return 0
}

/**
 * Sort an array or object by a property.
 */
export function dataSortBy<T extends object>(
  items: T,
  options?: { property?: Extract<keyof ItemOf<T>, string>, order?: 'asc' | 'desc' },
): T {
  const { property, order = 'asc' } = options ?? {}
  const direction = order === 'asc' ? 1 : -1
  const valueOf = (item: unknown): unknown => property ? (item as Record<string, unknown>)[property] : item

  return Array.isArray(items)
    ? items.toSorted((a, b) => compareValues(valueOf(a), valueOf(b)) * direction) as T
    : items
}

/**
 * Reverse an array or object.
 */
export function dataReverse<T extends object>(
  items: T,
): T {
  if (Array.isArray(items)) {
    return items.toReversed() as T
  }
  if (isObject(items)) {
    return Object.fromEntries(Object.entries(items).toReversed()) as T
  }
  console.warn('[MODS] Warning: dataReverse() expects an object or array as the first argument.')
  return items
}

/**
 * Returns single unique values within an array or object
 */
export function dataRemoveDuplicates<T extends string | number>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())]
}

/**
 * Flatten an array of arrays or an object of objects into a single array or object. That was hard to say.
 */
export function dataFlatten<T extends object>(items: T): T {
  if (isObject(items)) {
    const flattened: Record<string, unknown> = {}

    function flattenObject(obj: Record<string, unknown>, parentKey: string = '') {
      for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key
        if (isObject(value)) {
          flattenObject(value, newKey)
        }
        else {
          flattened[newKey] = value
        }
      }
    }

    flattenObject(items)
    return flattened as T
  }
  if (Array.isArray(items)) {
    return items.flat(Infinity) as T
  }
  return items
}

/**
 * Returns an array without a property or properties.
 */
export function dataWithout<T extends object>(
  items: T,
  properties: string | number | readonly (string | number)[],
): T {
  const exclude = new Set<string | number>(Array.isArray(properties) ? properties : [properties as string | number])
  if (Array.isArray(items)) {
    return items.filter(item => !exclude.has(item)) as T
  }
  if (isObject(items)) {
    // Object keys are strings, so compare numeric properties by their string form too
    return Object.fromEntries(
      Object.entries(items).filter(([key]) => !exclude.has(key) && !exclude.has(Number(key))),
    ) as T
  }
  return items
}

/**
 * Group an array of objects by a property.
 */
export function dataGroupBy<T extends object>(
  items: readonly T[],
  property: keyof T,
): Record<string, T[]> {
  if (!Array.isArray(items)) {
    console.warn('[MODS] Warning: dataGroupBy() expects an array as the first argument.')
    return {}
  }

  // Map.groupBy keeps keys like `__proto__` or `constructor` from colliding with
  // Object.prototype; Object.fromEntries defines them as own data properties.
  return Object.fromEntries(Map.groupBy(items, item => String(item[property] ?? '')))
}

/**
 * Pick specific properties from an object.
 */
export function dataPick<T extends object, K extends keyof T>(
  obj: T,
  properties: K | readonly K[],
): Pick<T, K> {
  if (!isObject(obj)) {
    console.warn('[MODS] Warning: dataPick() expects an object as the first argument.')
    return {} as Pick<T, K>
  }

  const keys: readonly K[] = Array.isArray(properties) ? properties : [properties as K]
  return Object.fromEntries(
    keys
      .filter(key => Object.hasOwn(obj, key))
      .map(key => [key, obj[key]]),
  ) as Pick<T, K>
}

/**
 * Omit specific properties from an object.
 */
export function dataOmit<T extends object, K extends keyof T>(
  obj: T,
  properties: K | readonly K[],
): Omit<T, K> {
  if (!isObject(obj)) {
    console.warn('[MODS] Warning: dataOmit() expects an object as the first argument.')
    return {} as Omit<T, K>
  }

  const keys = new Set<PropertyKey>(Array.isArray(properties) ? properties : [properties as K])
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.has(key)),
  ) as Omit<T, K>
}
