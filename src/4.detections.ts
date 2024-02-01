// title: Detections
// description: A collection of detections for common data types

import { formatDurationLabels } from './2.formatters'

/**
 * Detect the current device type (Mobile or Desktop)
 */
export function detectDevice(): string {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
}

/**
 * Detect the current operating system
 */
export function detectOS(): string {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('win')) return 'Windows'
  if (userAgent.includes('mac')) return 'Mac'
  if (userAgent.includes('linux')) return 'Linux'
  if (userAgent.includes('x11')) return 'UNIX'
  return 'Unknown'
}

/**
 * Detect if the browser window is currently active or hidden.
 */
export function detectActiveBrowser(): boolean {
  return !document.hidden
}

/**
 * Detect the current color scheme (Light or Dark)
 */
export function detectColorScheme(): string {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Detect the current user's Timezone
 */
export function detectUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Detect the currect device orientation
 */
export function detectDeviceOrientation(): string {
  return window.screen.orientation.type
}

/**
 * Detect the browser's window size
 */
export function detectWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

/**
 * Detect the screen or monitor size
 */
export function detectScreenSize(): { width: number; height: number } {
  return {
    width: window.screen.width,
    height: window.screen.height
  }
}

/**
 * Detect the container size via ID
 */
export function detectContainerSize(id: string): { width: number; height: number } {
  const element = document.getElementById(id)
  if (!element) return { width: 0, height: 0 }
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  }
}

/**
 * Detect the current breakpoint based on Tailwind CSS breakpoints
 */
export function detectTailwindBreakpoint(): string {
  const width = window.innerWidth
  if (width < 640) return 'xs'
  if (width < 768) return 'sm'
  if (width < 1024) return 'md'
  if (width < 1280) return 'lg'
  if (width < 1536) return 'xl'
  return '2xl'
}

/**
 * Detect the current container breakpoint based on Tailwind CSS breakpoints
 */
export function detectTailwindContainerBreakpoint(id: string): string {
  const width = detectContainerSize(id).width
  if (width < 320) return '@xs'
  if (width < 384) return '@sm'
  if (width < 448) return '@md'
  if (width < 512) return '@lg'
  if (width < 576) return '@xl'
  if (width < 672) return '@2xl'
  if (width < 768) return '@3xl'
  if (width < 896) return '@4xl'
  if (width < 1024) return '@5xl'
  if (width < 1152) return '@6xl'
  if (width < 1280) return '@7xl'
  return '@7xl'
}

/**
 * Detect the current network status of the user (Online or Offline)
 */
export function detectNetworkStatus(): string {
  return navigator.onLine ? 'Online' : 'Offline'
}

/**
 * Returns a value from the URL by name
 */
export function detectUrlParameters(url: string, param?: string): string | null {
  const params = (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a: any, v: any) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {})
  if (param) return params[param] || null
  return params
}

/**
 * Returns a value from the URL hash by name
 */
export function detectURLHashParameters(): string {
  return detectUrlParameters(window.location.hash)
}

/**
 */
export function detectURLSearchParameters(): string {
  return detectUrlParameters(window.location.search) ?? ''
}

/**
 * Returns the current URL
 */
export function detectURL(): string {
  return window.location.href
}

/**
 * Returns the current domain
 */
export function detectDomain(): string {
  return window.location.hostname
}

/**
 * Returns the current IP address
 */
export function detectIP(): string {
  return window.location.host
}

/**
 * Returns the current port
 */
export function detectPort(): string {
  return window.location.port
}

/**
 * Returns the current protocol (HTTP or HTTPS)
 */
export function detectProtocol(): string {
  return window.location.protocol
}

/**
 * Returns the URL of the referring page (the page that linked to the current page)
 */
export function detectReferrer(): string {
  return document.referrer
}

/**
 *  Retrieves cached entries and optionally filters the entries based on a provided key
 */
export function detectCachedData(key?: string): PerformanceEntry[] {
  const cachedData = window.performance.getEntriesByType('resource')
  if (key) return cachedData.filter((data) => data.name.includes(key))
  return cachedData
}

/**
 * Detects if the element is currently in the viewport
 */
export function detectInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Detects if the element is currently in the container via ID
 */
export function detectInContainer(element: HTMLElement, id: string): boolean {
  const rect = element.getBoundingClientRect()
  const container = document.getElementById(id)
  if (!container) return false
  const containerRect = container.getBoundingClientRect()
  return rect.top >= containerRect.top && rect.left >= containerRect.left && rect.bottom <= containerRect.bottom && rect.right <= containerRect.right
}

/**
 * Detects if the element is overflowing vertically
 */
export function detectOverflowingY(element: HTMLElement): boolean {
  return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight
}

/**
 * Detects if the element is overflowing horizontally
 */
export function detectOverflowingX(element: HTMLElement): boolean {
  return element.scrollWidth > element.clientWidth
}

/**
 * Detects if the element is scrollable (overflowing vertically or horizontally)
 */
export function detectScrollable(element: HTMLElement): boolean {
  return detectOverflowingY(element) || detectOverflowingX(element)
}

/**
 * Detects if the elements is an HTML element
 */
export function detectElement(element: HTMLElement): boolean {
  return element instanceof HTMLElement
}

/**
 * Returns the reading time of a string in Hours, Minutes, and Seconds.
 */
export function detectReadingTime(text: string, wordsPerMinute = 200): string {
  const words = text.split(' ').length
  const minutes = words / wordsPerMinute
  return formatDurationLabels(Math.ceil(minutes))
}

// /**
//  * Detect the current memory status of the user (RAM)
//  */
// export function detectMemoryStatus(): { totalJSHeapSize: number; usedJSHeapSize: number; jsHeapSizeLimit: number } {
//   return {
//     totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
//     usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
//     jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
//   }
// }

// /**
//  * Returns a cookie value by name
//  */
// export function detectCookie(name: string) {
//   const value = '; ' + document.cookie
//   const parts = value.split('; ' + name + '=')
//   if (parts.length === 2) return parts.pop()?.split(';').shift()
// }

// /**
//  * Returns a local storage value by name and parses it into JSON
//  */
// export function detectLocalStorage(name: string): any {
//   const item = localStorage.getItem(name)
//   if (item) return JSON.parse(item)
// }

// /**
//  * Returns a session storage value by name and parses it into JSON
//  */
// export function detectSessionStorage(name: string) {
//   const item = sessionStorage.getItem(name)
//   if (item) return JSON.parse(item)
// }

// /**
//  * Detect the current scroll position of the window
//  */
// export function detectScrollPosition(): { x: number; y: number } {
//   return {
//     x: window.scrollX,
//     y: window.scrollY
//   }
// }

// /**
//  * Detect the current mouse position within the window
//  */
// export function detectMousePosition(event: MouseEvent): { x: number; y: number } {
//   return {
//     x: event.pageX,
//     y: event.pageY
//   }
// }

// /**
//  * Detect the current mouse position within a container via ID
//  */
// export function detectRelativeMousePosition(id: string, event: MouseEvent): { x: number; y: number } {
//   const element = document.getElementById(id)
//   if (!element) return { x: 0, y: 0 }
//   const rect = element.getBoundingClientRect()
//   return {
//     x: event.clientX - rect.left,
//     y: event.clientY - rect.top
//   }
// }
