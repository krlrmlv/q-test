<template>
  <b-form-checkbox
    v-model="localChecked"
    :state="state"
    :unchecked-value="uncheckedValue"
  >
    <component
      :is="`form-accept-${localeSuffix}`"
      :class="{ 'text-danger': state === false }"
      class="form-accept"
    />
  </b-form-checkbox>
</template>

<script>
import { BFormCheckbox } from 'bootstrap-vue'

export default {
  components: { BFormCheckbox },

  model: {
    prop: 'checked',
    event: 'input',
  },

  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    state: {
      type: Boolean,
      default: null,
    },
    uncheckedValue: {
      type: null,
      default: undefined,
    },
  },

  computed: {
    localChecked: {
      get() {
        return this.checked
      },
      set(event) {
        this.$emit('input', event)
      },
    },

    localeSuffix() {
      return this.$i18n.locale ?? 'ru'
    },
  },
}
</script>

<style lang="scss" scoped>
.form-accept {
  font-size: $font-size-1;
  line-height: 1.2;
  color: $gray-600;
}
</style>
