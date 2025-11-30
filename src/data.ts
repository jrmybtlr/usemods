// title: Data
// description: A collection of functions for formatting, filtering and taming wild arrays and objects.
// lead: Arrays and objects, oh my!

import { isObject } from './validators'

/**
 * Sort an array or object by a property.
 */
export function dataSortBy(items: object | string[] | number[], options?: { property?: string, order?: 'asc' | 'desc' }): object | string[] | number[] {
  const { property, order = 'asc' } = options || {}

  const compare = (a: any, b: any) => {
    const valueA = property ? a[property] : a
    const valueB = property ? b[property] : b

    if (valueA < valueB) return order === 'asc' ? -1 : 1
    if (valueA > valueB) return order === 'asc' ? 1 : -1
    return 0
  }
  // Use toSorted (ES2023) for immutability, with spread fallback for older environments
  return Array.isArray(items)
    ? ('toSorted' in items ? (items as any).toSorted(compare) : [...items].sort(compare))
    : items
}

/**
 * Reverse an array or object.
 */
export function dataReverse<T extends object | string[] | number[]>(
  items: T,
): T {
  if ((Array.isArray(items) && items.length === 0) || (!Array.isArray(items) && Object.keys(items).length === 0)) {
    console.warn('[MODS] Warning: dataReverse() expects an object or array as the first argument.')
    return items
  }
  if (isObject(items)) {
    return Object.fromEntries(Object.entries(items).reverse()) as T
  }
  else {
    // Use toReversed (ES2023) for immutability, with spread fallback for older environments
    const arr = items as string[] | number[]
    return ('toReversed' in arr ? (arr as any).toReversed() : [...arr].reverse()) as T
  }
}

/**
 * Returns single unique values within an array or object
 */
export function dataRemoveDuplicates<T extends string | number>(...arrays: T[][]): T[] {
  return Array.from(new Set(arrays.flat()))
}

/**
 * Flatten an array of arrays or an object of objects into a single array or object. That was hard to say.
 */
export function dataFlatten<T extends object | string[] | number[]>(items: T): T {
  if (isObject(items)) {
    const flattened: { [key: string]: unknown } = {}

    function flattenObject(obj: object, parentKey: string = '') {
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
  else if (Array.isArray(items)) {
    return items.flatMap(item => Array.isArray(item) ? dataFlatten(item) : item) as T
  }
  else {
    return items
  }
}

/**
 * Returns an array without a property or properties.
 */
export function dataWithout<T extends object | string[] | number[]>(
  items: T,
  properties: string | number | string[] | number[],
): T {
  const propertyArray = Array.isArray(properties) ? properties : [properties]
  if (isObject(items)) {
    return Object.fromEntries(Object.entries(items).filter(([key]) => !propertyArray.includes(key))) as T
  }
  else {
    return (items as string[] | number[]).filter(item => !propertyArray.includes(item)) as T
  }
}

//

// /**
//  * Group an array of objects by a property.
//  */
// export function dataGroupBy(items: object[] | string[] | number[], property: string): { [key: string]: object[] | string[] | number[] } {
//   if (!Array.isArray(items)) {
//     console.warn('[MODS] Warning: dataGroupBy() expects an array as the first argument.')
//     return {}
//   }

//   return items.reduce((acc, item) => {
//     const key = item[property]
//     if (!acc[key]) {
//       acc[key] = []
//     }
//     acc[key].push(item)
//     return acc
//   }, {} as { [key: string]: object[] | string[] | number[] })
// }

// /**
//  * Merge multiple objects or arrays into one.
//  */
// export function dataMerge(...items: (object | any[])[]): object | any[] {
//   if (items.every(isObject)) {
//     return Object.assign({}, ...items)
//   } else if (items.every(Array.isArray)) {
//     return items.flat()
//   } else {
//     console.warn('[MODS] Warning: dataMerge() expects either all objects or all arrays as arguments.')
//     return items
//   }
// }

// /**
//  * Pick specific properties from an object.
//  */
// export function dataPick(obj: object, properties: string[]): object {
//   return properties.reduce((acc, key) => {
//     if (key in obj) {
//       acc[key] = obj[key]
//     }
//     return acc
//   }, {} as { [key: string]: any })
// }
