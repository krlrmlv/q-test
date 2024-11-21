<template>
  <section class="overflow-hidden mb-32 mb-xl-64 py-32 py-md-64">
    <b-container>
      <b-row align-v="center" class="mb-24 mb-md-48 mb-xl-64">
        <b-col cols="12" md="auto" class="flex-fill">
          <h2 class="mb-0">
            {{ title }}
          </h2>
        </b-col>
        <b-col md="auto" class="d-none d-md-block">
          <LinkMore :to="localePath('/solutions/all')">
            {{ buttonText }}
          </LinkMore>
        </b-col>
        <b-col v-if="description" cols="12" class="flex-fill mt-16">
          <p class="mb-0">
            {{ description }}
          </p>
        </b-col>
      </b-row>

      <SolutionsScopeCategoriesSlider :categories="categories" />

      <div class="text-center d-md-none pt-40">
        <LinkMore :to="localePath('/solutions/all')">
          {{ buttonText }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: null,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
