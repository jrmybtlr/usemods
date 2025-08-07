import { describe, test, expect } from 'vitest'
import * as mod from './maps'

describe('currencySymbols', () => {
  test('contains expected currency mappings', () => {
    expect(mod.currencySymbols.get('en-US')).toBe('USD')
    expect(mod.currencySymbols.get('en-GB')).toBe('GBP')
    expect(mod.currencySymbols.get('de-DE')).toBe('EUR')
    expect(mod.currencySymbols.get('ja-JP')).toBe('JPY')
    expect(mod.currencySymbols.get('zh-CN')).toBe('CNY')
  })

  test('has correct size', () => {
    expect(mod.currencySymbols.size).toBe(37)
  })
})

describe('configLocales', () => {
  test('contains expected locales', () => {
    expect(mod.configLocales.has('en-US')).toBe(true)
    expect(mod.configLocales.has('en-GB')).toBe(true)
    expect(mod.configLocales.has('fr-FR')).toBe(true)
    expect(mod.configLocales.has('de-DE')).toBe(true)
    expect(mod.configLocales.has('ja-JP')).toBe(true)
  })

  test('has correct size', () => {
    expect(mod.configLocales.size).toBe(28)
  })
})

describe('configUnits', () => {
  test('contains area units', () => {
    expect(mod.configUnits.has('acre')).toBe(true)
    expect(mod.configUnits.has('hectare')).toBe(true)
  })

  test('contains digital storage units', () => {
    expect(mod.configUnits.has('bit')).toBe(true)
    expect(mod.configUnits.has('byte')).toBe(true)
    expect(mod.configUnits.has('kilobyte')).toBe(true)
    expect(mod.configUnits.has('megabyte')).toBe(true)
    expect(mod.configUnits.has('gigabyte')).toBe(true)
    expect(mod.configUnits.has('terabyte')).toBe(true)
    expect(mod.configUnits.has('petabyte')).toBe(true)
  })

  test('contains temperature units', () => {
    expect(mod.configUnits.has('celsius')).toBe(true)
    expect(mod.configUnits.has('fahrenheit')).toBe(true)
  })

  test('contains length units', () => {
    expect(mod.configUnits.has('centimeter')).toBe(true)
    expect(mod.configUnits.has('inch')).toBe(true)
    expect(mod.configUnits.has('foot')).toBe(true)
    expect(mod.configUnits.has('yard')).toBe(true)
    expect(mod.configUnits.has('mile')).toBe(true)
    expect(mod.configUnits.has('meter')).toBe(true)
    expect(mod.configUnits.has('kilometer')).toBe(true)
  })

  test('contains volume units', () => {
    expect(mod.configUnits.has('fluid-ounce')).toBe(true)
    expect(mod.configUnits.has('gallon')).toBe(true)
    expect(mod.configUnits.has('liter')).toBe(true)
    expect(mod.configUnits.has('milliliter')).toBe(true)
  })

  test('contains weight units', () => {
    expect(mod.configUnits.has('gram')).toBe(true)
    expect(mod.configUnits.has('kilogram')).toBe(true)
    expect(mod.configUnits.has('ounce')).toBe(true)
    expect(mod.configUnits.has('pound')).toBe(true)
    expect(mod.configUnits.has('stone')).toBe(true)
  })

  test('contains time units', () => {
    expect(mod.configUnits.has('second')).toBe(true)
    expect(mod.configUnits.has('minute')).toBe(true)
    expect(mod.configUnits.has('hour')).toBe(true)
    expect(mod.configUnits.has('day')).toBe(true)
    expect(mod.configUnits.has('week')).toBe(true)
    expect(mod.configUnits.has('month')).toBe(true)
    expect(mod.configUnits.has('year')).toBe(true)
  })

  test('contains miscellaneous units', () => {
    expect(mod.configUnits.has('degree')).toBe(true)
    expect(mod.configUnits.has('percent')).toBe(true)
  })

  test('has correct size', () => {
    expect(mod.configUnits.size).toBe(45)
  })
})

