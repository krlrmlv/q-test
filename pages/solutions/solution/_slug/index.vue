<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <SolutionsSolutionDescription
        :solution="solution"
        class="mb-40 mb-lg-64"
        @click-request="handleClickRequest"
      />

      <SolutionsSolutionTabs :solution="solution" class="mb-lg-32" />
    </b-container>

    <div class="bg-light pt-64">
      <SolutionsFormSection
        ref="formSection"
        :description="form.subtitle"
        :form-name="getFormName(form)"
        :form-code="formCode"
        :submit-label="form.submitLabel"
        :title="form.title"
      />
    </div>
  </main>
</template>

<script>
import { getCartId } from '@/utils/cart'
import { scrollToTarget } from '@/utils/window'
import { mindboxViewSolution } from '@/utils/mindbox'

import SOLUTION_QUERY from '@/graphql/solutions/SolutionsSolution'

export default {
  name: 'PagesSolutionsSolution',

  async asyncData({ app, error, params, store, $graphql }) {
    const { slug } = params
    const cartId = await getCartId(app.$cookies)

    $graphql.default.setHeaders({
      'x-hasura-cart-id': cartId,
    })

    const { forms, solutions } = await $graphql.default.request(
      SOLUTION_QUERY,
      { locale: app.i18n.locale, slug }
    )

    const solution = solutions?.[0]
    if (!solution) return error({ statusCode: 404 })

    const category = solution.categories?.[0]?.category

    store.dispatch('solutions/setCurrentCategory', category)

    const breadcrumbs = [{ text: 'solutions.title', to: '/solutions' }]
    if (category) {
      breadcrumbs.push({
        text: category.name,
        to: `/solutions/${category.slug}`,
      })
    }
    breadcrumbs.push({ text: solution.name, active: true })

    let metaTitle = `${solution.meta_title || solution.name} — `
    if (category) {
      metaTitle += `${category.meta_title || category.name} — `
    }

    const form = forms?.[0] ?? {}

    return { breadcrumbs, form, metaTitle, solution, category }
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.solution?.meta_description,
        },
      ],
    }
  },

  computed: {
    pageTitle() {
      return this.metaTitle + this.$t('pageTitle')
    },

    formCode() {
      return this.category?.form_code ?? 1012
    },
  },

  mounted() {
    mindboxViewSolution(this.solution?.id)
  },

  methods: {
    getFormName(form) {
      return `Решения — ${this.solution?.name} — ${form.title}`
    },

    handleClickRequest() {
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
    "pageTitle": "Решения — компания EKF"
  }
}
</i18n>
