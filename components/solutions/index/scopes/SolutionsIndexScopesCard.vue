<template>
  <b-link
    :to="localePath(`/solutions/scopes/${scope.slug}`)"
    class="card card-solution-scope"
  >
    <div class="card-picture">
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getStaticImage(scope.image, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          :src="$getStaticImage(scope.image, 364)"
          :alt="scope.name"
          class="card-picture-image"
        />
      </picture>
    </div>
    <div class="card-body">
      <p class="card-title">
        {{ scope.application || scope.name }}
      </p>
      <p v-if="scope.description">
        {{ scope.description }}
      </p>
      <span class="btn btn-block btn-sm btn-primary btn-more">
        {{ $t('global.more') }}
      </span>
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    scope: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 334 },
        { breakpoint: 575, size: 549 },
        { breakpoint: 767, size: 244 },
        { breakpoint: 991, size: 166 },
        { breakpoint: 1239, size: 214 },
        { breakpoint: 1359, size: 271 },
        { breakpoint: 1479, size: 304 },
        { breakpoint: null, size: 330 },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.card-solution-scope {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.3;
  color: $gray-700;
}

.card-title {
  font-weight: $font-weight-medium;
  line-height: $headings-line-height;
  color: $body-color;
}

.card-picture {
  position: relative;
  border: $border-width solid $gray-200;

  &::before {
    display: block;
    content: '';
    padding-bottom: 56.25%;
  }

  .card-picture-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
}

.btn-more {
  margin-top: auto;
  padding-top: 0.4375rem;
  padding-bottom: 0.4375rem;
}

@include media-breakpoint-down(sm) {
  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.375rem;
    line-height: 1.4;
  }

  .btn-more {
    padding-top: 0.6875rem;
    padding-bottom: 0.6875rem;
    font-size: 1rem;
    line-height: 1.5;
  }
}

@include media-breakpoint-down(md) {
  .card-solution-scope {
    box-shadow: $box-shadow;
  }
}

@include media-breakpoint-up(lg) {
  .card-solution-scope {
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
      cursor: pointer;

      .btn-more {
        opacity: 1;
      }
    }
  }

  .card-body {
    padding: 1.5rem 1rem;
  }

  .card-title {
    font-size: $font-size-4;
  }

  .btn-more {
    opacity: 0;
    transition: $transition-base;
    transition-property: opacity;
  }
}
</style>
