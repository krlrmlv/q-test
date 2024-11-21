<template>
  <b-container class="page-container">
    <b-row>
      <b-col xl="7" md="8" class="content-col mb-48 mb-md-0">
        <h1 class="title mb-24">{{ $t('ekfConnect.title') }}</h1>
        <p class="subtitle mb-32 mb-md-64 mr-16">
          {{ $t('ekfConnect.subtitle') }}
        </p>
        <transition name="fade" mode="out-in">
          <div class="links-columns">
            <div
              v-for="link in links"
              :key="link.qrCode"
              cols="4"
              class="link-column"
            >
              <img
                :src="`/images/ekfconnect/${link.qrCode}`"
                alt="QR Code"
                class="img-fluid d-none d-md-block"
              />

              <AppLink
                v-if="svgWidth"
                :title="link.btnTitle"
                :href="link.href"
                :icon="link.btnIcon"
                :icon-width="svgWidth"
                :icon-height="svgHeight"
              />

              <b-skeleton v-else class="skeleton"></b-skeleton>
            </div>
          </div>
        </transition>
      </b-col>
      <b-col xl="4" md="4" class="mt-auto">
        <div class="login-page-img-container">
          <picture>
            <source
              srcset="/images/ekfconnect/login-page-sm.png"
              media="(max-width: 576px)"
            />
            <img
              src="/images/ekfconnect/login-page.png"
              class="img-fluid login-page-img"
              :alt="$t('ekfConnect.imgAlt')"
            />
          </picture>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { BSkeleton } from 'bootstrap-vue'
import { getViewportWidth } from '@/utils/window'
const BREAKPOINT_XL = 1199
const BREAKPOINT_LG = 991
const BREAKPOINT_MD = 767
const LINKS = {
  appStore: 'https://apps.apple.com/ru/app/ekf-connect-home/id6474079393',
  googlePlay:
    'https://play.google.com/store/apps/details?id=home.connect.ekf&hl=en_US',
  appGallery: 'https://appgallery.huawei.com/app/C110524651',
}

const SVG_SIZE = {
  xl: {
    width: 140,
    height: 36,
  },
  lg: {
    width: 152,
    height: 39,
  },
  md: {
    width: 109,
    height: 21,
  },
  sm: {
    width: 136,
    height: 27,
  },
}
export default {
  components: { BSkeleton },
  layout: 'ekfconnect',
  data() {
    return {
      links: [
        {
          qrCode: 'ios.svg',
          href: LINKS.appStore,
          btnTitle: 'ekfConnect.appStoreTitle',
          btnIcon: 'social/app-apple',
        },
        {
          qrCode: 'android.svg',
          href: LINKS.googlePlay,
          btnTitle: 'ekfConnect.googlePlayTitle',
          btnIcon: 'social/app-google',
        },
        {
          qrCode: 'qr_appgallery.svg',
          href: LINKS.appGallery,
          btnTitle: 'ekfConnect.appGalleryTitle',
          btnIcon: 'social/app-gallery',
        },
      ],
      svgWidth: 0,
      svgHeight: 0,
    }
  },
  head() {
    return {
      title: this.$t('ekfConnect.title'),
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })

    this.$nextTick(() => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // Redirect to App Store on iOS / iPadOS
        window.location.href = LINKS.appStore
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const vw = getViewportWidth()
      if (vw > BREAKPOINT_XL) {
        this.svgWidth = SVG_SIZE.xl.width
        this.svgHeight = SVG_SIZE.xl.height
        return
      }
      if (vw > BREAKPOINT_LG) {
        this.svgWidth = SVG_SIZE.lg.width
        this.svgHeight = SVG_SIZE.lg.height
        return
      }
      if (vw > BREAKPOINT_MD) {
        this.svgWidth = SVG_SIZE.md.width
        this.svgHeight = SVG_SIZE.md.height
        return
      }
      this.svgWidth = SVG_SIZE.sm.width
      this.svgHeight = SVG_SIZE.sm.height
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 7.5rem;
}
.title {
  white-space: pre-line;
}
.subtitle {
  font-size: 18px;
}
.links-columns {
  display: flex;
  gap: 0.5rem;
}

.link-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex-basis: min-content;
}
.skeleton {
  width: 159px;
  height: 46px;
}

.btn-app {
  border-color: $gray-900;
  background-color: $gray-900;
}

@include media-breakpoint-up(xl) {
  .title {
    font-size: 4rem;
  }
  .links-columns {
    gap: 2rem;
  }
  .skeleton {
    width: 204px;
    height: 57px;
  }
  .btn-app {
    padding: 0.625rem 2rem;
  }
}

@include media-breakpoint-down(lg) {
  .login-page-img {
    max-width: 240px;
  }
  .skeleton {
    width: 175px;
    height: 58px;
  }
}

@include media-breakpoint-down(md) {
  .skeleton {
    width: 131px;
    height: 40px;
  }
  .login-page-img {
    max-width: 230px;
  }
  .links-columns {
    flex-wrap: wrap;
  }
}

@include media-breakpoint-down(sm) {
  .skeleton {
    width: 159px;
    height: 46px;
  }
  .page-container {
    margin-top: 3.5rem;
  }
}

/** IPhone screen styles */
.login-page-img-container {
  position: relative;
  display: flex;
  justify-content: center;
  @include media-breakpoint-up(md) {
    max-width: auto;
    width: fit-content;
    margin-left: auto;
  }
  @include media-breakpoint-up(md) {
    &::before {
      z-index: -1;
      position: absolute;
      content: '';
      bottom: 0;
      opacity: 0.2;
      background: linear-gradient(
        180deg,
        rgba(26, 34, 42, 0) 27.1%,
        #1b2229 100%
      );
      transform: rotate(-45deg);
      border-radius: 40%;
      filter: blur(6px);
      width: 50%;
      height: 50%;
      left: -25%;
    }
  }
}
</style>
