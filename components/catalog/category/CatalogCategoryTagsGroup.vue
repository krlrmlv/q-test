<template>
  <div class="category-tags-group">
    <p class="h6 group-title mb-16">{{ group.name }}</p>
    <div class="category-tags-grid">
      <b-link
        v-for="(tag, index) in group.tags"
        :key="`tag-${index}`"
        :to="localePath(tag.link)"
        class="badge"
      >
        {{ tag.name }}
      </b-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.category-tags-group {
  .group-title {
    font-size: $font-size-4;
    line-height: 1.5rem;
  }
}

.category-tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .badge {
    max-width: 100%;
    padding: 0.34375rem 0.375rem;
    font-size: $font-size-1;
    font-weight: $font-weight-normal;
    text-overflow: ellipsis;
    border-radius: 0.25rem;
    color: $gray-800;
    background-color: $gray-200;
    transition: $transition-base;
    transition-property: color;
    overflow: hidden;

    &:hover {
      background-color: $gray-300;
      &:active {
        background-color: $gray-500;
      }
    }
  }
}
</style>
