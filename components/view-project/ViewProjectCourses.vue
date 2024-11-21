<template>
  <section class="section section-home">
    <b-container>
      <b-row>
        <b-col md="10" lg="9">
          <h2>{{ $t('title') }}</h2>
        </b-col>
        <b-col lg="3" class="d-none d-lg-block text-right mb-auto">
          <LinkMore href="https://univer.ekfgroup.com/catalog/" target="_blank">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>
      <b-row class="mb-32 mb-md-64">
        <b-col md="10 " lg="9">
          <p class="mb-0" v-html="$t('text')" />
        </b-col>
      </b-row>

      <CoursesCards :courses="courses" />

      <div class="text-center d-lg-none mt-32">
        <LinkMore href="https://univer.ekfgroup.com/catalog/" target="_blank">
          {{ $t('linkText') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<i18n>
{
  "en": {
    "linkText": "Show all courses",
    "text": "EKF Univer offers webinars, face-to-face trainings and training programs for specialists in the electrical engineering industry, including in BIM areas. Upon completion of the practical courses, a certificate is issued confirming your professional status.",
    "title": "New product training and competency development"
  },
  "ru": {
    "linkText": "Смотреть все курсы",
    "text": " EKF Универ — это вебинары, очные тренинги и учебные программы для специалистов электротехнической отрасли, в том числе по направлениям BIM. По окончании практических курсов выдается сертификат, подтверждающий ваш профессиональный статус.",
    "title": "Обучение новым продуктам и развитие компетенций"
  }
}
</i18n>
