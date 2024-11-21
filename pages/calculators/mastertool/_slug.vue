<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 mb-32">
      {{ $t(title) }}
    </h1>

    <IframeEmbed :url="`programs/master-tool/${slug}`" class="mb-40 mb-lg-64" />
  </b-container>
</template>

<script>
import camelCase from 'lodash/camelCase'
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  head() {
    return {
      title: this.$t(this.title) + ' — EKF',
    }
  },

  computed: {
    breadcrumbs() {
      const breadcrumbs = [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterTool.title', to: '/calculators/mastertool' },
      ]
      if (this.slug) {
        breadcrumbs.push({ text: this.title, active: true })
      }
      return breadcrumbs
    },

    slug() {
      return this.$route.params.slug
    },

    title() {
      return `calculators.masterTool.${camelCase(this.slug)}.title`
    },
  },
  mounted() {
    mindboxViewCalculator(this.title)
  },
}
</script>
