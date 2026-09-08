import { defineNuxtModule, addImports, addImportsDir, createResolver } from '@nuxt/kit'
import * as utils from 'usemods'

export interface ModuleOptions {
  alias: [string, string][]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'usemods-nuxt',
    configKey: 'usemods',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    alias: [],
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)
    const aliasMap = new Map<string, string>(options.alias)

    // Import functions and map/set/array constants (e.g. configLocales)
    const exportedNames = Object.keys(utils).filter(
      (name) => name !== 'default'
    )

    for (const name of exportedNames) {
      const alias = aliasMap.has(name) ? aliasMap.get(name)! : name
      addImports({
        name: name,
        as: alias,
        from: 'usemods',
      })
    }

    // Reactive Vue composables for detection helpers that need listeners
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
