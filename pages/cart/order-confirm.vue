<template>
  <main class="pb-lg-32">
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 class="mb-lg-32">{{ $t('cart.orderConfirm.title') }}</h2>

      <p class="mb-lg-32">
        {{ $t('cart.orderConfirm.message') }}
      </p>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'cart.title', to: '/cart' },
        { text: 'cart.orderConfirm.title', active: true },
      ],
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
    "pageTitle": "Thank you for you order — EKF"
  },
  "ru": {
    "pageTitle": "Заказ создан — EKF"
  }
}
</i18n>
