<template>
  <div>
    <h3 class="mb-32">{{ category.name }}</h3>

    <div
      v-for="(article, index) in category.articles"
      :key="`article-${index}`"
      class="mb-24 mb-lg-32"
    >
      <h5 class="text-dark">
        <b-link
          :to="localePath(`/about/news/${article.slug}`)"
          class="text-reset"
        >
          {{ article.title }}
        </b-link>
      </h5>

      <b-row align-v="center" class="fs-2 text-muted mb-24 mb-lg-0">
        <b-col cols="auto" class="mr-auto">
          {{ formatDate(article.published_at) }}
        </b-col>
      </b-row>

      <hr
        v-if="index < category.articles.length - 1"
        class="border-gray-200 d-lg-none my-0"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'medium' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },
  },
}
</script>
