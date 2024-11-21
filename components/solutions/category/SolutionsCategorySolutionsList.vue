<template>
  <div>
    <transition-group
      name="fade"
      tag="div"
      class="row mx-n4 mx-sm-n12 mb-n24 mb-lg-n40"
    >
      <b-col
        v-for="solution in solutions"
        :key="`col-${solution.id}`"
        cols="6"
        lg="3"
        class="mb-24 mb-lg-40 px-8 px-sm-12"
      >
        <SolutionsCategorySolutionCard :solution="solution" />
      </b-col>
    </transition-group>

    <b-row v-if="hasMore" class="pt-16 pt-lg-24">
      <b-col cols="12" sm="8" md="6" lg="4" xl="3" class="mx-auto">
        <b-button
          :disabled="loading"
          variant="white"
          class="font-weight-normal"
          block
          @click="$emit('fetch')"
        >
          <b-spinner v-if="loading" class="mr-8" small />
          {{ $t('showMore') }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    solutions: {
      type: Array,
      default: () => [],
    },
    solutionsTotal: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    hasMore() {
      return this.solutionsTotal > this.solutions?.length
    },
  },
}
</script>

<i18n>
{
  "en": {
    "showMore": "showMore"
  },
  "ru": {
    "showMore": "Показать еще"
  }
}
</i18n>
