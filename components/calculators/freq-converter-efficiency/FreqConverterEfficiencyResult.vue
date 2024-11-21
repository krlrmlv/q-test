<template>
  <section class="pt-56 pt-lg-64">
    <h3 class="mb-40 mb-lg-80">{{ $t('title') }}</h3>

    <FreqConverterEfficiencyProductCard :result="result" class="mb-32" />

    <FreqConverterEfficiencyTable :result="result" class="mb-64 my-lg-96" />
  </section>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Recommended Freq Converter"
  },
  "ru": {
    "title": "Рекомендованный преобразователь частоты"
  }
}
</i18n>
