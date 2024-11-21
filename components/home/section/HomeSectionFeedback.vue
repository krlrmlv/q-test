<template>
  <section class="section-home section-home-feedback">
    <b-container>
      <b-row>
        <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
          <h2 class="mb-32 mb-lg-64">{{ $t('title') }}</h2>

          <FormFeedback
            gtm-event="frmGlavVse"
            :mindbox-custom-fields="mindboxCustomFields"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    mindboxCustomFields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Contact Us"
  },
  "ru": {
    "title": "Напишите нам"
  }
}
</i18n>
