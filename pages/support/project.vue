<template>
  <SupportFeedbackPage
    :form-code="71"
    :breadcrumbs="breadcrumbs"
    :mindbox-custom-fields="mindboxCustomFields"
    :title="$t('feedback.estimateProject')"
    form-gtm-event="frmCalculateProject"
  >
    <p v-html="$t('lead')" />
  </SupportFeedbackPage>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'feedback.estimateProject', active: true }],
      mindboxCustomFields: {
        formName: 'Рассчитать проект',
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
    "lead": "You can order the&nbsp;development of&nbsp;a&nbsp;project for&nbsp;cable support systems and&nbsp;lightning protection, free estimation and&nbsp;recalculation of&nbsp;the&nbsp;cost of&nbsp;projects of&nbsp;any complexity, choose the&nbsp;optimal solution and&nbsp;get technical advice in&nbsp;any way convenient for&nbsp;you:",
    "pageTitle": "Estimate project — EKF"
  },
  "ru": {
    "lead": "Заказать разработку проекта кабеленесущих систем и&nbsp;молниезащиты, бесплатное осмечивание и&nbsp;перерасчет стоимости проектов любой сложности, подобрать оптимальное решение и&nbsp;получить техническую консультацию вы можете любым удобным для&nbsp;вас способом:",
    "pageTitle": "Рассчитать проект — EKF"
  }
}
</i18n>
