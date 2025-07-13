import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import * as mod from './devices'

const androidUA = 'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36'
const iosUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
const firefoxUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
const safariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15'
const edgeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
const botUA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const linuxUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
const windowsUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
const macUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15'
const tabletUA = 'Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'

// Removed mockWindow and unmockWindow as they are no longer used

describe('isServerSide', () => {
  test('returns true when window is undefined', () => {
    expect(mod.isServerSide()).toBe(true)
  })
})

describe('detectUserDevice', () => {
  test('returns server on SSR with no UA', () => {
    expect(mod.detectUserDevice()).toBe('server')
  })
  test('detects Android', () => {
    expect(mod.detectUserDevice(androidUA)).toEqual({ os: 'Android', browser: 'Chrome', device: 'Mobile' })
  })
  test('detects iOS', () => {
    expect(mod.detectUserDevice(iosUA)).toEqual({ os: 'iOS', browser: 'Safari', device: 'Mobile' })
  })
  test('detects Chrome', () => {
    expect(mod.detectUserDevice(chromeUA)).toEqual({ os: 'Windows', browser: 'Chrome', device: 'Desktop' })
  })
  test('detects Firefox', () => {
    expect(mod.detectUserDevice(firefoxUA)).toEqual({ os: 'Windows', browser: 'Firefox', device: 'Desktop' })
  })
  test('detects Safari', () => {
    expect(mod.detectUserDevice(safariUA)).toEqual({ os: 'Mac', browser: 'Safari', device: 'Desktop' })
  })
  test('detects Edge', () => {
    expect(mod.detectUserDevice(edgeUA)).toEqual({ os: 'Windows', browser: 'Edge', device: 'Desktop' })
  })
  test('detects Linux', () => {
    expect(mod.detectUserDevice(linuxUA)).toEqual({ os: 'Linux', browser: 'Chrome', device: 'Desktop' })
  })
  test('detects bot', () => {
    expect(mod.isBot(botUA)).toBe(true)
    expect(mod.isHuman(botUA)).toBe(false)
  })
})

describe('addDeviceClasses', () => {
  beforeEach(() => {
    // Mock document for testing
    ;(global as unknown as { document: { body: { classList: { add: ReturnType<typeof vi.fn>, length: number } } } }).document = {
      body: {
        classList: {
          add: vi.fn(),
          length: 0,
        },
      },
    }
  })
  afterEach(() => {
    delete (global as unknown as { document?: unknown }).document
  })
  test('adds classes for Android Chrome Mobile', () => {
    mod.addDeviceClasses(androidUA)
    expect(document.body.classList.add).toHaveBeenCalledWith('android', 'chrome', 'mobile')
  })
  test('does nothing on SSR', () => {
    mod.addDeviceClasses()
    expect(document.body.classList.add).not.toHaveBeenCalled()
  })
})

describe('detectDevice', () => {
  test('detects Mobile', () => {
    expect(mod.detectDevice(androidUA)).toBe('Mobile')
    expect(mod.detectDevice(iosUA)).toBe('Mobile')
    expect(mod.detectDevice(mobileUA)).toBe('Mobile')
  })
  test('detects Desktop', () => {
    expect(mod.detectDevice(chromeUA)).toBe('Desktop')
    expect(mod.detectDevice(linuxUA)).toBe('Desktop')
  })
})

