import { describe, test, expect } from 'vitest'
import * as mod from './index'

describe('index exports', () => {
  test('exports functions from all modules', () => {
    // Test that functions from each module are exported
    // Actions
    expect(typeof mod.copyToClipboard).toBe('function')
    expect(typeof mod.debounce).toBe('function')
    expect(typeof mod.focusOnInvalid).toBe('function')

    // Formatters
    expect(typeof mod.formatCurrency).toBe('function')
    expect(typeof mod.formatNumber).toBe('function')
    expect(typeof mod.formatTitle).toBe('function')

    // Modifiers
    expect(typeof mod.camelCase).toBe('function')
    expect(typeof mod.kebabCase).toBe('function')
    expect(typeof mod.pluralize).toBe('function')

    // Generators
    expect(typeof mod.generateUuid4).toBe('function')
    expect(typeof mod.generatePassword).toBe('function')
    expect(typeof mod.generateNumber).toBe('function')

    // Numbers
    expect(typeof mod.sum).toBe('function')
    expect(typeof mod.average).toBe('function')
    expect(typeof mod.max).toBe('function')

    // Data
    expect(typeof mod.dataFlatten).toBe('function')
    expect(typeof mod.dataReverse).toBe('function')
    expect(typeof mod.dataSortBy).toBe('function')

    // Validators
    expect(typeof mod.isEmail).toBe('function')
    expect(typeof mod.isNumber).toBe('function')
    expect(typeof mod.isUrl).toBe('function')

    // Detections
    expect(typeof mod.detectScrollPosition).toBe('function')
    expect(typeof mod.detectWindowSize).toBe('function')
    expect(typeof mod.detectBreakpoint).toBe('function')

    // Devices
    expect(typeof mod.detectBrowser).toBe('function')
    expect(typeof mod.detectOS).toBe('function')
    expect(typeof mod.isMobile).toBe('function')

    // Goodies
    expect(typeof mod.animateText).toBe('function')
    expect(typeof mod.checkPasswordStrength).toBe('function')
    expect(typeof mod.readingTime).toBe('function')

    // Tailwind
    expect(typeof mod.modDevices).toBe('function')
  })
})
