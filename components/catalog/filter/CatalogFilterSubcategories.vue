<template>
  <div class="d-none d-md-block mb-24">
    <h6>
      {{ $t('catalog.subcategories') }}
    </h6>
    <ul class="list-unstyled category-children">
      <li v-for="(subcategory, index) in category.children" :key="index">
        <b-link
          class="category-child"
          :to="localePath(`/catalog/${subcategory.slug}`)"
        >
          {{ subcategory.name }}
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.category-children {
  margin-bottom: 0;
  font-size: $font-size-2;
  line-height: 1.4;
  color: $gray-600;
}

.category-child {
  display: block;
  padding: 0.5rem 0;
  color: inherit;
  text-decoration: none;
  transition: $transition-base;
  transition-property: color;

  &:hover {
    color: $body-color;
  }
}
</style>
