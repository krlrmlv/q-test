<template>
  <transition name="fade" mode="in-out">
    <img v-if="!isReady" :src="poster" alt="" />
    <video
      v-else
      ref="video"
      :poster="poster"
      autoplay
      loop
      muted
      playsinline
      @canplay="$emit('canplay')"
      @pause="handlePause"
      @play="handlePlay"
    >
      <source
        v-for="(source, index) in sources"
        :key="`src-${index}`"
        :src="source.url"
        :type="source.type"
      />
    </video>
  </transition>
</template>

<script>
import { getViewportWidth } from '@/utils/window'

const DELAY = 1000

export default {
  props: {
    breakpoint: {
      type: Number,
      default: null,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
    poster: {
      type: String,
      default: null,
    },
    sources: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isIntersecting: false,
      isReady: false,
      localPlaying: false,
      wasPaused: false,
    }
  },

  watch: {
    isPlaying(value) {
      const video = this.$refs.video
      if (!video) return

      if (value) {
        this.playVideo(video)
      } else {
        video.pause()
      }
    },

    isIntersecting(value) {
      /* Pause video if it was playing & left viewport,
       * resume playback when it returns to viewport again */
      const video = this.$refs.video
      if (!video) return

      if (!value && this.isPlaying) {
        video.pause()
        this.wasPaused = true
      } else if (this.wasPaused) {
        this.playVideo(video)
        this.wasPaused = false
      }
    },
  },

  mounted() {
    window.addEventListener('resize', this.handleResize, { passive: true })

    setTimeout(() => {
      this.handleResize()
      this.setObserver()
    }, DELAY)
  },

  methods: {
    handlePause() {
      this.$emit('pause')
      this.localPlaying = false
    },

    handlePlay() {
      /* Update local playing state after video ACTUALLY started playing */
      this.$emit('play')
      this.localPlaying = true
    },

    handleResize() {
      this.isReady = getViewportWidth() >= this.breakpoint
    },

    playVideo(video) {
      /* Try starting playback on prop change only if localPlaying indicates
       * that video is ACTUALLY paused */
      if (this.localPlaying) return

      const playPromise = video.play()

      if (typeof playPromise?.catch === 'function') {
        playPromise.catch((error) => {
          /* Skip play promise errors */
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line
            console.log('Video playback promise error', error)
          }
        })
      }
    },

    setObserver() {
      const boundary = this.$parent.$el
      if (!boundary) return

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            this.isIntersecting = true
          } else {
            this.isIntersecting = false
          }
        })

        observer.observe(boundary)
      }
    },
  },
}
</script>
