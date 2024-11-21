<template>
  <section class="section-home section-home-numbers">
    <b-container>
      <b-row>
        <b-col
          v-for="(item, index) in numbers"
          :key="index"
          :md="parseInt(12 / numbers.length, 10)"
          cols="12"
          class="mb-32 mb-md-0"
        >
          <p class="d-flex flex-column fs-4 mb-0">
            <span class="number-title mb-8">
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
            <span v-html="item.caption"> </span>
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
  font-size: 4rem;
  color: $gray-600;
}

@include media-breakpoint-up(xl) {
  .number-title {
    font-size: 5rem;
  }
}
</style>
