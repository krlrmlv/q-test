<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="masterkupol-logo h2 d-flex align-items-center">
      <img
        src="/images/calculators/masterkupol.svg"
        height="44"
        aria-hidden="true"
        class="mr-8"
      />
      {{ $t('calculators.masterKupol.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.masterKupol.description') }}
    </p>

    <MasterKupol class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterKupol.title', active: true },
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
    "pageTitle": "MasterKupol service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterKupol — EKF"
  }
}
</i18n>
