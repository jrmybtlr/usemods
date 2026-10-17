<template>
  <Example>
    <ExampleInputs>
      <Button
        color="secondary"
        @click="handleClick">
        Click me
      </Button>
      <Button
        color="ghost"
        @click="handleReset">
        Reset
      </Button>
    </ExampleInputs>
    <ExampleCode :code="`once(() => { executions.value++ })`" />
    <ExampleResult>
      Clicks: {{ clicks }} · Executions: {{ executions }}
    </ExampleResult>
  </Example>
</template>

<script lang="ts" setup>
import { once } from 'usemods'

const clicks = ref(0)
const executions = ref(0)

const runOnce = once(() => {
  executions.value++
})

function handleClick() {
  clicks.value++
  runOnce()
}

function handleReset() {
  runOnce.reset()
  executions.value = 0
  clicks.value = 0
}
</script>
