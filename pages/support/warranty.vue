<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 mb-48 mb-lg-64">{{ $t('support.warranty.title') }}</h1>

      <SupportWarrantyTable />
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.warranty.title', active: true }],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "Warranty — EKF"
  },
  "ru": {
    "pageTitle": "Гарантии — EKF"
  }
}
</i18n>
