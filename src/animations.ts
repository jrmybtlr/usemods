// title: Animators
// description: Pixar without the budget or talent. Watch this page, there's more opinionated animations coming soon.
// lead: Ruthlessly animate everything

/**
 * Animate text by wrapping each character in a span with a delay.
 */
export function animateText(
  text: string,
  options: {
    splitBy?: 'word' | 'character'
    time?: number
    unit?: 'ms' | 's'
    class?: string
  } = {},
): string {
  if (!text) return ''

  const { splitBy = 'character', time = 0.1, unit = 's', class: cssClass = '' } = options
  const validUnits = ['ms', 's']
  if (!validUnits.includes(unit)) throw new Error(`[MODS] Invalid animation unit: ${unit}`)

  const delimiter = splitBy === 'word' ? ' ' : ''
  const elements = text.split(delimiter)

  const result = elements.map((element, index) => {
    const delay = `${index * time}${unit}`
    const translateStyle = `position: absolute; top: 0; left: 0; animation-delay: ${delay};`

    if (element === ' ' && splitBy === 'character') {
      return '<span class="space" style="white-space: pre;"> </span>'
    }
    else {
      return `<span style="display: inline-block; position: relative; overflow: clip; margin-right: -0.5rem; margin-left: -0.5rem; padding-right: 0.5rem; padding-left: 0.5rem;">
                <span class="ghost" style="visibility: hidden;" aria-hidden="true">${element}</span>
                <span class="translate ${cssClass}" style="${translateStyle}" aria-label="${element}">${element}</span>
              </span>`
    }
  })

  return splitBy === 'word' ? result.join(' ') : result.join('')
}

/**
 * Animate a group of elements by wrapping each in a span with an incremental delay.
 */
// export function animateGroup(element: HTMLElement, options?: { time?: number; unit?: 'ms' | 's' }): void {
//   const settings = {
//     time: options?.time || 0.1,
//     unit: options?.unit || 's'
//   }

//   let currentDelay = 0
//   const elements = element.children

//   Array.from(elements).forEach((child: Element) => {
//     ;(child as HTMLElement).style.animationDelay = `${currentDelay}${settings.unit}`
//     currentDelay += settings.time
//   })
// }
