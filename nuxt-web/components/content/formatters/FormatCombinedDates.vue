<template>
    <Example>
        <ExampleInputs>
            <FormInput 
              v-model="from" 
              label="From" 
              type="date" 
              :value="new Date(from).toISOString().split('T')[0]"
            />
            <FormInput 
              v-model="to" 
              label="To" 
              type="date" 
              :value="new Date(to).toISOString().split('T')[0]"
            />
            <FormSelectLocale v-model="locale" />
            <!-- <FormSelect v-model="format" :options="['short', 'long']" label="Format" /> -->
        </ExampleInputs>
        <ExampleCode :code="formattedCode" />
        <ExampleResult>
            {{ formatCombinedDates(from, to) }}
        </ExampleResult>
    </Example>
</template>

<script setup lang="ts">
const from = ref(new Date().toISOString().split('T')[0])
const to = ref(new Date(Date.now() + (1000 * 60 * 60 * 24 * 93)).toISOString().split('T')[0])
const locale = ref<string | null>(null)
const format = ref<'short' | 'long'>('short')
</script>
