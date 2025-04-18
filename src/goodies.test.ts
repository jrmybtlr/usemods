import { expect, test } from 'vitest'
import * as mod from './goodies'

test('splitByWords', () => {
  expect(mod.splitByWords('Hello world')).toBe(
    '<span class="sentence sentence-1"><span class="word word-1">Hello</span> <span class="word word-2">world</span></span>'
  )
  expect(mod.splitByWords('Hello world!  This is a test.  ')).toBe(
    '<span class="sentence sentence-1"><span class="word word-1">Hello</span> <span class="word word-2">world!</span> <span class="word word-3"></span> <span class="word word-4"></span></span><span class="sentence sentence-2"><span class="word word-5">This</span> <span class="word word-6">is</span> <span class="word word-7">a</span> <span class="word word-8">test.</span> <span class="word word-9"></span> <span class="word word-10"></span></span>'
  )
  expect(mod.splitByWords('')).toBe('')
})

test('checkPasswordStrength', () => {
  // Empty
  expect(mod.checkPasswordStrength('')).toEqual({ score: 0, label: 'Very Weak' })
  // Basic checks
  expect(mod.checkPasswordStrength('hello')).toEqual({ score: 1, label: 'Password must be at least 8 characters long' })
  expect(mod.checkPasswordStrength('hello1234')).toEqual({ score: 1, label: 'Password must contain 1 uppercase letter' })
  expect(mod.checkPasswordStrength('Hello1234')).toEqual({ score: 1, label: 'Password must contain 1 special character' })
  expect(mod.checkPasswordStrength('Hello!!!!')).toEqual({ score: 1, label: 'Password must contain 1 number' })
  expect(mod.checkPasswordStrength('Hello1234#')).toEqual({ score: 4, label: 'Very Strong' })

  // Custom length checks
  expect(mod.checkPasswordStrength('Hell0#', { length: 5 })).toEqual({ score: 3, label: 'Strong' })
  expect(mod.checkPasswordStrength('Hello1234#', { length: 10 })).toEqual({ score: 4, label: 'Very Strong' })
  expect(mod.checkPasswordStrength('Hello1234#', { length: 10, uppercase: 1 })).toEqual({ score: 4, label: 'Very Strong' })
  expect(mod.checkPasswordStrength('Hello1234#', { length: 10, uppercase: 1, number: 1 })).toEqual({ score: 4, label: 'Very Strong' })
  expect(mod.checkPasswordStrength('Hello1234#', { length: 10, uppercase: 1, number: 1, special: 1 })).toEqual({ score: 4, label: 'Very Strong' })

  // Custom criteria checks
  expect(mod.checkPasswordStrength('hell', { length: 1, uppercase: 0, number: 0, special: 0 })).toEqual({ score: 0, label: 'Very Weak' })
  expect(mod.checkPasswordStrength('Hell', { length: 1, uppercase: 0, number: 0, special: 0 })).toEqual({ score: 1, label: 'Weak' })
  expect(mod.checkPasswordStrength('Hell0', { length: 1, uppercase: 0, number: 0, special: 0 })).toEqual({ score: 2, label: 'Medium' })
  expect(mod.checkPasswordStrength('Hell0#', { length: 1, uppercase: 0, number: 0, special: 0 })).toEqual({ score: 3, label: 'Strong' })
  expect(mod.checkPasswordStrength('Heeeeell0#', { length: 1, uppercase: 0, number: 0, special: 0 })).toEqual({ score: 4, label: 'Very Strong' })
})


test('mergeFields', () => {
  // Empty
  expect(mod.mergeFields('', {})).toEqual('')
  // Basic checks
  expect(mod.mergeFields('The {{a}} said {{b}}', { a: 'cat', b: 'meow' })).toEqual('The cat said meow')
  expect(mod.mergeFields('The {{ a }} said {{ b }}', { a: 'cat', b: 'meow' })).toEqual('The cat said meow')
  expect(mod.mergeFields('The {{ z }} said {{ t }}', { a: 'cat', b: 'meow' })).toEqual('The {{z}} said {{t}}')
})

test('readingTime', () => {
  // Empty
  expect(mod.readingTime('')).toBe('0 minutes')
  // Basic checks
  expect(mod.readingTime('Hello world', 200)).toBe('1 minute')
})

test('countBy', () => {
  // Empty
  expect(mod.countBy('')).toBe(0)
  // Basic checks
  expect(mod.countBy('Hello world', { by: 'word' })).toBe(2)
  expect(mod.countBy('Hello world. This is a test.', { by: 'sentence' })).toBe(2)
  expect(mod.countBy('Hello world. This is a test.', { by: 'paragraph' })).toBe(1)
  expect(mod.countBy('Hello world. This is a test. World wide.', { by: 'unique', searchFor: 'world' })).toBe(2)
  expect(mod.countBy('Hello world. This is a test.', { by: 'character' })).toBe(28)
  expect(mod.countBy('Hello world. This is a test. World wide.', { by: 'unique', searchFor: 'world' })).toBe(2)
})
