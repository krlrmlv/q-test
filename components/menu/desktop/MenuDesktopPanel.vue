<template>
  <div class="menu-desktop-panel">
    <h4>
      <b-link
        :to="localePath(`/catalog/${panel.slug || ''}`)"
        class="text-body text-hover-primary text-decoration-none"
        @click="setCatalogOpen(false)"
      >
        {{ panel.name }}
      </b-link>
    </h4>

    <CatalogPriceListLink
      v-if="priceXlsx"
      :price-xlsx="priceXlsx"
      class="mb-24"
    >
      {{ $t('global.downloadLightingPriceList') }}
    </CatalogPriceListLink>

    <ul v-if="!hasChildren" class="menu-desktop-nav">
      <li class="nav-item nav-item-header">
        <b-link :to="localePath(`/catalog/${panel.slug}`)" class="nav-link">
          {{ $t('catalog.goToCatalog') }}
        </b-link>
      </li>
    </ul>
    <div class="panel-row">
      <div
        v-for="(column, index) in categories"
        :key="`panel-column-${index}`"
        class="panel-column"
      >
        <MenuDesktopCategory
          v-for="category in column"
          :key="`${index}-${category.slug}`"
          :category="category"
          :locale="$i18n.locale"
          :prefix="category.slug"
          class="mb-24"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getViewportWidth } from '@/utils/window'

const BREAKPOINT_XL = 1240
const BREAKPOINT_LG = 992

const COLUMNS_COUNT = {
  xl: 3,
  lg: 2,
}

const LIGHTING_CATEGORY_ID = '84'

export default {
  props: {
    panel: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      panelRow: [],
      screenSize: undefined,
    }
  },

  computed: {
    ...mapGetters({
      currentCategorySlug: 'catalog/currentCategorySlug',
      settingByKey: 'settingByKey',
    }),

    priceXlsx() {
      const isLightingCategory = this.panel?.id === LIGHTING_CATEGORY_ID

      if (!isLightingCategory) return ''

      return this.$getStaticFile(this.settingByKey('price_lighting_xlsx'))
    },

    hasChildren() {
      return Boolean(this.panel?.children?.length)
    },

    categories() {
      if (!this.screenSize) return [this.categoriesFlat]

      const totalLines = this.categoriesFlat.reduce((count, cur) => {
        count++
        count += Math.min(4, cur.children?.length ?? 0)

        return count
      }, 0)

      const limit = Math.ceil(totalLines / COLUMNS_COUNT[this.screenSize])

      const columns = [[], [], []]
      columns.length = COLUMNS_COUNT[this.screenSize]

      let columnIndex = 0
      let linesAdded = 0

      this.categoriesFlat.forEach((category) => {
        const newLines = Math.min(4, category.children?.length ?? 0) + 1
        if (linesAdded + newLines > limit * (columnIndex + 1)) {
          columnIndex++
        }

        columns[columnIndex]?.push(category)
        linesAdded += newLines
      })

      return columns.filter((column) => column.length)
    },

    categoriesFlat() {
      return this.panel.children.map((category) => ({
        ...category,
        isCurrent:
          this.currentCategorySlug === category.slug ||
          this.currentCategorySlug === 'catalog',
      }))
    },
  },

  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('header', ['setCatalogOpen']),

    handleResize() {
      if (BREAKPOINT_LG > getViewportWidth()) {
        this.screenSize = undefined
        return
      }

      BREAKPOINT_XL > getViewportWidth()
        ? (this.screenSize = 'lg')
        : (this.screenSize = 'xl')
    },
  },
}
</script>

<style lang="scss">
.panel-row {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.panel-column {
  width: 50%;
  height: fit-content;
}

@include media-breakpoint-up(xxl) {
  .panel-column {
    width: calc(100% / 3);
  }
}
</style>
