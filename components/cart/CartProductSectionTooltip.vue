<template>
  <div class="tooltip-wrapper">
    <span :id="targetId">
      <svg-icon
        name="info-16"
        width="16"
        height="16"
        class="icon-style"
        aria-hidden="true"
      />
    </span>

    <b-tooltip
      ref="tooltip"
      :target="targetId"
      placement="auto"
      triggers="focus hover"
      :offset="28"
    >
      <span>{{ $t(hint) }} </span>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="white"
        class="d-md-none btn-icon tooltip-close text-muted rounded-pill"
        @click="hideTooltip"
      >
        <svg-icon
          name="close-16"
          width="16"
          height="16"
          aria-hidden="true"
        />
      </b-button>
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  components: { BTooltip },

  props: {
    hint: {
      type: String,
      required: true,
    },
  },

  computed: {
    targetId() {
      return `tooltip-target-${this._uid}`
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
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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
    max-width: 350px;
  }

  .arrow {
    height: 1rem !important;
    width: 1rem !important;
    &::before {
      border-width: 0.5rem !important;
    }
  }

  @media (max-width: 420px) {
    .tooltip-inner {
      max-width: 256px;
    }
  }
}

.icon-style {
  color: $gray-700;
  cursor: pointer;
  margin-left: 8px;
}
</style>
