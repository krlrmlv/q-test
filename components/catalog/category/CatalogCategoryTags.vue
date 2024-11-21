<template>
  <section :style="{ '--collapse-height': collapseHeight }">
    <b-collapse
      ref="collapse"
      v-model="collapseOpen"
      class="catalog-category-tags"
    >
      <div ref="collapseContent" class="collapse-content">
        <CatalogCategoryTagsGroup
          v-for="(group, index) in tagGroups"
          :key="`group-${index}`"
          :group="group"
          :class="{ 'mt-32': index > 0 }"
        />
      </div>
    </b-collapse>

    <b-button
      v-if="collapseVisible"
      :class="{ 'not-collapsed': collapseOpen }"
      variant="link"
      class="collapse-toggle"
      @click="toggleCollapse"
    >
      {{ collapseOpen ? $t('global.hide') : $t('catalog.showMore') }}
      <svg-icon
        name="caret"
        width="8"
        height="4"
        class="icon-caret ml-8"
        aria-hidden="true"
      />
    </b-button>
  </section>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'

export default {
  components: { BCollapse },

  props: {
    tagGroups: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      collapseOpen: false,
      collapseVisible: false,
      heightCollapsed: '4rem',
      heightExpanded: 'auto',
    }
  },

  computed: {
    collapseHeight() {
      return this.collapseOpen ? this.heightExpanded : this.heightCollapsed
    },
  },

  mounted() {
    this.initCollapse()
    window.addEventListener('resize', this.initCollapse, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.initCollapse)
  },

  methods: {
    initCollapse() {
      const collapse = this.$refs.collapse.$el
      const collapseContent = this.$refs.collapseContent
      if (collapseContent?.offsetHeight > collapse?.offsetHeight) {
        this.heightExpanded = `${collapseContent.offsetHeight}px`
        this.collapseVisible = true
      }
    },

    toggleCollapse() {
      this.initCollapse()
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-category-tags {
  display: block !important;
  height: var(--collapse-height) !important;
  overflow: hidden;
}

.collapse-toggle {
  margin-top: 2rem;
  padding: 0;
  font-size: $font-size-2;
  line-height: 1.2;
  border: none;
  color: $secondary;
  text-decoration: none;
}
</style>
