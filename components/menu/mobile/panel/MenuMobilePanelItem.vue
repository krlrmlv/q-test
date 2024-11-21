<template>
  <li class="nav-item">
    <component
      :is="hasLink ? 'BLink' : 'span'"
      :to="itemLink"
      :href="item.href"
      class="nav-link"
      @click="handleClick(item)"
    >
      {{ $te(item.name) ? $t(item.name) : item.name }}
    </component>

    <b-button
      v-if="hasChildren"
      :title="$t('global.forward')"
      :aria-label="$t('global.forward')"
      variant="link"
      class="btn-icon nav-btn pr-0"
      @click="$emit('action')"
    >
      <svg-icon
        name="chevron-right-24"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </b-button>
  </li>
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

    hasLink() {
      return this.item?.to || this.item?.href || this.item?.slug
    },

    itemLink() {
      return this.item.slug
        ? this.localePath(`/catalog/${this.item.slug}`)
        : this.localePath(this.item.to)
    },
  },

  methods: {
    ...mapActions('header', ['closeAllMenus']),

    handleClick() {
      if (!this.hasLink && this.hasChildren) {
        this.$emit('action')
      } else {
        this.closeAllMenus()
      }
    },
  },
}
</script>