describe('detectBrowser', () => {
  test('detects Chrome', () => {
    expect(mod.detectBrowser(chromeUA)).toBe('Chrome')
  })
  test('detects Firefox', () => {
    expect(mod.detectBrowser(firefoxUA)).toBe('Firefox')
  })
  test('detects Safari', () => {
    expect(mod.detectBrowser(safariUA)).toBe('Safari')
  })
  test('detects Edge', () => {
    expect(mod.detectBrowser(edgeUA)).toBe('Edge')
  })
  test('returns unknown for unknown', () => {
    expect(mod.detectBrowser('SomeRandomUA')).toBe('unknown')
  })
  test('returns server on SSR with no UA', () => {
    expect(mod.detectBrowser()).toBe('server')
  })
  test('detects Chrome with different Chrome UAs', () => {
    const chromeMobileUA = 'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36'
    const chromeDesktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    const chromeMacUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    expect(mod.detectBrowser(chromeMobileUA)).toBe('Chrome')
    expect(mod.detectBrowser(chromeDesktopUA)).toBe('Chrome')
    expect(mod.detectBrowser(chromeMacUA)).toBe('Chrome')
  })
  test('detects Firefox with different Firefox UAs', () => {
    const firefoxMobileUA = 'Mozilla/5.0 (Android 10; Mobile; rv:89.0) Gecko/89.0 Firefox/89.0'
    const firefoxMacUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0'
    const firefoxLinuxUA = 'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0'
    expect(mod.detectBrowser(firefoxMobileUA)).toBe('Firefox')
    expect(mod.detectBrowser(firefoxMacUA)).toBe('Firefox')
    expect(mod.detectBrowser(firefoxLinuxUA)).toBe('Firefox')
  })
  test('detects Safari with different Safari UAs', () => {
    const safariMobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    const safariTabletUA = 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    const safariDesktopUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
    expect(mod.detectBrowser(safariMobileUA)).toBe('Safari')
    expect(mod.detectBrowser(safariTabletUA)).toBe('Safari')
    expect(mod.detectBrowser(safariDesktopUA)).toBe('Safari')
  })
  test('detects Edge with different Edge UAs', () => {
    const edgeOldUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
    const edgeNewUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
    const edgeMacUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
    expect(mod.detectBrowser(edgeOldUA)).toBe('Edge')
    expect(mod.detectBrowser(edgeNewUA)).toBe('Edge')
    expect(mod.detectBrowser(edgeMacUA)).toBe('Edge')
  })
  test('handles Chrome-based browsers correctly', () => {
    const braveUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    const operaUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.254'
    const vivaldiUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    expect(mod.detectBrowser(braveUA)).toBe('Chrome')
    expect(mod.detectBrowser(operaUA)).toBe('Chrome')
    expect(mod.detectBrowser(vivaldiUA)).toBe('Chrome')
  })
  test('handles Safari exclusions correctly', () => {
    const chromeIOSUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1'
    const firefoxIOSUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/35.0 Mobile/15E148 Safari/605.1.15'
    expect(mod.detectBrowser(chromeIOSUA)).toBe('Chrome')
    expect(mod.detectBrowser(firefoxIOSUA)).toBe('Firefox')
  })
  test('handles edge cases and malformed UAs', () => {
    expect(mod.detectBrowser('')).toBe('unknown')
    expect(mod.detectBrowser('chrome')).toBe('Chrome')
    expect(mod.detectBrowser('firefox')).toBe('Firefox')
    expect(mod.detectBrowser('safari')).toBe('Safari')
    expect(mod.detectBrowser('edg')).toBe('Edge')
    expect(mod.detectBrowser('CHROME')).toBe('Chrome')
    expect(mod.detectBrowser('FIREFOX')).toBe('Firefox')
    expect(mod.detectBrowser('SAFARI')).toBe('Safari')
    expect(mod.detectBrowser('EDG')).toBe('Edge')
  })
  test('handles mixed case user agents', () => {
    const mixedCaseChrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) CHROME/91.0.4472.124 Safari/537.36'
    const mixedCaseFirefox = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 FIREFOX/89.0'
    const mixedCaseSafari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 SAFARI/605.1.15'
    const mixedCaseEdge = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 EDG/91.0.864.64'
    expect(mod.detectBrowser(mixedCaseChrome)).toBe('Chrome')
    expect(mod.detectBrowser(mixedCaseFirefox)).toBe('Firefox')
    expect(mod.detectBrowser(mixedCaseSafari)).toBe('Safari')
    expect(mod.detectBrowser(mixedCaseEdge)).toBe('Edge')
  })
  test('handles browsers with version numbers', () => {
    const chromeWithVersion = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    const firefoxWithVersion = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
    const safariWithVersion = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
    const edgeWithVersion = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    expect(mod.detectBrowser(chromeWithVersion)).toBe('Chrome')
    expect(mod.detectBrowser(firefoxWithVersion)).toBe('Firefox')
    expect(mod.detectBrowser(safariWithVersion)).toBe('Safari')
    expect(mod.detectBrowser(edgeWithVersion)).toBe('Edge')
  })
})

describe('detectOS', () => {
  test('detects Android', () => {
    expect(mod.detectOS(androidUA)).toBe('Android')
  })
  test('detects iOS', () => {
    expect(mod.detectOS(iosUA)).toBe('iOS')
  })
  test('detects Windows', () => {
    expect(mod.detectOS(windowsUA)).toBe('Windows')
  })
  test('detects Mac', () => {
    expect(mod.detectOS(macUA)).toBe('Mac')
  })
  test('detects Linux', () => {
    expect(mod.detectOS(linuxUA)).toBe('Linux')
  })
  test('returns unknown for unknown', () => {
    expect(mod.detectOS('SomeRandomUA')).toBe('unknown')
  })
})

