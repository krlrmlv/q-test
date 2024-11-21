<template>
  <b-tooltip
    :placement="placement"
    :target="target"
    :title="title"
    boundary-padding="0"
    custom-class="tooltip-text-overflow"
  />
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  components: { BTooltip },

  props: {
    placement: {
      type: String,
      default: 'bottom',
    },
    target: {
      type: [Function, Object, String],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.tooltip-text-overflow {
  padding-top: 0;
  padding-bottom: 0;

  .arrow {
    display: none;
  }

  .tooltip-inner {
    max-width: 100vw;
    padding: 0.375rem 0.5rem;
    border-radius: 0;
    border: $border-width solid $border-color;
    color: $secondary;
    background-color: $light;
    box-shadow: $box-shadow-sm;
  }
}
</style>
