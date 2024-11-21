<template>
  <div class="tooltip-wrapper alert-gray">
    <i18n
      :id="targetId"
      :path="i18nPath + '.title'"
      tag="b-button"
      :title="$t('calculators.masterLight.tooltipTitle')"
      :aria-label="$t('calculators.masterLight.tooltipTitle')"
      class="tooltip-target text-gray-700 btn-tooltip"
      variant="link"
    />

    <b-tooltip
      ref="tooltip"
      :target="targetId"
      placement="auto"
      triggers="focus hover"
      :offset="28"
    >
      <span>{{ $t(i18nPath + '.hint') }} </span>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="white"
        class="d-md-none btn-icon tooltip-close text-muted rounded-pill"
        @click="hideTooltip"
      >
        <svg-icon name="close-16" width="16" height="16" aria-hidden="true" />
      </b-button>
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'
import { ANALOGS_FUNCTIONAL_TYPES } from '~/components/constants/product'

const I18N_KEYS = {
  [ANALOGS_FUNCTIONAL_TYPES.replacement]: 'replacement',
  [ANALOGS_FUNCTIONAL_TYPES.direct]: 'direct',
  [ANALOGS_FUNCTIONAL_TYPES.functional]: 'functional',
}

export default {
  components: { BTooltip },

  props: {
    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    targetId() {
      return `tooltip-target-${this._uid}`
    },

    i18nPath() {
      return `catalog.analogs.${I18N_KEYS[this.type]}`
    },
  },
  methods: {
    hideTooltip() {
      this.$refs?.tooltip?.doClose()
    },
  },
}
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
  border-radius: 0.25rem;

  .btn-tooltip {
    border-radius: 0.25rem;
    font-size: $font-size-1;
    font-weight: $font-weight-normal;
    padding: 0.25rem 0.375rem;
    text-decoration: none;

    &:hover,
    &:focus {
      background: $gray-400;
    }
  }
}

.b-tooltip {
  z-index: 2;
}

.b-tooltip {
  &[x-placement^='top'] {
    margin-bottom: 0.5rem;
    ::v-deep {
      .arrow {
        bottom: -1rem !important;
      }
    }
  }

  &[x-placement^='left'] {
    margin-right: 0.75rem;
    ::v-deep {
      .arrow {
        right: -1rem !important;
      }
    }
  }

  &[x-placement^='right'] {
    margin-left: 0.75rem;
    ::v-deep {
      .arrow {
        left: -1rem !important;
      }
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 0.5rem;
    ::v-deep {
      .arrow {
        top: -1rem !important;
      }
    }
  }
}

.tooltip-close {
  position: absolute;
  top: 0;
  right: 0;
}

::v-deep {
  .tooltip-inner {
    max-width: 256px;
  }

  .arrow {
    height: 1rem !important;
    width: 1rem !important;
    &::before {
      border-width: 0.5rem !important;
    }
  }
}
</style>
