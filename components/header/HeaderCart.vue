<template>
  <div class="header-cart">
    <b-button
      :to="localePath('/cart')"
      :disabled="!count"
      :title="$t('cart.goToCart')"
      :variant="variant"
      class="btn-icon header-toggle-cart rounded-pill"
    >
      <span class="sr-only">{{ $t('cart.title') }}</span>
      <svg-icon name="cart-24" width="24" height="24" aria-hidden="true" />

      <CountBadge :loading="loading" :value="count" />
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    variant: {
      type: String,
      default: 'gray-200',
    },
  },

  computed: {
    loading() {
      return this.$fetchState?.pending
    },
  },
}
</script>

<style lang="scss" scoped>
.header-toggle-cart {
  position: relative;
}

::v-deep {
  .count-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.25rem;
  }
}
</style>
