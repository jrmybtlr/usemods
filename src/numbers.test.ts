import { expect, test } from 'vitest'
import * as mod from './numbers'

test('sum', () => {
  expect(mod.sum([])).toBe(0)
  expect(mod.sum([1, 2, 3])).toBe(6)
})

test('mean', () => {
  expect(mod.mean([1, 2, 3])).toBe(2)
  expect(mod.mean([1, 2, 3, 4])).toBe(2.5)
  expect(mod.mean([-5, -3, -1, 0, 2])).toBe(-1.4)
  expect(mod.mean([42])).toBe(42)
  expect(mod.mean([])).toBe(0)
})

test('average', () => {
  expect(mod.average([1, 2, 3])).toBe(2)
  expect(mod.average([1, 2, 3, 4])).toBe(2.5)
  expect(mod.average([-5, -3, -1, 0, 2])).toBe(-1.4)
  expect(mod.average([42])).toBe(42)
  expect(mod.average([])).toBe(0)
})

test('margin', () => {
  expect(mod.margin(100, 10)).toBe(10)
  expect(mod.margin(100, 50)).toBe(50)
  expect(mod.margin(100, 0)).toBe(0)
})

test('addMargin', () => {
  expect(mod.addMargin(100, 10)).toBe(110)
  expect(mod.addMargin(100, 50)).toBe(150)
  expect(mod.addMargin(100, 0)).toBe(100)
})

test('subtractMargin', () => {
  expect(mod.subtractMargin(0, 10)).toBe(0)
  expect(mod.subtractMargin(100, 10)).toBe(90)
  expect(mod.subtractMargin(100, 50)).toBe(50)
  expect(mod.subtractMargin(100, 0)).toBe(100)
})

test('addMarkup', () => {
  expect(mod.addMarkup(0, 10)).toBe(0)
  expect(mod.addMarkup(100, 10)).toBe(110)
  expect(mod.addMarkup(100, 50)).toBe(150)
  expect(mod.addMarkup(100, 0)).toBe(100)
})

test('subtractMarkup', () => {
  expect(mod.subtractMarkup(0, 10)).toBe(0)
  expect(mod.subtractMarkup(110, 10)).toBe(100)
  expect(mod.subtractMarkup(150, 50)).toBe(100)
  expect(mod.subtractMarkup(100, 0)).toBe(100)
})

test('mode', () => {
  expect(mod.mode([1])).toEqual([1])
  expect(mod.mode([1, 2, 3, 3])).toEqual([3])
  expect(mod.mode([1, 2, 3, 3, 2])).toEqual([2, 3])
  expect(mod.mode([1, 2, 3, 3, 2, 1])).toEqual([1, 2, 3])
  expect(mod.mode([1, 2, 3, 4])).toEqual(null)
  expect(mod.mode([])).toEqual(null)
})

test('median', () => {
  expect(mod.median([1, 2, 3])).toBe(2)
  expect(mod.median([1, 2, 3, 4])).toBe(2.5)
  expect(mod.median([-5, -3, -1, 0, 2])).toBe(-1)
  expect(mod.median([42])).toBe(42)
  expect(mod.median([])).toBe(0)
})

test('min', () => {
  expect(mod.min([1, 2, 3])).toBe(1)
  expect(mod.min([1, 2, 3, 4])).toBe(1)
  expect(mod.min([-5, -3, -1, 0, 2])).toBe(-5)
  expect(mod.min([42])).toBe(42)
  expect(mod.min([])).toBe(0)
})

test('max', () => {
  expect(mod.max([1, 2, 3])).toBe(3)
  expect(mod.max([1, 2, 3, 4])).toBe(4)
  expect(mod.max([-5, -3, -1, 0, 2])).toBe(2)
  expect(mod.max([42])).toBe(42)
  expect(mod.max([])).toBe(0)
})

test('minMax', () => {
  expect(mod.minMax([1, 2, 3])).toEqual([1, 3])
  expect(mod.minMax([1, 2, 3, 4])).toEqual([1, 4])
  expect(mod.minMax([-5, -3, -1, 0, 2])).toEqual([-5, 2])
  expect(mod.minMax([42])).toEqual([42, 42])
  expect(mod.minMax([])).toEqual([0, 0])
})

test('range', () => {
  expect(mod.range([1, 2, 3])).toBe(2)
  expect(mod.range([1, 2, 3, 4])).toBe(3)
  expect(mod.range([-5, -3, -1, 0, 2])).toBe(7)
  expect(mod.range([42])).toBe(0)
  expect(mod.range([])).toBeNaN()
})

test('standardDeviation', () => {
  expect(mod.standardDeviation([1, 2, 3])).toBeCloseTo(0.82, 2)
  expect(mod.standardDeviation([1, 2, 3, 4])).toBeCloseTo(1.12, 2)
  expect(mod.standardDeviation([1, 2, 3, 4], { method: 'sample' })).toBeCloseTo(1.2909944487358056, 2)
  expect(mod.standardDeviation([-5, -3, -1, 0, 2])).toBeCloseTo(2.4166091947189146, 2)
  expect(mod.standardDeviation([42])).toBe(0)
  expect(mod.standardDeviation([])).toBeNaN()
})

test('skewness', () => {
  expect(mod.skewness([1, 2, 3])).toBe(0)
  expect(mod.skewness([1, 2, 3, 4])).toBe(0)
  expect(mod.skewness([5, 5, 5, 5])).toBe(0)
  expect(mod.skewness([-5, -3, -1, 0, 2])).toBeCloseTo(-0.255084, 2)
  expect(mod.skewness([42])).toBeNaN()
  expect(mod.skewness([])).toBeNaN()
})

test('clamp', () => {
  expect(mod.clamp(5, 0, 10)).toBe(5)
  expect(mod.clamp(-1, 0, 10)).toBe(0)
  expect(mod.clamp(15, 0, 10)).toBe(10)
  expect(mod.clamp(5, 10, 0)).toBe(5)
  expect(mod.clamp(0, 0, 0)).toBe(0)
})

test('percentageChange', () => {
  expect(mod.percentageChange(100, 150)).toBe(50)
  expect(mod.percentageChange(100, 50)).toBe(-50)
  expect(mod.percentageChange(80, 100)).toBe(25)
  expect(mod.percentageChange(-100, -50)).toBe(50)
  expect(mod.percentageChange(0, 10)).toBeNaN()
  expect(mod.percentageChange(0, 0)).toBeNaN()
})