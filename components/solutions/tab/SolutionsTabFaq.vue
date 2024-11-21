<template>
  <div class="column-count-md-2 mb-32 mb-lg-48">
    <div v-for="(item, index) in faqs" :key="`faq-${index}`">
      <HomeSectionFaqItem :item="item" class="mb-32" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    faqs() {
      return this.items?.map(({ faq }) => faq)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .card-collapse {
    .card-header {
      font-size: $font-size-4;
    }

    .card-body {
      padding-top: 0.5rem;
    }
  }
}
</style>
