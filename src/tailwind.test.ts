import { describe, test, expect, vi } from 'vitest'
import { modDevices } from './tailwind'

describe('modDevices', () => {
  test('creates variants for all device types', () => {
    const mockAddVariant = vi.fn()
    const mockE = vi.fn((className: string) => className)
    const mockModifySelectors = vi.fn((callback: (params: { className: string }) => string) => callback({ className: 'test' }))
    const mockSeparator = ':'

    modDevices({ addVariant: mockAddVariant, e: mockE })

    // Check that addVariant was called for each device
    expect(mockAddVariant).toHaveBeenCalledTimes(14) // 14 device types

    // Get the first call to see the structure
    const firstCall = mockAddVariant.mock.calls[0]
    expect(firstCall[0]).toBe('windows') // First device type

    // Test the variant function
    const variantFunction = firstCall[1]
    variantFunction({ modifySelectors: mockModifySelectors, separator: mockSeparator })

    expect(mockModifySelectors).toHaveBeenCalled()
    expect(mockE).toHaveBeenCalledWith('windows:test')
  })

  test('handles different separators', () => {
    const mockAddVariant = vi.fn()
    const mockE = vi.fn((className: string) => className)
    const mockModifySelectors = vi.fn((callback: (params: { className: string }) => string) => callback({ className: 'test' }))
    const mockSeparator = '-'

    modDevices({ addVariant: mockAddVariant, e: mockE })

    const firstCall = mockAddVariant.mock.calls[0]
    const variantFunction = firstCall[1]
    variantFunction({ modifySelectors: mockModifySelectors, separator: mockSeparator })

    expect(mockE).toHaveBeenCalledWith('windows-test')
  })

  test('processes all device types', () => {
    const mockAddVariant = vi.fn()
    const mockE = vi.fn((className: string) => className)

    modDevices({ addVariant: mockAddVariant, e: mockE })

    const expectedDevices = [
      'windows', 'linux', 'mac',
      'ios', 'android',
      'chrome', 'firefox', 'safari', 'edge',
      'mobile', 'tablet', 'desktop',
      'portrait', 'landscape',
    ]

    expectedDevices.forEach((device, index) => {
      expect(mockAddVariant.mock.calls[index][0]).toBe(device)
    })
  })
})
