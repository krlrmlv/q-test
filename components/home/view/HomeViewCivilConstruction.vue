<template>
  <div>
    <HomeSectionFaq :faqs="faqs" class="bg-light" />
    <HomeSectionLatestCards :slides="slides && slides.latest" />
    <HomeSectionSolutions :vendor-codes="solutions" class="bg-light" />
    <HomeSectionHelp>
      <div class="d-flex flex-column">
        <b-button
          :to="localePath('/distribution/buy')"
          target="_blank"
          variant="primary"
        >
          {{ $t('global.order') }}
        </b-button>
      </div>
    </HomeSectionHelp>
  </div>
</template>

<script>
export default {
  props: {
    faqs: {
      type: Array,
      default: () => [],
    },
    slides: {
      type: Object,
      default: () => ({}),
    },
    solutions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
