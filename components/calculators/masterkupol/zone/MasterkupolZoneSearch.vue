<template>
  <b-input-group class="input-group-flush">
    <b-form-input
      :value="value"
      :placeholder="$t('calculators.masterKupol.climateZones.placeholder')"
      type="search"
      autocomplete="off"
      @input="handleInput"
    />
    <template #append>
      <b-button
        :title="$t('global.search')"
        type="submit"
        variant="link"
        class="btn-icon"
      >
        <svg-icon name="search-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-input-group>
</template>

<script>
import { BFormInput, BInputGroup } from 'bootstrap-vue'

export default {
  components: {
    BFormInput,
    BInputGroup,
  },

  props: {
    value: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      timeout: null,
    }
  },

  methods: {
    handleInput(event) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('input', event)
      }, 500)
    },
  },
}
</script>
