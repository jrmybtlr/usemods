// title: Detections
// description: Client-side detections for various user and browser information. Perfect for personalisation, analytics or debugging weird and wonderful bugs. You will need to add a listeners for reactivity.
// lead: Listen to your clients

/**
 * Detect the current scroll position of the window
 */
export function detectScrollPosition(): { x: number, y: number } | null {
  if (typeof window === 'undefined') return null
  return {
    x: window.scrollX,
    y: window.scrollY,
  }
}

/**
 * Detect the absolute mouse position with the page
 * @info Don't forget to add a mousemove event listener to the window
 */
export function detectMousePosition(event: MouseEvent): { x: number, y: number } | null {
  if (typeof window === 'undefined') return null
  return {
    x: event.pageX,
    y: event.pageY,
  }
}

/**
 * Detect the relative mouse position with the window size and returns a percentage value
 * @info Don't forget to add a mousemove event listener to the window
 */
export function detectRelativeMousePosition(event: MouseEvent): {
  x: number
  y: number
} | null {
  if (typeof window === 'undefined') return null
  const { innerWidth, innerHeight } = window
  return {
    x: parseFloat((event.clientX / innerWidth).toFixed(2)),
    y: parseFloat((event.clientY / innerHeight).toFixed(2)),
  }
}

/**
 * Detect the browser's window size
 */
export function detectWindowSize(): { width: number, height: number } | null {
  if (typeof window === 'undefined') return null
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/**
 * Detect the screen or monitor size
 */
export function detectScreenSize(): { width: number, height: number } | null {
  if (typeof window === 'undefined') return null
  return {
    width: window.screen.width,
    height: window.screen.height,
  }
}

/**
 * Detect if the browser window is currently active or hidden.
 */
export function detectActiveBrowser(): boolean {
  if (typeof window === 'undefined') return false
  return !document.hidden
}

/**
 * Detect the current color scheme (Light or Dark)
 */
export function detectColorScheme(): string | null {
  if (typeof window === 'undefined') return null
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Detect the current user's Timezone
 */
export function detectUserTimezone(): string | null {
  if (typeof window === 'undefined') return null
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Detect the current breakpoint based on Tailwind CSS breakpoints
 * @info Add a listener to the window resize event to detect changes
 */
export function detectBreakpoint(): string | null {
  if (typeof window === 'undefined') return null
  const width = window.innerWidth
  if (width < 640) return 'xs'
  if (width < 768) return 'sm'
  if (width < 1024) return 'md'
  if (width < 1280) return 'lg'
  if (width < 1536) return 'xl'
  return '2xl'
}

/**
 * Detect any container breakpoint based on Tailwind CSS breakpoints
  * @info Add a listener to the window resize event to detect changes
 */
export function detectContainerBreakpoint(element: HTMLElement): string | null {
  if (typeof window === 'undefined') return null
  if (!element || !(element instanceof HTMLElement)) {
    console.log('element is not an instance of HTMLElement')
    return null
  }

  const width = element.getBoundingClientRect().width

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
export function detectNetworkStatus(): string | null {
  if (typeof window === 'undefined') return null
  return navigator.onLine ? 'Online' : 'Offline'
}

/**
 * Returns the current URL
 */
export function detectUrl(): string | null {
  if (typeof window === 'undefined') return null
  return window.location.href
}

/**
 * Returns the path of the current URL as an array or string
 */
export function detectUrlPath(format: 'array' | 'string' = 'array'): string[] | string | null {
  if (typeof window === 'undefined') return null
  const pathArray = window.location.pathname.split('/').filter(p => p)
  return format === 'string' ? pathArray.join('/') : pathArray
}

/**
 * Returns a value from the URL by name
 */
export function detectUrlParams(format: 'string' | 'object' = 'string'): ({ [key: string]: string }[] | string) | null {
  if (typeof window === 'undefined') return null
  const searchParams = new URLSearchParams(window.location.search)
  if (format === 'string') return searchParams.toString()

  const paramsArray = []

  for (const [key, value] of searchParams.entries()) {
    paramsArray.push({ [key]: value })
  }

  return paramsArray.length > 0 ? paramsArray : null
}

/**
 * Returns a value from the URL hash by name
 */
export function detectUrlHash(): string | null {
  if (typeof window === 'undefined') return null
  return window.location.hash.replace('#', '')
}

/**
 * Returns the current host or domain name from the URL
 */
export function detectHost(): string | null {
  if (typeof window === 'undefined') return null
  return window.location.host
}

/**
 * Returns the current hostname from the URL
 */
export function detectHostName(): string | null {
  if (typeof window === 'undefined') return null
  return window.location.hostname
}

/**
 * Returns the current port
 */
export function detectPort(): string | null {
  if (typeof window === 'undefined') return null
  return window.location.port
}
