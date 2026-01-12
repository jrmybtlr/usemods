<template>
  <DocsLayout>
    <PageTitle>
      <h1>Modifiers</h1>
      <p>Modify and transform your content with our collection of efficient and easy-to-use functions designed to dicipher, manipulate, and transform strings.</p>
    </PageTitle>

    <PageFunction
      name="startWith"
      description="Adds a prefix to a string if it doesn't already start with the prefix."
      params='[{"name":"value","type":"string"},{"name":"start","type":"string"}]'
    >
      <StartWith />
    </PageFunction>

    <PageFunction
      name="startWithout"
      description="Removes a prefix from a string if it starts with the prefix."
      params='[{"name":"value","type":"string"},{"name":"start","type":"string"}]'
    >
      <StartWithout />
    </PageFunction>

    <PageFunction
      name="endWith"
      description="Adds a suffix to a string if it doesn't already end with the suffix."
      params='[{"name":"text","type":"string"},{"name":"end","type":"string"}]'
    >
      <EndWith />
    </PageFunction>

    <PageFunction
      name="endWithout"
      description="Removes a suffix from a string if it ends with the suffix."
      params='[{"name":"text","type":"string"},{"name":"end","type":"string"}]'
    >
      <EndWithout />
    </PageFunction>

    <PageFunction
      name="surroundWith"
      description="Adds a prefix and suffix to a string if it doesn't already start and end with them."
      params='[{"name":"text","type":"string"},{"name":"start","type":"string"},{"name":"end","type":"string"}]'
    >
      <surroundWith />
    </PageFunction>

    <PageFunction
      name="pluralize"
      description="Adds plurals to a string except for excluded words."
      info="This handles most english pluralisation rules, but there are exceptions."
      params='[{"name":"word","type":"string"},{"name":"count","type":"number"}]'
    >
      <Pluralize />
    </PageFunction>

    <PageFunction
      name="singularize"
      description="Removes plurals from a string."
      info="This handles most english pluralisation rules, but there are exceptions."
      params='[{"name":"value","type":"string"}]'
    >
      <Singularize />
    </PageFunction>

    <PageFunction
      name="ordinalize"
      description="Converts a number to a string with ordinal suffix."
      params='[{"name":"value","type":"number"}]'
    >
      <Ordinalize />
    </PageFunction>

    <PageFunction
      name="stripHtml"
      description="Strip HTML tags from a string efficiently, compatible with SSR."
      params='[{"name":"text","type":"string"}]'
    >
      <StripHtml />
    </PageFunction>

    <PageFunction
      name="stripWhitespace"
      description="Strips whitespace from a string."
      params='[{"name":"text","type":"string"}]'
    >
      <StripWhitespace />
    </PageFunction>

    <PageFunction
      name="stripNumbers"
      description="Strips numbers from a string."
      params='[{"name":"text","type":"string"}]'
    >
      <stripNumbers />
    </PageFunction>

    <PageFunction
      name="stripPunctuation"
      description="Strips punctuation from a string."
      params='[{"name":"text","type":"string"}]'
    >
      <StripPunctuation />
    </PageFunction>

    <PageFunction
      name="stripSymbols"
      description="Strips symbols from a string."
      params='[{"name":"text","type":"string"}]'
    >
      <StripSymbols />
    </PageFunction>

    <PageFunction
      name="stripEmojis"
      description="Strips emojis from a string (requires ES6 Unicode support) 🦊."
      params='[{"name":"text","type":"string"}]'
    >
      <StripEmojis />
    </PageFunction>

    <PageFunction
      name="slugify"
      description="Converts a string to-a-slug."
      params='[{"name":"text","type":"string"}]'
    >
      <slugify />
    </PageFunction>

    <PageFunction
      name="deslugify"
      description="Converts a slug to a string."
      params='[{"name":"text","type":"string"}]'
    >
      <deslugify />
    </PageFunction>

    <PageFunction
      name="camelCase"
      description="Removes spaces and capitalizes the first letter of each word except for the first word."
      params='[{"name":"text","type":"string"}]'
    >
      <CamelCase />
    </PageFunction>

    <PageFunction
      name="pascalCase"
      description="Removes spaces and capitalizes the first letter of each word."
      params='[{"name":"text","type":"string"}]'
    >
      <PascalCase />
    </PageFunction>

    <PageFunction
      name="snakeCase"
      description="Replaces spaces with underscores and converts to lowercase."
      params='[{"name":"text","type":"string"}]'
    >
      <SnakeCase />
    </PageFunction>

    <PageFunction
      name="kebabCase"
      description="Replaces spaces with hyphens and converts to lowercase."
      params='[{"name":"text","type":"string"}]'
    >
      <KebabCase />
    </PageFunction>

    <PageFunction
      name="titleCase"
      description="Converts to title case by capitalizing the first letter of each word."
      params='[{"name":"text","type":"string"}]'
    >
      <TitleCase />
    </PageFunction>

    <PageFunction
      name="escapeHtml"
      description="Escape HTML entities in a string."
      params='[{"name":"text","type":"string"}]'
    >
      <EscapeHtml />
    </PageFunction>

    <PageFunction
      name="unescapeHtml"
      description="Unescape HTML entities in a string."
      params='[{"name":"text","type":"string"}]'
    >
      <UnescapeHtml />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import CamelCase from '~/components/content/modifiers/CamelCase.vue'
import EndWith from '~/components/content/modifiers/EndWith.vue'
import EndWithout from '~/components/content/modifiers/EndWithout.vue'
import EscapeHtml from '~/components/content/modifiers/EscapeHtml.vue'
import KebabCase from '~/components/content/modifiers/KebabCase.vue'
import Ordinalize from '~/components/content/modifiers/Ordinalize.vue'
import PascalCase from '~/components/content/modifiers/PascalCase.vue'
import Pluralize from '~/components/content/modifiers/Pluralize.vue'
import Singularize from '~/components/content/modifiers/Singularize.vue'
import SnakeCase from '~/components/content/modifiers/SnakeCase.vue'
import StartWith from '~/components/content/modifiers/StartWith.vue'
import StartWithout from '~/components/content/modifiers/StartWithout.vue'
import StripEmojis from '~/components/content/modifiers/StripEmojis.vue'
import StripHtml from '~/components/content/modifiers/StripHtml.vue'
import StripPunctuation from '~/components/content/modifiers/StripPunctuation.vue'
import StripSymbols from '~/components/content/modifiers/StripSymbols.vue'
import StripWhitespace from '~/components/content/modifiers/StripWhitespace.vue'
import TitleCase from '~/components/content/modifiers/TitleCase.vue'
import UnescapeHtml from '~/components/content/modifiers/UnescapeHtml.vue'
import deslugify from '~/components/content/modifiers/deslugify.vue'
import slugify from '~/components/content/modifiers/slugify.vue'
import stripNumbers from '~/components/content/modifiers/stripNumbers.vue'
import surroundWith from '~/components/content/modifiers/surroundWith.vue'

const toc = ["startWith","startWithout","endWith","endWithout","surroundWith","pluralize","singularize","ordinalize","stripHtml","stripWhitespace","stripNumbers","stripPunctuation","stripSymbols","stripEmojis","slugify","deslugify","camelCase","pascalCase","snakeCase","kebabCase","titleCase","escapeHtml","unescapeHtml"]
const pageId = 'modifiers'

provide('toc', toc)
provide('pageId', pageId)
</script>
