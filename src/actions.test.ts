import { expect, test, vi, beforeEach, afterEach, describe } from 'vitest'
import * as mod from './actions'

// Mock DOM environment
interface MockElement {
  scrollIntoView: ReturnType<typeof vi.fn>
  focus: ReturnType<typeof vi.fn>
  querySelector: ReturnType<typeof vi.fn>
  querySelectorAll: ReturnType<typeof vi.fn>
  addEventListener: ReturnType<typeof vi.fn>
  classList: {
    contains: ReturnType<typeof vi.fn>
    add: ReturnType<typeof vi.fn>
    remove: ReturnType<typeof vi.fn>
    toggle: ReturnType<typeof vi.fn>
  }
  style: Record<string, string>
  dataset: Record<string, string>
  reset: ReturnType<typeof vi.fn>
}

interface MockDocument {
  querySelector: ReturnType<typeof vi.fn>
  querySelectorAll: ReturnType<typeof vi.fn>
  body: MockElement
  fullscreenElement: MockElement | null
  exitFullscreen: ReturnType<typeof vi.fn>
  documentElement: {
    requestFullscreen: ReturnType<typeof vi.fn>
  }
}

interface MockWindow {
  scrollY: number
  scrollTo: ReturnType<typeof vi.fn>
}

interface MockNavigator {
  clipboard: {
    writeText: ReturnType<typeof vi.fn>
  }
}

const mockElement: MockElement = {
  scrollIntoView: vi.fn(),
  focus: vi.fn(),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(),
  addEventListener: vi.fn(),
  classList: {
    contains: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
    toggle: vi.fn(),
  },
  style: {},
  dataset: {},
  reset: vi.fn(),
}

const mockDocument: MockDocument = {
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(),
  body: mockElement,
  fullscreenElement: null,
  exitFullscreen: vi.fn(),
  documentElement: {
    requestFullscreen: vi.fn(),
  },
}

const mockWindow: MockWindow = {
  scrollY: 100,
  scrollTo: vi.fn(),
}

const mockNavigator: MockNavigator = {
  clipboard: {
    writeText: vi.fn(),
  },
}

// Setup global mocks
beforeEach(() => {
  Object.defineProperty(global, 'document', {
    value: mockDocument,
    writable: true,
  })
  Object.defineProperty(global, 'window', {
    value: mockWindow,
    writable: true,
  })
  Object.defineProperty(global, 'navigator', {
    value: mockNavigator,
    writable: true,
  })

  // Reset all mocks
  vi.clearAllMocks()

  // Setup default mock implementations
  mockDocument.querySelector.mockReturnValue(mockElement)
  mockDocument.querySelectorAll.mockReturnValue([mockElement])
  mockElement.querySelector.mockReturnValue(mockElement)
  mockElement.querySelectorAll.mockReturnValue([mockElement])
  mockNavigator.clipboard.writeText.mockResolvedValue(undefined)
  mockDocument.exitFullscreen.mockResolvedValue(undefined)
  mockDocument.documentElement.requestFullscreen.mockResolvedValue(undefined)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('scrollToAnchor', () => {
  test('should scroll to element successfully', async () => {
    vi.useFakeTimers()
    const result = mod.scrollToAnchor('test-id')

    await vi.runAllTimersAsync()

    expect(mockDocument.querySelector).toHaveBeenCalledWith('#test-id')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })

    await expect(result).resolves.toBeUndefined()
    vi.useRealTimers()
  })

  test('should reject when element not found', async () => {
    mockDocument.querySelector.mockReturnValue(null)

    const result = mod.scrollToAnchor('nonexistent-id')

    await expect(result).rejects.toBe('Element with id \'nonexistent-id\' not found.')
  })

  test('should warn when element not found', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockDocument.querySelector.mockReturnValue(null)

    try {
      await mod.scrollToAnchor('nonexistent-id')
    }
    catch {
      // Expected to throw
    }

    expect(consoleSpy).toHaveBeenCalledWith('[MODS] Element with id \'nonexistent-id\' not found.')
    consoleSpy.mockRestore()
  })
})

