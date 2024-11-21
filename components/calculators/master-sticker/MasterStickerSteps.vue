<template>
  <b-container fluid="xl" class="ml-xl-0">
    <b-row class="mastersticker-steps mx-n8 mx-md-n12 mb-16">
      <b-col v-for="i in 3" :key="`step-${i}`" cols="4" class="px-8 px-md-12">
        <div :class="{ active: i === step }" class="d-flex flex-column">
          <b-button
            variant="white"
            class="mastersticker-step"
            @click="setStep(i)"
          >
            <span class="mastersticker-step-prefix">{{
              $t('calculators.masterSticker.steps.step', locale)
            }}</span
            >&nbsp;<span class="mastersticker-step-index">{{ i }}</span>
          </b-button>

          <p class="h7 text-center text-uppercase d-none d-md-block mt-16">
            {{ $t(`calculators.masterSticker.steps.${i}`, locale) }}
          </p>
        </div>
      </b-col>
    </b-row>

    <transition name="fade" mode="out-in">
      <p :key="step" class="h7 text-center text-uppercase d-md-none">
        {{ $t(`calculators.masterSticker.steps.${step}`, locale) }}
      </p>
    </transition>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('mastersticker', ['locale', 'step']),
  },

  methods: {
    ...mapActions('mastersticker', ['setStep']),
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-steps {
  position: relative;
  color: $gray-600;

  .active {
    color: $body-color;
  }
}

.mastersticker-step {
  display: flex;
  min-width: 0;
  max-width: 100%;
  text-transform: uppercase;
  white-space: nowrap;
  border-color: $gray-600;

  .active & {
    color: $white;
    background-color: $gray-600;
  }
}

.mastersticker-step-prefix {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mastersticker-step-index {
  flex: 0 0 auto;
}

@include media-breakpoint-down(xs) {
  .mastersticker-step {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

@include media-breakpoint-up(sm) {
  .mastersticker-steps {
    &::before {
      display: block;
      content: '';
      position: absolute;
      left: $grid-gutter-width * 0.5;
      right: $grid-gutter-width * 0.5;
      top: calc(#{$input-height} * 0.5);
      border-bottom: $border-width solid $gray-600;
    }
  }

  .mastersticker-step {
    margin: 0 auto;
  }
}
</style>
