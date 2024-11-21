<template>
  <div>
    <p v-if="addedToCart" class="text-success mb-0">
      {{ $t(`${i18n}.addedToCart`) }}.
    </p>
    <div v-else-if="hasCart">
      <h2 class="h3 mb-24 mb-lg-32">
        {{ $t(`${i18n}.cart.title`) }}
      </h2>
      <MasterroofCartTable :cart="cart" class="mb-32 mb-lg-64" />
      <MasterroofCartControls />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('masterroof', ['cart', 'addedToCart', 'i18n']),

    hasCart() {
      return this.cart?.length
    },
  },
}
</script>
