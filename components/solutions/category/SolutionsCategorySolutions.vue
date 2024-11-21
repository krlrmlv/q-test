<template>
  <section class="py-24 py-md-32 py-xl-56">
    <b-container>
      <b-row class="mb-16">
        <b-col cols="12" xl="10">
          <h2>{{ $t('readySolutions') }}</h2>

          <p v-if="description" class="fs-2 fs-lg-3 lh-140">
            {{ description }}
          </p>
        </b-col>
      </b-row>

      <SolutionsCategorySolutionsList
        :loading="loading"
        :solutions="solutions"
        :solutions-total="solutionsTotal"
        @fetch="fetchSolutions"
      />
    </b-container>
  </section>
</template>

<script>
import SOLUTIONS_CATEGORY_SOLUTIONS_QUERY from '@/graphql/solutions/SolutionsCategorySolutions'

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loading: false,
      offset: 8,
      solutions: [],
      solutionsTotal: 0,
    }
  },

  computed: {
    description() {
      return this.category?.solutions_text ?? this.category?.description
    },
  },

  watch: {
    'category.solutions': {
      immediate: true,
      handler: 'initSolutions',
    },
  },

  methods: {
    async fetchSolutions() {
      const category_id = this.category?.id

      if (!category_id) return

      const variables = {
        category_id,
        locale: this.$i18n.locale,
        offset: this.offset,
      }

      this.loading = true

      try {
        const { solutions } = await this.$graphql.default.request(
          SOLUTIONS_CATEGORY_SOLUTIONS_QUERY,
          variables
        )

        if (Array.isArray(solutions)) {
          this.solutions.push(...solutions)
          this.offset += solutions.length
        }
      } catch (error) {}

      this.loading = false
    },

    initSolutions() {
      const solutions = []
      this.category?.solutions?.forEach(({ solution }) => {
        if (solution) solutions.push(solution)
      })
      this.solutions = solutions

      this.solutionsTotal =
        this.category?.solutions_aggregate?.aggregate?.count ?? 0
    },
  },
}
</script>

<i18n>
{
  "en": {
    "readySolutions": "Ready solutions"
  },
  "ru": {
    "readySolutions": "Готовые решения"
  }
}
</i18n>
