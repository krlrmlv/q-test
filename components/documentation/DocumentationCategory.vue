<template>
  <CardCollapse
    :title="category.name"
    :class="depth < 1 ? 'mb-16 mb-lg-24' : 'mt-16 mt-lg-24'"
    toggle-variant="secondary"
    class="support-documentation-category"
    @toggle-collapse="handleToggleCollapse"
  >
    <DocumentationCategory
      v-for="(category, index) in subcategories"
      :key="`child-category-${index}`"
      :category="category"
      :depth="depth + 1"
    />

    <div v-if="loading" class="mt-16 mt-lg-24">
      <b-spinner class="text-gray-200" />
    </div>

    <template v-else>
      <DocumentationCard
        v-for="(child, index) in children"
        :key="`child-${index}`"
        :item="child"
      />
    </template>
  </CardCollapse>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import DOCUMENTATION_ITEMS_QUERY from '@/graphql/documentation/DocumentationItems'

export default {
  name: 'DocumentationCategory',

  components: { BSpinner },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    depth: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      children: [],
      collapseShow: false,
      loading: false,
    }
  },

  computed: {
    subcategories() {
      return (
        this.category?.children?.filter((child) => child?.children?.length) ??
        []
      )
    },
  },

  methods: {
    async getChildren() {
      const variables = {
        locale: this.$i18n.locale,
        slug: this.category.slug,
      }

      this.loading = true

      try {
        const { categories } = await this.$graphql.default.request(
          DOCUMENTATION_ITEMS_QUERY,
          variables
        )
        this.children = categories?.[0]?.children ?? []
      } catch (error) {}

      this.loading = false
    },

    handleToggleCollapse(event) {
      if (event) this.getChildren()
    },
  },
}
</script>

<style lang="scss" scoped>
.support-documentation-category {
  ::v-deep {
    .card-documentation {
      margin-top: 0.5rem;
    }

    .support-documentation-category + .card-documentation {
      margin-top: 1rem;
    }
  }
}

@include media-breakpoint-up(lg) {
  .support-documentation-category {
    ::v-deep {
      .support-documentation-category + .card-documentation {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
