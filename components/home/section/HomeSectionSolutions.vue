<template>
  <section class="section-home">
    <b-container>
      <b-row align-v="center" class="mb-32 mb-md-64">
        <b-col md="8" lg="6">
          <h2 class="mb-0">
            {{ $t('solutions.findYourSolution') }}
          </h2>
        </b-col>
        <b-col md="4" lg="6" class="d-none d-lg-block text-right">
          <LinkMore :to="localePath('/solutions')" target="_blank">
            {{ $t('solutions.linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row>
        <b-col
          v-for="(solution, index) in solutions"
          :key="`solution-${index}`"
          sm="6"
          lg="3"
          class="mb-24"
        >
          <SolutionsItemCard :item="solution" />
        </b-col>
      </b-row>

      <div class="text-center d-lg-none mt-16">
        <LinkMore :to="localePath('/solutions')" target="_blank">
          {{ $t('solutions.linkText') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
import SOLUTIONS_QUERY from '@/graphql/solutions/SolutionsByVendorCodes'

export default {
  props: {
    layoutId: {
      type: [Number, String],
      default: null,
    },
    vendorCodes: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      solutions: [],
    }
  },

  async fetch() {
    const { solutions } = await this.$graphql.default.request(SOLUTIONS_QUERY, {
      locale: this.$i18n.locale,
      vendorCodes: this.vendorCodes,
    })
    if (solutions) {
      this.solutions = solutions?.map((solution) => ({
        ...solution,
        to: `/solutions/${solution.category && solution.category.slug}/${
          solution.slug
        }`,
      }))
    }
  },
}
</script>

<style lang="scss" scoped>
.card-solution {
  height: 100%;
  font-size: $font-size-3;
  font-weight: $font-weight-medium;
  line-height: $headings-line-height;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

@include media-breakpoint-down(md) {
  .card-solution {
    font-size: $font-size-1;
    font-weight: $font-weight-normal;
    background-color: transparent;
  }

  .card-body {
    padding: 0;
  }
}

@include media-breakpoint-up(lg) {
  .card-solution {
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}
</style>
