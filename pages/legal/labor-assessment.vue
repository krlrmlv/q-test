<template>
  <b-container tag="main" class="pb-32 pb-lg-64">
    <AppBreadcrumbs :items="breadcrumbs" />

    <b-row>
      <b-col lg="8">
        <h1 class="h2 mb-32">{{ $t('legal.laborAssessment') }}</h1>
        <ul v-if="$i18n.locale === 'ru'" class="list-unstyled mb-0">
          <li v-for="(file, index) in files" :key="index" class="mb-8">
            <FileDownloadLink :item="file" />
          </li>
        </ul>
      </b-col>
      <b-col lg="4" xl="3" offset-xl="1">
        <LegalNav active="labor-assessment" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'legal.laborAssessment',
          to: '/legal/labor-assessment',
          active: true,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  computed: {
    files() {
      return [
        {
          file: this.$getStaticFile(
            '/storage/legal/perechen-meropriyatiy-1.pdf'
          ),
          fileSize: 299649,
          name: 'Перечень мероприятий 1',
        },
        {
          file: this.$getStaticFile(
            '/storage/legal/perechen-meropriyatiy.docx'
          ),
          fileSize: 18427,
          name: 'Перечень мероприятий',
        },
        {
          file: this.$getStaticFile('/storage/legal/svodnaya-vedomost.docx'),
          fileSize: 97808,
          name: 'Сводная ведомость',
        },
        {
          file: this.$getStaticFile('/storage/legal/svodnaya-vedomost1.pdf'),
          fileSize: 11159945,
          name: 'Сводная ведомость1',
        },
      ]
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "Labor assessment — EKF"
  },
  "ru": {
    "pageTitle": "Специальная оценка условий охраны труда — EKF"
  }
}
</i18n>
