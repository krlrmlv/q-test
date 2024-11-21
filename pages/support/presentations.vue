<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 mb-32 mb-lg-64">{{ $t('support.presentations.title') }}</h1>

      <CardCollapse
        v-for="(category, index) in categories"
        :id="`presentations-collapse-${index}`"
        :key="`collapse-${index}`"
        :title="category.name"
        accordion="accordion"
        body-class="pl-0"
        class="mb-16 mb-lg-24"
        toggle-variant="secondary"
        @toggle-collapse="collapseClickHandler(index)"
      >
        <b-row class="row-pos mb-n16 mb-lg-n24 pt-16 pt-lg-24">
          <b-col
            v-for="(item, itemIndex) in category.items"
            :key="`card-${index}-${itemIndex}`"
            cols="6"
            lg="3"
            class="mb-16 mb-lg-24"
          >
            <SupportPosCard
              :item="item"
              image-aspect="16by9"
              @click="$gtm.push({ event: 'Presentations' })"
            />
          </b-col>
        </b-row>
      </CardCollapse>
    </b-container>
  </main>
</template>

<script>
import PRESENTATION_CATEGORIES from '@/graphql/support/PresentationCategories'
import { scrollToTarget } from '~/utils/window'

export default {
  async asyncData({ app, $graphql, query }) {
    const locale = app.i18n.locale
    const { categories } = await $graphql.default.request(
      PRESENTATION_CATEGORIES,
      { locale }
    )
    return { categories }
  },
  data() {
    return {
      breadcrumbs: [{ text: 'support.presentations.title', active: true }],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  methods: {
    collapseClickHandler(index) {
      const currentCollapse = document.getElementById(
        `presentations-collapse-${index}`
      )
      setTimeout(() => {
        scrollToTarget(currentCollapse)
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(xs) {
  ::v-deep {
    .row-pos {
      margin-left: -0.3125rem;
      margin-right: -0.3125rem;

      & > [class*='col'] {
        padding-left: 0.3125rem;
        padding-right: 0.3125rem;
      }
    }

    .card.card-pos {
      padding-left: 0;
      padding-right: 0;

      .card-body {
        font-size: 1rem;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Product presentations — EKF"
  },
  "ru": {
    "pageTitle": "Презентации продукции — EKF"
  }
}
</i18n>
