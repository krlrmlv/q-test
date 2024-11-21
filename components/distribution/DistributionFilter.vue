<template>
  <b-row class="mx-n12">
    <b-col
      v-for="option in options"
      :key="`option-${option.value}`"
      cols="12"
      sm="6"
      lg="auto"
      class="mb-8 px-12"
    >
      <b-form-radio
        :checked="checked"
        :value="option.value"
        @input="$emit('input', $event)"
      >
        {{ $te(option.text) ? $t(option.text) : option.text }}
      </b-form-radio>
    </b-col>
  </b-row>
</template>

<script>
import { BFormRadio } from 'bootstrap-vue'

export default {
  components: { BFormRadio },

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    checked: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
