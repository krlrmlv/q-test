<template>
  <li role="presentation">
    <div v-if="hasChildren" :class="{ show: open }" class="dropdown dropright">
      <b-link
        role="menuitem"
        class="dropdown-item has-children"
        @mouseover="handleToggleMouseover"
      >
        {{ $te(item.name) ? $t(item.name) : item.name }}
      </b-link>
      <ul
        :class="{ show: open }"
        role="menu"
        tabindex="-1"
        class="dropdown-menu"
        @mouseover="handleMenuMouseover"
      >
        <b-dropdown-item
          v-for="(child, index) in item.children"
          :key="`child-${index}`"
          :to="localePath(child.to)"
          :href="child.href"
          exact-active-class="dropdown-item-active"
          @click="$emit('link-click')"
        >
          {{ $te(child.name) ? $t(child.name) : child.name }}
        </b-dropdown-item>
      </ul>
    </div>

    <b-link
      v-if="!hasChildren && !hasSeoLink"
      :to="localePath(item.to)"
      :href="item.href"
      exact-active-class="dropdown-item-active"
      role="menuitem"
      class="dropdown-item"
      @click="$emit('link-click')"
    >
      {{ $t(item.name) }}
    </b-link>

    <SeoLink
      v-if="hasSeoLink"
      :href="item.href"
      target="_blank"
      class="dropdown-item"
    >
      {{ $t(item.name) }}
    </SeoLink>
  </li>
</template>

<script>
import { BDropdownItem } from 'bootstrap-vue'

const DELAY = 300

export default {
  components: { BDropdownItem },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      timeout: null,
    }
  },

  computed: {
    hasChildren() {
      return Boolean(this.item?.children?.length)
    },
    hasSeoLink() {
      return Boolean(this.item?.href)
    },
  },

  methods: {
    handleMenuMouseover(event) {
      clearTimeout(this.timeout)
      const menu = event?.target?.closest('.dropdown-menu')
      menu?.addEventListener('mouseout', this.handleMouseout)
    },

    handleMouseout(event) {
      this.timeout = setTimeout(() => {
        event?.target?.removeEventListener('mouseout', this.onToggleOut)
        this.$emit('set-close')
      }, DELAY)
    },

    handleToggleMouseover(event) {
      event?.target?.addEventListener('mouseout', this.handleMouseout)
      this.$emit('set-open')
    },
  },
}
</script>

<style lang="scss" scoped>
$dropdown-caret: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#{$secondary}" d="M 6.4141,3.5859 5,5 l 3,3 -3,3 1.4141,1.4141 3.707,-3.707 V 7.293 L 6.4141,3.586 Z"/></svg>');

.dropdown-menu {
  margin-top: calc(-1rem - 1px);
  margin-left: 1rem;
}

.dropdown-item {
  &.has-children {
    padding-right: calc(1.5rem + 16px);
    background-image: escape-svg($dropdown-caret);
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 16px;
    cursor: default;
  }
}
</style>
