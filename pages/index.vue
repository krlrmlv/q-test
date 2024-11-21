<template>
  <main>
    <HomeSectionIntro />
    <HomeSectionCkg class="bg-light" />
    <LazyHomeSectionCatalog />
    <LazyHomeSectionSecondarySlider class="bg-light" />
    <LazyHomeSectionProjects />
    <LazyHomeSectionCalculators bg-variant="light" />
    <LazyHomeSectionLibraries />
    <LazyHomeSectionNews class="bg-light" />
    <LazyHomeSectionUniver />
    <LazyHomeSectionCourses class="bg-light" />
    <!-- <HomeSectionPartners /> -->
    <LazyHomeSectionFeedback />
    <LazyHomeSectionContacts class="bg-light" />
  </main>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: '/videos/intro-mobile-poster.webp',
        },
      ],
    }
  },
}
</script>
