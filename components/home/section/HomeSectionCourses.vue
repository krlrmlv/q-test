<template>
  <section class="section-home section-home-univer-courses">
    <b-container>
      <b-row align-v="center" class="mb-32 mb-md-64">
        <b-col md="8" lg="6">
          <h2 class="mb-0">{{ title || $t('title') }}</h2>
        </b-col>
        <b-col md="4" lg="6" class="d-none d-md-block text-right">
          <LinkMore href="https://univer.ekfgroup.com/catalog/" target="_blank">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <CoursesCards :courses="localCourses" />
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
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      defaultCourses: [
        {
          type: this.$t('onlineCourse'),
          title: this.$t('courses.0'),
          image: '/images/home/univer/course1.jpg',
          link: 'https://univer.ekfgroup.com/catalog/courses/programmiruemyy-logicheskiy-kontroller-pro-logic-programmirovanie-i-ekspluatatsiya/',
        },
        {
          type: this.$t('onlineCourse'),
          title: this.$t('courses.1'),
          image: '/images/home/univer/course2.jpg',
          link: 'https://univer.ekfgroup.com/catalog/courses/3533-programma-obucheniya-kns/',
        },
        {
          type: this.$t('onlineCourse'),
          title: this.$t('courses.2'),
          image: '/images/home/univer/course3.jpg',
          link: 'https://univer.ekfgroup.com/catalog/courses/2323-graficheskie-paneli-pro-screen-konfigurirovanie-otladka-i-ekspluatatsiya/',
        },
      ],
    }
  },

  computed: {
    localCourses() {
      return this.courses?.length ? this.courses : this.defaultCourses
    },
  },
}
</script>

<i18n>
{
  "en": {
    "courses": [
      "PRO-Logic Programmable Logic Controller",
      "APCS. General concepts",
      "Graphic panels EKF PRO-Screen"
    ],
    "linkText": "Show all courses",
    "onlineCourse": "Online course",
    "title": "Popular courses"
  },
  "ru": {
    "courses": [
      "Программируемый логический контроллер PRO-Logic",
      "Программа обучения КНС",
      "Графические панели EKF PRO-Screen"
    ],
    "linkText": "Смотреть все курсы",
    "onlineCourse": "Электронный курс",
    "title": "Популярные курсы"
  }
}
</i18n>
