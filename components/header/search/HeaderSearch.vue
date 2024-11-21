<template>
  <b-collapse
    ref="collapse"
    :visible="searchOpen"
    :class="{ expanded: dropdownVisible }"
    class="header-search"
  >
    <b-container fluid="lg" class="header-search-container">
      <HeaderSearchForm
        ref="form"
        :query="query"
        @focus="handleSearchFocus"
        @input="handleSearchInput"
        @submit="handleSearchSubmit"
      />

      <HeaderSearchDropdown
        :categories="categories"
        :loading="loading"
        :products="products"
        :query="query"
        :visible="dropdownVisible"
        @clear-input="clearInput"
        @close="hideDropdown"
        @history-click="updateSearchInput"
        @switch-layout="switchQueryLayout"
      />
    </b-container>
  </b-collapse>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import SEARCH_SUGGESTIONS_QUERY from '@/graphql/search/SearchSuggestions'
import { getViewportWidth } from '@/utils/window'

const SEARCH_DEBOUNCE = 500

export default {
  components: { BCollapse },

  data() {
    return {
      abortController: null,
      categories: [],
      dropdownVisible: false,
      loading: false,
      products: [],
      query: null,
      timeout: null,
    }
  },

  computed: {
    ...mapGetters('header', ['breakpoint', 'searchOpen']),
    ...mapGetters('searchHistory', ['searchHistoryItems']),

    collapse() {
      return this.$refs.collapse
    },

    pageUrl() {
      const baseUrl = process.env.SITE_URL
        ? process.env.SITE_URL.endsWith('/')
          ? process.env.SITE_URL.slice(0, -1)
          : process.env.SITE_URL
        : ''
      return baseUrl + this.$route.fullPath
    },
  },

  watch: {
    dropdownVisible: {
      handler(event) {
        /* Fix body only when search results open in mobile.
         * Unfix when dropdown closes */
        const isMobile = this.breakpoint > getViewportWidth()
        this.setBodyFixed(isMobile && event)
      },
    },

    searchOpen: {
      handler(event) {
        if (event) this.handleSearchOpen()
      },
    },
  },

  created() {
    if (this.$route.query.q) {
      this.query = this.$route.query.q
    }
  },

  mounted() {
    this.loadSearchHistory()
  },

  methods: {
    ...mapActions(['setBodyFixed']),
    ...mapActions('header', ['setSearchOpen']),
    ...mapActions('searchHistory', [
      'addSearchHistoryItem',
      'loadSearchHistory',
    ]),

    async search() {
      this.loading = true

      const variables = {
        locale: this.$i18n.locale,
        page_url: this.pageUrl,
        q: this.query,
        category_query: `%${this.query}%`,
        user_ip: this.$store.getters.clientIp,
      }

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }

        const { categories, products } = await this.$graphql.default.request({
          document: SEARCH_SUGGESTIONS_QUERY,
          variables,
          signal: this.abortController?.signal,
        })

        this.products = products

        categories.forEach((category, index) => {
          if (category.parent && category.parent.id !== category.root.id) {
            categories[index].breadcrumbs = [category.root, category.parent]
          } else {
            categories[index].breadcrumbs = [category.root]
          }
        })

        this.categories = categories
      } catch (error) {}
      this.loading = false
    },

    handleClickOutside(event) {
      const isInside = Boolean(event?.target?.closest('.app-header'))
      if (!isInside) {
        this.dropdownVisible = false
        this.setSearchOpen(false)
        document.removeEventListener('click', this.handleClickOutside)
      }
    },

    handleSearchFocus() {
      if (this.query?.length) {
        this.search()
      }
      if (this.searchHistoryItems?.length || this.query?.length) {
        this.dropdownVisible = true
      }
    },

    handleSearchInput(event) {
      this.query = event
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        if (this.query?.length) {
          this.dropdownVisible = true
          return this.search()
        } else {
          this.hideDropdown()
          this.resetSuggestions()
        }
      }, SEARCH_DEBOUNCE)
    },

    handleSearchOpen() {
      /* Focus search field */
      const input = this.$refs.form?.$el.querySelector('input[type=search]')
      if (input) {
        this.$nextTick(() => {
          input.focus()
        })
      }

      /* Close search on click outside header, only on desktop */
      const isMobile = this.breakpoint > getViewportWidth()
      if (!isMobile) {
        document.addEventListener('click', this.handleClickOutside)
      }
    },

    async handleSearchSubmit(q) {
      this.hideDropdown()

      /* Prevent dropdown from opening again after request made */
      clearTimeout(this.timeout)

      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }

      if (q?.length) {
        await this.addSearchHistoryItem(q)

        return this.$router.push({
          path: this.localePath('/search'),
          query: { q },
        })
      }
    },

    clearInput() {
      this.query = null
      this.resetSuggestions()
    },

    hideDropdown() {
      this.dropdownVisible = false
    },

    resetSuggestions() {
      this.products = []
      this.categories = []
    },

    switchQueryLayout(event) {
      this.query = event
      return this.search()
    },

    updateSearchInput(query) {
      this.query = query
      this.handleSearchSubmit(query)
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  .header-search {
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-height: calc(100vh - $header-height-mobile);

    &.expanded {
      height: calc(100vh - $header-height-mobile);
    }
  }

  .header-search-container {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    min-height: 0;
    padding-bottom: 1rem;
  }
}

@include media-breakpoint-up(lg) {
  body:not(.header-collapsed) {
    .header-search {
      display: block !important;
    }

    .header-search-container {
      padding-left: 1rem;
      padding-right: 0;
    }
  }
}
</style>
