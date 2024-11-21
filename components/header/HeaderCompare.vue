<template>
  <transition name="fade">
    <div v-show="mounted && compareProductCount" class="header-compare ml-24">
      <b-button
        :title="$t('catalog.goToCompare')"
        :to="localePath('/compare')"
        :variant="variant"
        :aria-label="$t('catalog.goToCompare')"
        class="btn-icon rounded-pill position-relative"
      >
        <svg-icon name="compare-24" width="24" height="24" aria-hidden="true" />

        <CountBadge :loading="loading" :value="compareProductCount" />
      </b-button>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const COOKIE_NAME = 'compare_product_ids'
const POLLING_INTERVAL = 2000

export default {
  props: {
    variant: {
      type: String,
      default: 'gray-200',
    },
  },

  data() {
    return {
      cookieValue: null,
      pollingEnabled: false,
    }
  },

  computed: {
    ...mapGetters('compare', ['compareProductCount']),
    ...mapGetters('header', ['mounted']),

    loading() {
      return this.$fetchState?.pending
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initCookieListeners()
    })
  },

  beforeUnmount() {
    this.removeCookieStoreListener()
    this.stopCookiePolling()
  },

  methods: {
    ...mapActions('compare', ['updateCompareProducts']),

    addCookieStoreListener() {
      window.cookieStore.addEventListener(
        'change',
        this.handleCookieStoreChange
      )
    },

    checkCookieChange() {
      if (!this.pollingEnabled) return

      const products = this.$cookies.get(COOKIE_NAME)
      const newCookieValue = this.getCookieString(products)

      if (newCookieValue !== this.cookieValue) {
        this.updateCompareProducts({ products, updateCookie: false })
        this.cookieValue = newCookieValue
      }

      setTimeout(() => this.checkCookieChange(), POLLING_INTERVAL)
    },

    getCookieString(compareCookie) {
      if (!Array.isArray(compareCookie)) return ''
      return compareCookie.join(',')
    },

    handleCookieStoreChange({ changed }) {
      const compareCookie = changed.find(({ name }) => name === COOKIE_NAME)

      if (!compareCookie) return

      try {
        const products = JSON.parse(decodeURIComponent(compareCookie.value))

        if (Array.isArray(products)) {
          this.updateCompareProducts({ products, updateCookie: false })
        }
      } catch (error) {
        /* Skip JSON.parse errors */
      }
    },

    initCookieListeners() {
      if (!process.client) return

      if ('cookieStore' in window) {
        /* Chromium supports listening to cookie change via CookieStore API */
        this.addCookieStoreListener()
      } else {
        /* Use polling for other browsers */
        this.startCookiePolling()
      }
    },

    removeCookieStoreListener() {
      if (process.client && 'cookieStore' in window) {
        window.cookieStore.removeEventListener(
          'change',
          this.handleCookieStoreChange
        )
      }
    },

    startCookiePolling() {
      this.cookieValue = this.getCookieString(this.$cookies.get(COOKIE_NAME))
      this.pollingEnabled = true

      this.checkCookieChange()
    },

    stopCookiePolling() {
      this.pollingEnabled = false
    },
  },
}
</script>

<style lang="scss" scoped>
.header-compare {
  position: relative;
}

::v-deep {
  .count-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
