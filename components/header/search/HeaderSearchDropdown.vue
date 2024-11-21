<template>
  <div
    ref="dropdown"
    :class="{ show: visible }"
    :style="{ '--menu-width': menuWidth }"
    class="dropdown header-search-dropdown"
  >
    <transition name="fade" mode="out-in">
      <div
        :key="visible"
        :class="{ show: visible }"
        role="menu"
        tabindex="-1"
        class="dropdown-menu"
      >
        <HeaderSearchHistory
          v-if="hasHistory"
          :items="filteredHistoryItems"
          :show-controls="!hasQuery"
          @clear="clearSearchHistory"
          @click="$emit('history-click', $event)"
          @remove="deleteSearchHistoryItem($event)"
        />

        <div v-if="loading" class="dropdown-item-text">
          <b-spinner variant="gray-200" />
        </div>

        <div v-else-if="hasResults">
          <HeaderSearchProducts :products="products" @click="$emit('close')" />
          <HeaderSearchCategories
            v-if="hasCategories"
            :categories="categories"
            @click="$emit('close')"
          />
        </div>

        <p v-else-if="hasQuery" class="dropdown-item-text text-muted mb-0">
          {{ $t('search.empty') }}
          <b-link
            v-if="probableQuery"
            class="text-reset"
            @click.stop.prevent="$emit('switch-layout', probableQuery)"
          >
            {{ $t('search.wrongLayoutHint') }}
            <strong class="text-secondary">{{ probableQuery }}</strong>
          </b-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import ru from 'convert-layout/ru'

export default {
  components: { BSpinner },

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    query: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      menuWidth: null,
    }
  },

  computed: {
    ...mapGetters('searchHistory', ['searchHistoryItems']),

    filteredHistoryItems() {
      return this.searchHistoryItems.filter((item) =>
        this.query?.length ? item.includes(this.query) : true
      )
    },

    hasCategories() {
      return Boolean(this.categories?.length)
    },

    hasHistory() {
      return Boolean(this.filteredHistoryItems?.length)
    },

    hasQuery() {
      return Boolean(this.query?.length)
    },

    hasResults() {
      return Boolean(this.products?.length || this.categories?.length)
    },

    probableQuery() {
      return this.query?.length && !this.hasResults
        ? this.convertLayout(this.query) !== this.query
          ? this.convertLayout(this.query)
          : null
        : null
    },

    categoriesFormatted() {
      const categoriesFormatted = structuredClone(this.categories)
      categoriesFormatted.forEach((item) => {
        if (item.breadcrumbs) {
          item.breadcrumbs = item.breadcrumbs.map((item) => {
            return {
              text: item.name,
              to: `/catalog/${item.slug}`,
            }
          })
        }
      })

      return categoriesFormatted
    },
  },

  watch: {
    visible: {
      immediate: true,
      handler(event) {
        if (process.client && event)
          document.addEventListener('click', this.handleDocumentClick)
      },
    },
  },

  mounted() {
    this.getMenuWidth()
    window.addEventListener('resize', this.getMenuWidth, { passive: true })
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.getMenuWidth)
  },

  methods: {
    ...mapActions('searchHistory', [
      'clearSearchHistory',
      'deleteSearchHistoryItem',
    ]),

    convertLayout(input) {
      const isCyrillic = /^[\u0400-\u04FF\s\d.,-_?!+'"]+$/.test(input)
      return isCyrillic ? input : ru.fromEn(input)
    },

    handleDocumentClick(event) {
      const isInside = Boolean(event?.target?.closest('.header-search'))
      if (!isInside) {
        this.$emit('close')
        if (process.client) {
          document.removeEventListener('click', this.handleDocumentClick)
        }
      }
    },

    getMenuWidth() {
      const dropdown = this.$refs.dropdown
      if (dropdown) {
        const header = dropdown.closest('.header-content')
        if (header) {
          const dropdownBox = dropdown.getBoundingClientRect()
          const headerBox = header.getBoundingClientRect()

          this.menuWidth = `${Math.round(
            headerBox.width - dropdownBox.left + headerBox.left
          )}px`
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  min-width: 100%;
  margin-top: 0;
  padding: 0.5rem 0;
  line-height: 1.4;
}

::v-deep {
  .dropdown-item {
    &:hover {
      color: inherit;
    }
  }
}

@include media-breakpoint-down(md) {
  .header-search-dropdown {
    flex: 0 1 auto;
    min-height: 0;
    margin-left: -0.5 * $grid-gutter-width;
    margin-right: -0.5 * $grid-gutter-width;
    overflow-y: auto;
  }

  .dropdown-menu {
    float: none;
    position: static;
    width: 100% !important;
    margin-top: 1rem;
    padding: 0;
    border: none;
    box-shadow: none;
    overflow: hidden;
  }
}

@include media-breakpoint-up(lg) {
  body:not(.header-collapsed) {
    .dropdown-menu {
      width: calc(var(--menu-width) - #{$grid-gutter-width * 0.5});
      margin-top: 0.5rem;
    }
  }
}
</style>
