<template>
  <DocsLayout>
    <PageTitle>
      <h1>Data</h1>
      <p>A collection of functions for formatting, filtering and taming wild arrays and objects.</p>
    </PageTitle>

    <PageFunction
      name="dataSortBy"
      description="Sort an array or object by a property."
      params='[{"name":"items","type":"T"},{"name":"options?","type":"{ property?: Extract<keyof ItemOf<T>, string>, order?: &#39;asc&#39; | &#39;desc&#39; }"}]'
    >
      <DataSortBy />
    </PageFunction>

    <PageFunction
      name="dataReverse"
      description="Reverse an array or object."
      params='[{"name":"items","type":"T"}]'
    >
      <DataReverse />
    </PageFunction>

    <PageFunction
      name="dataRemoveDuplicates"
      description="Returns single unique values within an array or object"
      params='[{"name":"...arrays","type":"T[][]"}]'
    >
      <DataRemoveDuplicates />
    </PageFunction>

    <PageFunction
      name="dataFlatten"
      description="Flatten an array of arrays or an object of objects into a single array or object. That was hard to say."
      params='[{"name":"items","type":"T"}]'
    >
      <DataFlatten />
    </PageFunction>

    <PageFunction
      name="dataWithout"
      description="Returns an array without a property or properties."
      params='[{"name":"items","type":"T"},{"name":"properties","type":"string | number | readonly (string | number)[]"}]'
    >
      <DataWithout />
    </PageFunction>

    <PageFunction
      name="dataGroupBy"
      description="Group an array of objects by a property."
      params='[{"name":"items","type":"readonly T[]"},{"name":"property","type":"keyof T"}]'
    >
      <DataGroupBy />
    </PageFunction>

    <PageFunction
      name="dataPick"
      description="Pick specific properties from an object."
      params='[{"name":"obj","type":"T"},{"name":"properties","type":"K | readonly K[]"}]'
    >
      <DataPick />
    </PageFunction>

    <PageFunction
      name="dataOmit"
      description="Omit specific properties from an object."
      params='[{"name":"obj","type":"T"},{"name":"properties","type":"K | readonly K[]"}]'
    >
      <DataOmit />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import DataFlatten from '~/components/content/data/DataFlatten.vue'
import DataGroupBy from '~/components/content/data/DataGroupBy.vue'
import DataOmit from '~/components/content/data/DataOmit.vue'
import DataPick from '~/components/content/data/DataPick.vue'
import DataRemoveDuplicates from '~/components/content/data/DataRemoveDuplicates.vue'
import DataReverse from '~/components/content/data/DataReverse.vue'
import DataSortBy from '~/components/content/data/DataSortBy.vue'
import DataWithout from '~/components/content/data/DataWithout.vue'

const toc = ["dataSortBy","dataReverse","dataRemoveDuplicates","dataFlatten","dataWithout","dataGroupBy","dataPick","dataOmit"]
const pageId = 'data'

provide('toc', toc)
provide('pageId', pageId)
</script>
