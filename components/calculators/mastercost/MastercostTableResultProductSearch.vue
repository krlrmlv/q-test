<template>
  <b-container fluid="lg" class="mastercost-result-product-search-container">
    <div>
      <b-input-group class="input-group-flush">
        <b-form-input
          :placeholder="
            hasAnalog
              ? $t('inputPlaceholder')
              : $t('calculators.masterCost.notFound')
          "
          :value="q"
          type="text"
          :class="!hasAnalog ? 'not-found' : ''"
          @input="handleSearchInput"
        />
        <template #append>
          <b-button
            :title="$t('global.search')"
            variant="link"
            class="btn-icon"
            @click="handleSearch"
          >
            <svg-icon
              name="search-24"
              width="16"
              height="16"
              aria-hidden="true"
            />
          </b-button>
        </template>
      </b-input-group>

      <div :class="{ show: visible }" class="dropdown">
        <transition name="fade" mode="out-in">
          <div
            :key="visible"
            :class="{ show: visible }"
            role="menu"
            tabindex="-1"
            class="dropdown-menu mastercost-search-product"
          >
            <div v-if="loading" class="dropdown-item-text">
              <b-spinner variant="gray-600" small />
            </div>

            <div v-else-if="hasResults">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="(product, index) in products"
                  :key="`${product.vendor_code}-${index}`"
                >
                  <b-link
                    class="dropdown-item product-link"
                    @click="handleProductClick(product)"
                  >
                    <span
                      :class="{ 'mr-4': product.vendor_code }"
                      v-html="product.name"
                    />
                    <span
                      v-if="product.vendor_code"
                      class="text-secondary text-lowercase"
                      v-html="product.vendor_code"
                    />
                  </b-link>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <b-link
      v-if="hasAnalog"
      :href="localePath(`/catalog/products/${slug || vendorCode}`)"
      target="_blank"
      class="product-link text-reset"
    >
      <svg-icon
        name="open_in_new"
        :aria-label="vendorCode"
        width="16"
        height="16"
      />
    </b-link>
  </b-container>
</template>

<script>
import { BFormInput, BInputGroup, BSpinner } from 'bootstrap-vue'
import SEARCH_PRODUCTS_QUERY from '@/graphql/calculators/mastercost/SearchProductsWithAssemblies'

export default {
  components: {
    BFormInput,
    BInputGroup,
    BSpinner,
  },
  props: {
    vendorCode: {
      type: String,
      default: '',
    },
    hasAnalog: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      q: '',
      searchOpen: false,
      abortController: null,
      categories: [],
      visible: false,
      loading: false,
      products: [],
      timeout: null,
    }
  },
  computed: {
    hasResults() {
      return Boolean(this.products?.length)
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
    vendorCode(value) {
      this.q = value
    },
    visible(visible) {
      if (visible) {
        setTimeout(() => {
          document.addEventListener('click', this.handleClickOutside)
        }, 0)
      }
    },
  },
  mounted() {
    this.q = this.vendorCode
  },
  methods: {
    handleSearchInput(event) {
      this.q = event
      clearTimeout(this.timeout)

      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }

      this.timeout = setTimeout(() => {
        if (this.q?.length) {
          this.products = []
          return this.handleSearch()
        } else {
          this.visible = false
          this.products = []
        }
      }, 500)
    },
    async handleSearch() {
      this.loading = true
      this.visible = true

      const variables = {
        locale: this.$i18n.locale,
        page_url: this.pageUrl,
        q: this.q,
        user_ip: this.$store.getters.clientIp,
      }

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }

        const { products } = await this.$graphql.default.request({
          document: SEARCH_PRODUCTS_QUERY,
          variables,
          signal: this.abortController?.signal,
        })

        this.products = products
      } catch (error) {}
      this.loading = false
    },
    handleClickOutside(event) {
      const isInside = Boolean(
        event?.target?.closest('.dropdown-menu.mastercost-search-product')
      )
      if (!isInside && this.visible) {
        this.visible = false
        this.abortController.abort()
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    handleProductClick(product) {
      this.visible = false
      this.$emit('selected', product)
      document.removeEventListener('click', this.handleClickOutside)
      this.products = []
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables';
.mastercost-result-product-search-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: stretch;
  padding: 0;

  .input-group {
    flex-wrap: nowrap;
    .form-control {
      height: 2rem;
      padding: 6px 0px 6px 16px;
      line-height: 1.25;
      border-color: transparent;
      // min-width: 150px;
      &.not-found::placeholder {
        color: $danger;
      }
    }
    .btn-icon {
      border-color: transparent;
      padding: 6px 12px 6px 12px;
      line-height: 1.25;
    }

    &:focus-within {
      .form-control,
      .btn-icon {
        border-color: $border-color;
      }
    }
  }

  .product-link {
    margin-left: 12px;
  }
}
.dropdown-menu.mastercost-search-product {
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  line-height: 1.4;
  width: calc(var(--mastercost-analog-dropdown-width) - 32px) !important;
  border: none;
  overflow: hidden;
}

::v-deep {
  .dropdown-item {
    &:hover {
      color: inherit;
    }
  }
}

.product-link {
  white-space: normal;
}
</style>

<i18n>
  {
    "en": {
      "inputPlaceholder": "Analog search"
    },
    "ru": {
      "inputPlaceholder": "Поиск аналога"
    }
  }
  </i18n>
