<template>
  <li class="nav-item">
    <b-link
      :to="localePath('/cart')"
      :disabled="!cartRows"
      :class="{ 'text-muted': !cartRows }"
      class="nav-link"
    >
      <span class="nav-link-icon">
        <svg-icon
          name="cart-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        <CountBadge :loading="loading" :value="cartRows" />
      </span>
      {{ $t('cart.title') }}
    </b-link>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['cartRows']),

    loading() {
      return this.$fetchState?.pending
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link-icon {
  position: relative;
}

::v-deep {
  .count-badge {
    position: absolute;
    top: -0.25rem;
    right: 0.25rem;
  }
}
</style>
