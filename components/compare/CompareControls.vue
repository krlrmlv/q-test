<template>
  <b-form-checkbox
    :checked="value"
    :disabled="disabled"
    @input="$emit('input', $event)"
  >
    {{ $t('compare.properties.showDifferent') }}
  </b-form-checkbox>
</template>

<script>
import { BFormCheckbox } from 'bootstrap-vue'

export default {
  components: { BFormCheckbox },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
