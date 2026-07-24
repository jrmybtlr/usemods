<template>
  <Example>
    <ExampleInputs>
      <FormInput v-model="delay" label="Delay" type="number" />
      <Button @click="handleClick()">Click me</Button>
    </ExampleInputs>

    <ClickLog :executions="executions" :clicks="clicks" :executionLog="executionLog" />

    <ExampleCode :code="`throttle(() => { executions.value++ }, ${delay})`" />
  </Example>
</template>

<script lang="ts" setup>
const delay = ref(2000)
const clicks = ref(0)
const executions = ref(0)
const executionLog = ref<string[]>([])

const throttledHandler = computed(() => throttle(() => {
  const currentTime = new Date().toLocaleTimeString()
  executions.value++
  executionLog.value = [...executionLog.value, currentTime].slice(-5)
}, delay.value))

function handleClick() {
  clicks.value++
  throttledHandler.value()
}
</script>
