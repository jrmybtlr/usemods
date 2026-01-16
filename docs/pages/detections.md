# Detections

Client-side detections for various user and browser information. Perfect for personalisation, analytics or debugging weird and wonderful bugs. You will need to add a listeners for reactivity.

**Lead:** Listen to your clients

## Overview

The Detections module provides functions to detect various browser and user environment information. These utilities help you detect scroll position, mouse position, window size, color scheme, timezone, breakpoints, network status, and URL information.

## Functions

### `detectScrollPosition(): { x: number, y: number } | null`

Detect the current scroll position of the window.

**Returns:** Object with x and y scroll positions, or null if server-side

**Example:**
```typescript
import { detectScrollPosition } from 'usemods'

const position = detectScrollPosition()
// { x: 0, y: 150 }

// For reactivity, add a scroll listener
window.addEventListener('scroll', () => {
  const pos = detectScrollPosition()
  console.log('Scrolled to:', pos)
})
```

---

### `detectMousePosition(event: MouseEvent): { x: number, y: number } | null`

Detect the absolute mouse position with the page.

**Parameters:**
- `event` (MouseEvent): Mouse event from mousemove listener

**Returns:** Object with x and y page coordinates, or null if server-side

**Note:** Don't forget to add a mousemove event listener to the window

**Example:**
```typescript
import { detectMousePosition } from 'usemods'

window.addEventListener('mousemove', (event) => {
  const position = detectMousePosition(event)
  // { x: 500, y: 300 }
})
```

---

### `detectRelativeMousePosition(event: MouseEvent): { x: number, y: number } | null`

Detect the relative mouse position with the window size and returns a percentage value.

**Parameters:**
- `event` (MouseEvent): Mouse event from mousemove listener

**Returns:** Object with x and y as percentages (0-1), or null if server-side

**Note:** Don't forget to add a mousemove event listener to the window

**Example:**
```typescript
import { detectRelativeMousePosition } from 'usemods'

window.addEventListener('mousemove', (event) => {
  const position = detectRelativeMousePosition(event)
  // { x: 0.5, y: 0.3 } (50% from left, 30% from top)
})
```

---

### `detectWindowSize(): { width: number, height: number } | null`

Detect the browser's window size.

**Returns:** Object with width and height, or null if server-side

**Example:**
```typescript
import { detectWindowSize } from 'usemods'

const size = detectWindowSize()
// { width: 1920, height: 1080 }

// For reactivity, add a resize listener
window.addEventListener('resize', () => {
  const size = detectWindowSize()
  console.log('Window size:', size)
})
```

---

### `detectScreenSize(): { width: number, height: number } | null`

Detect the screen or monitor size.

**Returns:** Object with screen width and height, or null if server-side

**Example:**
```typescript
import { detectScreenSize } from 'usemods'

const screen = detectScreenSize()
// { width: 2560, height: 1440 }
```

---

### `detectActiveBrowser(): boolean`

Detect if the browser window is currently active or hidden.

**Returns:** true if active, false if hidden, or false if server-side

**Example:**
```typescript
import { detectActiveBrowser } from 'usemods'

const isActive = detectActiveBrowser() // true or false

// For reactivity, add visibility change listener
document.addEventListener('visibilitychange', () => {
  const isActive = detectActiveBrowser()
  console.log('Browser active:', isActive)
})
```

---

### `detectColorScheme(): string | null`

Detect the current color scheme (Light or Dark).

**Returns:** 'dark' or 'light', or null if server-side

**Example:**
```typescript
import { detectColorScheme } from 'usemods'

const scheme = detectColorScheme() // 'dark' or 'light'

// For reactivity, add a media query listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const scheme = detectColorScheme()
  console.log('Color scheme:', scheme)
})
```

---

### `detectUserTimezone(): string | null`

Detect the current user's Timezone.

**Returns:** Timezone string (e.g., 'America/New_York'), or null if server-side

**Example:**
```typescript
import { detectUserTimezone } from 'usemods'

const timezone = detectUserTimezone()
// 'America/New_York'
```

---

### `detectBreakpoint(): string | null`

Detect the current breakpoint based on Tailwind CSS breakpoints.

**Returns:** Breakpoint name ('xs', 'sm', 'md', 'lg', 'xl', '2xl'), or null if server-side

**Note:** Add a listener to the window resize event to detect changes

**Example:**
```typescript
import { detectBreakpoint } from 'usemods'

const breakpoint = detectBreakpoint()
// 'md', 'lg', etc.

// For reactivity
window.addEventListener('resize', () => {
  const bp = detectBreakpoint()
  console.log('Breakpoint:', bp)
})
```

**Breakpoints:**
- `xs`: < 640px
- `sm`: 640px - 767px
- `md`: 768px - 1023px
- `lg`: 1024px - 1279px
- `xl`: 1280px - 1535px
- `2xl`: >= 1536px

---

### `detectContainerBreakpoint(element: HTMLElement): string | null`

Detect any container breakpoint based on Tailwind CSS breakpoints.

**Parameters:**
- `element` (HTMLElement): Container element to measure

**Returns:** Container breakpoint name ('@xs', '@sm', etc.), or null if server-side

**Note:** Add a listener to the window resize event to detect changes

**Example:**
```typescript
import { detectContainerBreakpoint } from 'usemods'

const container = document.querySelector('.container')
const breakpoint = detectContainerBreakpoint(container)
// '@md', '@lg', etc.
```

