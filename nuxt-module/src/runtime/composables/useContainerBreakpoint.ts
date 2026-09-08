import {
  readonly,
  ref,
  watch,
  onMounted,
  onUnmounted,
  toValue,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'
import { detectContainerBreakpoint } from 'usemods'

/**
 * Reactive container breakpoint (`@xs`–`@7xl`) for an element.
 * Updates on window `resize` and via `ResizeObserver` when available.
 * SSR-safe: starts as `null` until an element is available client-side.
 */
export function useContainerBreakpoint(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
): Readonly<Ref<string | null>> {
  const breakpoint = ref<string | null>(null)
  let observer: ResizeObserver | null = null
  let observed: HTMLElement | null = null

  const update = (): void => {
    const el = toValue(target)
    breakpoint.value = el ? detectContainerBreakpoint(el) : null
  }

  const disconnectObserver = (): void => {
    if (observer && observed) {
      observer.unobserve(observed)
    }
    observer?.disconnect()
    observer = null
    observed = null
  }

  const observe = (el: HTMLElement | null | undefined): void => {
    disconnectObserver()
    if (!el || typeof ResizeObserver === 'undefined') return
    observed = el
    observer = new ResizeObserver(() => {
      update()
    })
    observer.observe(el)
  }

  onMounted(() => {
    update()
    observe(toValue(target))
    window.addEventListener('resize', update, { passive: true })
  })

  watch(
    () => toValue(target),
    (el) => {
      update()
      observe(el)
    },
  )

  onUnmounted(() => {
    window.removeEventListener('resize', update)
    disconnectObserver()
  })

  return readonly(breakpoint)
}
