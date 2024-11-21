<template>
  <div
    class="mastersticker-module-wrapper"
    :class="[{ active }, `module-${item.moduleType}`]"
    :style="{ width: `${width}mm` }"
  >
    <div
      :style="{ height: `${headerHeight}mm` }"
      :data-html2canvas-ignore="!printHeader"
      class="mastersticker-module"
    >
      <p class="mb-0">
        {{ moduleTypeSymbol(item.moduleType) }}
      </p>

      <p v-if="step < 3" class="module-width my-8">
        {{ width }}
      </p>

      <MasterStickerModuleControls
        v-show="active && step < 3"
        :is-first="isFirst"
        :is-last="isLast"
        :is-min-width="item.width <= 0.5"
        @move="$emit('move', $event)"
        @remove="$emit('remove')"
        @update-width="onUpdateWidth"
      />
    </div>

    <MasterStickerModuleLabel :height="height" :item="item" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: 25,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters('mastersticker', [
      'headerHeight',
      'moduleTypeSymbol',
      'moduleWidth',
      'printHeader',
      'step',
    ]),

    width() {
      return Math.round(this.item.width * this.moduleWidth * 100) / 100
    },
  },

  methods: {
    onUpdateWidth(event) {
      if (event === 'decrease' && this.item.width > 0.5) {
        this.$emit('update', {
          field: 'width',
          value: this.item.width - 0.5,
        })
      } else if (event === 'increase') {
        this.$emit('update', {
          field: 'width',
          value: this.item.width + 0.5,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-module-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 8.9mm;
  border: $border-width solid $border-color;
  border-left: none;
  background-color: $white;
  cursor: pointer;
  z-index: 1;

  &.active {
    z-index: 11;
  }

  &.module-spacer {
    border-color: transparent;

    & + .mastersticker-module-wrapper:not(.module-spacer) {
      &::before {
        display: block;
        content: '';
        position: absolute;
        left: -$border-width;
        top: 0;
        bottom: -$border-width;
        border-left: $border-width solid $border-color;
      }
    }
  }
}

.reversed {
  .mastersticker-module-wrapper {
    flex-direction: column-reverse;
  }
}

.mastersticker-module {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25mm;
  margin-bottom: 0.25mm;
  padding: 2.5mm 1mm;
  font-size: 3mm;
  color: $white;
  background-color: $gray-600;
}

.module-spacer .mastersticker-module {
  background-color: transparent;

  & > :not(.module-controls):not(.module-width) {
    display: none;
  }

  .module-width {
    color: $gray-400;
  }
}
</style>
