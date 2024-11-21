<template>
  <main>
    <SolutionsScopeBanner
      :benefits="advantages"
      :image="scope.main_page_image"
      :title="scope.description"
      class="mb-64"
    >
      <AppBreadcrumbs :items="breadcrumbs" />
    </SolutionsScopeBanner>

    <SolutionsFormSection
      :description="formTop.subtitle"
      :form-name="getFormName(formTop)"
      :submit-label="$t('solutions.makeRequest')"
      :title="formTop.title"
    />

    <SolutionsScopeCategories
      :button-text="$t('categories.buttonText')"
      :categories="categories"
      :description="scope.categories_description"
      :scope-id="id"
      :title="categoriesTitle"
    />

    <SolutionsScopeSupport
      :steps="help"
      :title="$t('supportTitle')"
      @click-step="handleClickStep"
    />

    <!-- <SolutionsPartners class="bg-light py-64 py-xl-96" /> -->

    <SolutionsFormSection
      ref="formSection"
      :description="formBottom.subtitle"
      :form-name="getFormName(formBottom)"
      :submit-label="$t('solutions.makeRequest')"
      :title="formBottom.title"
      class="pt-64 pt-xl-64 bg-light"
    />
  </main>
</template>

<script>
import SOLUTIONS_SCOPE_QUERY from '@/graphql/solutions/SolutionsScope'
import { scrollToTarget } from '@/utils/window'

export default {
  async asyncData({ app, error, params, $graphql }) {
    const { id } = params

    if (isNaN(id)) return error({ statusCode: 404 })

    const variables = { id, locale: app.i18n.locale }

    const { help, forms, scopes } = await $graphql.default.request(
      SOLUTIONS_SCOPE_QUERY,
      variables
    )

    const scope = scopes?.[0]
    if (!scope) return error({ statusCode: 404 })

    const advantages = scope.advantages?.map(({ advantage }) => advantage)
    const categories = scopes
      ?.map(({ categories }) => categories?.[0])
      ?.filter((category) => Boolean(category))
      ?.sort((a, b) => a.sort_order - b.sort_order)

    const formTop = forms?.[0] ?? {}
    const formBottom = forms?.[2] ?? forms?.[1] ?? formTop

    const breadcrumbs = [
      { text: 'solutions.title', to: '/solutions' },
      { text: scope.name, active: true },
    ]

    return {
      advantages,
      breadcrumbs,
      categories,
      formBottom,
      formTop,
      help,
      id,
      scope,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    bannerTitle() {
      return this.scope?.description ?? this.scope?.name
    },

    categoriesTitle() {
      return `${this.$t(
        'solutions.title'
      )} ${this.scope?.application?.toLowerCase()}`
    },

    pageTitle() {
      const title = []
      if (this.scope?.name) {
        title.push(this.scope.name)
      }
      title.push(this.$t('pageTitle'))

      return title.join(' — ')
    },
  },

  methods: {
    getFormName(form) {
      return `Решения — Отрасль «${this.scope?.name}» — ${form.title}`
    },

    handleClickStep() {
      scrollToTarget(this.$refs.formSection?.$el)
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
    "categories": {
      "buttonText": "Смотреть все решения"
    },
    "pageTitle": "Решения — компания EKF",
    "supportTitle": "Наши услуги"
  }
}
</i18n>
