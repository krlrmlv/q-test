<template>
  <div
    class="d-flex flex-column align-items-center align-items-md-start px-16 py-16 px-md-32 alert-danger"
  >
    <span class="text-primary fs-2">{{ $t('catalog.withdrawn') }}</span>
    <b-button
      variant="outline-primary"
      class="mt-16"
      size="sm"
      block
      @click="scrollTo"
      >{{ $t('catalog.watchAnalogs') }}
      <svg-icon
        name="arrow-right-16"
        width="16"
        height="16"
        class="ml-8"
        aria-hidden="true"
    /></b-button>
  </div>
</template>

<script>
import { scrollToTarget } from '~/utils/window'

export default {
  methods: {
    scrollTo() {
      if (!process.client) return
      const scrollTarget = document.getElementById('analogs-section')
      scrollToTarget(scrollTarget)
    },
  },
}
</script>
