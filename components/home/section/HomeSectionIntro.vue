<template>
  <section class="section-home section-home-intro">
    <LazyVideo
      :breakpoint="768"
      :is-playing="videoPlaying"
      :sources="videoSources"
      poster="/videos/intro-full-poster.webp"
      class="section-bg d-none d-md-block"
      @canplay="videoReady = true"
      @pause="videoPlaying = false"
      @play="videoPlaying = true"
    />

    <picture>
      <source type="image/webp" srcset="/videos/intro-mobile-poster.webp" />
      <source type="image/jpeg" srcset="/videos/intro-mobile-poster.jpg" />
      <img
        alt=""
        src="/videos/intro-mobile-poster.jpg"
        class="section-bg d-md-none"
        aria-hidden="true"
      />
    </picture>

    <b-container class="text-center">
      <h1 class="h1 home-intro-title mb-32">
        {{ $t('title') }}
      </h1>
      <p class="h5 home-intro-subtitle">
        {{ $t('text') }}
      </p>

      <transition name="fade" mode="out-in">
        <div v-if="videoReady" :key="videoPlaying" class="text-right">
          <b-button
            :title="$t(`global.${videoPlaying ? 'pause' : 'play'}`)"
            :aria-label="$t(`global.${videoPlaying ? 'pause' : 'play'}`)"
            variant="link"
            class="btn-icon btn-video-toggle rounded-pill"
            @click="videoPlaying = !videoPlaying"
          >
            <svg-icon
              :name="`${videoPlaying ? 'pause' : 'play'}-24`"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </b-button>
        </div>
      </transition>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      videoPlaying: false,
      videoReady: false,
      videoSources: [
        { url: '/videos/intro-full.webm', type: 'video/webm' },
        { url: '/videos/intro-full.mp4', type: 'video/mp4' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.section-home-intro {
  display: flex;
  align-items: center;
  position: relative;
  height: 500px;
  padding-top: 0;
  padding-bottom: 0;
  color: $white;
  overflow: hidden;

  sup {
    top: -0.75em;
    font-size: 50%;
  }

  .text-shadow {
    text-shadow: 0 0.25rem 12.5rem rgba($black, 0.8);
  }
}

.home-intro-subtitle {
  max-width: 70%;
  margin: 0 auto;
  line-height: 1.5;
}

.section-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.btn-video-toggle {
  display: inline-flex;
  position: absolute;
  top: 32px;
  margin: (-$input-btn-padding-y) (-$input-btn-padding-y) 0 0;
  border: none;
  color: $gray-400;
  box-shadow: none;

  &:hover {
    color: $white;
  }
}

@include media-breakpoint-down(xs) {
  .text {
    font-size: $font-size-4;
    max-width: 100%;
    line-height: 1.4;
    padding: 0;
  }
}
@include media-breakpoint-down(sm) {
  .btn-video-toggle {
    display: none;
  }
}

@include media-breakpoint-up(lg) {
  .section-home-intro {
    padding-top: 0;
    padding-bottom: 0;
  }

  .home-intro-title,
  .home-intro-subtitle {
    box-shadow: $box-shadow;
  }
}
</style>

<i18n>
{
  "ru": {
    "title": "EKF создаёт надежные и эффективные электрорешения для устойчивого будущего",
    "text": "Более 22 лет мы делаем жизнь людей лучше, объединяя энергию профессионалов и инновационные технологии"
  },
  "en": {
    "title": "We create reliable and efficient electrical solutions for a sustainable future",
    "text": "For more than 22 years we have been making people's lives better by combining the energy of professionals and innovative technologies"
  }
}

</i18n>
