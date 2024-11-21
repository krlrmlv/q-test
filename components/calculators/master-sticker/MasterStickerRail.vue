<template>
  <b-row :class="{ active }" class="mastersticker-rail">
    <b-col cols="12" md="auto" order-md="2" class="mb-24 mb-md-0">
      <MasterStickerRailItems
        :filled-width="railFilledWidth"
        :filled-width-mm="railFilledWidthMm"
        :rail="rail"
        @create="onItemCreate"
        @move="onItemMove"
        @remove="onItemRemove"
        @set-active="active = $event"
        @update="onItemsUpdate"
      />
    </b-col>

    <b-col
      class="mb-24 mb-md-0"
      cols="12"
      data-html2canvas-ignore="true"
      md="auto"
      order-md="1"
    >
      <div class="mastersticker-aside">
        <transition name="fade" mode="out-in">
          <MasterStickerRailControls
            v-if="step < 3"
            :filled="railFilledWidthMm"
            :rail="rail"
            :title="getRailTitle(index)"
            @remove="removeRail(index)"
            @update="onRailUpdate"
          />

          <MasterStickerResultExport
            v-else-if="index === 0"
            :busy-printing="busyPrinting"
            :busy-saving="busySaving"
            data-html2canvas-ignore="true"
            @print="$emit('print')"
            @save-pdf="$emit('save-pdf')"
          />
        </transition>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    busyPrinting: {
      type: Boolean,
      default: false,
    },
    busySaving: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 1,
    },
    rail: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      active: false,
    }
  },

  computed: {
    ...mapGetters('mastersticker', ['locale', 'step', 'moduleWidth']),

    railFilledWidthMm() {
      return Math.round(this.railFilledWidth * this.moduleWidth * 10) / 10
    },

    railFilledWidth() {
      return this.rail.modules.reduce((acc, cur) => acc + cur.width, 0)
    },
  },

  methods: {
    ...mapActions('mastersticker', [
      'addModule',
      'moveModule',
      'removeModule',
      'removeRail',
      'updateModuleParameters',
      'updateRail',
    ]),

    getRailTitle(index) {
      return `${this.$t('calculators.masterSticker.rail', this.locale)} ${
        index + 1
      }`
    },

    onItemCreate(moduleType) {
      this.addModule({ moduleType, railIndex: this.index })
    },

    onItemMove(event) {
      this.moveModule({ ...event, railIndex: this.index })
    },

    onItemRemove(index) {
      this.removeModule({ index, railIndex: this.index })
    },
    onItemsUpdate(event) {
      this.updateModuleParameters({ ...event, railIndex: this.index })
    },

    onRailUpdate(event) {
      this.updateRail({ ...event, railIndex: this.index })
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-rail {
  position: relative;
  z-index: 0;

  &.active {
    z-index: 1;
  }
}
</style>
