<template>
  <main>
    <b-container>
      <b-row align-v="end" class="mb-lg-16">
        <b-col cols="12" lg="auto" class="flex-lg-fill mb-32">
          <h1 class="h2 d-flex align-items-center">
            <div class="mr-8 d-flex">
              <img
                src="/images/calculators/mastersticker.svg"
                height="44"
                aria-hidden="true"
              />
            </div>
            {{ $t('calculators.masterSticker.title', locale) }}
          </h1>

          <p class="mb-0">
            {{ $t('calculators.masterSticker.description', locale) }}
          </p>
        </b-col>

        <!-- <b-col cols="12" lg="auto" class="mb-32">
          <b-button :href="manualLink" target="_blank" variant="light">
            <svg-icon name="file/pdf-24" width="24" height="24" class="mr-8" />
            {{ $t('calculators.masterSticker.downloadManual', locale) }}
          </b-button>
        </b-col> -->
      </b-row>
    </b-container>

    <div class="border-top mb-48 pt-48 pb-lg-16">
      <MasterSticker />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ query, store }) {
    await store.dispatch('mastersticker/setLocale', query?.lang)
  },

  head() {
    return {
      title: this.$t('pageTitle', this.locale),
    }
  },

  computed: {
    ...mapGetters(['settingByKey']),
    ...mapGetters('mastersticker', ['locale']),

    manualLink() {
      return `${process.env.REST_API_URL}${this.settingByKey(
        'mastersticker-manual'
      )}`
    },
  },
}
</script>

<style lang="scss">
#mastersticker-aside-col {
  display: none;
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "MasterSticker service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterSticker — EKF"
  }
}
</i18n>
