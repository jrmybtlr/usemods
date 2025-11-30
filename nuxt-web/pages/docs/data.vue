<template>
  <DocsLayout>
    <PageTitle>
      <h1>Data</h1>
      <p>A collection of functions for formatting, filtering and taming wild arrays and objects.</p>
    </PageTitle>

    <PageFunction
      name="dataSortBy"
      description="Sort an array or object by a property."
      :params='[{"name":"items","type":"object | string[] | number[]"},{"name":"options?","type":"{ property?: string, order?: &#39;asc&#39; | &#39;desc&#39; }"}]'
    >
      <DataSortBy />
    </PageFunction>

    <PageFunction
      name="dataReverse"
      description="Reverse an array or object."
      :params='[]'
    >
      <DataReverse />
    </PageFunction>

    <PageFunction
      name="dataRemoveDuplicates"
      description="Returns single unique values within an array or object"
      :params='[]'
    >
      <DataRemoveDuplicates />
    </PageFunction>

    <PageFunction
      name="dataFlatten"
      description="Flatten an array of arrays or an object of objects into a single array or object. That was hard to say."
      :params='[]'
    >
      <DataFlatten />
    </PageFunction>

    <PageFunction
      name="dataWithout"
      description="Returns an array without a property or properties."
      :params='[]'
    >
      <DataWithout />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import DataFlatten from '~/components/content/data/DataFlatten.vue'
import DataRemoveDuplicates from '~/components/content/data/DataRemoveDuplicates.vue'
import DataReverse from '~/components/content/data/DataReverse.vue'
import DataSortBy from '~/components/content/data/DataSortBy.vue'
import DataWithout from '~/components/content/data/DataWithout.vue'

const toc = ["dataSortBy","dataReverse","dataRemoveDuplicates","dataFlatten","dataWithout"]
const pageId = 'data'

provide('toc', toc)
provide('pageId', pageId)
</script>
