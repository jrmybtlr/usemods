import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectWindowSize } from 'usemods'

/**
 * Reactive browser window size. Updates on `resize`.
 * SSR-safe: starts as `null` until mounted.
 */
export function useWindowSize(): Readonly<Ref<{ width: number, height: number } | null>> {
  const size = ref<{ width: number, height: number } | null>(null)

  const update = (): void => {
    size.value = detectWindowSize()
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return readonly(size)
}
