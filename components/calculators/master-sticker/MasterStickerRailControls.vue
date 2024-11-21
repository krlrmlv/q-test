<template>
  <div>
    <p class="h7 rail-header">
      <span class="rail-title">
        {{ title }}
      </span>

      <b-button
        :aria-label="$t('global.delete', locale)"
        :title="$t('global.delete', locale)"
        variant="gray-200"
        size="sm"
        class="btn-icon border-0 rounded-pill ml-auto p-1"
        @click="$emit('remove')"
      >
        <svg-icon name="close-16" width="16" height="16" aria-hidden="true" />
      </b-button>
    </p>

    <b-form-group
      :label="$t('calculators.masterSticker.labelPosition', locale)"
      label-size="sm"
    >
      <b-form-select v-model="localIsReversed" :options="positions" size="sm" />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterSticker.railSize', locale)"
      label-size="sm"
    >
      <b-form-select v-model="localWidth" :options="widthOptions" size="sm" />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterSticker.labelHeight', locale)"
      label-size="sm"
    >
      <b-form-select v-model="localHeight" :options="heightOptions" size="sm" />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterSticker.filled', locale)"
      label-size="sm"
    >
      <b-form-input
        :value="`${filled} ${$t('units.mm', locale)}`"
        size="sm"
        readonly
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormSelect, BFormInput } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BFormGroup,
    BFormSelect,
    BFormInput,
  },

  props: {
    filled: {
      type: [Number, String],
      default: 0,
    },
    rail: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      heights: [20, 25, 30, 35],
      widths: [{ label: 'A4', options: [6, 8, 9, 10, 12, 13, 14] }],
    }
  },

  computed: {
    ...mapGetters('mastersticker', ['locale']),

    localHeight: {
      get() {
        return this.rail.height
      },
      set(value) {
        this.$emit('update', { field: 'height', value })
      },
    },

    localIsReversed: {
      get() {
        return this.rail.isReversed
      },
      set(value) {
        this.$emit('update', { field: 'isReversed', value })
      },
    },

    localWidth: {
      get() {
        return this.rail.width
      },
      set(value) {
        this.$emit('update', {
          field: 'width',
          oldValue: this.rail.width,
          value,
        })
      },
    },

    heightOptions() {
      return this.heights.map((value) => {
        return {
          value,
          text: `${value} ${this.$t('units.mm', this.locale)}`,
        }
      })
    },

    positions() {
      return [
        {
          value: false,
          text: this.$t(
            'calculators.masterSticker.labelPositionBottom',
            this.locale
          ),
        },
        {
          value: true,
          text: this.$t(
            'calculators.masterSticker.labelPositionTop',
            this.locale
          ),
        },
      ]
    },

    widthOptions() {
      return this.widths.map((group) => {
        return {
          label: group.label,
          options: group.options.map((value) => {
            return {
              value,
              text: `${value} ${this.$t(
                'calculators.masterSticker.modules',
                this.locale
              )}`,
            }
          }),
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.rail-header {
  display: flex;
  align-items: center;
  max-width: 100%;
  line-height: 1.5;
}

.rail-title {
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
