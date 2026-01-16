# Actions

A stack of handy functions you could write yourself, but don't want to.

**Lead:** JS karate chops

## Overview

The Actions module provides utility functions for common browser interactions, form handling, scrolling, and function control (debounce/throttle). These functions are designed to work seamlessly in both client-side and server-side environments where applicable.

## Functions

### `scrollToAnchor(id: string): Promise<void>`

Smoothly scrolls to the element with the specified ID without scuffing up your URLs.

**Parameters:**
- `id` (string): The ID of the element to scroll to (without the `#` prefix)

**Returns:** Promise that resolves when scrolling is complete

**Example:**
```typescript
import { scrollToAnchor } from 'usemods'

await scrollToAnchor('section-1')
```

---

### `toggleBodyScroll(className?: string, action?: 'add' | 'remove' | 'toggle'): Promise<void>`

Toggles the body scroll with specified class names and returns a promise.

**Parameters:**
- `className` (string, optional): CSS class name to apply. Defaults to `'fixed'`
- `action` ('add' | 'remove' | 'toggle', optional): Action to perform. Defaults to `'toggle'`

**Returns:** Promise that resolves when the action is complete

**Note:** Use your own class names, or ensure fixed is within your Tailwindcss JIT

**Example:**
```typescript
import { toggleBodyScroll } from 'usemods'

// Toggle scroll lock
await toggleBodyScroll()

// Add scroll lock
await toggleBodyScroll('fixed', 'add')

// Remove scroll lock
await toggleBodyScroll('fixed', 'remove')
```

---

### `toggleElementScroll(element: HTMLElement): Promise<void>`

Toggles the element scroll with specified class names and returns a promise.

**Parameters:**
- `element` (HTMLElement): The HTML element to toggle scroll for

**Returns:** Promise that resolves when the action is complete

**Example:**
```typescript
import { toggleElementScroll } from 'usemods'

const modal = document.querySelector('.modal')
await toggleElementScroll(modal)
```

---

### `copyToClipboard(value: string | number): Promise<void>`

Copies a converted string to the clipboard.

**Parameters:**
- `value` (string | number): The value to copy to clipboard

**Returns:** Promise that resolves when copy is complete, rejects on error

**Example:**
```typescript
import { copyToClipboard } from 'usemods'

await copyToClipboard('Hello, world!')
await copyToClipboard(12345)
```

---

### `toggleFullScreen(): Promise<void>`

Toggles the fullscreen mode.

**Returns:** Promise that resolves when fullscreen toggle is complete

**Example:**
```typescript
import { toggleFullScreen } from 'usemods'

await toggleFullScreen()
```

---

### `resetForm(form: HTMLFormElement): Promise<void>`

Resets a form to its initial state.

**Parameters:**
- `form` (HTMLFormElement): The form element to reset

**Returns:** Promise that resolves when form is reset

**Example:**
```typescript
import { resetForm } from 'usemods'

const form = document.querySelector('form')
await resetForm(form)
```

---

### `focusOnInvalid(container: HTMLElement): Promise<void>`

Focuses on and scrolls to the first invalid input, select, or textarea element within a form.

**Parameters:**
- `container` (HTMLElement): The container element (usually a form) to search for invalid elements

**Returns:** Promise that resolves when focus is set

**Example:**
```typescript
import { focusOnInvalid } from 'usemods'

const form = document.querySelector('form')
await focusOnInvalid(form)
```

---

### `focusOnNth(container: HTMLElement, index?: number): Promise<void>`

Focuses on the nth element within the specified form, where 0 is the first element and -1 is the last element.

**Parameters:**
- `container` (HTMLElement): The container element to search for focusable elements
- `index` (number, optional): Index of the element to focus. 0 is first, -1 is last. Defaults to `0`

**Returns:** Promise that resolves when focus is set, rejects if index is out of bounds

**Example:**
```typescript
import { focusOnNth } from 'usemods'

const form = document.querySelector('form')
await focusOnNth(form, 0)  // Focus first element
await focusOnNth(form, -1) // Focus last element
```

---

### `focusTrap(container: HTMLElement): void`

Sets up a keyboard trap within an HTML element, allowing the focus to cycle between the first and last focusable elements when the Tab key is pressed.

**Parameters:**
- `container` (HTMLElement): The container element to trap focus within

**Returns:** void

**Example:**
```typescript
import { focusTrap } from 'usemods'

const modal = document.querySelector('.modal')
focusTrap(modal)
```

---

### `debounce<T extends (...args: unknown[]) => unknown>(func: T, delay: number, options?: { leading?: boolean, trailing?: boolean }): ((...args: Parameters<T>) => void) & { cancel: () => void }`

Runs a function only if there are no new calls during the delay.

**Parameters:**
- `func` (T): The function to debounce
- `delay` (number): Delay in milliseconds
- `options` (object, optional):
  - `leading` (boolean, optional): Execute on the leading edge. Defaults to `false`
  - `trailing` (boolean, optional): Execute on the trailing edge. Defaults to `true`

**Returns:** Debounced function with a `cancel()` method

**Example:**
```typescript
import { debounce } from 'usemods'

const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query)
}, 300)

debouncedSearch('hello')
debouncedSearch('world') // Only this will execute after 300ms

// Cancel pending execution
debouncedSearch.cancel()
```

---

### `throttle<T extends (...args: unknown[]) => void>(fn: T, threshold: number): ((...args: Parameters<T>) => void) & { cancel: () => void }`

Throttles a function to ensure it only runs once per threshold.

**Parameters:**
- `fn` (T): The function to throttle
- `threshold` (number): Time threshold in milliseconds

**Returns:** Throttled function with a `cancel()` method

**Example:**
```typescript
import { throttle } from 'usemods'

const throttledScroll = throttle(() => {
  console.log('Scrolled!')
}, 100)

window.addEventListener('scroll', throttledScroll)

// Cancel pending execution
throttledScroll.cancel()
```

---

## Usage Examples

### Complete Form Handling Example

```typescript
import { resetForm, focusOnInvalid, focusOnNth } from 'usemods'

const form = document.querySelector('form')

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  if (!form.checkValidity()) {
    await focusOnInvalid(form)
    return
  }
  
  // Process form...
  
  // Reset after successful submission
  await resetForm(form)
  await focusOnNth(form, 0) // Focus first field
})
```

### Modal with Scroll Lock and Focus Trap

```typescript
import { toggleBodyScroll, focusTrap, toggleFullScreen } from 'usemods'

const modal = document.querySelector('.modal')
const openButton = document.querySelector('.open-modal')

openButton.addEventListener('click', async () => {
  modal.style.display = 'block'
  await toggleBodyScroll('fixed', 'add')
  focusTrap(modal)
})

const closeButton = modal.querySelector('.close')
closeButton.addEventListener('click', async () => {
  modal.style.display = 'none'
  await toggleBodyScroll('fixed', 'remove')
})
```

### Debounced Search Input

```typescript
import { debounce } from 'usemods'

const searchInput = document.querySelector('input[type="search"]')
const resultsDiv = document.querySelector('.results')

const performSearch = debounce(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`).then(r => r.json())
  resultsDiv.innerHTML = results.map(r => `<div>${r.title}</div>`).join('')
}, 300)

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value)
})
```

---

## Notes

- All functions that interact with the DOM require a browser environment
- Functions return Promises for better async/await support
- The `debounce` and `throttle` functions include a `cancel()` method to cancel pending executions
- `focusTrap` automatically handles Tab and Shift+Tab key navigation
- `scrollToAnchor` includes a small delay (180ms) to ensure smooth scrolling
