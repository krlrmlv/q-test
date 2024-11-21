<template>
  <div>
    <DocumentationCard
      v-for="(product, index) in itemsPage"
      :key="`product-${index}`"
      :item="product"
      is-product
      class="mb-8"
    />

    <AppPagination
      v-if="items.length > perPage"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="items.length"
      align="center"
      size="sm"
      class="mt-32"
      @change="scrollTop"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: [Number, String],
      default: 20,
    },
  },

  data() {
    return {
      currentPage: 1,
    }
  },

  computed: {
    itemsPage() {
      const perPage = Number(this.perPage) || 20
      const start = (this.currentPage - 1) * perPage
      const end = start + perPage
      return this.items.slice(start, end)
    },
    // perPage() {
    //   return parseInt(this.$route.query.perPage) || 20
    // },
  },

  methods: {
    scrollTop() {
      if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  },
}
</script>
