<template>
  <span class="compare-property-value">
    {{ propertyValue }}
  </span>
</template>

<script>
import { OUT_OF_PRODUCTION_STATUSES } from '~/components/constants/product'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    propertyId: {
      type: String,
      default: null,
    },
  },

  computed: {
    isOutOfProduction() {
      return OUT_OF_PRODUCTION_STATUSES.includes(this.product.status)
    },
    propertyValue() {
      if (!this.propertyId) return '–'
      const property = this.product?.property_values?.find(
        ({ property }) => property?.id === this.propertyId
      )

      if (this.propertyId === 'price' && this.isOutOfProduction) return '–'

      return property?.value || '–'
    },
  },
}
</script>

<style lang="scss" scoped>
.compare-property-value {
  display: block;
  font-size: $font-size-2;
  line-height: 1.4;
}
</style>
