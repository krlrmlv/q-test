<template>
  <div>
    <HomeSectionCalculators bg-variant="light" />
    <HomeSectionFaq :faqs="faqs" />

    <HomeSectionLatestCards
      :slides="slides && slides.latest"
      class="bg-light"
    />

    <HomeSectionSolutions :vendor-codes="solutions" />
    <HomeSectionCourses :courses="courses" class="bg-light" />
    <HomeSectionHelpAlternate />
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

  computed: {
    courses() {
      return (
        this.slides?.univer?.map(({ image, link, title, subtitle }) => ({
          image,
          link,
          name: title,
          type: subtitle,
        })) || []
      )
    },
  },
}
</script>
