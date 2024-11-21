<template>
  <div class="masterlight-tooltip ml-8">
    <b-button
      :id="targetId"
      :title="$t('calculators.masterLight.tooltipTitle')"
      :aria-label="$t('calculators.masterLight.tooltipTitle')"
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
      {{ $t('calculators.masterLight.tooltip') }}
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  components: { BTooltip },
  computed: {
    targetId() {
      return `tooltip-target-${this._uid}`
    },
  },
}
</script>

<style lang="scss" scoped>
.masterlight-tooltip {
  display: flex;
}

.tooltip-target {
  padding: 0;
  border: none;
  color: $secondary;
}
</style>
