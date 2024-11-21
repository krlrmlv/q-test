<template>
  <section class="section-home section-home-numbers">
    <b-container>
      <slot name="header">
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2 class="mb-32 mb-lg-48">
              {{ title || $t('numbers.title') }}
            </h2>
          </b-col>
        </b-row>
      </slot>

      <b-row class="numbers-row">
        <b-col
          v-for="(item, index) in numbers"
          :key="index"
          :lg="parseInt(12 / numbers.length, 10)"
          md="6"
          cols="12"
          class="mb-32 mb-md-0"
        >
          <p class="d-flex flex-column fs-4 mb-0">
            <span class="h1 text-primary number-title mb-8">
              <svg-icon
                v-if="item.icon"
                :name="item.icon"
                width="64"
                height="64"
                aria-hidden="true"
              />
              <template v-else>
                {{ item.number }}
              </template>
            </span>
            {{ item.caption }}
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    numbers: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.section-home-numbers {
  text-align: center;
  color: $white;
  background-color: $gray-900;
}

.number-title {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
}

@include media-breakpoint-down(sm) {
  .number-title {
    font-size: 3rem;
  }
}
@include media-breakpoint-up(sm) {
  .numbers-row {
    gap: 1.5rem 0;
  }
}
</style>
