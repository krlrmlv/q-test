<template>
  <div class="price-requst-container">
    <div class="text-gray-700">
      <svg-icon
        name="calculator-24"
        width="24"
        height="24"
        class="mr-8"
        aria-hidden="true"
      />
      <span class="text-gray-900">
        {{ $t('catalog.price.onRequest') }}
      </span>
    </div>

    <b-button
      variant="primary"
      block
      :title="$t('catalog.price.get')"
      @click="showPriceRequsetModal"
      >{{ $t('catalog.price.get') }}</b-button
    >
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showPriceRequsetModal() {
      this.$store.commit('catalog/SET_PRICE_REQUEST_PRODUCT', this.product)
      this.$root.$emit('bv::show::modal', 'price-request-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
.price-requst-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: $gray-100;
}

@include media-breakpoint-down(sm) {
  .price-requst-container {
    gap: 1rem;
    padding: 1.5rem 1rem;
  }
}
</style>
