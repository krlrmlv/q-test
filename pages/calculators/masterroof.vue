<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="masterroof-logo h2 d-flex align-items-center">
      <img
        src="/images/calculators/masterroof.svg"
        height="44"
        aria-hidden="true"
        class="mr-8"
      />
      {{ $t('calculators.masterRoof.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.masterRoof.description') }}
    </p>

    <MasterRoof class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterRoof.title', active: true },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  mounted() {
    mindboxViewCalculator(this.$t('pageTitle'))
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "MasterRoof service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterRoof — EKF"
  }
}
</i18n>
