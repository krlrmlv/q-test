<template>
  <section>
    <picture>
      <source
        srcset="/images/select-region/bg-sm.jpg"
        media="(max-width: 420px)"
      />
      <source
        srcset="/images/select-region/bg-md.jpg"
        media="(max-width: 991px)"
      />
      <source srcset="/images/select-region/bg.jpg" />
      <img
        :alt="''"
        src="/images/select-region/bg.jpg"
        class="select-region-bg"
      />
    </picture>

    <b-container class="select-region-content py-32 py-md-64 py-lg-96">
      <b-row class="mt-lg-48">
        <b-col cols="12" class="mb-48 mb-md-64 mb-lg-80">
          <img
            src="/images/select-region/logo-ekf-white.svg"
            width="149"
            height="40"
            alt="EKF"
            class="ekf-logo"
          />
        </b-col>

        <b-col
          cols="12"
          class="mb-24 mb-md-40 text-white text-center page-title"
        >
          <h1 class="mb-12">Select your region</h1>

          <p>Выберите регион</p>
        </b-col>

        <SelectRegionCards />
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'embed',
  head() {
    return {
      title: this.$t('global.selectRegion'),
    }
  },
}
</script>

<style lang="scss" scoped>
.select-region-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.6);
}

.ekf-logo {
  display: block;
  margin: 0 auto;
}

.page-title {
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-weight: 500;
  }
}

.select-region-content {
  max-width: 1140px;
}

@include media-breakpoint-down(md) {
  .select-region-content {
    max-width: 560px;
  }
}

@include media-breakpoint-down(md) {
  .card-btn {
    width: 100%;
    font-size: small;
  }
}

@include media-breakpoint-down(sm) {
  .card-btn {
    font-size: medium;
  }
}
</style>
