<template>
  <Example class="flex">
    <ExampleInputs class="flex flex-col">
      <div class="flex w-full gap-4">
        <FormInput
          v-model="value"
          label="Title" />
        <FormSelect
          v-model="splitBy"
          label="Select"
          name="select"
          placeholder="Select an option">
          <option value="word">
            Word
          </option>
          <option value="character">
            Character
          </option>
        </FormSelect>
      </div>
      <div class="flex w-full gap-4">
        <FormInput
          v-model="time"
          label="Time"
          type="number"
          name="time"
          value="100"
          placeholder="Time" />
        <FormSelect
          v-model="unit"
          label="Unit"
          name="unit"
          placeholder="Select an option">
          <option value="ms">
            ms
          </option>
          <option value="s">
            s
          </option>
        </FormSelect>
      </div>

      <FormInput
        v-model="className"
        label="Classes"
        type="text"
        name="classes"
        placeholder="Classes" />
    </ExampleInputs>

    <ExampleResult>
      <h1
        :key="animationKey"
        class="text-balance text-center text-4xl font-bold leading-[1.25em] text-gray-900 dark:text-white"
        v-html="animated" />
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
const value = ref('Zippy little utils for your JavaScript projects.')
const splitBy = ref('word')
const time = ref(100)
const unit = ref('ms')
const className = ref('animate-fade-in-up')
const animationKey = ref(0)

const animated = computed(() => {
  return animateText(value.value, { splitBy: splitBy.value as 'word' | 'character', time: time.value, unit: unit.value as 'ms' | 's', class: className.value })
})

watch([value, splitBy, time, unit, className], () => {
  animationKey.value += 1
})
</script>
