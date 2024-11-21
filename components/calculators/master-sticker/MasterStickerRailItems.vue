<template>
  <div
    :class="{ reversed: rail.isReversed }"
    class="mastersticker-rail-items-wrapper"
  >
    <div class="position-relative">
      <div
        class="mastersticker-rail-items"
        :style="{ width: `${railWidthMm}mm` }"
      >
        <MasterStickerModule
          v-for="(item, index) in rail.modules"
          :key="`module-${index}`"
          ref="modules"
          :active="index === activeModule"
          :height="rail.height"
          :is-first="index === 0"
          :is-last="index >= rail.modules.length - 1"
          :item="item"
          @click.native="onModuleClick($event, index)"
          @move="onModuleMove($event, index)"
          @remove="onModuleRemove(index)"
          @update="onModuleUpdate($event, index)"
        />

        <MasterStickerModuleCreate
          v-if="rail.width > filledWidth && step < 3"
          @create="$emit('create', $event)"
        />
      </div>

      <div
        v-for="(roomGroup, index) in roomGroups"
        :key="`room-group-${index}`"
        :style="{ left: `${roomGroup.start}mm`, width: `${roomGroup.width}mm` }"
        class="mastersticker-room-group"
      >
        {{ roomGroup.name }}
      </div>
    </div>

    <MasterStickerModuleConfig
      v-if="activeModule > -1"
      :item="rail.modules[activeModule]"
      :show="activeModule > -1 && step === 2"
      :style="configPosition"
      @update="onModuleUpdate($event, activeModule)"
    />

    <span class="mastersticker-rail-boundary a4" data-html2canvas-ignore="true">
      A4 (297&nbsp;{{ $t('units.mm', locale) }})
    </span>

    <span class="mastersticker-rail-boundary a3" data-html2canvas-ignore="true">
      A3 (420&nbsp;{{ $t('units.mm', locale) }})
    </span>

    <div
      v-if="overflow > 0"
      :style="{ left: `${railWidthMm}mm` }"
      class="mastersticker-rail-overflow"
      data-html2canvas-ignore="true"
    >
      {{ $t('calculators.masterSticker.oversize', locale) }}&nbsp;{{
        overflow
      }}&nbsp;{{ $t('units.mm', locale) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getViewportWidth } from '@/utils/window'

export default {
  props: {
    filledWidth: {
      type: [Number, String],
      default: 0,
    },
    filledWidthMm: {
      type: [Number, String],
      default: 0,
    },
    rail: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      activeModule: -1,
      breakpoint: 768,
      configPosition: {
        top: null,
        left: null,
      },
    }
  },

  computed: {
    ...mapGetters('mastersticker', ['locale', 'step', 'moduleWidth']),

    overflow() {
      return (
        Math.round(
          (this.filledWidth * this.moduleWidth - this.railWidthMm) * 100
        ) / 100
      )
    },

    roomGroups() {
      const groups = []
      let groupIndex = 0
      let inGroup = false
      let groupWidth = 0

      this.rail.modules.forEach(({ combine, room, width }, moduleIndex) => {
        if (combine && !inGroup) {
          inGroup = true
          groups[groupIndex] = {
            name: room,
            start: Math.round((groupWidth + 1) * 100) / 100,
          }
        } else if (!combine && inGroup) {
          inGroup = false
          groups[groupIndex].width =
            Math.round((groupWidth - groups[groupIndex].start - 1) * 100) / 100
          ++groupIndex
        } else if (combine && inGroup && groups[groupIndex].name !== room) {
          groups[groupIndex].width =
            Math.round((groupWidth - groups[groupIndex].start - 1) * 100) / 100
          ++groupIndex
          groups[groupIndex] = {
            name: room,
            start: Math.round((groupWidth + 1) * 100) / 100,
          }
        }

        groupWidth += width * this.moduleWidth

        if (moduleIndex === this.rail.modules.length - 1) {
          if (groups[groupIndex]) {
            groups[groupIndex].width =
              Math.round((groupWidth - groups[groupIndex].start - 1) * 100) /
              100
          }
        }
      })

      return groups
    },

    railWidthMm() {
      return Math.round(this.rail.width * this.moduleWidth * 100) / 100
    },
  },

  watch: {
    activeModule(value) {
      this.$emit('set-active', value > -1)
    },
  },

  methods: {
    onModuleClick({ target }, index) {
      const vw = getViewportWidth()
      const wrapper = target.closest('.mastersticker-module-wrapper')

      if (vw >= this.breakpoint) {
        const rail = target.closest('.mastersticker-rail-items-wrapper')

        if (wrapper) {
          const wrapperRect = wrapper.getBoundingClientRect()
          const railRect = rail.getBoundingClientRect()

          this.configPosition = {
            left: `${parseInt(
              wrapperRect.x + wrapperRect.width - railRect.x
            )}px`,
            top: `${parseInt(wrapperRect.top - railRect.top)}px`,
          }
        }
      } else {
        this.configPosition = {
          left: null,
          top: null,
        }
      }

      if (index !== this.activeModule) {
        this.setActiveModule(index)
      } else {
        this.unsetActiveModule()
      }
    },

    onModuleClickOutside({ target }) {
      const targetWrapper = target.closest('.mastersticker-module-wrapper')
      const activeWrapper =
        this.$refs.modules &&
        this.$refs.modules[this.activeModule] &&
        this.$refs.modules[this.activeModule].$el
      if (targetWrapper !== activeWrapper) {
        this.unsetActiveModule()
      }
    },

    onModuleMove(event, index) {
      let newIndex = index
      const direction = event
      if (direction === 'left' && index > 0) {
        newIndex--
      } else if (
        direction === 'right' &&
        index < this.rail.modules.length - 1
      ) {
        newIndex++
      }
      this.$emit('move', { newIndex, index })
      this.setActiveModule(newIndex)
    },

    onModuleRemove(index) {
      this.$emit('remove', index)
      this.activeModule = -1
    },

    onModuleUpdate(event, index) {
      this.$emit('update', { ...event, index })
    },

    setActiveModule(index) {
      this.activeModule = index
      document.addEventListener('click', this.onModuleClickOutside)
    },

    unsetActiveModule() {
      this.activeModule = -1
      document.removeEventListener('click', this.onModuleClickOutside)
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-rail-items-wrapper {
  position: relative;
}

.mastersticker-rail-items {
  position: relative;
  display: flex;
  justify-content: flex-start;
  border: none;
  border-left: $border-width solid $border-color;
  z-index: 9;
}

.mastersticker-rail-boundary {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0 0 1rem 0.5rem;
  font-size: $font-size-1;
  line-height: 1;
  white-space: nowrap;
  border-left: 1px solid $gray-100;
  color: $gray-300;
  z-index: -1;

  @media (min-width: calc(297mm + 25.5rem)) {
    &.a4 {
      display: block;
      left: 297mm;
    }
  }

  @media (min-width: calc(420mm + 25.5rem)) {
    &.a3 {
      display: block;
      left: 420mm;
    }
  }
}

.mastersticker-room-group {
  position: absolute;
  left: 1mm;
  bottom: 1mm;
  padding: 0.5mm 0;
  font-size: 3mm;
  font-weight: $font-weight-bold;
  line-height: 1;
  text-align: center;
  border: none;
  border-bottom: $border-width solid $body-color;
  z-index: 10;

  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    height: 2mm;
  }

  &::before {
    left: 0;
    border-left: $border-width solid $body-color;
  }

  &::after {
    right: 0;
    border-right: $border-width solid $body-color;
  }
}

.reversed .mastersticker-room-group {
  top: 1mm;
  bottom: auto;
  border: none;
  border-top: $border-width solid $body-color;

  &::before,
  &::after {
    top: 0;
    bottom: auto;
  }
}

.mastersticker-rail-overflow {
  position: absolute;
  left: 297mm;
  top: 0;
  bottom: 0;
  padding: 0 0.5rem;
  font-size: $font-size-1;
  line-height: 1;
  color: $primary;
  border-left: $border-width solid $danger;
  background-color: transparent;
  pointer-events: none;
  z-index: 10;
}

@include media-breakpoint-up(md) {
  .mastersticker-rail-items-wrapper {
    padding-top: calc(3.1875rem + 16px + #{$border-width * 2});
  }
}
</style>
