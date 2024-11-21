<template>
  <div>
    <b-form-group
      v-for="(color, index) in colors"
      :key="`color-${index}`"
      :label="getLabel(index)"
      label-size="sm"
    >
      <b-row class="mx-n4">
        <b-col cols="6" class="px-4">
          <b-form-input
            :value="color.text"
            type="text"
            size="sm"
            @input="updateColor($event, index, 'text')"
          />
        </b-col>

        <b-col cols="6" class="px-1">
          <b-form-input
            :value="color.value"
            type="color"
            size="sm"
            @input="updateColor($event, index, 'value')"
          />
        </b-col>
      </b-row>
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
    colors: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['locale']),
  },

  methods: {
    getLabel(index) {
      return `${this.$t(
        'calculators.masterSticker.config.color',
        this.locale
      )} ${index + 1}`
    },

    updateColor(event, colorIndex, field) {
      const colors = cloneDeep(this.colors)

      if (colors[colorIndex]) {
        colors[colorIndex][field] = event
      }

      this.$emit('change', colors)
    },
  },
}
</script>
