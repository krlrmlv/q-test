<template>
  <main class="pb-48">
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 ref="scrollTarget" class="mb-0">{{ playlist.title }}</h2>
    </b-container>

    <VideoPlaylist
      :loading="loading"
      :playlist="playlist"
      hide-title
      class="mb-16 mb-lg-32 pt-32 pt-lg-64"
    />

    <AppPagination
      v-if="totalRows > perPage"
      :per-page="perPage"
      :total-rows="totalRows"
      :value="page"
      size="sm"
      align="center"
      @change="onPageChange"
    />
  </main>
</template>

<script>
import VIDEO_PLAYLISTS_QUERY from '@/graphql/VideoPlaylists'
import VIDEOS_QUERY from '@/graphql/Videos'
import { scrollToTarget } from '@/utils/window'

export default {
  name: 'PageAboutVideoPlaylist',

  async asyncData({ app, error, params, $graphql }) {
    const page = 1
    const perPage = 18
    const playlistId = Number(params.playlist)

    if (isNaN(playlistId)) return error({ statusCode: 404 })

    const variables = {
      locale: app.i18n.locale,
      videoLimit: perPage,
      where: { id: { _eq: playlistId } },
    }

    const { playlists } = await $graphql.default.request(
      VIDEO_PLAYLISTS_QUERY,
      variables
    )
    const playlist = playlists?.[0]

    if (!playlist) return error({ statusCode: 404 })

    const breadcrumbs = [
      { text: 'about.video', to: '/about/video' },
      { text: playlist.title, active: true },
    ]

    return {
      breadcrumbs,
      loading: false,
      page,
      perPage,
      playlist,
      totalRows: playlist.totalVideos?.aggregate?.count,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    pageTitle() {
      const lines = [this.$t('about.video'), this.$t('pageTitle')]
      if (this.playlist?.title) {
        lines.unshift(this.playlist.title)
      }
      return lines.join(' — ')
    },
    // perPage() {
    //   return parseInt(this.$route.query.perPage) || 18
    // },
  },

  methods: {
    async refetchVideos() {
      const variables = {
        locale: this.$i18n.locale,
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
        playlistId: this.playlist.id,
      }

      this.loading = true

      try {
        const { videos } = await this.$graphql.default.request(
          VIDEOS_QUERY,
          variables
        )

        this.playlist.videos = videos
        this.$nextTick(() => {
          this.scrollToTop()
        })
      } catch (error) {}

      this.loading = false
    },

    onPageChange(event) {
      this.page = event
      this.refetchVideos()
    },

    scrollToTop() {
      if (!process.client) return
      const scrollTarget = this.$refs.scrollTarget
      scrollToTarget(scrollTarget)
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "EKF"
  },
  "ru": {
    "pageTitle": "компания EKF"
  }
}
</i18n>
