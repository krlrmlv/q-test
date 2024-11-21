<template>
  <section class="section section-home">
    <b-container>
      <b-row>
        <b-col md="8" xl="9">
          <h2 v-html="$t('title')"></h2>
        </b-col>
        <b-col md="4" xl="3" class="d-none d-md-block text-right mt-8">
          <LinkMore href="https://univer.ekfgroup.com/catalog/" target="_blank">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>
      <b-row class="mb-32 mb-md-64">
        <b-col md="8" xl="9">
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
    "text": "EKF University is an opportunity for our external partners, from distributors to end customers, to expand the familiar horizons of learning. Here you will find current online courses, announcements of webinars, face-to-face trainings and workshops on electrical equipment. Training is one of the most effective sales tools.",
    "title": "Development of competencies and acquaintance with novelties"
  },
  "ru": {
    "linkText": "Смотреть все курсы",
    "text": "EKF Универ - это возможность для наших внешних партнеров от дистрибьюторов до конечных клиентов расширить привычные горизонты обучения. Здесь вы найдете актуальные онлайн-курсы, анонсы вебинаров, очных тренингов и мастер-классов по электротехническому оборудованию. Обучение - один из самых эффективных инструментов продаж.",
    "title": "Развитие компетенций <br> и знакомство с новинками"
  }
}
</i18n>
