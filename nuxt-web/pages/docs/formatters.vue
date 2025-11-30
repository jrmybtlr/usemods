<template>
  <DocsLayout>
    <PageTitle>
      <h1>Formatters</h1>
      <p>Wrangle wild data types into submission. Spruce up numbers, give strings smarts, and make complex content dazzle.</p>
    </PageTitle>

    <PageFunction
      name="formatNumber"
      description="Format numbers into neat and formatted strings for people"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    locale?: string\n  }"}]'
    >
      <FormatNumber />
    </PageFunction>

    <PageFunction
      name="formatCurrency"
      description="Format numbers into local currency with extra smarts"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    locale?: string\n  }"}]'
    >
      <FormatCurrency />
    </PageFunction>

    <PageFunction
      name="formatValuation"
      description="Format numbers into valuations displayed in thousands, millions or billions"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    locale?: string\n    currency?: string\n  }"}]'
    >
      <FormatValuation />
    </PageFunction>

    <PageFunction
      name="formatUnit"
      description="Format a number into a your unit of choice"
      :params='[{"name":"number","type":"number"},{"name":"options","type":"{\n    unit: string\n    decimals?: number\n    unitDisplay?: \"short\" | \"long\"\n    locale?: string\n  }"}]'
    >
      <FormatUnit />
    </PageFunction>

    <PageFunction
      name="formatPercentage"
      description="Format a number into a percentage"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    locale?: string\n  }"}]'
    >
      <FormatPercentage />
    </PageFunction>

    <PageFunction
      name="formatCombinedDates"
      description="Collapses two dates (or timestamps) into a human-readable string"
      info="Time is optional and will only be shown if day, month and year are the same"
      :params='[{"name":"from","type":"Date | string | number"},{"name":"to","type":"Date | string | number"},{"name":"options","type":"{ locale?: string, format?: \"short\" | \"long\", timeZone?: string } = { locale: \"en-US\", format: \"long\" }"}]'
    >
      <FormatCombinedDates />
    </PageFunction>

    <PageFunction
      name="formatDurationLabels"
      description="Format time into a human-readable string"
      :params='[{"name":"seconds","type":"number"},{"name":"options?","type":"{\n    labels?: \"short\" | \"long\"\n    round?: boolean\n    decimals?: number\n  }"}]'
    >
      <FormatDurationLabels />
    </PageFunction>

    <PageFunction
      name="formatDurationNumbers"
      description="Format time into duration 00:00:00"
      :params='[{"name":"seconds","type":"number"}]'
    >
      <FormatDurationNumbers />
    </PageFunction>

    <PageFunction
      name="formatFileSize"
      description="Format and auto calculate file size into human-readable string"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    inputUnit?: string\n    outputUnit?: string\n    unitDisplay?: \"short\" | \"long\"\n    locale?: string\n  }"}]'
    >
      <FormatFileSize />
    </PageFunction>

    <PageFunction
      name="formatLength"
      description="Format and auto calculate length into human-readable string"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    inputUnit?: string\n    outputUnit?: string\n    unitDisplay?: \"short\" | \"long\"\n    locale?: string\n  }"}]'
    >
      <FormatLength />
    </PageFunction>

    <PageFunction
      name="formatTemperature"
      description="Format and auto calculate temperature into human-readable string"
      :params='[{"name":"number","type":"number"},{"name":"options?","type":"{\n    decimals?: number\n    inputUnit?: string\n    outputUnit?: string\n    unitDisplay?: \"short\" | \"long\"\n    locale?: string\n  }"}]'
    >
      <FormatTemperature />
    </PageFunction>

    <PageFunction
      name="formatNumberToWords"
      description="Format numbers into words"
      :params='[{"name":"number","type":"number"}]'
    >
      <FormatNumberToWords />
    </PageFunction>

    <PageFunction
      name="formatParagraphs"
      description="Formats content into paragraphs with a minimum number of characters per sentence and minimum number of sentences per paragraph"
      info="Use whitespace-pre-wrap to ensure the whitespace is preserved"
      :params='[{"name":"text","type":"string"},{"name":"options?","type":"{\n    minSentenceCount?: number\n    minCharacterCount?: number\n  }"}]'
    >
      <FormatParagraphs />
    </PageFunction>

    <PageFunction
      name="formatInitials"
      description="Generate initials from any string while ignoring common titles"
      :params='[{"name":"text","type":"string"},{"name":"options?","type":"{ length?: number }"}]'
    >
      <FormatInitials />
    </PageFunction>

    <PageFunction
      name="formatUnixTime"
      description="Format Unix timestamp into a datetime string"
      :params='[{"name":"timestamp?","type":"number"}]'
    >
      <FormatUnixTime />
    </PageFunction>

    <PageFunction
      name="formatList"
      description="Create a string of comma-separated values from an array, object, or string with an optional limit and conjunction"
      :params='[{"name":"items","type":"string | object | string[]"},{"name":"options?","type":"{\n    limit?: number\n    conjunction?: string\n  }"}]'
    >
      <formatList />
    </PageFunction>

    <PageFunction
      name="formatTitle"
      description="Converts a string to title case following the Chicago Manual of Style rules."
      :params='[{"name":"text","type":"string"}]'
    >
      <FormatTitle />
    </PageFunction>

    <PageFunction
      name="formatSentenceCase"
      description="Format a sentence case string"
      :params='[{"name":"text","type":"string"}]'
    >
      <formatSentenceCase />
    </PageFunction>

    <PageFunction
      name="formatTextWrap"
      description="Adds a space between the last two words in a string to prevent lonely words."
      info="Remember `text-wrap: pretty` and `text-wrap: balance` are available for most browsers."
      :params='[{"name":"text","type":"string"}]'
    >
      <FormatTextWrap />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import FormatCombinedDates from '~/components/content/formatters/FormatCombinedDates.vue'
