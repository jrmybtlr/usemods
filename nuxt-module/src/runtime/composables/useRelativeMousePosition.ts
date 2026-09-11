import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectRelativeMousePosition } from 'usemods'
import { createAnimationFrameScheduler } from '../createAnimationFrameScheduler'

/**
 * Reactive mouse position as a fraction of the viewport (0–1).
 * Updates on `mousemove`, coalesced to animation frames.
 * SSR-safe: starts as `null` until the first mouse move.
 */
export function useRelativeMousePosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)
  const raf = createAnimationFrameScheduler()

  const onMove = (event: MouseEvent): void => {
    raf.schedule(() => {
      position.value = detectRelativeMousePosition(event)
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