describe('toggleBodyScroll', () => {
  test('should toggle body scroll with default parameters', async () => {
    mockElement.classList.contains.mockReturnValue(false)

    const result = mod.toggleBodyScroll()

    expect(mockElement.classList.toggle).toHaveBeenCalledWith('fixed')
    expect(mockElement.style.top).toBe('-100px')

    await expect(result).resolves.toBeUndefined()
  })

  test('should add class when action is add', async () => {
    mockElement.classList.contains.mockReturnValue(false)

    const result = mod.toggleBodyScroll('custom-class', 'add')

    expect(mockElement.classList.add).toHaveBeenCalledWith('custom-class')
    expect(mockElement.classList.toggle).not.toHaveBeenCalled()

    await expect(result).resolves.toBeUndefined()
  })

  test('should remove class when action is remove', async () => {
    mockElement.classList.contains.mockReturnValue(true)
    mockElement.style.top = '-100px'

    const result = mod.toggleBodyScroll('custom-class', 'remove')

    expect(mockElement.classList.remove).toHaveBeenCalledWith('custom-class')
    expect(mockElement.style.top).toBe('')
    expect(mockWindow.scrollTo).toHaveBeenCalledWith(0, 100)

    await expect(result).resolves.toBeUndefined()
  })

  test('should handle errors gracefully', async () => {
    mockElement.classList.contains.mockImplementation(() => {
      throw new Error('Test error')
    })

    const result = mod.toggleBodyScroll()

    await expect(result).rejects.toThrow('Test error')
  })
})

describe('toggleElementScroll', () => {
  test('should lock element scroll', async () => {
    const element = { ...mockElement } as unknown as HTMLElement

    const result = mod.toggleElementScroll(element)

    expect(element.style.overflow).toBe('hidden')
    expect(element.dataset.isScrollLocked).toBe('true')

    await expect(result).resolves.toBeUndefined()
  })

  test('should unlock element scroll', async () => {
    const element = {
      ...mockElement,
      dataset: { isScrollLocked: 'true' },
      style: { overflow: 'hidden' },
    } as unknown as HTMLElement

    const result = mod.toggleElementScroll(element)

    expect(element.style.overflow).toBe('')
    expect(element.dataset.isScrollLocked).toBeUndefined()

    await expect(result).resolves.toBeUndefined()
  })

  test('should handle null element gracefully', async () => {
    const result = mod.toggleElementScroll(null as unknown as HTMLElement)

    await expect(result).resolves.toBeUndefined()
  })
})

describe('copyToClipboard', () => {
  test('should copy string to clipboard', async () => {
    const result = mod.copyToClipboard('test text')

    expect(mockNavigator.clipboard.writeText).toHaveBeenCalledWith('test text')

    await expect(result).resolves.toBeUndefined()
  })

  test('should copy number to clipboard as string', async () => {
    const result = mod.copyToClipboard(123)

    expect(mockNavigator.clipboard.writeText).toHaveBeenCalledWith('123')

    await expect(result).resolves.toBeUndefined()
  })

  test('should handle clipboard errors', async () => {
    const error = new Error('Clipboard error')
    mockNavigator.clipboard.writeText.mockRejectedValue(error)

    const result = mod.copyToClipboard('test')

    await expect(result).rejects.toThrow('Clipboard error')
  })
})

describe('toggleFullScreen', () => {
  test('should enter fullscreen when not in fullscreen', async () => {
    mockDocument.fullscreenElement = null

    const result = mod.toggleFullScreen()

    expect(mockDocument.documentElement.requestFullscreen).toHaveBeenCalled()
    expect(mockDocument.exitFullscreen).not.toHaveBeenCalled()

    await expect(result).resolves.toBeUndefined()
  })

  test('should exit fullscreen when in fullscreen', async () => {
    mockDocument.fullscreenElement = mockElement

    const result = mod.toggleFullScreen()

    expect(mockDocument.exitFullscreen).toHaveBeenCalled()
    expect(mockDocument.documentElement.requestFullscreen).not.toHaveBeenCalled()

    await expect(result).resolves.toBeUndefined()
  })
})

describe('resetForm', () => {
  test('should reset form successfully', async () => {
    const form = { ...mockElement } as unknown as HTMLFormElement

    const result = mod.resetForm(form)

    expect(form.reset).toHaveBeenCalled()

    await expect(result).resolves.toBeUndefined()
  })

  test('should handle form reset errors', async () => {
    const form = { ...mockElement } as unknown as HTMLFormElement
    form.reset = vi.fn(() => { throw new Error('Reset error') })

    const result = mod.resetForm(form)

    await expect(result).rejects.toThrow('Reset error')
  })
})

