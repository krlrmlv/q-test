<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 d-flex align-items-center">
      <span class="mr-8 d-flex">
        <img
          src="/images/calculators/mastercad.svg"
          height="44"
          aria-hidden="true"
        /> </span
      >{{ $t('calculators.masterCad.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.masterCad.description') }}
    </p>

    <b-row class="mb-24">
      <b-col sm="auto" class="mb-8">
        <SeoLink
          href="https://cloud.ekf.su/s/QMAJtePSeAMFQek"
          class="btn btn-gray-400 btn-block"
          target="_blank"
        >
          {{ $t('catalog') }}
        </SeoLink>
      </b-col>
      <b-col sm="auto" class="mb-8">
        <SeoLink
          href="https://cloud.ekf.su/s/jTaWWXcZMtZytfp"
          class="btn btn-gray-400 btn-block"
          target="_blank"
        >
          {{ $t('models') }}
        </SeoLink>
      </b-col>
    </b-row>

    <IframeEmbed url="programs/mastercad" class="mb-40 mb-lg-64" />
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
          text: 'calculators.masterCad.title',
          to: '/calculators/mastercad',
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
    "catalog": "Product catalog in DWG format",
    "models": "2D equipment models for AutoCAD",
    "pageTitle": "MasterCAD service — EKF"
  },
  "ru": {
    "catalog": "Каталог продукции в DWG",
    "models": "2D-модели оборудования для AutoCAD",
    "pageTitle": "Сервис MasterCAD — EKF"
  }
}
</i18n>
