<template>
  <ul class="header-search-categories list-unstyled">
    <li v-for="(category, index) in categories" :key="`category-${index}`">
      <HeaderSearchCategory
        :category="category"
        @click="$emit('click', $event)"
      />
    </li>
  </ul>
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

<style lang="scss" scoped>
.header-search-categories {
  position: relative;
  margin: 0.5rem 0 0;
  padding-top: 0.5rem;

  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 1rem;
    right: 1rem;
    top: 0;
    height: $border-width;
    background-color: $border-color;
  }
}
</style>
