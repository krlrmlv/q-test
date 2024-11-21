<template>
  <div class="solutions-tab-specs">
    <SolutionsTabSpecsDescription
      v-if="description.length"
      :description="description"
      class="mb-48 mb-lg-72"
    />

    <SolutionsTabSpecsFunctions
      v-if="functions.length"
      :functions="functions"
      class="mb-72"
    />

    <SolutionsTabSpecsAdvantages
      v-if="advantages.length"
      :advantages="advantages"
      class="mb-72"
    />

    <SolutionsTabSpecsProperties
      v-if="specifications.length"
      :specifications="specifications"
      class="mb-72"
    />

    <SolutionsTabSpecsModifications
      v-if="modifications.length"
      :modifications="modifications"
      :modifications-total="modificationsTotal"
      :slug="slug"
      class="mb-72"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
    slug: {
      type: String,
      default: null,
    },
  },

  computed: {
    advantages() {
      return this.items?.advantages ?? []
    },

    description() {
      return this.items?.description ?? ''
    },

    functions() {
      return this.items?.functions ?? []
    },

    modifications() {
      return this.items?.modifications ?? []
    },

    modificationsTotal() {
      return this.items?.modifications_aggregate?.aggregate?.count ?? 0
    },

    specifications() {
      return this.items?.specifications ?? []
    },
  },
}
</script>
