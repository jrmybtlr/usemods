<template>
  <DocsLayout>
    <PageTitle>
      <h1>Goodies</h1>
      <p>A collection neat little functions that don't belong anywhere else.</p>
    </PageTitle>

    <PageFunction
      name="splitByWords"
      description="Wraps each word, sentence or paragraph in a string with a tag."
      info="Don't forget to render the HTML safely."
      params='[{"name":"text","type":"string"}]'
    >
      <SplitByWords />
    </PageFunction>

    <PageFunction
      name="checkPasswordStrength"
      description="Check the strength of a password against a given policy."
      info="Don't forget to use our Password Generator in the Generators section"
      params='[{"name":"text","type":"string"},{"name":"options","type":"{ length?: number, uppercase?: number, number?: number, special?: number } = {}"}]'
    >
      <CheckPasswordStrength />
    </PageFunction>

    <PageFunction
      name="mergeFields"
      description="Replaces placeholders in a string with values from an object."
      params='[{"name":"text","type":"string"},{"name":"fields","type":"Record<string | number"}]'
    >
      <MergeFields />
    </PageFunction>

    <PageFunction
      name="readingTime"
      description="Returns the reading time of a string in Hours, Minutes, and Seconds."
      params='[{"name":"text","type":"string"}]'
    >
      <ReadingTime />
    </PageFunction>

    <PageFunction
      name="countBy"
      description="Count by character, word, sentence, paragraph or unique string."
      params='[{"name":"text","type":"string"},{"name":"options","type":"{\n    by?: &#39;character&#39; | &#39;word&#39; | &#39;sentence&#39; | &#39;paragraph&#39; | &#39;unique&#39;\n    searchFor?: string\n  } = {}"}]'
    >
      <CountBy />
    </PageFunction>

    <PageFunction
      name="animateText"
      description="Animate text by wrapping each character in a span with a delay."
      params='[{"name":"text","type":"string"},{"name":"options","type":"{\n    splitBy?: &#39;word&#39; | &#39;character&#39;\n    time?: number\n    unit?: &#39;ms&#39; | &#39;s&#39;\n    class?: string\n  } = {}"}]'
    >
      <AnimateText />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import AnimateText from '~/components/content/goodies/animateText.vue'
import CheckPasswordStrength from '~/components/content/goodies/CheckPasswordStrength.vue'
import CountBy from '~/components/content/goodies/CountBy.vue'
import MergeFields from '~/components/content/goodies/MergeFields.vue'
import ReadingTime from '~/components/content/goodies/ReadingTime.vue'
import SplitByWords from '~/components/content/goodies/SplitByWords.vue'

const toc = ["splitByWords","checkPasswordStrength","mergeFields","readingTime","countBy","animateText"]
const pageId = 'goodies'

provide('toc', toc)
provide('pageId', pageId)
</script>
