<template>
  <b-form-spinbutton
    v-model="localValue"
    :disabled="disabled"
    :inline="inline"
    :max="max"
    :min="min"
    :readonly="readonly"
    :size="size"
    :state="state"
    :step="step"
    :wrap="wrap"
    label-decrement="–"
    label-increment="+"
    placeholder="-"
    class="form-spinbutton"
  >
    <template #decrement>
      <svg-icon
        name="forms/arrow-left-16"
        width="16"
        height="16"
        class="fill-gray-500"
        aria-hidden="true"
      />
    </template>
    <template #increment>
      <svg-icon
        name="forms/arrow-right-16"
        width="16"
        height="16"
        class="fill-gray-500"
        aria-hidden="true"
      />
    </template>
  </b-form-spinbutton>
</template>

<script>
import { BFormSpinbutton } from 'bootstrap-vue'

export default {
  components: { BFormSpinbutton },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    max: {
      type: [String, Number],
      default: null,
    },
    min: {
      type: [String, Number],
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
    step: {
      type: [String, Number],
      default: null,
    },
    value: {
      type: [Boolean, Number],
      default: false,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.form-spinbutton {
  ::v-deep {
    .btn {
      transition: none;
    }
  }
}
</style>
