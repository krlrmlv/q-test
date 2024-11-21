<template>
  <SupportFeedbackPage
    :form-code="282"
    :breadcrumbs="breadcrumbs"
    :title="$t('feedback.askQuestion')"
    :mindbox-custom-fields="mindboxCustomFields"
    form-gtm-event="frmAskProduct"
  >
    <p v-html="$t('lead')" />
  </SupportFeedbackPage>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'feedback.askQuestion', active: true }],
      mindboxCustomFields: {
        formName: 'Спросить о продукции',
      },
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "lead": "You can specify prices, get a certificate or consultation and choose analogues in any way convenient for you:",
    "pageTitle": "Ask a question — EKF"
  },
  "ru": {
    "lead": "Уточнить цены, получить сертификат или&nbsp;консультацию и&nbsp;подобрать аналоги вы можете любым удобным для&nbsp;вас способом:",
    "pageTitle": "Спросить о продукции — EKF"
  }
}
</i18n>