describe('focusOnInvalid', () => {
  test('should focus on invalid element', async () => {
    const container = { ...mockElement }
    container.querySelector.mockReturnValue(mockElement)

    const result = mod.focusOnInvalid(container)

    expect(container.querySelector).toHaveBeenCalledWith('input:invalid, select:invalid, textarea:invalid')
    expect(mockElement.focus).toHaveBeenCalled()
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    })

    await expect(result).resolves.toBeUndefined()
  })

  test('should resolve when no invalid elements found', async () => {
    const container = { ...mockElement }
    container.querySelector.mockReturnValue(null)

    const result = mod.focusOnInvalid(container)

    await expect(result).resolves.toBeUndefined()
  })

  test('should handle errors gracefully', async () => {
    const container = { ...mockElement }
    container.querySelector.mockImplementation(() => {
      throw new Error('Query error')
    })

    const result = mod.focusOnInvalid(container)

    await expect(result).rejects.toThrow('Query error')
  })
})

describe('focusOnNth', () => {
  test('should focus on first element by default', async () => {
    const container = { ...mockElement }
    const elements = [mockElement, mockElement]
    container.querySelectorAll.mockReturnValue(elements)

    const result = mod.focusOnNth(container)

    expect(container.querySelectorAll).toHaveBeenCalledWith('input, textarea, select')
    expect(mockElement.focus).toHaveBeenCalledWith({ preventScroll: true })
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    })

    await expect(result).resolves.toBeUndefined()
  })

  test('should focus on specified index', async () => {
    const container = { ...mockElement }
    const elements = [mockElement, mockElement, mockElement]
    container.querySelectorAll.mockReturnValue(elements)

    const result = mod.focusOnNth(container, 1)

    expect(elements[1].focus).toHaveBeenCalledWith({ preventScroll: true })

    await expect(result).resolves.toBeUndefined()
  })

  test('should focus on last element with index -1', async () => {
    const container = { ...mockElement }
    const elements = [mockElement, mockElement, mockElement]
    container.querySelectorAll.mockReturnValue(elements)

    const result = mod.focusOnNth(container, -1)

    expect(elements[2].focus).toHaveBeenCalledWith({ preventScroll: true })

    await expect(result).resolves.toBeUndefined()
  })

  test('should reject when index is out of bounds', async () => {
    const container = { ...mockElement }
    const elements = [mockElement]
    container.querySelectorAll.mockReturnValue(elements)

    const result = mod.focusOnNth(container, 5)

    await expect(result).rejects.toThrow('Element at index 5 is out of bounds.')
  })

  test('should reject when element has no focus method', async () => {
    const container = { ...mockElement }
    const invalidElement = { ...mockElement }
    delete invalidElement.focus
    container.querySelectorAll.mockReturnValue([invalidElement])

    const result = mod.focusOnNth(container)

    await expect(result).rejects.toThrow('[MODS] Failed to focus on the element.')
  })

  test('should handle focus errors', async () => {
    const container = { ...mockElement } as unknown as HTMLElement
    mockElement.focus.mockImplementation(() => {
      throw new Error('Focus error')
    })
    container.querySelectorAll.mockReturnValue([mockElement])

    const result = mod.focusOnNth(container)

    await expect(result).rejects.toThrow('[MODS] Failed to focus on the element.Error: Focus error')
  })
})

