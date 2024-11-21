<template>
  <div :key="`price-range-filter-key-${key}`" class="form-range-multiple">
    <b-form-input
      :debounce="debounce"
      :disabled="disabled"
      :max="range.max"
      :min="range.min"
      :value="localValue.min"
      type="range"
      class="form-range-min"
      @change="onUserChangedMin"
      @update="setMin"
    />
    <b-form-input
      :debounce="debounce"
      :disabled="disabled"
      :max="range.max"
      :min="range.min"
      :value="localValue.max"
      type="range"
      class="form-range-max"
      @change="onUserChangedMax"
      @update="setMax"
    />

    <span
      v-if="displayRangeConstraint"
      class="form-available-range-fill"
      :style="{ left: fillAvailableStart, right: fillAvailableEnd }"
    />

    <span
      class="form-range-fill"
      :style="{ left: fillStart, right: fillEnd }"
    />
  </div>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'

export default {
  components: { BFormInput },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    availableRange: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    debounce: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    value: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
  },

  data() {
    return {
      key: 0,
      localValue: { ...this.value },
      prevValue: null,
    }
  },

  computed: {
    displayRangeConstraint() {
      return (
        parseInt(this.range.min) < parseInt(this.availableRange.min) ||
        parseInt(this.range.max) > parseInt(this.availableRange.max)
      )
    },

    fillStart() {
      const ratio =
        (this.value.min - parseInt(this.range.min)) /
        (parseInt(this.range.max) - parseInt(this.range.min))
      return `calc(${ratio * 100}% + 1.375rem * (${0.5 - ratio}))`
    },

    fillEnd() {
      const ratio =
        (this.value.max - parseInt(this.range.min)) /
        (parseInt(this.range.max) - parseInt(this.range.min))
      return `calc(${100 - ratio * 100}% - 1.375rem * (${0.5 - ratio}))`
    },

    fillAvailableStart() {
      const ratio =
        (parseInt(this.availableRange.min) - parseInt(this.range.min)) /
        (parseInt(this.range.max) - parseInt(this.range.min))
      return `calc(${ratio * 100}%  + 1.375rem * (${0.5 - ratio}))`
    },

    fillAvailableEnd() {
      const ratio =
        (parseInt(this.availableRange.max) - parseInt(this.range.min)) /
        (parseInt(this.range.max) - parseInt(this.range.min))
      return `calc(${100 - ratio * 100}% - 1.375rem * (${0.5 - ratio}))`
    },
  },

  watch: {
    availableRange: {
      deep: true,
      handler(availableRange) {
        if (
          typeof availableRange.min !== 'number' &&
          typeof availableRange.max !== 'number'
        ) {
          return
        }

        let changed = false
        if (this.localValue.min < availableRange.min) {
          this.localValue.min = availableRange.min
          changed = true
        }
        if (this.localValue.max > availableRange.max) {
          this.localValue.max = availableRange.max
          changed = true
        }
        if (changed) {
          this.$emit('change', this.localValue)
        }
      },
    },

    value: {
      deep: true,
      handler(newValue) {
        let changed = false
        if (!isNaN(newValue.min)) {
          if (newValue.min < parseInt(this.availableRange.min)) {
            this.localValue.min = parseInt(this.availableRange.min)
            changed = true
          } else this.localValue.min = newValue.min
        }
        if (!isNaN(newValue.max)) {
          if (newValue.max > parseInt(this.availableRange.max)) {
            this.localValue.max = parseInt(this.availableRange.max)
            changed = true
          } else this.localValue.max = newValue.max
        }
        if (changed) {
          this.$emit('change', this.localValue)
        }
      },
    },
  },

  mounted() {
    let changed = false
    if (this.localValue.min < parseInt(this.availableRange.min)) {
      this.localValue.min = parseInt(this.availableRange.min)
      changed = true
    }
    if (this.localValue.max > parseInt(this.availableRange.max)) {
      this.localValue.max = parseInt(this.availableRange.max)
      changed = true
    }
    if (changed) {
      this.$emit('change', this.localValue)
    }
  },

  methods: {
    onUserChangedMax() {
      if (this.prevValue.max !== this.localValue.max) {
        this.$emit('change-by-user', { ...this.localValue })
      }
    },

    onUserChangedMin() {
      if (this.prevValue.min !== this.localValue.min) {
        this.$emit('change-by-user', { ...this.localValue })
      }
    },

    setMax(value) {
      this.prevValue = { ...this.localValue }
      const max = parseInt(value, 10)
      if (max > parseInt(this.range.max))
        this.localValue.max = parseInt(this.range.max)
      else if (max > parseInt(this.availableRange.max)) {
        this.localValue.max = parseInt(this.availableRange.max)
        setTimeout(() => this.key++, this.debounce)
      } else this.localValue.max = max
      if (this.localValue.min > max) this.localValue.min = max
      this.$emit('change', this.localValue)
    },

    setMin(value) {
      this.prevValue = { ...this.localValue }
      const min = parseInt(value, 10)
      if (min < parseInt(this.range.min))
        this.localValue.min = parseInt(this.range.min)
      else if (min < parseInt(this.availableRange.min)) {
        this.localValue.min = parseInt(this.availableRange.min)
        setTimeout(() => this.key++, this.debounce)
      } else this.localValue.min = min
      if (this.localValue.max < min) this.localValue.max = min
      this.$emit('change', this.localValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-range-multiple {
  position: relative;
  height: $custom-range-thumb-height;

  .custom-range {
    position: relative;
    pointer-events: none;
    z-index: 2;

    &::-webkit-slider-thumb {
      pointer-events: all;
    }

    &::-moz-range-thumb {
      pointer-events: all;
    }

    &::-ms-thumb {
      pointer-events: all;
    }

    &::-webkit-slider-runnable-track {
      background-color: transparent;
    }

    &::-moz-range-track {
      background-color: transparent;
    }

    &::-ms-track {
      background-color: transparent;
    }

    &::-ms-fill-lower {
      background-color: transparent;
    }

    &::-ms-fill-upper {
      background-color: transparent;
    }
  }

  .form-range-min {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .form-range-max {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
  }

  .form-range-fill {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - #{$custom-range-track-height * 0.5});
    height: $custom-range-track-height;
    border-radius: $custom-range-track-border-radius;
    background-color: $gray-500;
    z-index: 2;
  }
  .form-available-range-fill {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - #{$custom-range-track-height * 0.5});
    height: $custom-range-track-height;
    border-radius: $custom-range-track-border-radius;
    border-left: 1px solid $gray-700;
    border-right: 1px solid $gray-700;
    background-color: $gray-300;
    z-index: 1;
  }

  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - #{$custom-range-track-height * 0.5});
    height: $custom-range-track-height;
    border-radius: $custom-range-track-border-radius;
    background-color: $custom-range-track-bg;
    box-shadow: $custom-range-track-box-shadow;
    z-index: 0;
  }
}
</style>
