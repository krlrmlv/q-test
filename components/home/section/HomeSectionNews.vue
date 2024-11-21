<template>
  <section class="section-home">
    <b-container>
      <div class="home-news-grid">
        <h2 class="home-news-title mb-0">{{ $t('global.news') }}</h2>

        <HomeNewsFeatured :article="featured" class="home-news-featured" />

        <div class="home-news-list">
          <HomeNewsArticle
            v-for="(article, index) in articles"
            :key="`news-article-${index}`"
            :article="article"
            :locale="$i18n.locale"
          />
        </div>

        <div class="home-news-subscribe">
          <h3 class="text-primary">{{ $t('news.subscribe') }}</h3>
          <p class="lh-140" v-html="$t('form.sidebarSubscribeLabel')" />

          <NewsFormSubscribe />
        </div>

        <div class="home-news-readmore">
          <LinkMore :to="localePath('/about/news')">
            {{ $t('global.newsLink') }}
          </LinkMore>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import HOME_NEWS_QUERY from '@/graphql/news/NewsHome'

export default {
  data() {
    return {
      articles: [],
      featured: {},
    }
  },

  async fetch() {
    const { articles, featured } = await this.$graphql.default.request(
      HOME_NEWS_QUERY,
      { locale: this.$i18n.locale }
    )
    this.articles = articles ?? []
    this.featured = featured?.[0]
  },
}
</script>

<style lang="scss" scoped>
.home-news-grid {
  display: grid;
  gap: 1rem $grid-gutter-width;
}

.home-news-readmore {
  text-align: center;
}

@include media-breakpoint-up(md) {
  .home-news-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content 1fr min-content min-content;
  }

  .home-news-title {
    grid-column: 1 / span 2;
  }

  .home-news-featured {
    grid-row: 2 / span 3;
  }

  .home-news-readmore {
    margin-top: 0.5rem;
    text-align: left;
  }
}

@include media-breakpoint-up(lg) {
  .home-news-grid {
    grid-template-columns: 456px min-content auto;
    grid-template-rows: min-content 1fr min-content;
  }

  .home-news-title {
    grid-column: 2 / span 1;
  }

  .home-news-featured {
    grid-row: 1 / span 3;
  }

  .home-news-list {
    margin-top: 3.5rem;
    grid-column: 2 / span 2;
  }

  .home-news-subscribe {
    grid-column: 2 / span 2;
  }

  .home-news-readmore {
    align-self: end;
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
    margin-top: 0;
    padding-bottom: 0.25rem;
    text-align: right;
  }
}

@include media-breakpoint-up(xl) {
  .home-news-grid {
    grid-template-columns: 582px min-content auto;
    gap: 1rem 6.4%;
  }
}
</style>
