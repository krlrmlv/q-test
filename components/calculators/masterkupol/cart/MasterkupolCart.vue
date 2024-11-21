<template>
  <div>
    <h2 class="h3 mb-24 mb-lg-32">
      {{ $t('calculators.masterKupol.cart.title') }}
    </h2>

    <transition name="fade" mode="out-in">
      <p v-if="addedToCart" key="added" class="text-success mb-0">
        {{ $t('calculators.masterKupol.addedToCart') }}.
        <b-link class="text-underline text-reset" @click="$emit('home')">
          {{ $t('calculators.masterKupol.goBack') }}
        </b-link>
      </p>

      <div v-else-if="hasCart" key="cart">
        <MasterkupolCartTable :cart="cart" class="mb-32 mb-lg-64" />
        <MasterkupolCartControls @add-to-cart="handleAddToCart" />
      </div>

      <p v-else key="empty" class="text-muted mb-0">
        {{ $t('cart.isEmpty') }}
      </p>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      addedToCart: false,
    }
  },

  computed: {
    ...mapGetters('masterkupol', ['cart']),

    hasCart() {
      return this.cart?.length
    },
  },

  methods: {
    handleAddToCart() {
      this.addedToCart = true
    },
  },
}
</script>
