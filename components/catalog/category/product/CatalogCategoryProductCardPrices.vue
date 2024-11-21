<template>
  <div class="catalog-product-price">
    <p class="product-price-type product-price-recommended">
      <span class="product-price-sum"
        >{{ formatPrice(product.price) }}&nbsp;₽</span
      >
      <span class="product-price-caption">
        {{ unitCaption }}
      </span>
    </p>

    <p v-if="product.price_base" class="product-price-type product-price-base">
      <span class="product-price-sum">
        {{ formatPrice(product.price_base) }}&nbsp;₽
      </span>
      <span class="product-price-caption">
        {{ $t('catalog.price.base') }}
      </span>
    </p>

    <p v-if="showPriceBulk" class="product-price-type product-price-bulk">
      <span class="product-price-sum">
        {{ formatPrice(product.price * product.coefficient) }}&nbsp;₽
      </span>
      <span
        class="product-price-caption"
        v-html="$t('catalog.price.package')"
      />
    </p>
  </div>
</template>

<script>
import formatSum from '@/utils/formatSum'
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    view: {
      type: String,
      default: 'list',
    },
  },

  computed: {
    showPriceBulk() {
      return this.product?.coefficient > 1 && this.view === 'list'
    },

    unitCaption() {
      /** unit_storage declination only if unit is 'пар' */
      const unitStorage = this.product?.unit_storage?.name
      let ending = ''

      if (unitStorage.toLowerCase() === 'пар') ending += 'у'

      return unitStorage
        ? `${this.$t('global.for')} ${unitStorage}${ending}`
        : ''
    },
  },

  methods: {
    formatPrice(price) {
      return formatSum(price, this.$i18n.locale)
    },
  },
}
</script>

<style lang="scss" scoped>
.product-price-recommended {
  .product-price-sum {
    font-size: 1.375rem;
  }

  @include media-breakpoint-down(sm) {
    .product-price-sum {
      font-size: $font-size-4;
    }
  }
}
</style>
