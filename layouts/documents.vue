<template>
  <div id="app-root">
    <header class="app-header">
      <b-container class="header-container text-center text-sm-left">
        <img
          src="/images/logo-ekf.svg"
          width="138"
          height="36"
          alt="EKF"
          class="header-brand-image"
        />
        <div v-if="languageSelectVisible" class="language-select">
          <b-link
            class="d-flex language-link fs-2 fs-sm-3"
            @click="modalVisible = true"
          >
            <span class="d-flex rounded-pill mr-8 overflow-hidden">
              <svg-icon
                :name="`flags/${language}-24`"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </span>
            {{ language.toUpperCase() }}
          </b-link>
        </div>
      </b-container>
    </header>
    <main>
      <Nuxt />
    </main>
    <footer class="app-footer">
      <b-container class="footer-container">
        <b-row align-v="center" class="mb-sm-24">
          <b-col cols="12" md="3" class="mb-24">
            <img
              src="/images/logo-ekf-dark.svg"
              width="184"
              alt="EKF"
              class="footer-brand"
            />
          </b-col>
          <b-col cols="6" md="3" class="mb-8">
            <svg-icon
              name="website-16"
              width="16"
              height="16"
              aria-hidden="true"
            />
            <b-link :to="localePath('/')" class="fs-2 fs-sm-3 text-reset"
              >ekfgoup.com</b-link
            >
          </b-col>
          <b-col cols="6" md="4" class="mb-8 text-right text-md-left">
            <svg-icon
              name="mail-24"
              width="16"
              height="16"
              aria-hidden="true"
            />
            <b-link
              href="mailto:sales@ekfgroup.com"
              class="fs-2 fs-sm-3 text-reset"
              >sales@ekfgroup.com</b-link
            >
          </b-col>
          <div v-if="languageSelectVisible" class="language-select">
            <b-link
              class="d-flex language-link fs-2 fs-sm-3"
              @click="modalVisible = true"
            >
              <span class="d-flex rounded-pill overflow-hidden mr-8">
                <svg-icon
                  :name="`flags/${language}-24`"
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </span>
              {{ language.toUpperCase() }}
            </b-link>
          </div>
        </b-row>
        <hr class="border-gray-200 mb-md-32" />
        <b-row class="fs-2 fs-sm-3 lh-120 text-gray-500">
          <b-col cols="10" md="11" class="mb-8">
            <b-link :to="localePath('/')" class="text-reset">
              © {{ currentYear }} EKF
            </b-link>
          </b-col>
        </b-row>
      </b-container>
    </footer>
    <DocumentsLanguageModal
      v-model="modalVisible"
      :selected-language="language"
      @set-selected-language="setSelectedLanguage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const ALLOWED_LANGUAGES = ['en', 'ru']
const COOKIE_NAME = 'documents_language'

export default {
  name: 'LayoutDocuments',
  data() {
    return {
      modalVisible: false,
    }
  },
  computed: {
    ...mapGetters('documents', ['langSelectAvailable']),

    languageSelectVisible() {
      return this.langSelectAvailable
    },
    language() {
      let language =
        this.$route.query.language || this.$cookies.get(COOKIE_NAME)
      if (!language) language = this.$i18n.locale

      language = ALLOWED_LANGUAGES.includes(language) ? language : 'ru'

      return language
    },
    currentYear() {
      const date = new Date()
      return date.getFullYear()
    },
  },
  mounted() {
    this.$i18n.locale = this.language

    const lang = this.$cookies.get(COOKIE_NAME) || ''
    this.modalVisible = !lang && this.langSelectAvailable
  },
  methods: {
    setSelectedLanguage(language) {
      try {
        this.$cookies.set(COOKIE_NAME, language, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
          sameSite: true,
        })
      } catch (error) {
        this.$sentry.captureMessage('Caught error in setSelectedLanguage')
        this.$sentry.captureException(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
}

main {
  flex: 1 1 auto;
  padding: 2.5rem 0;
}

main .container {
  padding-left: 1rem;
  padding-right: 1rem;
}

.app-header {
  padding: 1rem 0;
  position: relative;
  background-color: $white;
  box-shadow: $box-shadow-sm;
  z-index: $zindex-dropdown + 1;
}

@include media-breakpoint-down(md) {
  .app-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-right: 0 !important;
  }
}

.app-footer {
  padding: 2rem 0;
  color: $body-bg;
  background-color: $body-color;
}

.footer-container {
  position: relative;
}

.footer-brand {
  width: 138px;
  height: 36px;
}

.header-container {
  position: relative;
}

.language-select {
  position: absolute;
  right: 0;
  top: 0;
}

.footer-container .language-select {
  margin: 1rem 1rem 0;
}

.header-container .language-select {
  margin: auto 1rem 0;
}

@include media-breakpoint-down(md) {
  .footer-container .language-select {
    margin: 0.3rem 1rem 0;
  }
  .header-brand-image {
    width: 105px;
    height: 28px;
  }

  .footer-brand {
    width: 105px;
    height: 28px;
  }
}

.language-link {
  color: $gray-500;
}
</style>
