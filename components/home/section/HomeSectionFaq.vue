<template>
  <section class="section-home section-home-faq">
    <b-container>
      <h2 class="mb-32 mb-lg-64">
        {{ sectionTitle }}
      </h2>

      <div class="column-count-md-2 mb-n32">
        <div v-for="(item, index) in faqs" :key="`faq-${index}`">
          <HomeSectionFaqItem :item="item" class="mb-32" />
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    faqs: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    sectionTitle() {
      return this.title || this.$t('faq.title')
    },
  },
}
</script>
