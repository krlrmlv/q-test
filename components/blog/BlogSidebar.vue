<template>
  <aside class="blog-sidebar">
    <div v-if="hasLatest">
      <h3>{{ $t('blog.latest') }}</h3>

      <div class="mb-48 mb-lg-40">
        <BlogArticleCard
          v-for="(article, index) in latest"
          :key="`latest-${index}`"
          :article="article"
          class="mb-16 mb-lg-24"
          is-sidebar
        />
      </div>
    </div>

    <div v-if="hasPopular">
      <h3>{{ $t('blog.popular') }}</h3>

      <div class="mb-48 mb-lg-40">
        <BlogArticleCard
          v-for="(article, index) in popular"
          :key="`popular-${index}`"
          :article="article"
          class="mb-16 mb-lg-24"
          is-sidebar
        />
      </div>
    </div>

    <div class="blog-subscribe">
      <h3 class="text-primary">{{ $t('news.subscribe') }}</h3>
      <p class="lh-140" v-html="$t('form.sidebarSubscribeLabel')" />

      <NewsFormSubscribe />
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    latest: {
      type: Array,
      default: () => [],
    },
    popular: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    hasLatest() {
      return this.latest?.length
    },

    hasPopular() {
      return this.popular?.length
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-sidebar {
  ::v-deep {
    .card-blog {
      .card-body {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }

  .blog-subscribe {
    ::v-deep {
      form .row {
        &.flex-sm-nowrap {
          flex-wrap: wrap !important;
        }

        .col-sm-auto {
          flex-basis: 100%;
          width: 100%;
        }

        .mb-sm-0 {
          margin-bottom: 0.5rem !important;
        }
      }
    }
  }
}
</style>
