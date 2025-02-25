// title: Goodies
// description: A collection neat little functions that don't belong anywhere else.
// lead: A growing pile of treats.

import { formatDurationLabels } from './formatters'

/**
 * Wraps each word, sentence or paragraph in a string with a tag.
 * @info Don't forget to render the HTML safely.
 */
export function splitByWords(text: string): string {
  if (!text) {
    console.warn('[MODS] Warning: No text to split')
    return ''
  }
  const sentences = text.split(/([.?!]+\s*)/)

  let wordIndex = 0
  const combinedSentences = []

  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = `${sentences[i]}${sentences[i + 1] || ''}`

    if (sentence.trim() === '') continue

    const words = sentence
      .split(' ')
      .map((word) => {
        wordIndex++
        return `<span class="word word-${wordIndex}">${word}</span>`
      })
      .join(' ')

    combinedSentences.push(`<span class="sentence sentence-${combinedSentences.length + 1}">${words}</span>`)
  }

  return combinedSentences.join('')
}

/**
 * Check the strength of a password against a given policy.
 * @info Don't forget to use our Password Generator in the Generators section
 */
export function checkPasswordStrength(text: string, options: { length?: number, uppercase?: number, number?: number, special?: number } = {}): object {
  if (!text) {
    console.warn('[MODS] Warning: No password to check')
    return { score: 0, label: 'Very Weak' }
  }
  const { length = 8, uppercase = 1, number = 1, special = 1 } = options
  let strength = 0

  const counts = {
    uppercase: (text.match(/[A-Z]/g) || []).length,
    numbers: (text.match(/[0-9]/g) || []).length,
    special: (text.match(/[^a-zA-Z0-9]/g) || []).length,
  }

  if (text.length < length) return { score: 1, label: `Password must be at least ${length} characters long` }
  if (counts.uppercase < uppercase) return { score: 1, label: `Password must contain ${uppercase} uppercase letter` }
  if (counts.numbers < number) return { score: 1, label: `Password must contain ${number} number` }
  if (counts.special < special) return { score: 1, label: `Password must contain ${special} special character` }

  strength += text.length >= 8 ? 1 : 0
  strength += counts.uppercase >= 1 ? 1 : 0
  strength += counts.numbers >= 1 ? 1 : 0
  strength += counts.special >= 1 ? 1 : 0

  switch (strength) {
    case 4:
      return { score: 4, label: 'Very Strong' }
    case 3:
      return { score: 3, label: 'Strong' }
    case 2:
      return { score: 2, label: 'Medium' }
    case 1:
      return { score: 1, label: 'Weak' }
    default:
      return { score: 0, label: 'Very Weak' }
  }
}

/**
 * Replaces placeholders in a string with values from an object.
 */
export function mergeFields(text: string, fields: Record<string | number, string | number>): string {
  if (!text) {
    console.warn('[MODS] Warning: No text to merge')
    return ''
  }
  const pattern = /\{\{\s*(\w+)\s*\}\}/g

  return text.replace(pattern, (match, key) => {
    if (key in fields) {
      return fields[key].toString()
    }
    else {
      console.warn(`[MODS] Warning: Field "${key}" not found in object`)
      return `{{${key}}}`
    }
  })
}

/**
 * Returns the reading time of a string in Hours, Minutes, and Seconds.
 */
export function readingTime(text: string, wordsPerMinute = 200): string {
  if (!text) {
    console.warn('[MODS] Warning: No text to read')
    return '0 minutes'
  }
  const words = text.split(' ').filter(word => word.trim() !== '').length
  const minutes = Math.ceil(words / wordsPerMinute)
  return formatDurationLabels(minutes * 60)
}

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
