<template>
  <b-row align-v="center" class="fs-2 text-muted">
    <b-col md="6" class="mb-16">
      {{ formatDate(article.published_at) }}
    </b-col>

    <b-col md="6" class="d-flex flex-wrap justify-content-md-end mb-16">
      <span v-if="article.likes" class="d-flex align-items-center">
        <svg-icon
          :aria-label="$t('blog.likes')"
          name="like-16"
          width="16"
          height="16"
          class="align-self-start text-secondary mt-2 mr-8"
        />
        {{ article.likes }}
      </span>

      <span class="d-flex align-items-center ml-24">
        <svg-icon
          :aria-label="$t('blog.timeToRead')"
          name="clock-16"
          width="16"
          height="16"
          class="align-self-start text-secondary mt-2 mr-8"
        />
        {{ getTimeToRead(article.text) }}&nbsp;{{ $t('blog.min') }}
      </span>

      <!-- <span class="d-flex align-items-center ml-24">
        <svg-icon
          name="comment-16"
          width="16"
          height="16"
          class="align-self-start text-secondary mt-2 mr-8"
          aria-hidden="true"
        />
        {{ article.commentCount || 0 }}&nbsp;{{
          getDeclension(article.commentCount, $t('blog.commentDeclensions'))
        }}
      </span> -->
    </b-col>
  </b-row>
</template>

<script>
import getDeclension from '@/utils/declension'

export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getDeclension,

    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'medium' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },

    getTimeToRead(text) {
      if (!text) return 0
      const wordsPerMinute = 225
      const wordCount = text.trim().split(/\s+/).length
      return Math.ceil(wordCount / wordsPerMinute)
    },
  },
}
</script>
