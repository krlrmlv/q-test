<template>
  <main>
    <SolutionsIndexBanner
      :image="banner.image"
      :points="advantages"
      :title="banner.title"
      class="mb-64"
    >
      <AppBreadcrumbs :items="breadcrumbs" />

      <template #form>
        <SolutionsIndexBannerForm
          :description="formTop.subtitle"
          :title="formTop.title"
          class="mb-32 mb-md-48"
        />
      </template>
    </SolutionsIndexBanner>

    <SolutionsIndexScopes :scopes="scopes" :title="$t('scopes.title')" />

    <SolutionsIndexCategories
      :button-text="$t('solutions.categories.buttonText')"
      :categories="categories"
      :description="$t('solutions.categories.description')"
      :title="$t('solutions.categories.title')"
    />

    <!-- <SolutionsPartners class="pt-16 pb-64 pb-xl-96" /> -->

    <SolutionsIndexSupport
      :description="formBottom.subtitle"
      :help-steps="help"
      :help-title="$t('helpTitle')"
      :title="formBottom.title"
      class="bg-light"
    />
  </main>
</template>

<script>
import SOLUTIONS_INDEX_QUERY from '@/graphql/solutions/SolutionsIndex'

export default {
  async asyncData({ app, $graphql }) {
    const variables = { locale: app.i18n.locale }
    const { banners, categories, forms, help, scopes } =
      await $graphql.default.request(SOLUTIONS_INDEX_QUERY, variables)

    const breadcrumbs = [{ text: 'solutions.title', active: true }]
    const banner = banners?.[0] ?? {}

    const advantages = banner?.advantages?.map(({ advantage }) => advantage)

    return {
      advantages,
      banner,
      breadcrumbs,
      categories,
      forms,
      help,
      scopes,
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    formBottom() {
      return this.forms?.[1] ?? {}
    },

    formTop() {
      return this.forms?.[0] ?? {}
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "Solutions — EKF"
  },
  "ru": {
    "bannerForm": {
      "description": "Только до 30 мая оставьте заявку и получите бесплатный эскизный проект решения на продукции EKF",
      "title": "Бесплатный расчет проекта"
    },
    "helpTitle": "Наши услуги",
    "scopes": {
      "title": "Отрасли применения"
    },
    "pageTitle": "Решения — компания EKF"
  }
}
</i18n>
