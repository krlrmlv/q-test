<template>
  <b-link
    :to="hasChildren ? null : localePath(item.to)"
    :href="hasChildren ? null : localePath(item.href)"
    class="nav-link"
    @click="handleClick"
  >
    <svg-icon
      name="chevron-right-24"
      width="24"
      height="24"
      class="mr-8"
      aria-hidden="true"
    />
    {{ $te(item.name) ? $t(item.name) : item.name }}
  </b-link>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    hasChildren() {
      return Boolean(this.item?.children?.length)
    },
  },

  methods: {
    ...mapActions('header', ['closeAllMenus']),

    handleClick() {
      if (this.hasChildren) {
        this.$emit('action')
      } else {
        this.closeAllMenus()
      }
    },
  },
}
</script>
