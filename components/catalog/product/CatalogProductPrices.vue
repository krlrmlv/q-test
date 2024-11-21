<template>
  <div class="catalog-product-prices">
    <div class="product-prices-grid">
      <p :class="{ 'price-long': priceIsLong }" class="price price-msrp">
        <span class="price-caption" v-text="$t('catalog.price.msrpLong')" />
        <span class="price-value">
          {{ formatSum(product.price, $i18n.locale) }}&nbsp;₽
          <span class="price-unit" v-text="unitCaption" />
        </span>
      </p>

      <p :class="{ 'price-long': priceIsLong }" class="price price-base">
        <span
          v-if="!priceIsLong"
          class="price-caption"
          v-text="$t('catalog.price.base')"
        />

        <span class="price-value">
          {{ formatSum(product.price_base, $i18n.locale) }}&nbsp;₽
          <span
            v-if="priceIsLong"
            class="price-caption"
            v-text="$t('catalog.price.base')"
          />
          <span class="d-md-none price-unit" v-text="unitCaption" />
        </span>
      </p>

      <p v-if="pricePackage" class="price price-package">
        <span class="price-value">
          {{ formatSum(pricePackage, $i18n.locale) }}&nbsp;₽
        </span>
        <span class="price-caption" v-text="$t('catalog.price.package')" />
      </p>
    </div>

    <CatalogProductCartButton v-if="!isUnavailable" :product="product" />
  </div>
</template>

<script>
import formatSum from '@/utils/formatSum'
import { WITHDRAWN_STATUSES } from '~/components/constants/product'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    isUnavailable() {
      return (
        WITHDRAWN_STATUSES.includes(this.product?.status) &&
        !Number(this.product?.stocks_aggregate?.aggregate?.sum?.quantity)
      )
    },

    priceIsLong() {
      return `${this.product?.price}`.length >= 5
    },

    pricePackage() {
      return this.product?.coefficient > 1
        ? this.product?.price * this.product?.coefficient
        : 0
    },

    unitCaption() {
      let unitName = this.product?.unit_storage?.name || ''

      /** unit_storage declination only if unit is 'пар' */
      if (unitName.toLowerCase() === 'пар') unitName += 'у'

      return unitName ? `${this.$t('global.for')} ${unitName}` : ''
    },
  },

  methods: { formatSum },
}
</script>

<style lang="scss" scoped>
.catalog-product-prices {
  display: flex;
  flex-direction: column;
  gap: 1rem 1.5rem;
}

.product-prices-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  margin-bottom: 0.5rem;
  font-size: $font-size-2;
}

.price {
  flex: 1 1 auto;
  margin: 0;

  &.price-long,
  &.price-package {
    flex: 0 0 100%;
  }

  &:not(.price-package) {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
}

.price-caption {
  flex: 1 1 auto;
}

.price-caption,
.price-unit {
  font-size: $font-size-1;
  font-weight: $font-weight-normal;
  line-height: 1.2;
  color: $gray-500;
}

.price-msrp {
  .price-value {
    font-size: 2rem;
    font-weight: $font-weight-medium;
    line-height: 1.2;
  }
}

::v-deep {
  .catalog-product-stock-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: -0.25rem;
    font-size: $font-size-2;
    white-space: nowrap;
  }

  .catalog-product-stock-message {
    flex: 1 1 auto;
  }

  .btn.catalog-product-stock {
    display: flex;
    margin-bottom: 0.25rem;
    font-size: inherit;
    font-weight: $font-weight-normal;
  }
}

@include media-breakpoint-down(sm) {
  .price-base {
    &:not(.price-long) {
      text-align: right;

      .price-value {
        margin-bottom: 0.125rem;
      }
    }
  }
}

@include media-breakpoint-up(md) {
  .catalog-product-prices {
    padding: 1.75rem;
    background-color: $gray-100;
  }

  .product-prices-grid {
    gap: 0.625rem 0.75rem;
  }

  .price {
    &:not(.price-package) {
      gap: 0.5rem;

      &:not(.price-long) {
        .price-caption {
          display: flex;
          flex: 0 0 auto;
          align-items: flex-end;
          height: $font-size-1 * 2.4;
        }
      }
    }
  }

  .price-msrp {
    .price-value {
      font-size: 2.5rem;
    }

    &:not(.price-long) {
      .price-caption {
        max-width: 10rem;
      }
    }
  }

  .price-base {
    &:not(.price-long) {
      .price-caption {
        margin-bottom: 0.25rem;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .catalog-product-prices {
    padding: 1.75rem 1.875rem;
  }
}
</style>
