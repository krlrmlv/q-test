<template>
  <SupportFeedbackPage
    :breadcrumbs="breadcrumbs"
    :mindbox-custom-fields="mindboxCustomFields"
    :title="$t('feedback.getFeedback')"
    form-gtm-event="frmSupport"
  >
    <p v-html="$t('lead')" />
  </SupportFeedbackPage>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'feedback.getFeedback', active: true }],
      mindboxCustomFields: {
        formName: 'Обратиться в техподдержку',
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
    "lead": "You can settle technical problems or&nbsp;nuances related to&nbsp;product quality and&nbsp;possible defects in&nbsp;any way convenient for&nbsp;you:",
    "pageTitle": "Get feedback — EKF"
  },
  "ru": {
    "lead": "Уладить технические проблемы или&nbsp;нюансы, связанные с&nbsp;качеством продукции и&nbsp;возможным браком, вы можете любым удобным для&nbsp;вас способом:",
    "pageTitle": "Обратиться в техподдержку — EKF"
  }
}
</i18n>
