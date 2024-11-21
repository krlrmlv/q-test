<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.libraries.title') }}</h1>

      <p class="mb-32 mb-lg-64">
        {{ $t('support.libraries.description') }}
      </p>

      <SupportLibraries class="mb-32" />
    </b-container>
  </main>
</template>

<script>
import sendToMindbox from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.libraries.title', active: true }],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  mounted() {
    sendToMindbox('EKFGroup.ViewLibraries')
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "BIM & CAD libraries — EKF"
  },
  "ru": {
    "pageTitle": "BIM & CAD библиотеки — EKF"
  }
}
</i18n>