describe('isIos', () => {
  test('true for iOS', () => {
    expect(mod.isIos(iosUA)).toBe(true)
  })
  test('false for Android', () => {
    expect(mod.isIos(androidUA)).toBe(false)
  })
})

describe('isAndroid', () => {
  test('true for Android', () => {
    expect(mod.isAndroid(androidUA)).toBe(true)
  })
  test('false for iOS', () => {
    expect(mod.isAndroid(iosUA)).toBe(false)
  })
})

describe('isMac', () => {
  test('true for Mac', () => {
    expect(mod.isMac(macUA)).toBe(true)
  })
  test('false for Windows', () => {
    expect(mod.isMac(windowsUA)).toBe(false)
  })
})

describe('isWindows', () => {
  test('true for Windows', () => {
    expect(mod.isWindows(windowsUA)).toBe(true)
  })
  test('false for Mac', () => {
    expect(mod.isWindows(macUA)).toBe(false)
  })
})

describe('isLinux', () => {
  test('true for Linux', () => {
    expect(mod.isLinux(linuxUA)).toBe(true)
  })
  test('false for Windows', () => {
    expect(mod.isLinux(windowsUA)).toBe(false)
  })
})

describe('isChrome', () => {
  test('true for Chrome', () => {
    expect(mod.isChrome(chromeUA)).toBe(true)
  })
  test('false for Firefox', () => {
    expect(mod.isChrome(firefoxUA)).toBe(false)
  })
})

describe('isFirefox', () => {
  test('true for Firefox', () => {
    expect(mod.isFirefox(firefoxUA)).toBe(true)
  })
  test('false for Chrome', () => {
    expect(mod.isFirefox(chromeUA)).toBe(false)
  })
})

describe('isSafari', () => {
  test('true for Safari', () => {
    expect(mod.isSafari(safariUA)).toBe(true)
  })
  test('false for Chrome', () => {
    expect(mod.isSafari(chromeUA)).toBe(false)
  })
})

describe('isEdge', () => {
  test('true for Edge', () => {
    expect(mod.isEdge(edgeUA)).toBe(true)
  })
  test('false for Chrome', () => {
    expect(mod.isEdge(chromeUA)).toBe(false)
  })
})

describe('isMobile', () => {
  test('true for Mobile', () => {
    expect(mod.isMobile(mobileUA)).toBe(true)
  })
  test('false for Desktop', () => {
    expect(mod.isMobile(chromeUA)).toBe(false)
  })
})

describe('isTablet', () => {
  test('true for Tablet', () => {
    expect(mod.isTablet(tabletUA)).toBe(true)
  })
  test('false for Mobile', () => {
    expect(mod.isTablet(mobileUA)).toBe(false)
  })
})

describe('isDesktop', () => {
  test('true for Desktop', () => {
    expect(mod.isDesktop(chromeUA)).toBe(true)
  })
  test('false for Mobile', () => {
    expect(mod.isDesktop(mobileUA)).toBe(false)
  })
})

describe('isPortrait/isLandscape', () => {
  let win: { innerWidth: number, innerHeight: number }
  beforeEach(() => {
    win = { innerWidth: 600, innerHeight: 800 }
  })
  test('isPortrait true', () => {
    expect(mod.isPortrait(win)).toBe(true)
  })
  test('isLandscape false', () => {
    expect(mod.isLandscape(win)).toBe(false)
  })
  test('isLandscape true', () => {
    win = { innerWidth: 800, innerHeight: 600 }
    expect(mod.isLandscape(win)).toBe(true)
  })
})

describe('isBot/isHuman', () => {
  test('isBot true for bot', () => {
    expect(mod.isBot(botUA)).toBe(true)
  })
  test('isHuman false for bot', () => {
    expect(mod.isHuman(botUA)).toBe(false)
  })
  test('isBot false for human', () => {
    expect(mod.isBot(chromeUA)).toBe(false)
  })
  test('isHuman true for human', () => {
    expect(mod.isHuman(chromeUA)).toBe(true)
  })
})

describe('isDeveloper', () => {
  const originalEnv = process.env.NODE_ENV
  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })
  test('true when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    expect(mod.isDeveloper()).toBe(true)
  })
  test('false when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    expect(mod.isDeveloper()).toBe(false)
  })
})
