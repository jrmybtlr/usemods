import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('usemods-nuxt', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('auto-imports usemods utilities', async () => {
    const html = await $fetch('/')
    expect(html).toContain('hello-world')
  })

  it('auto-imports reactive composables without throwing on SSR', async () => {
    const html = await $fetch('/')
    expect(html).toContain('data-testid="breakpoint"')
    // SSR default is null → rendered as "ssr"
    expect(html).toContain('ssr')
  })
})
