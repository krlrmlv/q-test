<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h2 class="mb-32">{{ $t('catalog.title') }}</h2>

    <CatalogControls />

    <client-only>
      <b-row>
        <b-col
          v-for="(category, index) in categories"
          :key="`category-${index}`"
          lg="6"
          class="mb-32 mb-sm-24"
        >
          <CatalogCategoryCard :category="category" :locale="$i18n.locale" />
        </b-col>
      </b-row>
    </client-only>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ store }) {
    /** Set 'catalog' to store for seo-links as tag <a></a> in header menu */
    store.commit('catalog/SET_CURRENT_CATEGORY_SLUG', 'catalog')
  },
  data() {
    return {
      breadcrumbs: [{ text: 'catalog.title', to: '/catalog', active: true }],
    }
  },

  head() {
    return {
      title: this.$t('catalog.pageTitle'),
    }
  },

  computed: {
    ...mapGetters('catalog', ['categories']),
  },

  mounted() {
    this.$ym('reachGoal', 'category_view', {
      category: 'catalog',
    })
    this.$ym('reachGoal', 'category_view_w_products', {
      category_p: 'catalog',
    })
  },
}
</script>
