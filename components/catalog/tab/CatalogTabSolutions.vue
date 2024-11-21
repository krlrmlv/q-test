<template>
  <div class="lh-140 pb-md-48">
    <h4>{{ $t('catalog.tabs.solutions.title') }}</h4>

    <b-row class="mb-32 mb-md-40">
      <b-col sm="10" md="auto" lg="8">
        <p class="mb-0" v-html="$t('catalog.tabs.solutions.text')"></p>
      </b-col>
    </b-row>

    <SolutionsCategorySolutionsList :solutions="items" />
  </div>
</template>

<script>
export default {
  name: 'CatalogTabSolutions',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
