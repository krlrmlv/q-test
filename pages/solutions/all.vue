<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 mb-32">
      {{ $t('solutions.title') }}
    </h1>

    <div class="position-relative mb-48 mb-md-64 mb-xl-96">
      <SolutionsCategoryList
        :categories="categories"
        class="solutions-categories"
      />
    </div>
  </b-container>
</template>

<script>
import SOLUTIONS_CATEGORIES_QUERY from '@/graphql/solutions/SolutionsCategories'

export default {
  async asyncData({ app, $graphql }) {
    const variables = { locale: app.i18n.locale }

    const { categories } = await $graphql.default.request(
      SOLUTIONS_CATEGORIES_QUERY,
      variables
    )

    const breadcrumbs = [
      { text: 'solutions.title', to: '/solutions' },
      { text: 'solutions.allSolutions', active: true },
    ]

    return { breadcrumbs, categories }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "All solutions — EKF"
  },
  "ru": {
    "pageTitle": "Все решения — компания EKF"
  }
}
</i18n>

<style lang="scss" scoped>
.solutions-scope-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;

  ::v-deep {
    & > * {
      flex: 0 0 auto;
      margin: 0;
    }
  }
}

.solutions-categories {
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}

.loading-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-width: $border-width * 2;
  z-index: 1;
}

@include media-breakpoint-down(sm) {
  .solutions-scope-filter {
    ::v-deep {
      & > * {
        flex: 0 0 100%;
      }
    }
  }
}
</style>
