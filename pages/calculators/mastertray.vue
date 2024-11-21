<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 d-flex align-items-center">
      <span class="mr-8 d-flex">
        <img
          src="/images/calculators/mastertray.svg"
          height="44"
          aria-hidden="true"
        /> </span
      >{{ $t('calculators.masterTray.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.masterTray.description') }}
    </p>

    <IframeEmbed url="programs/master-tray" class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        {
          text: 'calculators.masterTray.title',
          to: '/calculators/mastertray',
          active: true,
        },
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
    "pageTitle": "MasterTray service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterTray — EKF"
  }
}
</i18n>
