// title: Actions
// description: A stack of handy functions you could write yourself, but don't want to.
// lead: JS karate chops

/**
 * Runs a function only if there are no new calls during the delay
 */
export function debounce<T extends (
  ...args: unknown[]) => unknown>(
  func: T,
  delay: number,
  { leading = false, trailing = true }:
  { leading?: boolean, trailing?: boolean } = {},
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const shouldCallNow = leading && !timer
    lastArgs = args

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (trailing && lastArgs) {
        func.apply(this, lastArgs)
      }
      lastArgs = null
    }, delay)

    if (shouldCallNow) {
      func.apply(this, args)
    }
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
    lastArgs = null
  }

  return debounced
}

/**
 * Throttles a function to ensure it only runs once per threshold
 */
export function throttle<T extends (
  ...args: unknown[]) => void>(
  fn: T,
  threshold: number,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let lastRun = 0
  let timeout: ReturnType<typeof setTimeout> | null = null

  const throttledFn = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = performance.now()
    const remaining = threshold - (now - lastRun)

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastRun = now
      fn.apply(this, args)
    }
    else if (!timeout) {
      timeout = setTimeout(() => {
        lastRun = performance.now()
        timeout = null
        fn.apply(this, args)
      }, remaining)
    }
  }

  // Cancel any pending trailing execution
  throttledFn.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastRun = 0
  }

  return throttledFn
}

/**
 * Smoothly scrolls to the element with the specified ID without scuffing up your URLs.
 */
export async function scrollToAnchor(
  id: string,
): Promise<void> {
  await new Promise<void>(resolve => setTimeout(resolve, 180))

  const element = document.querySelector(`#${id}`)
  if (!element) {
    console.warn(`[MODS] Element with id '${id}' not found.`)
    throw `Element with id '${id}' not found.`
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

/**
 * Toggles the body scroll with specified class names and returns a promise
 * @info Use your own class names, or ensure fixed is within your Tailwindcss JIT
 */
export async function toggleBodyScroll(
  className: string = 'fixed',
  action: 'add' | 'remove' | 'toggle' = 'toggle',
): Promise<void> {
  try {
    const body = document.body
    const isFixed = body.classList.contains(className)
    const scrollY = isFixed ? parseInt(body.style.top, 10) : window.scrollY

    body.style.top = isFixed ? '' : `-${scrollY}px`

    if (action === 'add') {
      body.classList.add(className)
    }
    else if (action === 'remove') {
      body.classList.remove(className)
    }
    else {
      body.classList.toggle(className)
    }

    if (isFixed) window.scrollTo(0, -scrollY)
  }
  catch (error) {
    console.warn('[MODS] Failed to toggle body scroll.')
    throw error
  }
}

/**
 * Toggles the element scroll with specified class names and returns a promise
 */
export async function toggleElementScroll(
  element: HTMLElement,
): Promise<void> {
  if (!element) {
    console.warn('[MODS] Element is required to toggle scroll.')
    return
  }

  if (element.dataset.isScrollLocked === 'true') {
    element.style.overflow = ''
    delete element.dataset.isScrollLocked
  }
  else {
    element.style.overflow = 'hidden'
    element.dataset.isScrollLocked = 'true'
  }
}

/**
 * Copies a convereted string to the clipboard
 */
export async function copyToClipboard(
  value: string | number,
): Promise<void> {
  try {
    await navigator.clipboard.writeText(String(value))
  }
  catch (error) {
    console.error('[MODS] Failed to copy text: ', error)
    throw error
  }
}

/**
 * Toggles the fullscreen mode
 */
export function toggleFullScreen(): Promise<void> {
  return document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen()
}

/**
 * Resets a form to its initial state
 */
export async function resetForm(
  form: HTMLFormElement,
): Promise<void> {
  form.reset()
}

/**
 * Focuses on and scrolls to the first invalid input, select, or textarea element within a form.
 */
export async function focusOnInvalid(
  container: HTMLElement,
): Promise<void> {
  const input = container.querySelector('input:invalid, select:invalid, textarea:invalid') as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  if (input) {
    input.focus()
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

/**
 * Focuses on the nth element within the specified form, where 0 is the first element and -1 is the last element.
 */
export async function focusOnNth(
  container: HTMLElement,
  index: number = 0,
): Promise<void> {
  const elements = Array.from(
    container.querySelectorAll('input, textarea, select'),
  ) as HTMLElement[]

  if (elements.length === 0) {
    throw new Error('[MODS] No focusable elements found in container.')
  }

  const numericIndex = Number(index)
  if (Number.isNaN(numericIndex)) {
    throw new Error(`Invalid index: ${index}. Index must be a number.`)
  }

  // Only treat -1 as "last"; do not pass other negatives to .at() (would change API semantics)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
  const element = numericIndex === -1 ? elements.at(-1) : elements[numericIndex]
  if (!element) {
    throw new Error(`Element at index ${index} is out of bounds.`)
  }
  if (!element.focus) {
    throw new Error('[MODS] Failed to focus on the element.')
  }

  try {
    element.focus({ preventScroll: true })
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  catch (error) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
    throw new Error('[MODS] Failed to focus on the element.', { cause: error })
  }
}

/**
 * Sets up a keyboard trap within an HTML element, allowing the focus to cycle between the first and last focusable elements when the Tab key is pressed.
 */
export function focusTrap(
  container: HTMLElement,
): void {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
  const focusableElements = Array.from(
    container.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'),
  ) as HTMLElement[]
  const firstFocusableElement = focusableElements.at(0)
  const lastFocusableElement = focusableElements.at(-1)

  if (!firstFocusableElement || !lastFocusableElement) return

  container.addEventListener('keydown', (event) => {
    const isTabPressed = event.key === 'Tab'
    if (!isTabPressed) return

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        event.preventDefault()
      }
    }
    else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        event.preventDefault()
      }
    }
  })
}
