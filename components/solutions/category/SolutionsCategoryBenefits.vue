<template>
  <section class="overflow-hidden pb-32">
    <div class="solutions-category-benefits">
      <b-container>
        <b-row class="py-16 py-xl-32">
          <b-col
            v-for="(benefit, index) in benefits"
            :key="`col-${index}`"
            cols="12"
            md="3"
            class="mb-24"
          >
            <div class="solutions-category-benefit">
              <div class="benefit-icon" aria-hidden="true">
                <svg-icon name="check-24" width="24" height="24" />
              </div>
              <h6 class="benefit-title mb-0">
                {{ benefit.title }}
              </h6>
              <p v-if="benefit.description" class="mt-8 mb-0">
                {{ benefit.description }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    benefits: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-category-benefits {
  background-color: $white;
  box-shadow: $box-shadow;
}

.solutions-category-benefit {
  padding-top: 1rem;
  line-height: 1.4;
}

.benefit-icon {
  margin-bottom: 0.5rem;
  color: $primary;
}

@include media-breakpoint-down(md) {
  .solutions-category-benefit {
    font-size: $font-size-2;
  }

  .benefit-title {
    font-size: inherit;
  }
}

@include media-breakpoint-down(sm) {
  .solutions-category-benefits {
    .row {
      & > * {
        &:not(:first-child) {
          .solutions-category-benefit {
            border-top: $border-width solid $border-color;
          }
        }
      }
    }
  }

  .solutions-category-benefit {
    padding-top: 1.5rem;
  }

  .benefit-title {
    font-size: 1.125rem;
  }
}
</style>
