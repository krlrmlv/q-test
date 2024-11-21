<template>
  <transition name="fade" mode="out-in">
    <b-button
      v-if="localValue < 1"
      :class="{
        'product-tocart-sm': size === 'sm',
        'product-tocart-lg': size === 'lg',
      }"
      :disabled="disabled"
      :size="size"
      :title="$t('catalog.toCart')"
      variant="primary"
      class="product-tocart"
      @click="increment"
    >
      {{ $t('catalog.toCart') }}
    </b-button>
    <div
      v-else
      :class="{
        'product-tocart-sm': size === 'sm',
        'product-tocart-lg': size === 'lg',
      }"
      class="product-tocart"
    >
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
        type="number"
        class="no-appearance"
      ></b-form-input>
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
    value: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      },
    },
    retailRate: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: String,
      default: 'sm',
    },
  },
  computed: {
    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
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
    width: 3rem;
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

  &.product-tocart-sm {
    height: calc(0.875rem + 32px + #{$border-width * 2});

    .btn-sm {
      padding-inline: 1rem;
    }

    ::v-deep {
      [class*='spinner-'] {
        width: 16px;
        height: 16px;
        border-width: 0.125rem;
      }
    }
  }

  &.product-tocart-lg {
    height: calc(2.375rem + 24px + #{$border-width * 2});

    .form-control {
      width: 5rem;
    }
  }
}

@include media-breakpoint-down(sm) {
  .product-tocart.product-tocart-sm {
    .btn-sm {
      padding-inline: 0.75rem;
    }
  }
}

@include media-breakpoint-up(lg) {
  .product-tocart {
    font-size: $font-size-3;
    &.product-tocart-lg {
      .form-control {
        width: 7rem;
      }
    }
  }
}
</style>