**Container Breakpoints:**
- `@xs`: < 320px
- `@sm`: 320px - 383px
- `@md`: 384px - 447px
- `@lg`: 448px - 511px
- `@xl`: 512px - 575px
- `@2xl`: 576px - 671px
- `@3xl`: 672px - 767px
- `@4xl`: 768px - 895px
- `@5xl`: 896px - 1023px
- `@6xl`: 1024px - 1151px
- `@7xl`: >= 1152px

---

### `detectNetworkStatus(): string | null`

Detect the current network status of the user (Online or Offline).

**Returns:** 'Online' or 'Offline', or null if server-side

**Example:**
```typescript
import { detectNetworkStatus } from 'usemods'

const status = detectNetworkStatus() // 'Online' or 'Offline'

// For reactivity
window.addEventListener('online', () => {
  console.log('Online')
})
window.addEventListener('offline', () => {
  console.log('Offline')
})
```

---

### `detectUrl(): string | null`

Returns the current URL.

**Returns:** Full URL string, or null if server-side

**Example:**
```typescript
import { detectUrl } from 'usemods'

const url = detectUrl()
// 'https://example.com/page?query=value#hash'
```

---

### `detectUrlPath(format?: 'array' | 'string'): string[] | string | null`

Returns the path of the current URL as an array or string.

**Parameters:**
- `format` ('array' | 'string', optional): Output format. Defaults to `'array'`

**Returns:** Path as array or string, or null if server-side

**Example:**
```typescript
import { detectUrlPath } from 'usemods'

// URL: https://example.com/users/123/profile
detectUrlPath() // ['users', '123', 'profile']
detectUrlPath('string') // 'users/123/profile'
```

---

### `detectUrlParams(format?: 'string' | 'object'): ({ [key: string]: string }[] | string) | null`

Returns a value from the URL by name.

**Parameters:**
- `format` ('string' | 'object', optional): Output format. Defaults to `'string'`

**Returns:** Query string or array of objects, or null if server-side

**Example:**
```typescript
import { detectUrlParams } from 'usemods'

// URL: https://example.com?name=John&age=30
detectUrlParams() // [{ name: 'John' }, { age: '30' }]
detectUrlParams('string') // 'name=John&age=30'
```

---

### `detectUrlHash(): string | null`

Returns a value from the URL hash by name.

**Returns:** Hash value without '#', or null if server-side

**Example:**
```typescript
import { detectUrlHash } from 'usemods'

// URL: https://example.com#section1
detectUrlHash() // 'section1'
```

---

### `detectHost(): string | null`

Returns the current host or domain name from the URL.

**Returns:** Host string (e.g., 'example.com:8080'), or null if server-side

**Example:**
```typescript
import { detectHost } from 'usemods'

detectHost() // 'example.com:8080'
```

---

### `detectHostName(): string | null`

Returns the current hostname from the URL.

**Returns:** Hostname string (e.g., 'example.com'), or null if server-side

**Example:**
```typescript
import { detectHostName } from 'usemods'

detectHostName() // 'example.com'
```

---

### `detectPort(): string | null`

Returns the current port.

**Returns:** Port string, or empty string if default port, or null if server-side

**Example:**
```typescript
import { detectPort } from 'usemods'

detectPort() // '8080' or '' (if default port)
```

---

## Usage Examples

### Responsive Design with Breakpoints

```typescript
import { detectBreakpoint, detectContainerBreakpoint } from 'usemods'

// Window breakpoint
window.addEventListener('resize', () => {
  const bp = detectBreakpoint()
  if (bp === 'md' || bp === 'lg') {
    // Tablet/desktop layout
  } else {
    // Mobile layout
  }
})

// Container breakpoint
const container = document.querySelector('.sidebar')
window.addEventListener('resize', () => {
  const containerBp = detectContainerBreakpoint(container)
  // Adjust layout based on container size
})
```

### Scroll and Mouse Tracking

```typescript
import { detectScrollPosition, detectMousePosition, detectRelativeMousePosition } from 'usemods'

// Track scroll
window.addEventListener('scroll', () => {
  const scroll = detectScrollPosition()
  // Update UI based on scroll position
})

// Track mouse
window.addEventListener('mousemove', (event) => {
  const absolute = detectMousePosition(event)
  const relative = detectRelativeMousePosition(event)
  // Use for parallax effects, tooltips, etc.
})
```

### URL and Navigation

```typescript
import { detectUrl, detectUrlPath, detectUrlParams, detectUrlHash } from 'usemods'

// Get current URL components
const url = detectUrl()
const path = detectUrlPath() // ['users', '123']
const params = detectUrlParams() // [{ id: '123' }]
const hash = detectUrlHash() // 'section1'

// Use for routing, analytics, etc.
```

### Environment Detection

```typescript
import { detectColorScheme, detectUserTimezone, detectNetworkStatus } from 'usemods'

// Color scheme
const scheme = detectColorScheme()
if (scheme === 'dark') {
  // Apply dark theme
}

// Timezone
const tz = detectUserTimezone()
// Use for date formatting

// Network status
const network = detectNetworkStatus()
if (network === 'Offline') {
  // Show offline message
}
```

---

## Notes

- All functions return `null` in server-side environments
- For reactivity, you need to add appropriate event listeners
- Breakpoint detection uses Tailwind CSS default breakpoints
- Container breakpoints use Tailwind's container query breakpoints
- URL detection functions work with the current browser URL
- Mouse position functions require a MouseEvent from a mousemove listener
- Network status can change, so use online/offline event listeners for reactivity
