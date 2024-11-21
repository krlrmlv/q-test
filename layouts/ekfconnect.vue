<template>
  <div id="app-root">
    <header class="app-header">
      <b-container class="header-container">
        <img
          src="/images/logo-ekf.svg"
          width="138"
          height="36"
          alt="EKF"
          class="header-brand-image"
        />
        <b-link :to="localePath('/ru')" class="btn btn-outline-primary">
          {{ $t('goToSite') }}
        </b-link>
      </b-container>
    </header>
    <main>
      <Nuxt />
    </main>
    <footer class="app-footer">
      <b-container class="py-24">
        <span v-html="footerTextHtml"></span>
      </b-container>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LayoutEkfconnect',
  computed: {
    footerTextHtml() {
      const text = this.$t('footerText')
      return text.replace(
        'iot@ekf.su',
        '<a href="mailto:iot@ekf.su" class="info-message-link">iot@ekf.su</a>'
      )
    },
  },
}
</script>

<style lang="scss">
.grecaptcha-badge {
  display: none;
}
@include media-breakpoint-down(md) {
  body {
    padding-top: 4rem;
  }
}
</style>

<style lang="scss" scoped>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-header {
  background-color: $white;
  box-shadow: $box-shadow-sm;
  z-index: $zindex-dropdown + 1;
  .header-container {
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      font-weight: $font-weight-normal;
    }
  }
}

main {
  flex: 1;
}

.app-footer {
  margin-top: 144px;
  color: $body-bg;
  background-color: $gray-900;
}

@include media-breakpoint-down(md) {
  .app-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    .header-container {
      padding: 0.75rem 1rem;
    }
    .header-brand-image {
      width: 105px;
      height: 28px;
    }
  }
}
@include media-breakpoint-down(sm) {
  .btn {
    padding: 7px 1rem;
  }
}
@include media-breakpoint-down(xs) {
  .app-footer {
    margin-top: 0;
  }
  main {
    flex: 0;
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "EKF Connect Home App",
    "goToSite": "Go to site",
    "footerText": "Mail for feedback and bug reports: iot@ekf.su"
  },
  "ru": {
    "pageTitle": "Приложение EKF Connect Home",
    "goToSite": "Перейти на сайт",
    "footerText": "Почта для обратной связи и отчётов об ошибках: iot@ekf.su"
  }
}
</i18n>
