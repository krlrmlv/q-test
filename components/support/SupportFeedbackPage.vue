<template>
  <main>
    <section class="pb-64">
      <b-container>
        <AppBreadcrumbs :items="breadcrumbs" />

        <h1 class="h2" v-html="title" />

        <slot />

        <ul class="pl-16 mb-48 mb-lg-64">
          <li class="mb-8">
            <span v-html="$t('email')" />
            <b-link href="mailto:911@ekf.su" class="font-weight-bold"
              >911@ekf.su</b-link
            >
          </li>

          <li class="mb-8">
            <span v-html="$t('call')" />
            <b-link href="tel:+74957888815" class="font-weight-bold text-nowrap"
              >+7 495 788 88 15</b-link
            >,
            <b-link href="tel:88003338815" class="font-weight-bold text-nowrap"
              >8 800 333 88 15</b-link
            >
          </li>

          <li class="mb-8">
            <span v-html="$t('form')" />
          </li>
        </ul>

        <b-row>
          <b-col lg="10" xl="8">
            <FormFeedback
              :code="formCode"
              :gtm-event="formGtmEvent"
              :mindbox-custom-fields="mindboxCustomFields"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section-about bg-light">
      <b-container class="text-center">
        <p class="h2 mb-8" v-html="$t('problems')" />

        <p class="h4 text-primary mb-0">
          <span v-html="$t('writeToDirector')" />
          <b-link href="mailto:ceo@ekf.su">ceo@ekf.su</b-link>
        </p>
      </b-container>
    </section>
  </main>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    formGtmEvent: {
      type: String,
      default: null,
    },
    formCode: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
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
    "call": "call by&nbsp;phone",
    "email": "write an&nbsp;email to",
    "form": "submit a&nbsp;form below",
    "hours": "on&nbsp;weekdays 8 to&nbsp;17 Moscow time",
    "message": "message via Telegram",
    "problems": "Quality problems?",
    "writeToDirector": "Write to&nbsp;the&nbsp;director",
    "masterCostLink": "use analogue search service MasterCost"
  },
  "ru": {
    "call": "позвонить по&nbsp;телефонам",
    "email": "написать на&nbsp;почту",
    "form": "заполнить ниже форму обратной связи",
    "hours": "в&nbsp;будни с&nbsp;8 до&nbsp;17 МСК",
    "message": "написать в&nbsp;телеграм",
    "problems": "Проблемы с&nbsp;качеством?",
    "writeToDirector": "Напишите директору",
    "masterCostLink": "воспользоваться сервисом подбора аналогов MasterCost"
  }
}
</i18n>
