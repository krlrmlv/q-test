<template>
  <transition name="fade" mode="out-in">
    <b-button
      v-if="!inCart"
      variant="primary"
      class="btn-cart"
      @click="handleButtonClick"
    >
      <b-spinner v-if="loading" />

      <span class="caption">
        <span class="caption-main" v-text="$t('catalog.toCart')" />
      </span>
    </b-button>

    <div v-else class="product-cart-button">
      <b-button
        :to="localePath('/cart')"
        variant="primary"
        class="btn-cart btn-in-cart"
      >
        <b-spinner v-if="loading" />

        <span class="caption">
          <span class="caption-main" v-text="$t('catalog.inCart')" />
          <span class="caption-small" v-text="$t('global.navigate')" />
        </span>
      </b-button>

      <div class="product-cart-spinbutton">
        <b-button
          :disabled="loading"
          :title="$t('global.decrement')"
          :aria-label="$t('global.decrement')"
          variant="white"
          class="btn-decrement"
          @click="decrement"
        >
          <svg-icon name="minus-16" width="16" height="16" aria-hidden="true" />
        </b-button>

        <b-form-input
          :disabled="loading"
          :max="max"
          :min="0"
          :step="retailRate"
          :value="quantity"
          type="number"
          class="no-appearance"
          @blur="handleBlur"
          @input="handleInput"
          @keypress="filterInput"
        />

        <b-button
          :disabled="loading"
          :title="$t('global.increment')"
          :aria-label="$t('global.increment')"
          variant="white"
          class="btn-increment"
          @click="increment"
        >
          <svg-icon name="plus-16" width="16" height="16" aria-hidden="true" />
        </b-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { BFormInput, BSpinner } from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  components: {
    BFormInput,
    BSpinner,
  },

  props: {
    debounce: {
      type: Number,
      default: 500,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 9999,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loading: false,
      quantity: 0,
      timeout: null,
    }
  },

  computed: {
    localQuantity: {
      get() {
        return this.quantity
      },
      set(event) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async () => {
          this.quantity = Math.ceil(event / this.retailRate) * this.retailRate
          await this.handleQuantityChange(this.quantity)
        }, this.debounce)
      },
    },

    inCart() {
      return Boolean(this.quantity)
    },

    retailRate() {
      return parseInt(this.product?.coefficient || 1)
    },
  },

  created() {
    this.quantity = this.product?.carts[0]?.quantity || 0
  },

  methods: {
    ...mapActions('cart', ['cartDelete', 'cartUpsert']),

    async handleBlur(event) {
      if (!event?.target?.value) {
        this.quantity = 0
        await this.handleQuantityChange(this.quantity)
      }
    },

    async handleQuantityChange(quantity) {
      if (quantity) {
        this.loading = true
        const source = 'Каталог'
        await this.cartUpsert({ product: this.product, quantity, source })
        this.loading = false
      } else {
        this.loading = true
        await this.cartDelete({ productId: this.product.id })
        this.loading = false
      }
    },

    decrement() {
      if (this.quantity > 0) {
        clearTimeout(this.timeout)
        this.quantity =
          (Math.ceil(this.quantity / this.retailRate) - 1) * this.retailRate
        this.timeout = setTimeout(async () => {
          await this.handleQuantityChange(this.quantity)
        }, this.debounce)
      }
    },

    increment() {
      if (this.quantity < this.max) {
        clearTimeout(this.timeout)
        this.quantity =
          (Math.ceil(this.quantity / this.retailRate) + 1) * this.retailRate
        this.timeout = setTimeout(async () => {
          await this.handleQuantityChange(this.quantity)
        }, this.debounce)
      }
    },

    filterInput(event) {
      const charCode = event?.charCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault()
      }
    },

    handleButtonClick() {
      if (!this.quantity) {
        this.increment()
        this.$gtm.push({ event: 'btnBuy' })
      }
    },

    handleInput(event) {
      clearTimeout(this.timeout)
      if (event === '') return
      this.timeout = setTimeout(async () => {
        this.quantity = Math.ceil(event / this.retailRate) * this.retailRate
        await this.handleQuantityChange(this.quantity)
      }, this.debounce)
    },
  },
}
</script>

<style lang="scss" scoped>
.product-cart-button {
  display: flex;
}

.btn-cart {
  flex: 1 1 auto;
  position: relative;
  height: calc(3.375rem + #{$border-width * 2});
  padding: 0.9375rem 2rem;
  white-space: nowrap;

  .caption {
    display: flex;
    position: relative;
  }

  .caption-small {
    position: absolute;
    left: 50%;
    bottom: 0;
    font-size: $font-size-1;
    font-weight: $font-weight-normal;
    opacity: 0;
    transform: translateX(-50%) translateY(0.75em);
  }

  [class*='spinner'] {
    position: absolute;
    left: $input-btn-padding-y;
    width: 1rem;
    height: 1rem;
    border-width: 0.125rem;
    opacity: 0.5;
  }

  &:focus {
    box-shadow: none;
  }

  &.btn-in-cart {
    .caption-main {
      transform: translateY(-25%);
    }

    .caption-small {
      opacity: 0.4;
    }
  }
}

.product-cart-spinbutton {
  display: flex;
  flex: 0 1 auto;
  border: $border-width solid $white;

  &:focus-within {
    box-shadow: none;
  }

  .btn-decrement,
  .btn-increment,
  .form-control {
    height: 3.375rem;
    border: none;
    background-color: $white;
  }

  .btn-decrement,
  .btn-increment {
    color: $gray-500;

    &:hover {
      color: $secondary;
      background-color: $white;
    }

    &:focus,
    &:active,
    &:active:focus {
      background-color: $white;
      box-shadow: none;
    }
  }

  .btn-decrement {
    padding-left: 1.125rem;
    padding-right: 0.25rem;
  }

  .btn-increment {
    padding-left: 0.25rem;
    padding-right: 1.125rem;
  }

  .form-control {
    padding-left: 0.125rem;
    padding-right: 0.125rem;
    font-size: $font-size-4;
    font-weight: $font-weight-medium;
    text-align: center;

    &:focus {
      background-color: $white;
      box-shadow: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
      margin: 0;
    }
  }
}
</style>
