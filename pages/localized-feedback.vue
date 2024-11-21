<template>
  <b-container>
    <b-row>
      <b-col lg="10">
        <h1 class="h2">{{ $t('feedback.reportProblem') }}</h1>
        <p>
          {{ $t('feedback.reportProblemSubtitle') }}
        </p>
        <p class="mb-40">
          {{ $t('feedback.reportProblemText') }}
        </p>
      </b-col>
      <b-col lg="10" xl="8">
        <FormFeedback :code="formCode" disable-form-accept />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  nuxtI18n: false,
  layout: 'documents',
  head() {
    return {
      title: this.$t('feedback.reportProblem'),
    }
  },
  computed: {
    formCode() {
      return this.$i18n.locale === 'ru' ? 72 : 1017
    },
  },
}
</script>
