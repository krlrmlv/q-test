<template>
  <b-link
    :to="localePath(`/catalog/${category.slug}`)"
    class="dropdown-item category-link"
    @click="$emit('click', category)"
  >
    <img
      :src="$getStaticImage(category.image, 48)"
      :alt="category.name"
      width="48"
      class="category-image"
    />
    <div class="category-text">
      <p class="mb-0">{{ category.name }}</p>
      <AppBreadcrumbs
        v-if="breadcrumbs.length"
        :items="breadcrumbs"
        class="mt-2"
        hide-home
      />
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    breadcrumbs() {
      const breadcrumbs = this.category?.breadcrumbs.map(({ name, slug }) => ({
        text: name,
        to: `/catalog/${slug}`,
      }))
      return breadcrumbs
    },
  },
}
</script>

<style lang="scss" scoped>
.category-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  white-space: normal;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: $primary;
  }
}

.category-text {
  flex: 1 1 auto;
  max-width: 100%;
  min-width: 0;
}

.category-image {
  flex: 0 0 auto;
  align-self: flex-start;
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  margin-right: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

::v-deep {
  .breadcrumb {
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    margin-bottom: 0;
    padding: 0;
  }

  .breadcrumb-item {
    flex: 1 1 auto;
    display: inline-block;
    min-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:first-of-type {
      flex: 0 0 auto;
    }
  }
}
</style>
