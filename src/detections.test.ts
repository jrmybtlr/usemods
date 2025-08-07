import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import * as mod from './detections'

// Mock HTMLElement for testing
class MockHTMLElement {
  getBoundingClientRect() {
    return { width: 400 }
  }
}

// Mock window and document for testing
const mockWindow = {
  scrollX: 100,
  scrollY: 200,
  innerWidth: 1024,
  innerHeight: 768,
  screen: {
    width: 1920,
    height: 1080,
  },
  location: {
    href: 'https://example.com/path?param=value#hash',
    pathname: '/path/to/page',
    search: '?param=value&other=test',
    hash: '#hash',
    host: 'example.com',
    hostname: 'example.com',
    port: '443',
  },
  matchMedia: vi.fn(() => ({
    matches: false,
  })),
}

const mockDocument = {
  hidden: false,
}

const mockNavigator = {
  onLine: true,
}

const mockIntl = {
  DateTimeFormat: vi.fn(() => ({
    resolvedOptions: () => ({
      timeZone: 'America/New_York',
    }),
  })),
}

describe('detectScrollPosition', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns scroll position when window is available', () => {
    expect(mod.detectScrollPosition()).toEqual({ x: 100, y: 200 })
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectScrollPosition()).toBeNull()
  })
})

describe('detectMousePosition', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns mouse position from event', () => {
    const mockEvent = {
      pageX: 150,
      pageY: 250,
    } as MouseEvent
    expect(mod.detectMousePosition(mockEvent)).toEqual({ x: 150, y: 250 })
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    const mockEvent = { pageX: 150, pageY: 250 } as MouseEvent
    expect(mod.detectMousePosition(mockEvent)).toBeNull()
  })
})

describe('detectRelativeMousePosition', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns relative mouse position as percentages', () => {
    const mockEvent = {
      clientX: 512, // 50% of 1024
      clientY: 384, // 50% of 768
    } as MouseEvent
    expect(mod.detectRelativeMousePosition(mockEvent)).toEqual({ x: 0.5, y: 0.5 })
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    const mockEvent = { clientX: 512, clientY: 384 } as MouseEvent
    expect(mod.detectRelativeMousePosition(mockEvent)).toBeNull()
  })
})

describe('detectWindowSize', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns window size', () => {
    expect(mod.detectWindowSize()).toEqual({ width: 1024, height: 768 })
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectWindowSize()).toBeNull()
  })
})

describe('detectScreenSize', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns screen size', () => {
    expect(mod.detectScreenSize()).toEqual({ width: 1920, height: 1080 })
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectScreenSize()).toBeNull()
  })
})

describe('detectActiveBrowser', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
    ;(global as any).document = mockDocument
  })
  afterEach(() => {
    delete (global as any).window
    delete (global as any).document
  })

  test('returns true when document is not hidden', () => {
    expect(mod.detectActiveBrowser()).toBe(true)
  })

  test('returns false when document is hidden', () => {
    ;(global as any).document.hidden = true
    expect(mod.detectActiveBrowser()).toBe(false)
  })

  test('returns false when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectActiveBrowser()).toBe(false)
  })
})

describe('detectColorScheme', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns light when dark mode is not preferred', () => {
    expect(mod.detectColorScheme()).toBe('light')
  })

  test('returns dark when dark mode is preferred', () => {
    ;(global as any).window.matchMedia = vi.fn(() => ({
      matches: true,
    }))
    expect(mod.detectColorScheme()).toBe('dark')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectColorScheme()).toBeNull()
  })
})

describe('detectUserTimezone', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
    ;(global as any).Intl = mockIntl
  })
  afterEach(() => {
    delete (global as any).window
    delete (global as any).Intl
  })

  test('returns user timezone', () => {
    expect(mod.detectUserTimezone()).toBe('America/New_York')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectUserTimezone()).toBeNull()
  })
})

describe('detectBreakpoint', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns xs for width < 640', () => {
    ;(global as any).window.innerWidth = 320
    expect(mod.detectBreakpoint()).toBe('xs')
  })

  test('returns sm for width >= 640 and < 768', () => {
    ;(global as any).window.innerWidth = 700
    expect(mod.detectBreakpoint()).toBe('sm')
  })

  test('returns md for width >= 768 and < 1024', () => {
    ;(global as any).window.innerWidth = 900
    expect(mod.detectBreakpoint()).toBe('md')
  })

  test('returns lg for width >= 1024 and < 1280', () => {
    ;(global as any).window.innerWidth = 1200
    expect(mod.detectBreakpoint()).toBe('lg')
  })

  test('returns xl for width >= 1280 and < 1536', () => {
    ;(global as any).window.innerWidth = 1400
    expect(mod.detectBreakpoint()).toBe('xl')
  })

  test('returns 2xl for width >= 1536', () => {
    ;(global as any).window.innerWidth = 1600
    expect(mod.detectBreakpoint()).toBe('2xl')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectBreakpoint()).toBeNull()
  })
})

