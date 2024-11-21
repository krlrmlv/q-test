<template>
  <section class="catalog-product-tabs">
    <b-nav class="catalog-sidebar-toggles d-md-none" vertical>
      <b-nav-item
        v-for="tab in visibleTabs"
        :key="`tab-mobile-${tab}`"
        @click="sidebar = tab"
      >
        <span class="flex-fill">
          {{ $t(`solutions.tabs.${tab}.title`) }}
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

    <b-tabs
      v-model="tabIndex"
      content-class="pt-32 pt-lg-64"
      class="solution-tabs"
      justified
      lazy
    >
      <b-tab
        v-for="(tab, index) in visibleTabs"
        :key="`tab-${index}`"
        :active="sidebar === tab"
        :title="$t(`solutions.tabs.${tab}.title`)"
      >
        <CatalogOffcanvas
          :show="sidebar === tab"
          :title="$t(`solutions.tabs.${tab}.title`)"
          @close="sidebar = null"
        >
          <SolutionsTabSpecs
            v-if="tab === 'specs'"
            :items="specs"
            :slug="solution.slug"
          />
          <component
            :is="`solutions-tab-${tab}`"
            v-else
            :items="solution[tab]"
            :show="tabIndex === index"
            :solution-id="solution.id"
            :vendor-code="solution.vendor_code"
          />
        </CatalogOffcanvas>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import { BNav, BNavItem, BTabs, BTab } from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem,
    BTabs,
    BTab,
  },

  props: {
    solution: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      sidebar: null,
      specsFields: [
        'description',
        'functions',
        'advantages',
        'modifications',
        'modifications_aggregate',
        'specifications',
      ],
      tabIndex: -1,
      tabs: ['products', 'schemes', 'documentation', 'video', 'faq'],
    }
  },

  computed: {
    hasSpecs() {
      /* Check if solution has content for description tab */
      let result = false
      for (const key in this.specs) {
        if (this.specs?.[key]?.length) {
          result = true
          break
        }
      }

      return result
    },

    specs() {
      const specs = {}
      this.specsFields.forEach((key) => {
        specs[key] = this.solution?.[key] || []
      })
      return specs
    },

    visibleTabs() {
      /* Filter out tabs without content */
      const tabs = []
      if (this.hasSpecs) tabs.push('specs')

      this.tabs.forEach((key) => {
        if (this.solution?.[key]?.length) {
          tabs.push(key)
        }
      })

      return tabs
    },
  },
}
</script>

<style lang="scss" scoped>
.solution-tabs {
  ::v-deep {
    .nav-link {
      white-space: nowrap;
    }
  }
}

@include media-breakpoint-down(sm) {
  ::v-deep {
    .nav-tabs {
      display: none;
    }
  }
}
</style>
