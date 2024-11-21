<template>
  <section class="py-24 py-md-32 py-xl-56">
    <b-container>
      <b-row class="mb-n32">
        <b-col
          v-for="(group, index) in results"
          :key="`group-${index}`"
          :offset-xl="index % 2"
          cols="12"
          md="6"
          xl="5"
          class="mb-32"
        >
          <h4 class="solutions-results-title mb-32">
            {{ group.title }}
          </h4>

          <ul class="solutions-category-results">
            <li
              v-for="(result, resultIndex) in group.values"
              :key="`result-${index}-${resultIndex}`"
              class="solutions-category-result"
            >
              <div class="result-icon-wrapper" aria-hidden="true">
                <img :src="$getStaticImage(result.icon)" alt="" />
              </div>
              <p class="result-text mb-0">
                {{ result.text }}
              </p>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-results-title {
  font-size: 1.75rem;
}

.solutions-category-results {
  margin: 0;
  padding: 0;
  line-height: 1.375;
  list-style: none;
}

.solutions-category-result {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.result-icon-wrapper {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 1.5rem;
  border-radius: $rounded-pill;
  background-color: $gray-100;
}

@include media-breakpoint-down(md) {
  .solutions-category-result {
    margin-bottom: 1rem;
    font-size: $font-size-2;
  }
}

@include media-breakpoint-down(sm) {
  .result-icon-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
  }
}
</style>
