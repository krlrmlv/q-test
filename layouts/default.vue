<template>
  <div id="app-root">
    <HeaderWrapper />
    <HeaderBackdrop />

    <Nuxt />
    <FooterWrapper />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mindboxUserVisit } from '~/utils/mindbox'

export default {
  name: 'LayoutDefault',

  middleware({ route, store, $cookies }) {
    /* Set product sort options and selected sort mode based on whether
     * current page is search results or not */
    const routeIsSearch = route?.name?.startsWith('search')
    const storeIsSearch = store.getters['category/isSearch']

    if (routeIsSearch !== storeIsSearch) {
      /* Dispatch action only when needed */
      store.dispatch('category/setIsSearch', routeIsSearch)
    }
    if (!route.path.startsWith('/catalog')) {
      store.commit('catalog/SET_CURRENT_CATEGORY_SLUG')
    }

    if (process.client) mindboxUserVisit($cookies)
  },

  async fetch() {
    await this.getClientLocation()
    await this.fetchDefaultLocations()
  },

  head() {
    return {
      title: this.$t('global.siteTitle'),
    }
  },

  async beforeCreate() {
    await this.$store.dispatch('fetchFilesSettings')
  },

  mounted() {
    /** Optimization for Yandex indexing */
    window.YandexRotorSettings = {
      WaiterEnabled: true,
    }
    setTimeout(function () {
      window.YandexRotorSettings.IsLoaded = true
    }, 5000)

    this.$root.$on('bv::modal::show', () => {
      this.setBodyFixed(true)
    })
    this.$root.$on('bv::modal::hidden', () => {
      this.setBodyFixed(false)
    })
  },

  methods: {
    ...mapActions(['setBodyFixed']),
    ...mapActions('geo', ['fetchDefaultLocations', 'getClientLocation']),
  },
}
</script>

<style>
.grecaptcha-badge {
  display: none;
}
</style>
