<template>
  <b-button
    :href="priceXlsx"
    size="sm"
    variant="link"
    class="text-decoration-none p-0 border-0"
    @click="$emit('analytics-events')"
  >
    <slot></slot>
    <svg-icon
      name="download-16"
      width="16"
      height="16"
      class="ml-8"
      aria-hidden="true"
    />
  </b-button>
</template>

<script>
export default {
  props: {
    priceXlsx: {
      type: String,
      required: true,
    },
  },
}
</script>
