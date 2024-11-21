<template>
  <article>
    <h2>
      {{ article.title }}
    </h2>

    <b-row align-v="center" class="fs-2 text-muted mb-32">
      <b-col cols="8">
        {{ formatDate(article.published_at) }}
      </b-col>
      <!-- <b-col cols="4" class="text-right">
        <div class="d-inline-flex align-items-center">
          <span class="text-secondary mr-8">
            <svg-icon
              name="eye-16"
              width="16"
              height="16"
              aria-label="Просмотры"
            />
          </span>
          234
        </div>
      </b-col> -->
    </b-row>

    <LazyMarkdownContent :content="article.text" class="news-item-text mb-32" />
  </article>
</template>

<script>
export default {
  props: {
    article: {
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
