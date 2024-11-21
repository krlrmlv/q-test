<template>
  <b-container tag="main" class="text-center my-32 my-lg-64">
    <p class="mb-24" v-html="$t('message')"></p>
    <SeoLink
      :href="redirectUrl"
      class="btn btn-light text-uppercase text-primary"
    >
      {{ $t('linkText') }}
    </SeoLink>
  </b-container>
</template>

<script>
export default {
  layout: 'fullpage',
  data() {
    return {
      redirectUrl: 'https://www.e-disclosure.ru/portal/company.aspx?id=38548',
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  created() {
    if (process.client) this.redirect()
  },
  methods: {
    redirect() {
      window.location.href = this.redirectUrl
    },
  },
}
</script>

<i18n>
{
  "en": {
    "linkText": "click",
    "message": "You are being redirected to the external page.<br />If redirect doesn't work, please click this link:",
    "pageTitle": "Information disclosure — EKF"
  },
  "ru": {
    "linkText": "перейти",
    "message": "Сейчас вы будете перенаправлены на внешний сайт.<br />Если переадресация не произойдет автоматически, нажмите на ссылку:",
    "pageTitle": "Раскрытие информации — EKF"
  }
}
</i18n>
