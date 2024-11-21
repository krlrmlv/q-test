<template>
  <section>
    <b-container class="position-relative">
      <b-spinner v-if="loading" variant="secondary" class="loading-indicator" />

      <b-row v-if="!hideTitle">
        <b-col sm="6" class="mb-16 mb-lg-24">
          <h4 class="mb-0">{{ playlist.title }}</h4>
        </b-col>
        <b-col sm="6" class="d-none d-sm-block text-right mb-16 mb-lg-24">
          <LinkMore :to="localePath(`/about/video/${playlist.id}`)">
            {{ $t('global.showAll') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row
        :class="{ loading: loading }"
        class="playlist-content mb-n16 mb-sm-n24"
      >
        <b-col
          v-for="video in playlist.videos"
          :key="`video-${video.id}`"
          md="4"
          class="mb-16 mb-md-24"
        >
          <VideoCard :video="video" @click="showModal" />
        </b-col>
      </b-row>

      <div v-if="!hideTitle" class="d-sm-none text-center">
        <LinkMore :to="localePath(`/about/video/${playlist.id}`)">
          {{ $t('global.showAll') }}
        </LinkMore>
      </div>
    </b-container>

    <YoutubeModal
      v-model="modalVisible"
      :video="currentVideo"
      @hidden="handleModalHidden"
    />
  </section>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { getYoutubeId } from '@/utils/youtube'

export default {
  components: { BSpinner },

  props: {
    hideTitle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    playlist: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      currentVideo: {},
      modalVisible: false,
    }
  },

  methods: {
    handleModalHidden() {
      this.currentVideo = {}
    },

    showModal(video) {
      const id = getYoutubeId(video?.url)
      const title = video.title
      this.currentVideo = { id, title }
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist-content {
  opacity: 1;
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}

.loading-indicator {
  position: absolute;
  top: 1rem;
  left: calc(1rem + #{$grid-gutter-width * 0.5});
  border-width: $border-width * 2;
  z-index: 1;
}
</style>
