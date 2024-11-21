<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <b-row class="mb-16 mb-lg-48">
      <b-col lg="8" xl="9">
        <h1 class="h2 d-flex align-items-center mastercost-logo">
          <span class="mr-8 d-flex">
            <img
              src="/images/calculators/mastercost.svg"
              height="44"
              aria-hidden="true"
            />
          </span>

          {{ $t('calculators.masterCost.title') }}
        </h1>

        <p class="mb-32 mb-lg-64">
          {{ $t('calculators.masterCost.description') }}
        </p>
      </b-col>

      <!-- <b-col cols="12" lg="auto" class="ml-lg-auto">
        <MastercostBtnDownload button />
      </b-col> -->
    </b-row>

    <LazyMasterCost class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterCost.title', active: true },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  mounted() {
    mindboxViewCalculator('MasterCost')
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "MasterCost service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterCost — EKF"
  }
}
</i18n>
