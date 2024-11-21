<template>
  <section>
    <h2 class="h4 mb-32 mb-lg-24">
      {{ $t('catalog.subcategories') }}
    </h2>

    <ul class="category-children-list list-unstyled">
      <li
        v-for="(subcategory, index) in children"
        :key="`category-child-${index}`"
      >
        <CatalogCategoryChildrenCard
          :category="subcategory"
          :locale="$i18n.locale"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    children: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.category-children-list {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;

  @include media-breakpoint-up(md) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media-breakpoint-up(xxl) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
