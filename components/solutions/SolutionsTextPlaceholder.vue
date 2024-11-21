<template>
  <div>
    <b-skeleton v-for="i in lines" :key="`skeleton-${i}`" />
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'

export default {
  components: { BSkeleton },

  props: {
    lines: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .b-skeleton-text {
    display: inline-block;
    width: 100%;
    height: 1em;
    vertical-align: baseline;

    &:last-of-type {
      width: 67%;
    }
  }
}
</style>
