<template>
  <b-link
    :to="localePath(`/solutions/${category.slug}`)"
    class="card card-solution-category"
  >
    <div class="card-body">
      <div class="mb-24">
        <img
          :src="$getStaticImage(category.icon)"
          class="card-icon"
          aria-hidden="true"
        />
      </div>

      <p class="card-title">
        {{ category.name }}
      </p>
      <p class="mb-lg-20">
        {{ description }}
      </p>

      <LinkMore class="btn-more">
        {{ $t('global.more') }}
      </LinkMore>
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    description() {
      return this.category?.categories_text ?? this.category?.description
    },
  },
}
</script>

<style lang="scss" scoped>
.card-solution-category {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  color: inherit;

  &:focus,
  &:hover {
    text-decoration: none;
  }
}

.card-title {
  font-size: $font-size-4;
  font-weight: $font-weight-medium;
  line-height: $headings-line-height;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.btn-more {
  align-self: flex-start;
  margin-top: auto;
}

@include media-breakpoint-down(md) {
  .card-solution-category {
    box-shadow: $box-shadow;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-icon {
    width: 3rem;
    height: 3rem;
  }
}

@include media-breakpoint-up(lg) {
  .card-solution-category {
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
    padding: 2rem 2rem 2.5rem;
  }

  .card-icon {
    width: 4rem;
    height: 4rem;
  }

  .card-title {
    font-size: 1.375rem;
  }

  .btn-more {
    opacity: 0;
    transition: $transition-base;
    transition-property: opacity;
  }
}
</style>
