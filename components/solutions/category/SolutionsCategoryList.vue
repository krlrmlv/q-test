<template>
  <b-row class="mb-n32 mb-md-n24 mb-lg-n32">
    <b-col
      v-for="(category, index) in categories"
      :key="`col-${index}`"
      cols="12"
      md="4"
      class="mb-32 mb-md-24 mb-lg-32"
    >
      <SolutionsCategoryCard :category="category" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
