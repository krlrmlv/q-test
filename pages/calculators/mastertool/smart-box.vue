<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 mb-32">{{ $t('calculators.masterTool.smartBox.title') }}</h1>

    <IframeEmbed url="programs/smart-box" class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterTool.title', to: '/calculators/mastertool' },
        { text: 'calculators.masterTool.smartBox.title', active: true },
      ],
    }
  },
  head() {
    return {
      title: `${this.$t('calculators.masterTool.smartBox.title')} — EKF`,
    }
  },
  mounted() {
    mindboxViewCalculator(this.$t('calculators.masterTool.smartBox.title'))
  },
}
</script>
