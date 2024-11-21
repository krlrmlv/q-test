<template>
  <div class="module-controls">
    <b-button
      v-if="!isFirst"
      :aria-label="$t('calculators.masterSticker.module.moveLeft', locale)"
      :title="$t('calculators.masterSticker.module.moveLeft', locale)"
      variant="link"
      class="btn-module-move btn-module-move-left"
      @click.stop="$emit('move', 'left')"
    >
      <svg-icon
        name="arrow-left-16"
        width="16"
        height="16"
        aria-hidden="true"
      />
    </b-button>

    <b-button
      v-if="!isLast"
      :aria-label="$t('calculators.masterSticker.module.moveRight', locale)"
      :title="$t('calculators.masterSticker.module.moveRight', locale)"
      variant="link"
      class="btn-module-move btn-module-move-right"
      @click.stop="$emit('move', 'right')"
    >
      <svg-icon
        name="arrow-right-16"
        width="16"
        height="16"
        aria-hidden="true"
      />
    </b-button>

    <b-button
      v-if="!isMinWidth"
      :aria-label="$t('calculators.masterSticker.module.widthDecrease', locale)"
      :title="$t('calculators.masterSticker.module.widthDecrease', locale)"
      variant="white"
      class="btn-module-width btn-module-width-decrease"
      @click.stop="$emit('update-width', 'decrease')"
    >
      <svg-icon name="minus-16" width="16" height="16" aria-hidden="true" />
    </b-button>

    <b-button
      :aria-label="$t('calculators.masterSticker.module.widthIncrease', locale)"
      :title="$t('calculators.masterSticker.module.widthIncrease', locale)"
      variant="white"
      class="btn-module-width btn-module-width-increase"
      @click.stop="$emit('update-width', 'increase')"
    >
      <svg-icon name="plus-16" width="16" height="16" aria-hidden="true" />
    </b-button>

    <b-button
      :aria-label="$t('calculators.masterSticker.module.remove', locale)"
      :title="$t('calculators.masterSticker.module.remove', locale)"
      variant="white"
      class="btn-module-remove"
      @click.stop="$emit('remove')"
    >
      <svg-icon name="close-16" width="16" height="16" />
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    isMinWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['locale']),
  },
}
</script>

<style lang="scss" scoped>
.module-controls {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}

.btn-module-move,
.btn-module-width,
.btn-module-remove {
  position: absolute;
  padding: 0.25rem;
  border-radius: $rounded-pill;
  border: none;
}

.btn-module-move {
  top: 0.5mm;
  color: $white;

  &.btn-module-move-left {
    left: 0.5mm;
  }

  &.btn-module-move-right {
    right: 0.5mm;
  }
}

.btn-module-width {
  top: 50%;
  box-shadow: 0 0 1mm rgba($black, 0.1);

  &.btn-module-width-decrease {
    left: 0;
    transform: translateX(-50%) translateY(-50%);
  }

  &.btn-module-width-increase {
    right: 0;
    transform: translateX(50%) translateY(-50%);
  }
}

.btn-module-remove {
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-110%);
}

.reversed {
  .btn-module-remove {
    top: auto;
    bottom: 0;
    transform: translateX(-50%) translateY(110%);
  }
}
</style>
