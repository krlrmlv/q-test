<template>
  <b-link :to="localePath(`/catalog/${category.slug}`)" class="card text-body">
    <img
      :src="$getStaticImage(category.image, 88)"
      alt=""
      width="88"
      height="88"
      loading="lazy"
    />

    <span>{{ category.name }}</span>
  </b-link>
</template>

<script>
export default {
  name: 'CatalogCategoryChildrenCard',

  serverCacheKey: ({ category, locale }) =>
    `${locale}::${category.id}::${category.created_at}`,

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    locale: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  gap: 0 1.5rem;
  height: 100%;
  min-height: 8rem;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    box-shadow: $box-shadow;
  }

  img {
    max-width: 88px;
    max-height: 88px;
    object-fit: contain;
  }

  @include media-breakpoint-down(md) {
    box-shadow: $box-shadow;
  }
}
</style>
