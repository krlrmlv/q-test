<template>
  <section
    class="overflow-hidden pt-48 pt-md-64 pt-xl-96 pb-32 pb-md-48 pb-xl-64"
  >
    <b-container>
      <b-row class="mb-16">
        <b-col md="8" xl="9">
          <div class="mb-24 mb-md-40 mb-xl-64">
            <h2>{{ title }}</h2>
            <p v-if="description" class="fs-2 fs-xl-3 lh-140">
              {{ description }}
            </p>
          </div>
        </b-col>

        <b-col md="4" xl="3" class="text-right d-none d-md-block">
          <LinkMore :to="localePath('/solutions/all')">
            {{ buttonText }}
          </LinkMore>
        </b-col>
      </b-row>

      <SolutionsScopeCategoriesSlider
        :categories="categories"
        :scope-id="scopeId"
      />

      <div class="text-center d-md-none pt-32">
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
    scopeId: {
      type: [Number, String],
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>
