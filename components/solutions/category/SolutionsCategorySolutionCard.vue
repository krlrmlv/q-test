<template>
  <div class="card card-solutions-solution">
    <b-link
      :to="localePath(`/solutions/solution/${solution.slug}`)"
      class="card-picture-wrapper embed-responsive embed-responsive-1by1"
    >
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getStaticImage(solutionImage, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          :src="$getStaticImage(solutionImage, 219)"
          :alt="solution.name"
          class="card-picture embed-responsive-item"
        />
      </picture>
    </b-link>
    <b-link
      :to="localePath(`/solutions/solution/${solution.slug}`)"
      class="card-body"
    >
      <p class="h7 card-title mb-4">
        {{ solution.name }}
      </p>
      <p class="solution-vendor-code mb-0">
        {{ solution.vendor_code }}
      </p>
    </b-link>
    <div class="card-footer">
      <b-button
        :to="localePath(`/solutions/solution/${solution.slug}`)"
        size="sm"
        variant="outline-primary"
        block
      >
        {{ $t('global.more') }}
      </b-button>
    </div>
  </div>
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
        { breakpoint: 767, size: 245 },
        { breakpoint: 991, size: 314 },
        { breakpoint: 1239, size: 166 },
        { breakpoint: 1359, size: 223 },
        { breakpoint: 1479, size: 256 },
        { breakpoint: null, size: 282 },
      ],
    }
  },

  computed: {
    solutionImage() {
      return this.solution?.images?.[0]?.file
    },
  },
}
</script>

<style lang="scss" scoped>
.card-solutions-solution {
  height: 100%;
  line-height: 1.2;
}

.card-picture-wrapper {
  border: $border-width solid $border-color;
}

.card-body {
  padding: 1rem 0 0;
  color: inherit;
}

.solution-vendor-code {
  font-size: $font-size-1;
  color: $gray-500;
}

.card-footer {
  padding: 1rem 0 0;
  background-color: transparent;

  .btn-sm {
    font-weight: $font-weight-normal;
  }
}

@include media-breakpoint-down(xs) {
  .card-picture-wrapper {
    border: none;
  }

  .card-title {
    font-size: $font-size-1;
    font-weight: $font-weight-normal;
  }

  .card-footer {
    .btn-sm.btn-outline-primary {
      color: $white;
      background-color: $primary;
      border-color: $primary;

      @media (hover: hover) {
        &:hover {
          background-color: $primary-light;
          border-color: $primary-light;
        }
      }

      @media (hover: none) {
        &:active {
          background-color: $primary-light;
          border-color: $primary-light;
        }
      }
    }
  }
}

@include media-breakpoint-only(md) {
  .card-solutions-solution {
    padding: 1rem;
    box-shadow: $box-shadow-sm;
  }
}

@include media-breakpoint-up(lg) {
  .card-solutions-solution {
    padding: 1.5rem 1.5rem 1rem;
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}
</style>
