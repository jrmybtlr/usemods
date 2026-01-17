import { expect, test } from 'vitest'
import * as mod from './data'

const arrayExample = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }, { name: 'Jimmy', age: 2 }, { name: 'Jake', age: 20 }]

const objectExample: { name: string, age: number, country: string } = {
  name: 'John',
  age: 25,
  country: 'USA',
}

const nestedArray = [1, [2, 3], [4, [5, 6]]]
const duplicateArray = [1, 2, 2, 3, 4, 5, 5, 5]
const stringArray = ['apple', 'banana', 'apple', 'cherry', 'banana']
const mixedArray = [1, 2, 3, 4, 5]

test('dataSortBy', () => {
  // Empty
  expect(mod.dataSortBy(arrayExample)).toStrictEqual([
    { name: 'John', age: 25 }, { name: 'Jane', age: 30 }, { name: 'Jimmy', age: 2 }, { name: 'Jake', age: 20 },
  ])

  // Sort by age (asc)
  expect(mod.dataSortBy(arrayExample, { property: 'age', order: 'asc' })).toStrictEqual([
    { name: 'Jimmy', age: 2 }, { name: 'Jake', age: 20 }, { name: 'John', age: 25 }, { name: 'Jane', age: 30 },
  ])

  // Sort by age (desc)
  expect(mod.dataSortBy(arrayExample, { property: 'age', order: 'desc' })).toStrictEqual([
    { name: 'Jane', age: 30 }, { name: 'John', age: 25 }, { name: 'Jake', age: 20 }, { name: 'Jimmy', age: 2 },
  ])

  // Sort by name (asc)
  expect(mod.dataSortBy(arrayExample, { property: 'name', order: 'asc' })).toStrictEqual([
    { name: 'Jake', age: 20 }, { name: 'Jane', age: 30 }, { name: 'Jimmy', age: 2 }, { name: 'John', age: 25 },
  ])

  // Return Object as-is
  expect(mod.dataSortBy(objectExample)).toMatchObject({
    name: 'John',
    age: 25,
    country: 'USA',
  })

  // Sort number array (asc)
  expect(mod.dataSortBy([3, 1, 4, 1, 5, 9], { order: 'asc' })).toEqual([1, 1, 3, 4, 5, 9])

  // Sort number array (desc)
  expect(mod.dataSortBy([3, 1, 4, 1, 5, 9], { order: 'desc' })).toEqual([9, 5, 4, 3, 1, 1])

  // Sort by name (asc)
  expect(mod.dataSortBy(
    [
      { name: 'Charlie', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
    ],
    { property: 'name', order: 'asc' },
  )).toEqual([
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
    { name: 'Charlie', age: 25 },
  ])

  // Sort by name (desc)
  expect(mod.dataSortBy(
    [
      { name: 'Charlie', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
    ],
    { property: 'name', order: 'desc' },
  )).toEqual([
    { name: 'Charlie', age: 25 },
    { name: 'Bob', age: 20 },
    { name: 'Alice', age: 30 },
  ])
})

test('dataReverse', () => {
  const arrayExample = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }, { name: 'Jake', age: 20 }]
  expect(mod.dataReverse(arrayExample)).toStrictEqual([
    { name: 'Jake', age: 20 },
    { name: 'Jane', age: 30 },
    { name: 'John', age: 25 },
  ])
  expect(mod.dataReverse(objectExample)).toMatchObject({
    country: 'USA',
    age: 25,
    name: 'John',
  })

  // Empty Items
  expect(mod.dataReverse([])).toStrictEqual([])
})

test('dataRemoveDuplicates', () => {
  expect(mod.dataRemoveDuplicates(duplicateArray)).toStrictEqual([1, 2, 3, 4, 5])
  expect(mod.dataRemoveDuplicates(stringArray)).toStrictEqual(['apple', 'banana', 'cherry'])
})

test('dataFlatten', () => {
  // Nested Array
  expect(mod.dataFlatten(nestedArray)).toStrictEqual([1, 2, 3, 4, 5, 6])

  // Nested Object
  expect(mod.dataFlatten({ a: 1, b: { c: 2, d: { e: 3 } } })).toStrictEqual({ 'a': 1, 'b.c': 2, 'b.d.e': 3 })

  // Empty Items
  expect(mod.dataFlatten([])).toStrictEqual([])

  // Return Object as-is
  // @ts-expect-error - Testing invalid input
  expect(mod.dataFlatten('not-object')).toMatchObject('not-object')
})

test('dataWithout', () => {
  // Arrays
  expect(mod.dataWithout(mixedArray, [2, 4])).toStrictEqual([1, 3, 5])
  expect(mod.dataWithout(mixedArray, 2)).toStrictEqual([1, 3, 4, 5])

  // Objects
  expect(mod.dataWithout(objectExample, ['name', 'country'])).toStrictEqual({ age: 25 })
  expect(mod.dataWithout(objectExample, 'age')).toStrictEqual({ name: 'John', country: 'USA' })

  // Empty Items
  expect(mod.dataWithout([], [])).toStrictEqual([])
})
