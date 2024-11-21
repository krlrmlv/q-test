<template>
  <component
    :is="item.external ? 'SeoLink' : 'BLink'"
    :href="item.external ? item.href : localePath(item.href)"
    :rel="item.rel"
    :target="item.external ? '_blank' : null"
    :to="item.external ? item.to : localePath(item.to)"
    class="nav-link"
    @click="handleClick"
  >
    <span class="nav-link-icon">
      <svg-icon
        :name="item.icon"
        width="24"
        height="24"
        class="mr-8"
        aria-hidden="true"
      />
    </span>
    {{ $te(item.name) ? $t(item.name) : item.name }}
  </component>
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

  methods: {
    ...mapActions('header', ['closeAllMenus']),

    handleClick() {
      if (this.item?.ymEvent) this.$ym('reachGoal', this.item.ymEvent)

      if (this.item?.action) {
        this.$emit('action', this.item.action)
      } else {
        this.closeAllMenus()
      }
    },
  },
}
</script>
