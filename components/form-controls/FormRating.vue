<template>
  <b-form-rating
    v-model="localValue"
    :color="color"
    :disabled="disabled"
    :inline="inline"
    :readonly="readonly"
    :show-clear="showClear"
    :show-value="showValue"
    :size="size"
    :variant="variant"
    :class="variant ? `text-${variant}` : null"
    no-border
  >
    <template #icon-empty>
      <svg-icon name="forms/star-16" width="16" height="16" />
    </template>
    <template #icon-full>
      <svg-icon name="forms/star-16" width="16" height="16" />
    </template>
    <template #icon-half>
      <svg-icon name="forms/star-half-16" width="16" height="16" />
    </template>
  </b-form-rating>
</template>

<script>
import { BFormRating } from 'bootstrap-vue'

export default {
  components: { BFormRating },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    color: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: false,
    },
    showValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    variant: {
      type: String,
      default: null,
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
