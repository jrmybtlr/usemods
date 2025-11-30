<template>
  <DocsLayout>
    <PageTitle>
      <h1>Numbers</h1>
      <p>This file contains functions that are related to numbers.</p>
    </PageTitle>

    <PageFunction
      name="sum"
      description="Calculates the sum of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Sum />
    </PageFunction>

    <PageFunction
      name="mean"
      description="Calculates the mean of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Mean />
    </PageFunction>

    <PageFunction
      name="average"
      description="Calculates the mean of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Average />
    </PageFunction>

    <PageFunction
      name="margin"
      description="Calculates the margin based on a percentage."
      :params='[{"name":"value","type":"number"},{"name":"percentage","type":"number"}]'
    >
      <Margin />
    </PageFunction>

    <PageFunction
      name="addMargin"
      description="Adds the margin to the value."
      :params='[{"name":"value","type":"number"},{"name":"percentage","type":"number"}]'
    >
      <AddMargin />
    </PageFunction>

    <PageFunction
      name="subtractMargin"
      description="Subtracts the margin from the value."
      :params='[{"name":"value","type":"number"},{"name":"percentage","type":"number"}]'
    >
      <SubtractMargin />
    </PageFunction>

    <PageFunction
      name="addMarkup"
      description="Adds the markup to the value."
      :params='[{"name":"value","type":"number"},{"name":"percentage","type":"number"}]'
    >
      <AddMarkup />
    </PageFunction>

    <PageFunction
      name="subtractMarkup"
      description="Calculates the markup based on a percentage."
      :params='[{"name":"value","type":"number"},{"name":"percentage","type":"number"}]'
    >
      <SubtractMarkup />
    </PageFunction>

    <PageFunction
      name="median"
      description="Calculates the median of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Median />
    </PageFunction>

    <PageFunction
      name="mode"
      description="Calculates the mode of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Mode />
    </PageFunction>

    <PageFunction
      name="min"
      description="Finds the minimum value in an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Min />
    </PageFunction>

    <PageFunction
      name="max"
      description="Finds the maximum value in an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Max />
    </PageFunction>

    <PageFunction
      name="minMax"
      description="Returns the minimum and maximum values in an array of numbers."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <MinMax />
    </PageFunction>

    <PageFunction
      name="range"
      description="Returns the difference between two values, expressed as a positive number."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Range />
    </PageFunction>

    <PageFunction
      name="standardDeviation"
      description="Returns the standard deviation of an array of numbers."
      :params='[{"name":"numbers","type":"number[]"},{"name":"options?","type":"{ method: &#39;sample&#39; | &#39;population&#39; }"}]'
    >
      <StandardDeviation />
    </PageFunction>

    <PageFunction
      name="skewness"
      description="Returns the measure of asymmetry of the probability distribution of an array of numbers. The skewness value can be positive, zero, negative, or undefined."
      :params='[{"name":"numbers","type":"number[]"}]'
    >
      <Skewness />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import AddMargin from '~/components/content/numbers/AddMargin.vue'
import AddMarkup from '~/components/content/numbers/AddMarkup.vue'
import Average from '~/components/content/numbers/Average.vue'
import Margin from '~/components/content/numbers/Margin.vue'
import Max from '~/components/content/numbers/Max.vue'
import Mean from '~/components/content/numbers/Mean.vue'
import Median from '~/components/content/numbers/Median.vue'
import Min from '~/components/content/numbers/Min.vue'
import MinMax from '~/components/content/numbers/MinMax.vue'
import Mode from '~/components/content/numbers/Mode.vue'
import Range from '~/components/content/numbers/Range.vue'
import Skewness from '~/components/content/numbers/Skewness.vue'
import StandardDeviation from '~/components/content/numbers/StandardDeviation.vue'
import SubtractMargin from '~/components/content/numbers/SubtractMargin.vue'
import SubtractMarkup from '~/components/content/numbers/SubtractMarkup.vue'
import Sum from '~/components/content/numbers/Sum.vue'

const toc = ["sum","mean","average","margin","addMargin","subtractMargin","addMarkup","subtractMarkup","median","mode","min","max","minMax","range","standardDeviation","skewness"]
const pageId = 'numbers'

provide('toc', toc)
provide('pageId', pageId)
</script>
