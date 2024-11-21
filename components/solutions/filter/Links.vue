<template>
  <div class="solutions-filter">
    <p class="h7">
      {{ $t('filters.quickLinks') }}
    </p>
    <b-row class="fs-2 lh-140 mx-n4 mb-24">
      <b-col
        v-for="(item, index) in items"
        :key="index"
        cols="auto"
        class="mb-8 px-4"
      >
        <b-button
          :class="{ active: activeTags && activeTags.includes(item.id) }"
          :variant="
            activeTags && activeTags.includes(item.id)
              ? 'secondary'
              : 'gray-200'
          "
          class="btn-badge"
          @click="toggleActive(item.id)"
        >
          {{ item.name }}
        </b-button>
      </b-col>
    </b-row>
    <b-button variant="outline-primary" block @click="$emit('change', [])">
      {{ $t('filters.resetFilters') }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    activeTags: {
      type: Array,
      default() {
        return []
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    toggleActive(id) {
      const tags =
        this.activeTags && this.activeTags.length ? [...this.activeTags] : []
      const foundIndex = tags.indexOf(id)
      if (foundIndex < 0) tags.push(id)
      else tags.splice(foundIndex, 1)
      this.$emit('change', tags)
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-filter {
  .btn-badge {
    padding: 0.25rem 0.375rem;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1;
    text-align: left;
    white-space: normal;
    border-radius: 0.25rem;
    color: inherit;

    &:not(.active):hover {
      color: $primary;
    }
  }
}
</style>