describe('unchangingPlurals', () => {
  test('contains expected unchanging words', () => {
    expect(mod.unchangingPlurals.has('sheep')).toBe(true)
    expect(mod.unchangingPlurals.has('fish')).toBe(true)
    expect(mod.unchangingPlurals.has('deer')).toBe(true)
    expect(mod.unchangingPlurals.has('moose')).toBe(true)
    expect(mod.unchangingPlurals.has('series')).toBe(true)
    expect(mod.unchangingPlurals.has('species')).toBe(true)
  })

  test('has correct size', () => {
    expect(mod.unchangingPlurals.size).toBe(21)
  })
})

describe('irregularPlurals', () => {
  test('contains expected irregular plural mappings', () => {
    expect(mod.irregularPlurals.get('child')).toBe('children')
    expect(mod.irregularPlurals.get('foot')).toBe('feet')
    expect(mod.irregularPlurals.get('goose')).toBe('geese')
    expect(mod.irregularPlurals.get('man')).toBe('men')
    expect(mod.irregularPlurals.get('woman')).toBe('women')
    expect(mod.irregularPlurals.get('tooth')).toBe('teeth')
    expect(mod.irregularPlurals.get('mouse')).toBe('mice')
    expect(mod.irregularPlurals.get('person')).toBe('people')
  })

  test('has correct size', () => {
    expect(mod.irregularPlurals.size).toBe(66)
  })
})

describe('numberUnderTwenty', () => {
  test('contains numbers 0-19', () => {
    expect(mod.numberUnderTwenty[0]).toBe('zero')
    expect(mod.numberUnderTwenty[5]).toBe('five')
    expect(mod.numberUnderTwenty[10]).toBe('ten')
    expect(mod.numberUnderTwenty[15]).toBe('fifteen')
    expect(mod.numberUnderTwenty[19]).toBe('nineteen')
  })

  test('has correct length', () => {
    expect(mod.numberUnderTwenty.length).toBe(20)
  })
})

describe('numberTens', () => {
  test('contains tens numbers', () => {
    expect(mod.numberTens[0]).toBe('twenty')
    expect(mod.numberTens[1]).toBe('thirty')
    expect(mod.numberTens[2]).toBe('forty')
    expect(mod.numberTens[3]).toBe('fifty')
    expect(mod.numberTens[4]).toBe('sixty')
    expect(mod.numberTens[5]).toBe('seventy')
    expect(mod.numberTens[6]).toBe('eighty')
    expect(mod.numberTens[7]).toBe('ninety')
  })

  test('has correct length', () => {
    expect(mod.numberTens.length).toBe(8)
  })
})

describe('numberScales', () => {
  test('contains scale words', () => {
    expect(mod.numberScales[0]).toBe('')
    expect(mod.numberScales[1]).toBe(' thousand')
    expect(mod.numberScales[2]).toBe(' million')
    expect(mod.numberScales[3]).toBe(' billion')
    expect(mod.numberScales[4]).toBe(' trillion')
    expect(mod.numberScales[5]).toBe(' quadrillion')
    expect(mod.numberScales[6]).toBe(' quintillion')
  })

  test('has correct length', () => {
    expect(mod.numberScales.length).toBe(7)
  })
})

describe('formatTitleExceptions', () => {
  test('contains common exceptions', () => {
    expect(mod.formatTitleExceptions.has('a')).toBe(true)
    expect(mod.formatTitleExceptions.has('an')).toBe(true)
    expect(mod.formatTitleExceptions.has('the')).toBe(true)
    expect(mod.formatTitleExceptions.has('and')).toBe(true)
    expect(mod.formatTitleExceptions.has('or')).toBe(true)
    expect(mod.formatTitleExceptions.has('but')).toBe(true)
    expect(mod.formatTitleExceptions.has('in')).toBe(true)
    expect(mod.formatTitleExceptions.has('on')).toBe(true)
    expect(mod.formatTitleExceptions.has('at')).toBe(true)
    expect(mod.formatTitleExceptions.has('to')).toBe(true)
    expect(mod.formatTitleExceptions.has('for')).toBe(true)
    expect(mod.formatTitleExceptions.has('of')).toBe(true)
    expect(mod.formatTitleExceptions.has('with')).toBe(true)
  })

  test('has correct size', () => {
    expect(mod.formatTitleExceptions.size).toBe(26)
  })
})