describe('focusTrap', () => {
  test('should set up focus trap with focusable elements', () => {
    const container = { ...mockElement }
    const focusableElements = [mockElement, mockElement, mockElement]
    container.querySelectorAll.mockReturnValue(focusableElements)

    mod.focusTrap(container)

    expect(container.querySelectorAll).toHaveBeenCalledWith(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    )
    expect(container.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  test('should handle tab key navigation forward', () => {
    const container = { ...mockElement } as unknown as HTMLElement
    // Use unique mock elements for each focusable item
    const focusableElements = [
      { ...mockElement, focus: vi.fn() },
      { ...mockElement, focus: vi.fn() },
      { ...mockElement, focus: vi.fn() },
    ]
    container.querySelectorAll.mockReturnValue(focusableElements)

    mod.focusTrap(container)

    const keydownHandler = container.addEventListener.mock.calls[0][1]
    const mockEvent = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    }

    // Simulate focus on last element
    Object.defineProperty(document, 'activeElement', {
      value: focusableElements[2],
      writable: true,
    })

    keydownHandler(mockEvent)

    expect(focusableElements[0].focus).toHaveBeenCalled()
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  test('should handle tab key navigation backward', () => {
    const container = { ...mockElement } as unknown as HTMLElement
    // Use unique mock elements for each focusable item
    const focusableElements = [
      { ...mockElement, focus: vi.fn() },
      { ...mockElement, focus: vi.fn() },
      { ...mockElement, focus: vi.fn() },
    ]
    container.querySelectorAll.mockReturnValue(focusableElements)

    mod.focusTrap(container)

    const keydownHandler = container.addEventListener.mock.calls[0][1]
    const mockEvent = {
      key: 'Tab',
      shiftKey: true,
      preventDefault: vi.fn(),
    }

    // Simulate focus on first element
    Object.defineProperty(document, 'activeElement', {
      value: focusableElements[0],
      writable: true,
    })

    keydownHandler(mockEvent)

    expect(focusableElements[2].focus).toHaveBeenCalled()
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  test('should ignore non-tab keys', () => {
    const container = { ...mockElement }
    const focusableElements = [mockElement, mockElement, mockElement]
    container.querySelectorAll.mockReturnValue(focusableElements)

    mod.focusTrap(container)

    const keydownHandler = container.addEventListener.mock.calls[0][1]
    const mockEvent = {
      key: 'Enter',
      preventDefault: vi.fn(),
    }

    keydownHandler(mockEvent)

    expect(mockEvent.preventDefault).not.toHaveBeenCalled()
  })
})

describe('debounce', () => {
  test('should debounce function calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = mod.debounce(fn, 1000)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  test('should call function immediately with leading option', () => {
    const fn = vi.fn()
    const debounced = mod.debounce(fn, 1000, { leading: true })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should not call function with trailing false', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = mod.debounce(fn, 1000, { trailing: false })

    debounced()
    await vi.runAllTimersAsync()
    expect(fn).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  test('should cancel pending execution', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = mod.debounce(fn, 1000)

    debounced()
    debounced.cancel()
    await vi.runAllTimersAsync()
    expect(fn).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  test('should handle multiple rapid calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = mod.debounce(fn, 1000)

    debounced(1)
    debounced(2)
    debounced(3)
    expect(fn).not.toHaveBeenCalled()

    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)

    vi.useRealTimers()
  })

  test('should preserve function context', async () => {
    vi.useFakeTimers()
    const context = { value: 42 }
    const fn = vi.fn(function (this: typeof context) {
      expect(this.value).toBe(42)
    })
    const debounced = mod.debounce(fn, 1000)

    debounced.call(context)
    await vi.runAllTimersAsync()

    vi.useRealTimers()
  })
})

describe('throttle', () => {
  test('should throttle function calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = mod.throttle(fn, 1000)

    throttled()
    expect(fn).not.toHaveBeenCalled()

    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  test('should execute immediately if threshold has passed', () => {
    const fn = vi.fn()
    const throttled = mod.throttle(fn, 1000)

    // Mock performance.now to simulate time passing
    const originalNow = performance.now
    performance.now = vi.fn(() => 2000)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    performance.now = originalNow
  })

  test('should cancel pending execution', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = mod.throttle(fn, 1000)

    throttled()
    throttled.cancel()
    await vi.runAllTimersAsync()
    expect(fn).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  test('should handle multiple calls within threshold', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = mod.throttle(fn, 1000)

    throttled(1)
    throttled(2)
    throttled(3)
    expect(fn).not.toHaveBeenCalled()

    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)

    vi.useRealTimers()
  })

  test('should preserve function context', async () => {
    vi.useFakeTimers()
    const context = { value: 42 }
    const fn = vi.fn(function (this: typeof context) {
      expect(this.value).toBe(42)
    })
    const throttled = mod.throttle(fn, 1000)

    throttled.call(context)
    await vi.runAllTimersAsync()

    vi.useRealTimers()
  })

  test('should handle rapid successive calls', async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttled = mod.throttle(fn, 1000)

    // First call should execute after timer
    throttled(1)
    expect(fn).not.toHaveBeenCalled()
    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledWith(1)
    expect(fn).toHaveBeenCalledTimes(1)

    // Second call should execute after next timer
    throttled(2)
    expect(fn).toHaveBeenCalledTimes(1)
    await vi.runAllTimersAsync()
    expect(fn).toHaveBeenCalledWith(2)
    expect(fn).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })
})
