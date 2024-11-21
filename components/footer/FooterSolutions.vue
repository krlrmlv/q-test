<template>
  <FooterLinksCollapse :links-group="solutions" :loading="loading" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.fetchCategories()
  },

  computed: {
    ...mapGetters('solutions', ['categories']),

    loading() {
      return this.$fetchState?.pending
    },

    solutions() {
      return {
        title: 'solutions.title',
        link: this.localePath('/solutions'),
        items: this.categories?.slice(0, 5)?.map(({ name, slug }) => {
          return {
            title: name,
            link: this.localePath(`/solutions/${slug}`),
          }
        }),
      }
    },
  },

  methods: {
    ...mapActions('solutions', ['fetchCategories']),
  },
}
</script>
