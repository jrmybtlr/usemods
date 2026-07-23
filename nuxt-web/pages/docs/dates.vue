<template>
  <DocsLayout>
    <PageTitle>
      <h1>Dates</h1>
      <p>Compare dates, show relative time, and measure durations. Helpful helpers when Intl alone is not quite enough.</p>
    </PageTitle>

    <PageFunction
      name="timeFrom"
      description="Show how long ago or how far away a date is, like &quot;Now&quot;, &quot;1 minute ago&quot;, or &quot;in 4 months&quot;. Use style &quot;long&quot; for &quot;10 days ago&quot;, &quot;short&quot; for &quot;10d ago&quot;. Other locales use Intl.RelativeTimeFormat."
      params='[{"name":"date","type":"DateInput"},{"name":"options?","type":"TimeFromOptions"}]'
    >
      <TimeFrom />
    </PageFunction>

    <PageFunction
      name="timeDifference"
      description="Measure the gap between two dates. With unit set to &quot;auto&quot;, you get a breakdown like &quot;2 days 5 hrs&quot;. Pick a single unit like &quot;days&quot; to get something like &quot;6212 days&quot;."
      params='[{"name":"from","type":"DateInput"},{"name":"to","type":"DateInput"},{"name":"options?","type":"TimeDifferenceOptions"}]'
    >
      <TimeDifference />
    </PageFunction>

    <PageFunction
      name="combineDates"
      description="Collapses two dates (or timestamps) into a human-readable string"
      info="Time is optional and will only be shown if day, month and year are the same"
      params='[{"name":"from","type":"DateInput"},{"name":"to","type":"DateInput"},{"name":"options?","type":"CombinedDatesOptions"}]'
    >
      <CombineDates />
    </PageFunction>

    <PageFunction
      name="isToday"
      description="Check if a date is today"
      params='[{"name":"date","type":"DateInput"}]'
    >
      <IsToday />
    </PageFunction>

    <PageFunction
      name="isPast"
      description="Check if a date is in the past."
      params='[{"name":"date","type":"DateInput"}]'
    >
      <IsPast />
    </PageFunction>

    <PageFunction
      name="isFuture"
      description="Check if a date is in the future"
      params='[{"name":"date","type":"DateInput"}]'
    >
      <IsFuture />
    </PageFunction>

    <PageFunction
      name="isSameDay"
      description="Check if two dates fall on the same calendar day in local time."
      params='[{"name":"a","type":"DateInput"},{"name":"b","type":"DateInput"}]'
    >
      <IsSameDay />
    </PageFunction>

    <PageFunction
      name="isSameMonth"
      description="Check if two dates fall in the same calendar month in local time."
      params='[{"name":"a","type":"DateInput"},{"name":"b","type":"DateInput"}]'
    >
      <IsSameMonth />
    </PageFunction>

    <PageFunction
      name="isDateBetween"
      description="Check if a date falls between a start and end date by timestamp."
      params='[{"name":"date","type":"DateInput"},{"name":"start","type":"DateInput"},{"name":"end","type":"DateInput"},{"name":"options?","type":"DateRangeOptions"}]'
    >
      <IsDateBetween />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import CombineDates from '~/components/content/dates/CombineDates.vue'
import IsDateBetween from '~/components/content/dates/IsDateBetween.vue'
import IsFuture from '~/components/content/dates/IsFuture.vue'
import IsPast from '~/components/content/dates/IsPast.vue'
import IsSameDay from '~/components/content/dates/IsSameDay.vue'
import IsSameMonth from '~/components/content/dates/IsSameMonth.vue'
import IsToday from '~/components/content/dates/IsToday.vue'
import TimeDifference from '~/components/content/dates/TimeDifference.vue'
import TimeFrom from '~/components/content/dates/TimeFrom.vue'

const toc = ["timeFrom","timeDifference","combineDates","isToday","isPast","isFuture","isSameDay","isSameMonth","isDateBetween"]
const pageId = 'dates'

provide('toc', toc)
provide('pageId', pageId)
</script>