import FormatCurrency from '~/components/content/formatters/FormatCurrency.vue'
import FormatDurationLabels from '~/components/content/formatters/FormatDurationLabels.vue'
import FormatDurationNumbers from '~/components/content/formatters/FormatDurationNumbers.vue'
import FormatFileSize from '~/components/content/formatters/FormatFileSize.vue'
import FormatInitials from '~/components/content/formatters/FormatInitials.vue'
import FormatLength from '~/components/content/formatters/FormatLength.vue'
import FormatNumber from '~/components/content/formatters/FormatNumber.vue'
import FormatNumberToWords from '~/components/content/formatters/FormatNumberToWords.vue'
import FormatParagraphs from '~/components/content/formatters/FormatParagraphs.vue'
import FormatPercentage from '~/components/content/formatters/FormatPercentage.vue'
import FormatTemperature from '~/components/content/formatters/FormatTemperature.vue'
import FormatTextWrap from '~/components/content/formatters/FormatTextWrap.vue'
import FormatTitle from '~/components/content/formatters/FormatTitle.vue'
import FormatUnit from '~/components/content/formatters/FormatUnit.vue'
import FormatUnixTime from '~/components/content/formatters/FormatUnixTime.vue'
import FormatValuation from '~/components/content/formatters/FormatValuation.vue'
import formatList from '~/components/content/formatters/formatList.vue'
import formatSentenceCase from '~/components/content/formatters/formatSentenceCase.vue'

const toc = ["formatNumber","formatCurrency","formatValuation","formatUnit","formatPercentage","formatCombinedDates","formatDurationLabels","formatDurationNumbers","formatFileSize","formatLength","formatTemperature","formatNumberToWords","formatParagraphs","formatInitials","formatUnixTime","formatList","formatTitle","formatSentenceCase","formatTextWrap"]
const pageId = 'formatters'

provide('toc', toc)
provide('pageId', pageId)
</script>
