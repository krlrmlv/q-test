<template>
  <SeoLink
    :href="isReady ? null : `https://www.youtube.com/watch?v=${videoId}`"
    :target="isReady ? null : '_blank'"
    :class="`embed-responsive embed-responsive-${aspect} mobile-adaptive youtube-embed`"
    tag-name="div"
    @click="playVideo"
  >
    <youtube
      ref="youtube"
      :video-id="videoId"
      class="embed-responsive-item"
      @buffering="onPlayerPlay"
      @ended="onPlayerStop"
      @paused="onPlayerStop"
      @playing="onPlayerPlay"
      @ready="onPlayerReady"
    />
    <transition :duration="300" name="fade">
      <div v-if="!isPlaying" class="embed-responsive-item embed-thumbnail">
        <slot>
          <img :src="previewImageUrl" class="embed-thumbnail-image" alt="" />
        </slot>
      </div>
    </transition>
  </SeoLink>
</template>

<script>
import { Youtube } from 'vue-youtube'

export default {
  components: { Youtube },

  props: {
    aspect: {
      type: String,
      default: '16by9',
    },
    previewImage: {
      type: String,
      default: null,
    },
    videoId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isReady: false,
      isPlaying: false,
      timeout: null,
    }
  },

  computed: {
    previewImageUrl() {
      return (
        this.previewImage ||
        `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`
      )
    },
  },

  methods: {
    onPlayerPlay() {
      if (this.timeout) clearTimeout(this.timeout)
    },
    onPlayerReady() {
      this.isReady = true
    },
    onPlayerStop() {
      this.timeout = setTimeout(() => {
        this.stopVideo()
      }, 500)
    },
    playVideo() {
      if (this.isReady) {
        this.$refs.youtube.player.playVideo()
        this.isPlaying = true
      }
    },
    stopVideo() {
      this.isPlaying = false
    },
  },
}
</script>

<style lang="scss">
$youtube-play-icon: url('data:image/svg+xml,<svg width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m5.5742 0.8125c-0.8555 0.03043-1.6801 0.47134-2.168 1.252-0.26489 0.42382-0.40625 0.91424-0.40625 1.4141v17.043c0 1.4728 1.1933 2.668 2.666 2.668 0.49978 0 0.9902-0.14135 1.4141-0.40625l13.635-8.5215c1.2489-0.7805 1.6283-2.4269 0.84766-3.6758-0.2146-0.3434-0.50426-0.63304-0.84766-0.84766l-13.635-8.5215c-0.46834-0.29271-0.99252-0.42255-1.5059-0.4043z" fill="#{$primary}"/></svg>');

.youtube-embed {
  .embed-thumbnail,
  .embed-thumbnail-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .embed-thumbnail {
    &::after {
      display: block;
      content: '';
      position: absolute;
      left: calc(50% - 2.5rem);
      top: calc(50% - 2.5rem);
      width: 5rem;
      height: 5rem;
      border-radius: $rounded-pill;
      background-color: $white;
      background-image: escape-svg($youtube-play-icon);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.5rem;
      transform: scale(1);
      transition: $transition-base;
      transition-property: background-color, transform;
    }
  }

  .embed-thumbnail-caption {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 1.5rem;
    color: $white;
    background-color: rgba($black, 0.75);
  }

  &:hover {
    .embed-thumbnail {
      &::after {
        background-color: $gray-200;
        transform: scale(1.025);
      }
    }
  }

  .embed-thumbnail-image {
    object-fit: cover;
  }
}
</style>
