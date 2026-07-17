import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'never',
      }],
      'vue/multi-word-component-names': 'off',
    },
    ignores: ['./utils/**'],
  },
  {
    plugins: { tailwindcss: pluginTailwindCSS },
    settings: {
      tailwindcss: {
        cssConfigPath: './assets/css/tailwind.css',
      },
    },
    rules: pluginTailwindCSS.configs.recommended.rules,
  },
)
