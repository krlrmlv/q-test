<template>
  <div>
    <HomeSectionCalculators bg-variant="light" />
    <HomeSectionFaq :faqs="faqs" />
    <HomeSectionLatestCards
      :slides="slides && slides.latest"
      class="bg-light"
    />
    <HomeSectionHelp />
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
