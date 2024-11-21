<template>
  <b-nav class="catalog-sidebar-toggles d-md-none" vertical>
    <b-nav-item
      v-for="item in items"
      :key="`nav-item-${item.key}`"
      @click="$emit('click', item.key)"
    >
      <span class="flex-fill">
        {{ item.title }}
      </span>
      <svg-icon
        name="chevron-right-24"
        width="24"
        height="24"
        class="ml-8"
        aria-hidden="true"
      />
    </b-nav-item>
  </b-nav>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
