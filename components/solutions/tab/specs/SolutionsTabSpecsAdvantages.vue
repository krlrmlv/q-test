<template>
  <div>
    <h4 class="mb-24 mb-lg-48">{{ $t('solutions.tabs.specs.benefits') }}</h4>

    <ul class="solution-benefits mb-n16 mb-lg-n24">
      <li
        v-for="(benefit, index) in benefits"
        :key="`benefit-${index}`"
        class="solution-benefits-item mb-16 mb-lg-24"
      >
        <div class="benefit-icon-wrapper" aria-hidden="true">
          <img
            :src="$getStaticImage(benefit.image)"
            alt=""
            class="benefit-icon"
          />
        </div>

        <p class="benefit-text mb-0">
          {{ benefit.text }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    advantages: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    benefits() {
      return this.advantages?.map(({ advantage }) => advantage)
    },
  },
}
</script>

<style lang="scss" scoped>
.solution-benefits {
  margin: 0;
  padding: 0;
  list-style: none;
}

.solution-benefits-item {
  display: flex;
  align-items: center;
}

.benefit-icon-wrapper {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
  border-radius: $rounded-pill;
  background-color: $gray-100;
}

.benefit-icon {
  width: 1.5rem;
  height: 1.5rem;
}

@include media-breakpoint-down(md) {
  .solution-benefits {
    font-size: $font-size-2;
  }
}

@include media-breakpoint-up(lg) {
  .solution-benefits {
    column-count: 2;
    column-gap: $grid-gutter-width;
  }

  .solution-benefits-item {
    display: inline-flex;
    width: 100%;
    break-inside: avoid;
  }

  .benefit-icon-wrapper {
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 1.5rem;
  }
}

@include media-breakpoint-up(xl) {
  .solution-benefits-item {
    max-width: 85%;
  }
}
</style>
