<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 class="mb-0">{{ $t('about.video') }}</h2>
    </b-container>

    <VideoPlaylist
      v-for="(playlist, index) in playlists"
      :key="`playlist-${index}`"
      :playlist="playlist"
      :class="{ 'bg-light': index % 2 !== 0 }"
      class="py-32 py-lg-64"
    />
  </main>
</template>

<script>
import VIDEO_PLAYLISTS_QUERY from '@/graphql/VideoPlaylists'

export default {
  name: 'PageAboutVideo',

  async asyncData({ app, $graphql }) {
    const breadcrumbs = [
      { text: 'about.video', to: '/about/video', active: true },
    ]
    const variables = { locale: app.i18n.locale }
    const { playlists } = await $graphql.default.request(
      VIDEO_PLAYLISTS_QUERY,
      variables
    )
    return { breadcrumbs, playlists }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "Video — EKF"
  },
  "ru": {
    "pageTitle": "Видео — компания EKF"
  }
}
</i18n>
