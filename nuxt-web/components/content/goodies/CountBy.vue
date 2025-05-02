<template>
  <Example>
    <ExampleInputs class="flex flex-col gap-4">
      <FormInput v-model="text" label="Text" />
      <FormSelect v-model="by" label="By"  >
        <option value="character">
          Character
        </option>
        <option value="word">
          Word
        </option>
        <option value="sentence">
          Sentence
        </option>
        <option value="paragraph">
          Paragraph
        </option>
        <option value="unique">
          Unique
        </option>
      </FormSelect>
      <FormInput v-model="searchFor" label="Search For" v-if="by === 'unique'" />
    </ExampleInputs>
    <ExampleResult>
      {{ countBy(text, { by, searchFor }) }}
    </ExampleResult>
    <ExampleCode :code="formattedCode" />
  </Example>
</template>

<script setup lang="ts">
const by = ref<'character' | 'word' | 'sentence' | 'paragraph' | 'unique'>('character')
const searchFor = ref('')
const text = ref(`My fellow citizens, today I stand before you on the precipice of a transportation revolution! 🚀 The humble scooter, once relegated to the playgrounds of our youth, has emerged as a beacon of personal mobility in our congested urban landscapes. With 2 wheels and a simple platform, it represents not merely a mode of transportation, but a declaration of independence from the tyranny of traffic and the burden of automotive excess.

Throughout history, great movements have begun with simple tools that challenged the established order. Just as the printing press democratized knowledge and the bicycle liberated the common person from the limitations of distance, the modern scooter now offers us freedom in our daily commutes. It weaves through gridlocked streets, requires 0 fossil fuels, and occupies a fraction of the space demanded by its automotive counterparts. This is not merely progress; this is liberation! 🌱

We face today a crisis of urban mobility that threatens the very fabric of our communities. Our cities choke on exhaust, our neighborhoods are carved apart by expansive highways, and our citizens waste precious hours of their lives trapped in metal boxes, inching forward in an endless parade of inefficiency. The scooter presents us with an alternative vision—one where mobility is accessible, sustainable, and fundamentally human in scale. 🏙️

I have seen the joy in the eyes of those who rediscover the simple pleasure of the wind in their hair as they glide down a bike lane. I have witnessed the camaraderie of scooter riders nodding in acknowledgment as they pass one another, united in their embrace of this modest yet revolutionary vehicle. These are not just commuters; they are pioneers charting a new course toward a more sustainable and connected urban future. 🛴

Let us not dismiss the scooter as trivial or temporary. Let us instead recognize it as a powerful symbol of how small changes can transform society. When future generations look back on this era of transition, they will note that the revolution did not arrive with a roar but with the gentle whirr of small wheels on pavement. Today, I call upon each of you to consider how this unassuming vehicle might just carry us all toward a brighter tomorrow. ✨`)

const formattedCode = computed(() => {
  return generateFormatterCode('countBy', "your-text-here", { by: by.value, searchFor: searchFor.value })
})
</script>