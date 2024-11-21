<template>
  <div class="cart-product">
    <div class="product-picture">
      <picture>
        <source
          :srcset="$getCdnImage(imageUrl, 86)"
          media="(max-width: 991px)"
        />
        <source :srcset="$getCdnImage(imageUrl, 128)" />
        <img
          :src="$getCdnImage(imageUrl, 128)"
          :alt="product.vendor_code"
          loading="lazy"
          class="product-picture-image"
        />
      </picture>
    </div>

    <div class="product-title">
      <b-link
        :to="localePath(`/catalog/products/${product.slug}`)"
        class="text-reset"
      >
        {{ product.name }}
        <span class="product-vendor-code">
          <br />{{ product.vendor_code }}
        </span>
      </b-link>
    </div>

    <div class="product-quantity">
      <p v-if="readonly" class="h6 text-nowrap mb-0">
        {{ localCount }}
        <span class="product-price-caption">
          {{ unitCaption }}
        </span>
      </p>

      <FormSpinbutton
        v-else
        v-model="localCount"
        :disabled="loading"
        :max="1000 * retailRate"
        :min="retailRate"
        :readonly="readonly"
        :step="retailRate"
        size="sm"
        inline
      />

      <b-spinner
        v-if="loading"
        variant="gray-400"
        class="loading-indicator"
        small
      />
    </div>

    <div class="product-price">
      <p class="h7 lh-100 mb-0 mb-lg-4">
        {{ formatSum(product.price, $i18n.locale) }}&nbsp;₽
        <span class="product-price-caption">
          {{ forUnitCaption }}
        </span>
      </p>

      <p class="product-price-base fs-2 mb-0">
        <s>{{ formatSum(product.price_base, $i18n.locale) }}&nbsp;₽</s>
        <span class="product-price-caption text-muted">
          {{ $t('cart.basePrice') }}
        </span>
      </p>
    </div>

    <div class="product-sum">
      <p class="h6 mb-0">{{ formatSum(sum, $i18n.locale) }}&nbsp;₽</p>
    </div>

    <div class="product-controls">
      <b-button
        :disabled="loading"
        :title="$t('cart.fields.remove')"
        :aria-label="$t('cart.fields.remove')"
        variant="white"
        class="btn-icon rounded-pill btn-remove"
        @click="deleteCart"
      >
        <svg-icon
          name="close-16"
          width="16"
          height="16"
          aria-hidden="true"
          class="d-lg-none"
        />
        <svg-icon
          name="close-24"
          width="24"
          height="24"
          aria-hidden="true"
          class="d-none d-lg-block"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import formatSum from '@/utils/formatSum'

const INPUT_DEBOUNCE = 500

export default {
  components: { BSpinner },

  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      timeout: null,
    }
  },

  computed: {
    forUnitCaption() {
      /** unit_storage declination only if unit is 'пар' */
      let ending = ''
      if (this.product?.unit_storage?.name.toLowerCase() === 'пар')
        ending += 'у'

      return this.product?.unit_storage?.name
        ? `${this.$t('global.for')} ${this.product.unit_storage.name}${ending}`
        : ''
    },

    imageUrl() {
      return `/products/${this.product?.image}`
    },

    loading() {
      return this.product?.cart?.loading
    },

    localCount: {
      get() {
        return this.product?.cart?.quantity || 0
      },
      set(event) {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          if (event) this.upsertCart(event)
          else this.deleteCart()
        }, INPUT_DEBOUNCE)
      },
    },

    retailRate() {
      return this.product.coefficient ? parseInt(this.product.coefficient) : 1
    },

    sum() {
      return parseInt(this.product.price) * parseInt(this.localCount)
    },

    unitCaption() {
      return this.product?.unit_storage?.name ?? ''
    },
  },

  methods: {
    formatSum,

    deleteCart() {
      this.$emit('delete')
    },

    upsertCart(event) {
      this.$emit('update', event)
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-product {
  margin-bottom: 0.5rem;
  padding: 1rem $grid-gutter-width;
  line-height: 1.4;
  background-color: $white;
  box-shadow: $box-shadow;
}

.product-picture-image {
  width: 86px;
  height: 86px;
  object-fit: contain;
}

.product-vendor-code {
  font-size: $font-size-2;
  color: $text-muted;
}

.product-quantity {
  position: relative;
}

.loading-indicator {
  position: absolute;
  left: calc(50% - 0.625rem);
  top: calc(50% - 0.625rem);
  width: 1.25rem;
  height: 1.25rem;
  border-width: $border-width * 2;
}

.product-price {
  min-width: 0;
}

.product-price-caption {
  font-size: $font-size-1;
  font-weight: $font-weight-normal;
}

.btn-remove {
  color: $secondary;
}

::v-deep {
  .form-spinbutton {
    &.readonly {
      padding-left: calc(1.5rem + 16px);
      padding-right: calc(1.5rem + 16px);
      border-color: $gray-100;
      background-color: $gray-100;

      &:focus,
      &.focus,
      &:focus-within {
        box-shadow: none;
      }

      & > .btn {
        display: none;
      }
    }
  }
}

@include media-breakpoint-down(xs) {
  .cart-product {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
  }
}

@include media-breakpoint-down(md) {
  .cart-product {
    position: relative;
    display: grid;
    grid-template-columns: min-content min-content 1fr;
    grid-template-rows: min-content 1fr;
    gap: 0.875rem 1rem;
    padding: 1rem;
    font-size: $font-size-2;
  }

  .product-picture {
    grid-row: 1 / span 2;
  }

  .product-title {
    grid-column: 2 / span 2;
    padding-right: 1.5rem;
  }

  .product-vendor-code {
    font-size: $font-size-1;
  }

  .product-quantity {
    align-self: center;

    .h6 {
      font-size: 1rem;
      line-height: 1;
    }

    ::v-deep {
      .form-spinbutton {
        .btn {
          padding-left: 0.4375rem;
          padding-right: 0.4375rem;
        }
      }
    }
  }

  .product-price {
    align-self: center;
  }

  .product-price-base,
  .product-sum {
    display: none;
  }

  .product-controls {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }

  .btn-remove {
    padding: 0.1875rem;
  }
}

@include media-breakpoint-up(lg) {
  .cart-product {
    display: flex;
    align-items: center;
    padding: 1rem 0.75rem;
  }

  .product-picture {
    flex: 0 0 16.66666667%;
    order: 0;
    padding: 0 0.75rem;
  }

  .product-title {
    flex: 0 0 25%;
    order: 1;
    padding: 0 0.75rem;
  }

  .product-quantity {
    flex: 0 0 16.66666667%;
    order: 3;
    padding: 0 0.75rem;
  }

  .product-price {
    flex: 0 0 16.66666667%;
    order: 2;
    padding: 0 0.75rem;
  }

  .product-sum {
    flex: 0 0 16.66666667%;
    order: 4;
    padding: 0 0.75rem;
  }

  .product-controls {
    flex: 0 0 8.33333333%;
    order: 5;
    padding: 0 0.75rem;
    text-align: center;
  }

  .product-picture-image {
    width: 128px;
    height: 128px;
  }

  .loading-indicator {
    left: auto;
    right: 0.75rem;
  }
}
</style>
