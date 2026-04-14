<template>
  <DocsLayout>
    <PageTitle>
      <h1>Dates</h1>
      <p>Locale-aware dates and times via Intl.DateTimeFormat—readable strings without reaching for options objects every time.</p>
    </PageTitle>

    <PageFunction
      name="formatDate"
      description="Format the calendar date using a preset date style."
      params='[{"name":"date","type":"Date | string | number"},{"name":"options?","type":"LocaleTimeZone & {\n    dateStyle?: &#39;full&#39; | &#39;long&#39; | &#39;medium&#39; | &#39;short&#39;\n  }"}]'
    >
      <FormatDate />
    </PageFunction>

    <PageFunction
      name="formatTime"
      description="Format the time-of-day using a preset time style."
      params='[{"name":"date","type":"Date | string | number"},{"name":"options?","type":"LocaleTimeZone & {\n    timeStyle?: &#39;full&#39; | &#39;long&#39; | &#39;medium&#39; | &#39;short&#39;\n    hour12?: boolean\n  }"}]'
    >
      <FormatTime />
    </PageFunction>

    <PageFunction
      name="formatDateTime"
      description="Format date and time together using preset styles."
      params='[{"name":"date","type":"Date | string | number"},{"name":"options?","type":"LocaleTimeZone & {\n    dateStyle?: &#39;full&#39; | &#39;long&#39; | &#39;medium&#39; | &#39;short&#39;\n    timeStyle?: &#39;full&#39; | &#39;long&#39; | &#39;medium&#39; | &#39;short&#39;\n    hour12?: boolean\n  }"}]'
    >
      <FormatDateTime />
    </PageFunction>

    <PageFunction
      name="timeFrom"
      description="Base time (defaults to now)."
      params='[{"name":"date","type":"Date | string | number"},{"name":"options?","type":"TimeFromOptions"}]'
    >
      <TimeFrom />
    </PageFunction>

    <PageFunction
      name="timeDifference"
      description="Output unit. &quot;auto&quot; will emit a multi-part result like &quot;1 year 11 months 12 days 14 hrs&quot; (depending on style/limits)."
      params='[{"name":"from","type":"Date | string | number"},{"name":"to","type":"Date | string | number"},{"name":"options?","type":"TimeDifferenceOptions"}]'
    >
      <TimeDifference />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import FormatDate from '~/components/content/dates/FormatDate.vue'
import FormatDateTime from '~/components/content/dates/FormatDateTime.vue'
import FormatTime from '~/components/content/dates/FormatTime.vue'
import TimeDifference from '~/components/content/dates/TimeDifference.vue'
import TimeFrom from '~/components/content/dates/TimeFrom.vue'

const toc = ["formatDate","formatTime","formatDateTime","timeFrom","timeDifference"]
const pageId = 'dates'

provide('toc', toc)
provide('pageId', pageId)
</script>
