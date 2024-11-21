<template>
  <div>
    <h4 class="mb-24 mb-lg-48">
      {{ $t('solutions.tabs.specs.modifications') }}
    </h4>

    <SolutionsCategorySolutionsList
      :loading="loading"
      :solutions="solutions"
      :solutions-total="solutionsTotal"
      @fetch="fetchSolutions"
    />
  </div>
</template>

<script>
import SOLUTIONS_SOLUTION_MODIFICATIONS_QUERY from '@/graphql/solutions/SolutionsSolutionModifications'

export default {
  props: {
    modifications: {
      type: Array,
      default: () => [],
    },
    modificationsTotal: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      default: null,
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
    slides() {
      return this.modifications?.map(({ modification }) => ({
        solution: modification,
      }))
    },
  },

  watch: {
    modifications: {
      immediate: true,
      handler: 'initSolutions',
    },
  },

  methods: {
    async fetchSolutions() {
      if (!this.slug) return

      const variables = {
        locale: this.$i18n.locale,
        offset: this.offset,
        slug: this.slug,
      }

      this.loading = true

      try {
        const { solutions } = await this.$graphql.default.request(
          SOLUTIONS_SOLUTION_MODIFICATIONS_QUERY,
          variables
        )

        const solution = solutions?.[0]

        if (Array.isArray(solution?.modifications)) {
          solution.modifications.forEach(({ modification }) => {
            if (modification) this.solutions.push(modification)
            this.offset++
          })
        }
      } catch (error) {}

      this.loading = false
    },

    initSolutions() {
      const solutions = []
      this.modifications?.forEach(({ modification }) => {
        if (modification) solutions.push(modification)
      })
      this.solutions = solutions

      this.solutionsTotal = this.modificationsTotal
    },
  },
}
</script>
