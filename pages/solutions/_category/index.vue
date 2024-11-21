<template>
  <main>
    <SolutionsCategoryBanner :category="category">
      <AppBreadcrumbs :items="breadcrumbs" />

      <template #form>
        <SolutionsCategoryBannerForm
          :description="formDescription"
          :form-code="formCode"
          :form-name="getFormName(formTop)"
          :title="formTitle"
        />
      </template>
    </SolutionsCategoryBanner>

    <SolutionsCategoryBenefits :benefits="advantages" />
    <SolutionsCategorySolutions
      v-if="hasSolutions"
      :category="category"
      class="mb-24 mb-md-32 mb-xl-56"
    />

    <SolutionsCategoryResults v-if="hasResults" :results="category.results" />

    <div class="bg-light pt-64">
      <SolutionsFormSection
        :description="formBottom.subtitle"
        :form-code="formCode"
        :form-name="getFormName(formBottom)"
        :submit-label="$t('solutions.makeRequest')"
        :title="formBottom.title"
      />
    </div>

    <SolutionsCategoryScope
      v-if="hasScope"
      :button-text="$t('otherSolutionsButtonText')"
      :description="categoriesDescription"
      :categories="scope.categories"
      :scope-id="scope.id"
      :title="categoriesTitle"
    />
  </main>
</template>

<script>
import SOLUTIONS_CATEGORY_QUERY from '@/graphql/solutions/SolutionsCategory'
import SOLUTIONS_CATEGORY_FORMS_QUERY from '@/graphql/solutions/SolutionsCategoryForms'
import SOLUTIONS_SCOPE_CATEGORIES_QUERY from '@/graphql/solutions/SolutionsCategories'

import { mindboxViewSolutionsCategory } from '@/utils/mindbox'

export default {
  name: 'PagesSolutionsCategory',

  async asyncData({ app, error, params, query, store, $cookies, $graphql }) {
    /* Fetch active category data */
    const variables = {
      locale: app.i18n.locale,
      slug: params.category,
    }

    const { categories, forms } = await $graphql.default.request(
      SOLUTIONS_CATEGORY_QUERY,
      variables
    )

    const category = categories[0]
    if (!category) return error({ statusCode: 404 })

    store.dispatch('solutions/setCurrentCategory', category)

    const formVariables = {
      category_id: category.id,
      locale: app.i18n.locale,
    }
    let { categoryForms } = await $graphql.default.request(
      SOLUTIONS_CATEGORY_FORMS_QUERY,
      formVariables
    )
    categoryForms = categoryForms?.map((form) => ({
      id: form?.form_id,
      title: form?.languages[0]?.title_form,
      subtitle: form?.languages[0]?.description_form,
    }))

    const advantages = category.advantages?.map(({ advantage }) => advantage)

    /* Fetch other categories in scope (if scope is selected) or all */

    const scopeId = query.scope
    const scope = category.scopes?.find(({ slug }) => slug === scopeId) ?? {}

    const where = { slug: { _neq: params.category } }
    if (scopeId) {
      where.scopes = { id: { _eq: scopeId } }
    }

    const { categories: scopeCategories } = await $graphql.default.request(
      SOLUTIONS_SCOPE_CATEGORIES_QUERY,
      { locale: app.i18n.locale, where }
    )

    scope.categories = scopeCategories

    const topFallbackFormId = forms?.[0].id
    const bottomFallbackFormId = forms?.[2].id

    const formTop =
      categoryForms?.find((form) => form?.id === topFallbackFormId) ??
      forms?.[0] ??
      {}

    const formBottom =
      categoryForms?.find((form) => form?.id === bottomFallbackFormId) ??
      forms?.[2] ??
      forms?.[1] ??
      {}

    /* Build breadcrumbs */
    const breadcrumbs = [{ text: 'solutions.title', to: '/solutions' }]

    if (scope?.name) {
      breadcrumbs.push({
        text: scope.name,
        to: `/solutions/scopes/${scope.slug}`,
      })
    }

    breadcrumbs.push({ text: category.name, active: true })

    return {
      advantages,
      breadcrumbs,
      category,
      formBottom,
      formTop,
      scope,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    categoriesDescription() {
      return (
        this.scope?.categories_description ??
        this.$t('solutions.categories.description')
      )
    },

    categoriesTitle() {
      return this.$t('otherSolutionsTitle')
    },

    hasResults() {
      return Boolean(this.category?.results?.length)
    },

    hasScope() {
      return Boolean(this.scope?.categories?.length)
    },

    hasSolutions() {
      return Boolean(this.category?.solutions?.length)
    },

    pageTitle() {
      let title = ''
      if (this.category) {
        title += `${this.category.meta_title || this.category.name} — `
      }
      title += this.$t('pageTitle')
      return title
    },
    isLightningProtectionCategory() {
      return this.$route.path.endsWith('/solutions/molniezashhita-i-zazemlenie')
    },

    formCode() {
      return this.category?.form_code ?? 1012
    },

    formTitle() {
      return this.isLightningProtectionCategory
        ? 'Разработка проектных решений по\xA0молниезащите и\xA0заземлению'
        : this.formTop.title
    },

    formDescription() {
      return this.isLightningProtectionCategory
        ? 'Рассчитаем зоны защиты и\xA0подберём элементы молниезащиты и\xA0заземления для\xA0ваших проектов'
        : this.formTop.subtitle
    },
  },

  mounted() {
    mindboxViewSolutionsCategory(this.category?.id)
  },

  methods: {
    getFormName(form) {
      return `Решения — Категория «${this.category?.name}» — ${form.title}`
    },
  },
}
</script>

<i18n>
{
  "en": {
    "otherSolutionsButtonText": "See all solutions",
    "otherSolutionsTitle": "Other solutions",
    "pageTitle": "Solutions — EKF"
  },
  "ru": {
    "otherSolutionsButtonText": "Смотреть все решения",
    "otherSolutionsTitle": "Другие решения",
    "pageTitle": "Решения — компания EKF"
  }
}
</i18n>
