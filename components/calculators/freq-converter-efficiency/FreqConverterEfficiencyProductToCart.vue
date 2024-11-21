<template>
  <transition name="fade" mode="out-in">
    <b-button
      v-if="!Number(localValue)"
      :disabled="disabled"
      :size="size"
      :title="$t('toCart')"
      variant="primary"
      class="product-tocart w-100 w-lg-unset"
      @click="increment"
    >
      <span class="text-nowrap">
        {{ $t('toCart') }}
      </span>
    </b-button>

    <div v-else class="product-tocart w-100 w-lg-unset">
      <div class="prepend">
        <b-button
          :disabled="disabled"
          :size="size"
          :title="$t('global.decrement')"
          variant="outline-primary"
          class="btn-decrement"
          @click="decrement"
        >
          <svg-icon
            :name="`minus-${iconSize}`"
            :width="iconSize"
            :height="iconSize"
            aria-hidden="true"
          />
        </b-button>
      </div>

      <b-form-input
        v-model="localValue"
        :size="size"
        max="9999"
        min="0"
        type="number"
        class="no-appearance"
      />

      <div class="append">
        <b-button
          :disabled="disabled"
          :size="size"
          :title="$t('global.increment')"
          variant="primary"
          class="btn-increment"
          @click="increment"
        >
          <b-spinner v-if="disabled" />

          <svg-icon
            v-else
            :name="`plus-${iconSize}`"
            :width="iconSize"
            :height="iconSize"
            aria-hidden="true"
          />
        </b-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { BFormInput, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BFormInput,
    BSpinner,
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    retailRate: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: String,
      default: 'sm',
    },
    title: {
      type: [String, null],
      default: null,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
  },

  data() {
    return {
      timeout: null,
    }
  },

  computed: {
    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },

    localValue: {
      get() {
        return this.value
      },
      set(event) {
        this.$emit('input', event)
      },
    },
  },

  methods: {
    decrement() {
      if (this.localValue >= this.retailRate)
        this.localValue =
          parseInt(this.localValue, 10) - parseInt(this.retailRate, 10)
    },

    increment() {
      const initialValue = !Number.isNaN(parseInt(this.localValue, 10))
        ? parseInt(this.localValue, 10)
        : 0

      if (initialValue < 1) {
        this.$gtm.push({ event: 'btnBuy' })
      }

      this.localValue = initialValue + parseInt(this.retailRate, 10)
    },
  },
}
</script>

<style lang="scss" scoped>
.product-tocart {
  display: flex;
  height: calc(1.375rem + 24px + #{$border-width * 2});
  border: $border-width solid $primary;

  .btn {
    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;

    &:not(:disabled):not(.disabled) {
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    &.btn-sm {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    &.btn-lg {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  .form-control {
    flex: 1 1 auto;
    width: 3.5rem;
    height: auto;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    font-weight: $font-weight-medium;
    text-align: center;
    border: none;
    color: $primary;

    &:focus {
      box-shadow: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
      margin: 0;
    }
  }

  ::v-deep {
    .btn.btn-decrement {
      padding-right: 0;

      &:not(:disabled):not(.disabled) {
        &:focus,
        &:hover {
          color: darken($primary, 10%);
          background-color: $white;
        }
      }

      &.disabled,
      &:disabled {
        color: $primary;
      }
    }

    .btn-increment {
      min-width: 3rem;

      &.disabled,
      &:disabled {
        color: $white;
        background-color: $primary;
      }
    }

    [class*='spinner-'] {
      width: 24px;
      height: 24px;
    }
  }

  &:focus-within {
    box-shadow: $input-focus-box-shadow;
  }
}
</style>

<i18n>
{
  "en": {
    "toCart": "Add to cart"
  },
  "ru": {
    "toCart": "Добавить в корзину"
  }
}
</i18n>
