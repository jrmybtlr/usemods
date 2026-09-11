import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectMousePosition } from 'usemods'
import { createAnimationFrameScheduler } from '../createAnimationFrameScheduler'

/**
 * Reactive absolute mouse position (page coordinates).
 * Updates on `mousemove`, coalesced to animation frames.
 * SSR-safe: starts as `null` until the first mouse move (or stays null on SSR).
 */
export function useMousePosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)
  const raf = createAnimationFrameScheduler()

  const onMove = (event: MouseEvent): void => {
    raf.schedule(() => {
      position.value = detectMousePosition(event)
    })
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
  })

  onUnmounted(() => {
    raf.cancel()
    window.removeEventListener('mousemove', onMove)
  })

  return readonly(position)
}
