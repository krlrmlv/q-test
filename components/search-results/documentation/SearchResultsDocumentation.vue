<template>
  <div class="mb-24 pb-lg-32">
    <b-row :class="{ loading: loading }" class="search-results-content mb-lg-8">
      <b-spinner v-if="loading" variant="muted" class="spinner-loading" />

      <b-col>
        <DocumentationSearchResults :items="documentation" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import DOCUMENTATION_SEARCH_QUERY from '@/graphql/search/SearchDocumentation'

export default {
  components: { BSpinner },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      documentation: [],
      loading: false,
    }
  },

  watch: {
    '$route.query.q'() {
      this.fetchDocuments()
    },

    open: {
      immediate: true,
      handler(value) {
        if (value) this.fetchDocuments()
      },
    },
  },

  methods: {
    async fetchDocuments() {
      const query = this.$route.query?.q?.split(' ')?.join('%') ?? ''

      const variables = {
        locale: this.$i18n.locale,
        query: `%${query}%`,
      }

      this.loading = true

      try {
        const { results } = await this.$graphql.default.request(
          DOCUMENTATION_SEARCH_QUERY,
          variables
        )
        this.documentation = results
      } catch (error) {}
      this.loading = false
    },
  },
}
</script>
