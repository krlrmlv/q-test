<template>
  <ul class="menu-desktop-nav">
    <li class="nav-item nav-item-header">
      <b-link
        :to="localePath(`/catalog/${category.slug}`)"
        class="nav-link"
        @click="setCatalogOpen(false)"
      >
        {{ category.name }}
      </b-link>
    </li>

    <li
      v-for="(child, index) in items"
      :key="`visible-${category.slug}-${index}`"
      class="nav-item"
      :class="{ 'hidden-item': !collapseVisible && index + 1 > limit }"
    >
      <component
        :is="category.isCurrent ? 'BLink' : 'SeoCatalogLink'"
        :to="localePath(`/catalog/${child.slug}`)"
        class="nav-link"
        @click="setCatalogOpen(false)"
      >
        {{ child.name }}
      </component>
    </li>

    <li v-if="items.length > limit" role="presentation">
      <b-button
        :class="collapseVisible ? 'not-collapsed' : 'collapsed'"
        size="sm"
        variant="link"
        class="collapse-toggle"
        @click="collapseVisible = !collapseVisible"
      >
        <span
          v-text="collapseVisible ? $t('global.hide') : $t('catalog.showAll')"
        />
        <svg-icon
          name="caret"
          width="8"
          height="4"
          class="icon-caret ml-8"
          aria-hidden="true"
        />
      </b-button>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MenuDesktopCategory',

  serverCacheKey: ({ locale, category }) =>
    `${locale}::${category.id}::${category.created_at}::${category.isCurrent}`,

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    limit: {
      type: Number,
      default: 4,
    },
    locale: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      collapseVisible: false,
    }
  },

  computed: {
    items() {
      return this.category?.children ?? []
    },
  },

  watch: {
    '$route.path': 'handleRouteChange',
  },

  mounted() {
    this.$nextTick(() => {
      /** immediate: true doesn't work because this way BCollapse mounts after
       ** collapseVisible is set, so we have to trigger it manually in mounted() */
      this.handleRouteChange()
    })
  },

  methods: {
    ...mapActions('header', ['setCatalogOpen']),

    handleRouteChange() {
      const path = this.$route?.path ?? ''

      const isActiveCategory =
        path.includes(this.category?.slug) ||
        this.category?.children?.some((child) => path.includes(child?.slug))

      this.collapseVisible = isActiveCategory
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-desktop-nav {
  line-height: $line-height-menu-subcategory;

  .nav-item-header {
    line-height: $line-height-menu-category;
  }
}

.nav-item:not(:first-of-type) {
  color: $gray-700;
}

.hidden-item {
  display: none;
}

.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}
</style>
