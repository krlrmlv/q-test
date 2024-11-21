<template>
  <b-row>
    <b-col cols="12" sm="auto">
      <b-button
        :disabled="loading"
        variant="primary"
        block
        @click="$emit('click'), scrollTop()"
      >
        {{ $t(title) }}
        <b-spinner v-if="loading" class="ml-8" small />
        <svg-icon
          v-else
          name="arrow-right-24"
          width="24"
          height="24"
          aria-hidden="true"
          class="ml-8"
        />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'calculators.masterKupol.nextStep',
    },
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
