import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectBreakpoint } from 'usemods'

/**
 * Reactive Tailwind breakpoint (`xs`–`2xl`). Updates on `resize`.
 * SSR-safe: starts as `null` until mounted.
 */
export function useBreakpoint(): Readonly<Ref<string | null>> {
  const breakpoint = ref<string | null>(null)

  const update = (): void => {
    breakpoint.value = detectBreakpoint()
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return readonly(breakpoint)
}
