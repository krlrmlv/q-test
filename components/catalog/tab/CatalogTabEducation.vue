<template>
  <div class="lh-140 mx-n12 mx-sm-0 pb-md-48">
    <CoursesCards :courses="items" />
  </div>
</template>

<script>
export default {
  name: 'CatalogTabEducation',

  serverCacheKey: ({ locale, parent }) =>
    `${locale}::${parent.id}::${parent.created_at}`,

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    parent: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
