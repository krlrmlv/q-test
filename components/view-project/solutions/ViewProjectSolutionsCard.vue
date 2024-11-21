<template>
  <b-link :to="solutionLink" class="card card-solution">
    <div class="card-img embed-responsive embed-responsive-1by1">
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getStaticImage(solutionImage, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          :src="$getStaticImage(solutionImage, 219)"
          :alt="solution.title"
          class="embed-responsive-item"
        />
      </picture>
    </div>
    <div class="card-body">
      <p class="h7 mt-24 mb-0">
        {{ solution.title }}
      </p>
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    solution: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 216 },
        { breakpoint: 575, size: 388 },
        { breakpoint: 991, size: 228 },
        { breakpoint: 1199, size: 248 },
        { breakpoint: 1239, size: 168 },
        { breakpoint: 1359, size: 225 },
        { breakpoint: 1479, size: 258 },
        { breakpoint: null, size: 284 },
      ],
    }
  },

  computed: {
    solutionImage() {
      return this.solution?.image
    },
    solutionLink() {
      return this.solution?.link
    },
  },
}
</script>

<style lang="scss" scoped>
.card-solution {
  height: 100%;
  padding: 1.5rem;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

.card-body {
  padding: 0;
}

@include media-breakpoint-down(md) {
  .card-solution {
    box-shadow: $box-shadow;
  }
}

@include media-breakpoint-down(sm) {
  .card-solution {
    box-shadow: $box-shadow-sm;
  }
}

@include media-breakpoint-up(lg) {
  .card-solution {
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}
</style>
