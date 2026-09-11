/**
 * Coalesce callbacks to at most once per animation frame.
 * The most recently scheduled callback runs; earlier ones in the same frame are dropped.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
 */
export function createAnimationFrameScheduler(): {
  readonly schedule: (callback: () => void) => void
  readonly cancel: () => void
} {
  let frameId: number | null = null
  let pending: (() => void) | null = null

  const schedule = (callback: () => void): void => {
    pending = callback
    if (frameId !== null) return

    frameId = requestAnimationFrame(() => {
      frameId = null
      const run = pending
      pending = null
      run?.()
    })
  }

  const cancel = (): void => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    pending = null
  }

  return { schedule, cancel }
}
