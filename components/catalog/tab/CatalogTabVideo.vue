<template>
  <div ref="observerTarget" class="lh-140 pb-md-48">
    <b-row>
      <b-col
        v-for="(video, index) in mappedVideos"
        :key="`video-${index}-${videosLoaded}`"
        md="6"
        lg="4"
        class="mb-16 mb-md-24"
      >
        <CatalogVideoCard
          :item="video"
          :data-mapped="videosLoaded"
          @click.native="showModal(video)"
        />
      </b-col>
    </b-row>

    <YoutubeModal v-model="modalVisible" :video="currentVideo" />
  </div>
</template>

<script>
import { getYoutubeId } from '@/utils/youtube'
import sendToMindbox from '@/utils/mindbox'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    parent: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      currentVideo: {},
      isIntersecting: false,
      modalVisible: false,
      videos: [],
      videosLoaded: false,
    }
  },

  computed: {
    isDev() {
      return process.env.NODE_ENV !== 'production'
    },

    mappedVideos() {
      if (!this.videosLoaded) {
        return this.items?.map((url) => ({ id: getYoutubeId(url) })) || []
      } else {
        return this.videos
      }
    },
  },

  watch: {
    isIntersecting(value) {
      if (value) this.fetchVideos()
    },
  },

  mounted() {
    this.setObserver()
  },

  methods: {
    fetchVideos() {
      const apiUrl = 'https://youtube.googleapis.com/youtube/v3'
      const videoIds = this.items?.map((url) => getYoutubeId(url)) || []
      const idString = videoIds?.join(',')

      let videos = videoIds.map((id) => ({ id }))
      this.videosLoaded = false

      this.$axios
        .get(`${apiUrl}/videos`, {
          params: {
            part: 'snippet,localizations,status',
            id: idString,
            key: process.env.YOUTUBE_API_KEY,
          },
        })
        .then(({ data }) => {
          videos = videoIds.map((srcId) => {
            const video = data?.items?.find(({ id }) => id === srcId)
            return video
              ? { id: video.id, name: video.snippet?.title }
              : { id: srcId }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line
          if (this.isDev) console.log('Error loading videos', error)
        })
        .finally(() => {
          this.videos = videos
          this.videosLoaded = true
        })
    },

    showModal(video) {
      this.currentVideo = video
      this.modalVisible = true

      sendToMindbox('EKFGroupWatchingVideo', {
        customerAction: {
          customFields: {
            LandingName: window?.location?.href,
          },
        },
      })
    },

    setObserver() {
      const target = this.$refs.observerTarget
      if (!target) return

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            this.isIntersecting = true
            observer.unobserve(target)
          }
        })

        observer.observe(target)
      } else {
        /* Immediately trigger fetchVideos if IntersectionObserver not supported */
        this.isIntersecting = true
      }
    },
  },
}
</script>
