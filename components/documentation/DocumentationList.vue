<template>
  <div class="documentation-list">
    <DocumentationCategory
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      :category="category"
    />
  </div>
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
