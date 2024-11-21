<template>
  <div class="solution-functions">
    <h4 class="mb-24 mb-lg-48">{{ $t('solutions.tabs.specs.functions') }}</h4>

    <b-row class="mb-n24 mb-lg-n48">
      <b-col
        v-for="(f, index) in functions"
        :key="`function-${index}`"
        cols="12"
        sm="6"
        lg="3"
        class="mb-24 mb-lg-48"
      >
        <div>
          <p class="text-primary" aria-hidden="true">
            <svg-icon name="check-24" width="24" height="24" />
          </p>
          <p class="mb-0">{{ f.text }}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    functions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.solution-functions {
  padding: 1.5rem 1rem;
  line-height: 1.3;
  background-color: $gray-100;
}

@include media-breakpoint-up(lg) {
  .solution-functions {
    padding: 3rem;
  }
}
</style>
