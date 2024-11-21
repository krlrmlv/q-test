<template>
  <article
    :class="{ 'card-blog-featured': isFeatured }"
    :style="{
      '--card-accent-color': bgColor,
      '--card-text-color': textColor,
    }"
    class="card card-blog"
  >
    <b-link
      :to="articleLink"
      class="card-img embed-responsive embed-responsive-451by268"
    >
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getStaticImage(article.preview_image, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          alt=""
          :src="$getStaticImage(article.preview_image, 451)"
          class="embed-responsive-item"
          loading="lazy"
        />
      </picture>
    </b-link>

    <b-link
      :to="articleLink"
      :class="{ 'card-img-overlay': isFeatured }"
      class="card-body"
    >
      <h5 :class="{ h3: isFeatured }" class="mb-8">
        {{ article.title }}
      </h5>

      <p>
        {{ article.short_text }}
      </p>

      <div class="card-blog-meta">
        <span class="flex-fill">
          {{ formatDate(article.published_at) }}
        </span>

        <span v-if="article.likes">
          <svg-icon
            :aria-label="$t('blog.likes')"
            name="like-16"
            width="16"
            height="16"
          />
          {{ article.likes }}
        </span>

        <span>
          <svg-icon
            :aria-label="$t('blog.timeToRead')"
            name="clock-16"
            width="16"
            height="16"
          />
          {{ getTimeToRead(article.text) }} {{ $t('blog.min') }}
        </span>
      </div>
    </b-link>
  </article>
</template>

<script>
import { getContrastColor } from '@/utils/color'

const COLOR_BLACK = '#212529'
const COLOR_WHITE = '#ffffff'

export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
    isSidebar: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 360 },
        { breakpoint: 575, size: 575 },
        { breakpoint: 767, size: 516 },
        { breakpoint: 991, size: 348 },
        { breakpoint: 1239, size: 456 },
        { breakpoint: 1359, size: 372 },
        { breakpoint: 1479, size: 416 },
        { breakpoint: null, size: 451 },
      ],
    }
  },

  computed: {
    articleLink() {
      return this.localePath(`/blog/${this.article?.slug}`)
    },

    isFeatured() {
      return this.article?.featured && !this.isSidebar
    },

    bgColor() {
      return this.article?.color
    },

    textColor() {
      return getContrastColor(this.bgColor, COLOR_WHITE, COLOR_BLACK, 150)
    },
  },

  methods: {
    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'long' }
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

<style lang="scss" scoped>
.card-blog {
  height: 100%;
  color: var(--card-text-color);
  background-color: var(--card-accent-color);
}

.card-img {
  .embed-responsive-item {
    object-fit: cover;
    object-position: top;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}

.card-blog-meta {
  display: flex;
  align-items: center;
  gap: 0 1rem;
  margin-top: auto;
  font-size: $font-size-2;

  & > span {
    display: inline-flex;
    align-items: center;

    .icon {
      margin-right: 0.5rem;
    }
  }
}

@include media-breakpoint-up(md) {
  .card-blog {
    &.card-blog-featured {
      .card-body {
        justify-content: flex-end;
        padding: 2.5rem 1.5rem;
        background-color: transparent;
        background-image: linear-gradient(
          transparent 50%,
          var(--card-accent-color)
        );
      }

      .card-blog-meta {
        margin-top: 0;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .card-blog {
    &.card-blog-featured {
      .card-img-overlay {
        position: static;
      }
    }
  }

  .card-body {
    padding: 1rem 1rem 1.5rem;
  }
}
</style>
