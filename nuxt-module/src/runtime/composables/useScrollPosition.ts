import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectScrollPosition } from 'usemods'

/**
 * Reactive scroll position. Updates on window `scroll`.
 * SSR-safe: starts as `null` until mounted.
 */
export function useScrollPosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)

  const update = (): void => {
    position.value = detectScrollPosition()
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return readonly(position)
}
