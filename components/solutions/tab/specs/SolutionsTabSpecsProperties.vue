<template>
  <div>
    <h4 class="mb-24 mb-lg-48">
      {{ $t('solutions.tabs.specs.specs') }}
    </h4>

    <SolutionsTableSpecs :items="specifications" />
  </div>
</template>

<script>
export default {
  props: {
    specifications: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
