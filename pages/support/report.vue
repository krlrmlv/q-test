<template>
  <SupportFeedbackPage
    :form-code="380"
    :breadcrumbs="breadcrumbs"
    :title="$t('feedback.reportError')"
    form-gtm-event="frmReportBug"
  >
    <p v-html="$t('lead')" />
  </SupportFeedbackPage>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'feedback.reportError', active: true }],
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
    "lead": "You can report an&nbsp;error on&nbsp;the&nbsp;website or&nbsp;in&nbsp;the documentation in&nbsp;any way convenient for&nbsp;you:",
    "pageTitle": "Report error — EKF"
  },
  "ru": {
    "lead": "Сообщить об&nbsp;ошибке на&nbsp;сайте или&nbsp;в&nbsp;документации вы можете любым удобным для&nbsp;вас способом:",
    "pageTitle": "Сообщить об ошибке — EKF"
  }
}
</i18n>
