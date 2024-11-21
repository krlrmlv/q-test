<template>
  <b-row no-gutters>
    <b-col offset-xl="1" xl="10">
      <div class="product-card">
        <div class="product-picture">
          <img
            :src="$getCdnImage(imageUrl, { width: 260 })"
            :alt="result.product.vendor_code"
            class="img-fluid"
          />
        </div>

        <div class="product-title">
          <h6>
            <b-link
              :to="localePath(`/catalog/products/${result.product.slug}`)"
              target="_blank"
              class="text-reset"
            >
              {{ result.product.name }}
            </b-link>
          </h6>

          <p class="text-gray-500">
            {{ $t('vendor_code') }}&nbsp;{{ result.product.vendor_code }}
          </p>

          <b-button
            :to="localePath(`/catalog/products/${result.product.slug}`)"
            target="_blank"
            variant="link"
            class="text-secondary mt-auto px-0"
          >
            {{ $t('details') }}

            <svg-icon
              name="arrow-right-24"
              width="24"
              height="24"
              class="ml-8"
              aria-hidden="true"
            />
          </b-button>
        </div>

        <div class="product-profit">
          <p class="mb-4">{{ $t('profit') }}</p>

          <p class="product-price-value">
            {{ formatSum(Math.round(result.effectivity), $i18n.locale) }}&nbsp;₽
          </p>
        </div>

        <div class="product-prices">
          <p class="product-price-final">
            {{ $t('price') }}

            <span class="product-price-value">
              {{ formatSum(result.product.price, $i18n.locale) }}&nbsp;₽
            </span>
          </p>

          <p class="product-price-base">
            <span class="text-gray-500">{{ $t('price_base') }}</span>

            <span>
              {{ formatSum(result.product.price_base, $i18n.locale) }}&nbsp;₽
            </span>
          </p>

          <FreqConverterEfficiencyProductToCart
            v-model="quantity"
            :disabled="loading"
            :retail-rate="result.product.coefficient"
            @input="handleCartInput"
          />
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import formatSum from '@/utils/formatSum'

const INPUT_DEBOUNCE = 500

export default {
  props: {
    result: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loading: false,
      quantity: Number(this.result.product?.carts[0]?.quantity) || 0,
      timeout: null,
    }
  },

  computed: {
    imageUrl() {
      return `/products/${this.result?.product?.image}`
    },
  },

  methods: {
    formatSum,

    async updateCart() {
      this.loading = true

      if (this.quantity) {
        const source =
          'Калькулятор - Расчет экономической эффективности от применения преобразователя частоты VECTOR EKF PROxima'
        await this.$store.dispatch('cart/cartUpsert', {
          product: this.result.product,
          quantity: this.quantity,
          source,
        })
      } else {
        await this.$store.dispatch('cart/cartDelete', {
          productId: this.result.product.id,
        })
      }

      this.loading = false
    },

    handleCartInput() {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.updateCart()
      }, INPUT_DEBOUNCE)
    },
  },
}
</script>

<style lang="scss" scoped>
.product-picture {
  text-align: center;
}

.product-price-value {
  font-weight: $font-weight-medium;

  .product-profit & {
    font-size: 2rem;
    color: $primary;
  }

  .product-price-final & {
    font-size: $font-size-5;
  }
}

.product-price-base {
  font-size: $font-size-1;
}

.product-price-final {
  margin-bottom: 0.25rem;
}

@include media-breakpoint-down(sm) {
  .product-picture {
    margin-bottom: 2.5rem;
  }

  .product-profit {
    padding-top: 0.25rem;
  }

  .product-prices {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0 1rem;
  }

  .product-price-final,
  .product-price-base {
    flex: 0 0 auto;
  }

  .product-price-base {
    font-size: $font-size-1;
  }

  ::v-deep {
    .product-tocart {
      flex: 0 0 100%;
    }
  }
}

@include media-breakpoint-only(md) {
  .product-profit {
    padding-top: 0.25rem;
  }

  .product-prices {
    position: relative;
    padding-left: 0.5rem;

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -0.5 * $grid-gutter-width;
      width: $border-width;
      background-color: $gray-200;
    }
  }
}

@include media-breakpoint-up(md) {
  .product-card {
    display: grid;
    grid-template-columns: 39.5% minmax(0, 1fr) minmax(0, 1fr) 5.4%;
    gap: 0 $grid-gutter-width;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    border: $border-width solid $gray-200;
  }

  .product-picture {
    grid-row: 1 / span 2;
  }

  .product-title {
    grid-column: 2 / -2;
  }

  .product-profit {
    grid-column: 2 / 3;
  }

  .product-prices {
    grid-column: 3 / -2;
  }
}

@include media-breakpoint-up(lg) {
  .product-card {
    grid-template-columns: 22.89% minmax(0, 40%) 31.5%;
    padding-right: 2.5rem;
    padding-left: 2.5rem;
    border: $border-width solid $gray-200;
  }

  .product-title {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-column: 2 / 3;
    grid-row: 1 / span 2;

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -0.5 * $grid-gutter-width;
      width: $border-width;
      background-color: $gray-200;
    }
  }

  .product-profit,
  .product-prices {
    grid-column: 3 / -1;
    padding-left: 1.25rem;
  }

  .product-prices {
    align-self: end;
  }

  .product-price-final {
    margin-bottom: 0.5rem;
  }
}
</style>

<i18n>
{
  "en": {
    "details": "Details",
    "vendor_code": "Vendor code",
    "price": "Price:",
    "price_base": "Base price:",
    "profit": "Annual usage benefit:"
  },
  "ru": {
    "details": "Подробнее",
    "vendor_code": "Артикул",
    "price": "Цена:",
    "price_base": "Базовая цена:",
    "profit": "Выгода от применения в год:"
  }
}
</i18n>
