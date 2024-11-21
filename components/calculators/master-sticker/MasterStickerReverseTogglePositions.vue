<template>
  <div>
    <b-form-group
      v-for="(position, index) in positions"
      :key="`position-${index}`"
      :label="$t(position.label, locale)"
      label-size="sm"
    >
      <b-form-input
        :value="getPositionText(position)"
        type="text"
        size="sm"
        class="mb-8"
        @input="updatePosition($event, index, 'text')"
      />

      <MasterStickerGroupSelector
        :value="position.groupId"
        class="mb-8"
        @change="updatePosition($event, index, 'groupId')"
      />

      <MasterStickerIconSelector
        v-if="position.name !== '0'"
        :value="position.icon"
        @change="updatePosition($event, index, 'icon')"
      />
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormInput } from 'bootstrap-vue'
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

export default {
  components: {
    BFormGroup,
    BFormInput,
  },

  props: {
    positions: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['locale']),
  },

  methods: {
    getPositionText(position) {
      return this.$te(position.text, this.locale)
        ? this.$t(position.text, this.locale)
        : position.text
    },

    updatePosition(event, positionIndex, field) {
      const positions = cloneDeep(this.positions)

      if (positions[positionIndex]) {
        positions[positionIndex][field] = event
      }

      this.$emit('change', positions)
    },
  },
}
</script>
