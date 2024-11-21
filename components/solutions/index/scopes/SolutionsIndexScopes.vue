<template>
  <section class="py-16 py-md-32 py-xl-64">
    <b-container>
      <h2 class="mb-24 mb-md-32 mb-xl-48">
        {{ title }}
      </h2>

      <b-row>
        <b-col
          v-for="(scope, index) in scopes"
          :key="`col-${index}`"
          cols="12"
          sm="6"
          md="3"
          class="mb-32 mb-md-0"
        >
          <SolutionsIndexScopesCard :scope="scope" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    scopes: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
