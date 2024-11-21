<template>
  <form class="distribution-search" @submit.prevent>
    <b-input-group class="input-group-flush bg-white">
      <b-form-input
        :placeholder="$t('global.search')"
        :value="value"
        type="search"
        @input="handleInput"
      />

      <template #append>
        <b-button
          :title="$t('global.search')"
          :aria-label="$t('global.search')"
          type="submit"
          variant="white"
          class="btn-icon"
        >
          <svg-icon
            name="search-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </template>
    </b-input-group>
  </form>
</template>

<script>
import { BInputGroup, BFormInput } from 'bootstrap-vue'

const DELAY = 700

export default {
  components: {
    BInputGroup,
    BFormInput,
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
      }, DELAY)
    },
  },
}
</script>
