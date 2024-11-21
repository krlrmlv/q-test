<template>
  <transition :name="transition" mode="out-in">
    <div v-if="condition" :class="placeholderClass">
      <b-spinner
        :type="spinnerType"
        :variant="variant"
        :style="{ width: spinnerSize, height: spinnerSize }"
      />
    </div>

    <div v-else>
      <slot />
    </div>
  </transition>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  props: {
    condition: {
      type: Boolean,
      default: false,
    },
    placeholderClass: {
      type: [String, Object, Array],
      default: 'text-center',
    },
    spinnerSize: {
      type: String,
      default: null,
    },
    spinnerType: {
      type: String,
      default: 'border',
    },
    transition: {
      type: String,
      default: 'fade',
    },
    variant: {
      type: String,
      default: 'muted',
    },
  },
}
</script>
