<template>
  <div class="form-tooltip ml-4">
    <b-button
      :id="targetId"
      :title="buttonTitle"
      :aria-label="buttonTitle"
      variant="link"
      class="tooltip-target"
    >
      <svg-icon name="tooltip-20" width="20" height="20" aria-hidden="true" />
    </b-button>
    <b-tooltip
      :target="targetId"
      custom-class="mb-12"
      placement="topright"
      triggers="click hover"
    >
      <slot />
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  components: { BTooltip },

  props: {
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    buttonTitle() {
      return this.title || this.$t('form.tooltipTitle')
    },
    targetId() {
      return `tooltip-target-${this._uid}`
    },
  },
}
</script>

<style lang="scss" scoped>
.form-tooltip {
  display: flex;
}

.tooltip-target {
  padding: 0;
  border: none;
  color: $secondary;
}
</style>
