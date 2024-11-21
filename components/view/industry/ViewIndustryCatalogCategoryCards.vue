<template>
  <b-row>
    <b-col
      v-for="category in categories"
      :key="category.slug"
      md="4"
      class="mb-6 md-lg-24 px-4"
    >
      <b-link
        :to="localePath(`/catalog/${category.slug}`)"
        class="card text-body"
      >
        <img
          :src="`/images/view/industry/catalog/${category.slug}.png`"
          :alt="category.meta_h1"
          loading="lazy"
        />
        <p class="m-0">{{ category.name }}</p>
      </b-link>
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
  }

  @include media-breakpoint-down(md) {
    padding: 0.5rem;
    gap: 0 1rem;
    box-shadow: $box-shadow;
    img {
      max-width: 64px;
      max-height: 64px;
    }
  }

  @include media-breakpoint-down(xs) {
    img {
      max-width: 72px;
      max-height: 72px;
    }
  }
}
</style>