describe('detectContainerBreakpoint', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
    ;(global as any).HTMLElement = MockHTMLElement
  })
  afterEach(() => {
    delete (global as any).window
    delete (global as any).HTMLElement
  })

  test('returns @xs for width < 320', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 300 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@xs')
  })

  test('returns @sm for width >= 320 and < 384', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 350 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@sm')
  })

  test('returns @md for width >= 384 and < 448', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 400 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@md')
  })

  test('returns @lg for width >= 448 and < 512', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 480 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@lg')
  })

  test('returns @xl for width >= 512 and < 576', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 540 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@xl')
  })

  test('returns @2xl for width >= 576 and < 672', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 600 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@2xl')
  })

  test('returns @3xl for width >= 672 and < 768', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 700 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@3xl')
  })

  test('returns @4xl for width >= 768 and < 896', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 800 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@4xl')
  })

  test('returns @5xl for width >= 896 and < 1024', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 900 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@5xl')
  })

  test('returns @6xl for width >= 1024 and < 1152', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 1100 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@6xl')
  })

  test('returns @7xl for width >= 1152 and < 1280', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 1200 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@7xl')
  })

  test('returns @7xl for width >= 1280', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ width: 1400 }),
    } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBe('@7xl')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    const mockElement = { getBoundingClientRect: () => ({ width: 400 }) } as any
    Object.setPrototypeOf(mockElement, MockHTMLElement.prototype)
    expect(mod.detectContainerBreakpoint(mockElement)).toBeNull()
  })

  test('returns null when element is not HTMLElement', () => {
    const mockElement = {} as any
    expect(mod.detectContainerBreakpoint(mockElement)).toBeNull()
  })

  test('returns null when element is null', () => {
    expect(mod.detectContainerBreakpoint(null as any)).toBeNull()
  })
})

describe('detectNetworkStatus', () => {
  let originalNavigator: any
  beforeEach(() => {
    ;(global as any).window = mockWindow
    originalNavigator = global.navigator
    vi.stubGlobal('navigator', { onLine: true })
  })
  afterEach(() => {
    delete (global as any).window
    vi.stubGlobal('navigator', originalNavigator)
  })

  test('returns Online when navigator.onLine is true', () => {
    vi.stubGlobal('navigator', { onLine: true })
    expect(mod.detectNetworkStatus()).toBe('Online')
  })

  test('returns Offline when navigator.onLine is false', () => {
    vi.stubGlobal('navigator', { onLine: false })
    expect(mod.detectNetworkStatus()).toBe('Offline')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectNetworkStatus()).toBeNull()
  })
})

describe('detectUrl', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns current URL', () => {
    expect(mod.detectUrl()).toBe('https://example.com/path?param=value#hash')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectUrl()).toBeNull()
  })
})

describe('detectUrlPath', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns path as array by default', () => {
    expect(mod.detectUrlPath()).toEqual(['path', 'to', 'page'])
  })

  test('returns path as string when format is string', () => {
    expect(mod.detectUrlPath('string')).toBe('path/to/page')
  })

  test('returns path as array when format is array', () => {
    expect(mod.detectUrlPath('array')).toEqual(['path', 'to', 'page'])
  })

  test('returns empty array for root path', () => {
    ;(global as any).window.location.pathname = '/'
    expect(mod.detectUrlPath()).toEqual([])
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectUrlPath()).toBeNull()
  })
})

describe('detectUrlParams', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns params as string by default', () => {
    expect(mod.detectUrlParams()).toBe('param=value&other=test')
  })

  test('returns params as string when format is string', () => {
    expect(mod.detectUrlParams('string')).toBe('param=value&other=test')
  })

  test('returns params as object array when format is object', () => {
    expect(mod.detectUrlParams('object')).toEqual([
      { param: 'value' },
      { other: 'test' },
    ])
  })

  test('returns null for empty params when format is object', () => {
    ;(global as any).window.location.search = ''
    expect(mod.detectUrlParams('object')).toBeNull()
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectUrlParams()).toBeNull()
  })
})

describe('detectUrlHash', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns hash without # symbol', () => {
    expect(mod.detectUrlHash()).toBe('hash')
  })

  test('returns empty string for hash without content', () => {
    ;(global as any).window.location.hash = '#'
    expect(mod.detectUrlHash()).toBe('')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectUrlHash()).toBeNull()
  })
})

describe('detectHost', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns host', () => {
    expect(mod.detectHost()).toBe('example.com')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectHost()).toBeNull()
  })
})

describe('detectHostName', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns hostname', () => {
    expect(mod.detectHostName()).toBe('example.com')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectHostName()).toBeNull()
  })
})

describe('detectPort', () => {
  beforeEach(() => {
    ;(global as any).window = mockWindow
  })
  afterEach(() => {
    delete (global as any).window
  })

  test('returns port', () => {
    expect(mod.detectPort()).toBe('443')
  })

  test('returns null when window is undefined', () => {
    delete (global as any).window
    expect(mod.detectPort()).toBeNull()
  })
})
