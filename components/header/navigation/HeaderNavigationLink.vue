<template>
  <b-nav-item :to="localePath(item.to)">{{
    $te(item.name) ? $t(item.name) : item.name
  }}</b-nav-item>
</template>

<script>
import { BNavItem } from 'bootstrap-vue'

export default {
  components: { BNavItem },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
