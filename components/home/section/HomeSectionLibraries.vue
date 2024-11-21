<template>
  <section class="section-home section-home-libraries">
    <b-container>
      <b-row class="mb-lg-64">
        <b-col md="10" lg="8" xl="9">
          <h2>{{ $t('title') }}</h2>
        </b-col>
        <b-col lg="4" xl="3" class="d-none d-lg-block text-right mb-auto">
          <LinkMore :to="localePath('/support/libraries')">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
        <b-col lg="8">
          <p class="mb-lg-0">
            {{ $t('subtitle') }}
          </p>
        </b-col>
      </b-row>

      <SupportLibraries :limit="limit" />

      <div class="text-center d-lg-none pt-32">
        <LinkMore :to="localePath('/support/libraries')">
          {{ $t('linkText') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'HomeSectionLibraries',

  serverCacheKey: ({ limit }) => `HomeSectionLibraries::${limit}`,

  props: {
    limit: {
      type: Number,
      default: 3,
    },
  },
}
</script>

<i18n>
{
  "ru": {
    "downloadLibraries": "Скачать библиотеки",
    "linkText": "Смотреть все библиотеки",
    "subtitle": "Элементная база EKF для популярного программного обеспечения",
    "title": "BIM & CAD библиотеки"
  },
  "en": {
    "downloadLibraries": "Download Libraries",
    "linkText": "Show all libraries",
    "subtitle": "EKF element base for popular software",
    "title": "BIM & CAD libraries"
  }
}

</i18n>