describe('bytesInUnit', () => {
  test('contains byte conversion mappings', () => {
    expect(mod.bytesInUnit.get('byte')).toBe(1)
    expect(mod.bytesInUnit.get('kilobyte')).toBe(1024)
    expect(mod.bytesInUnit.get('megabyte')).toBe(1024 ** 2)
    expect(mod.bytesInUnit.get('gigabyte')).toBe(1024 ** 3)
    expect(mod.bytesInUnit.get('terabyte')).toBe(1024 ** 4)
    expect(mod.bytesInUnit.get('petabyte')).toBe(1024 ** 5)
  })

  test('has correct size', () => {
    expect(mod.bytesInUnit.size).toBe(6)
  })
})

describe('lengthUnitConversions', () => {
  test('contains metric length conversions', () => {
    expect(mod.lengthUnitConversions.get('millimeter')).toEqual({ value: 1, system: 'metric' })
    expect(mod.lengthUnitConversions.get('centimeter')).toEqual({ value: 10, system: 'metric' })
    expect(mod.lengthUnitConversions.get('meter')).toEqual({ value: 1000, system: 'metric' })
    expect(mod.lengthUnitConversions.get('kilometer')).toEqual({ value: 1000000, system: 'metric' })
  })

  test('contains imperial length conversions', () => {
    expect(mod.lengthUnitConversions.get('inch')).toEqual({ value: 25.4, system: 'imperial' })
    expect(mod.lengthUnitConversions.get('foot')).toEqual({ value: 304.8, system: 'imperial' })
    expect(mod.lengthUnitConversions.get('yard')).toEqual({ value: 914.4, system: 'imperial' })
    expect(mod.lengthUnitConversions.get('mile')).toEqual({ value: 1609344, system: 'imperial' })
  })

  test('has correct size', () => {
    expect(mod.lengthUnitConversions.size).toBe(8)
  })
})

describe('volumeUnitConversions', () => {
  test('contains metric volume conversions', () => {
    expect(mod.volumeUnitConversions.get('milliliter')).toEqual({ value: 1, system: 'metric' })
    expect(mod.volumeUnitConversions.get('liter')).toEqual({ value: 1000, system: 'metric' })
  })

  test('contains imperial volume conversions', () => {
    expect(mod.volumeUnitConversions.get('cup')).toEqual({ value: 236.588, system: 'imperial' })
    expect(mod.volumeUnitConversions.get('tablespoon')).toEqual({ value: 14.7868, system: 'imperial' })
    expect(mod.volumeUnitConversions.get('teaspoon')).toEqual({ value: 4.92892, system: 'imperial' })
  })

  test('has correct size', () => {
    expect(mod.volumeUnitConversions.size).toBe(5)
  })
})

describe('weightUnitConversions', () => {
  test('contains metric weight conversions', () => {
    expect(mod.weightUnitConversions.get('gram')).toEqual({ value: 1, system: 'metric' })
    expect(mod.weightUnitConversions.get('kilogram')).toEqual({ value: 1000, system: 'metric' })
  })

  test('contains imperial weight conversions', () => {
    expect(mod.weightUnitConversions.get('ounce')).toEqual({ value: 28.3495, system: 'imperial' })
    expect(mod.weightUnitConversions.get('pound')).toEqual({ value: 453.592, system: 'imperial' })
    expect(mod.weightUnitConversions.get('stone')).toEqual({ value: 6350.293, system: 'imperial' })
  })

  test('has correct size', () => {
    expect(mod.weightUnitConversions.size).toBe(5)
  })
})
