<template>
  <div>
    <HomeSectionFaq :faqs="faqs" class="bg-light" />
    <HomeSectionLatestCards :slides="slides && slides.latest" />
    <HomeSectionHelp>
      <div class="text-center">
        <SeoLink
          href="https://market.ekfgroup.com/"
          target="_blank"
          class="btn btn-primary"
        >
          {{ $t('global.buyProducts') }}
          <svg-icon
            name="arrow-right-24"
            width="24"
            height="24"
            class="ml-8"
            aria-hidden="true"
          />
        </SeoLink>
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
