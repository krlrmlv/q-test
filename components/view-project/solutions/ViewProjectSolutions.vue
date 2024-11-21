<template>
  <section class="section-home">
    <b-container>
      <b-row class="mb-32 mb-lg-64">
        <b-col lg="8" xl="9">
          <h2>{{ $t(`${titleVariant}`) }}</h2>
        </b-col>
        <b-col lg="4" xl="3" class="d-none d-lg-block text-right">
          <LinkMore :to="localePath('/solutions')" target="_blank">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
        <b-col lg="8">
          <p class="mb-0">
            {{ $t(`${subtitleVariant}`) }}
          </p>
        </b-col>
      </b-row>

      <ViewProjectSolutionsSlider :slides="solutions" />

      <div class="text-center d-lg-none mt-32">
        <LinkMore :to="localePath('/solutions')" target="_blank">
          {{ $t('linkText') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    solutions: {
      type: Array,
      default: () => [],
    },
    titleVariant: {
      type: String,
      default: 'title',
    },
    subtitleVariant: {
      type: String,
      default: 'subtitle',
    },
  },
}
</script>

<i18n>
{
  "en": {
    "linkText": "View all solutions",
    "subtitle": "EKF develops databases of its product range for popular CAD systems, which reduces the labor costs of designers by 30-50%. EKF also provides ready-made standard solutions, including diagrams, specifications, software for controllers.",
    "lkpSubtitle": "EKF develops databases of its product range for popular CAD systems, which reduces designer labor costs by 30-50%. EKF also provides ready-made standard solutions, including diagrams, specifications, and software for controllers.",
    "title": "Ready-made solutions for your tasks",
    "lkpTitle": "Individual and standard solutions for industry representatives"
  },
  "ru": {
    "linkText": "Смотреть все решения",
    "subtitle": "Компания EKF разрабатывает базы данных своей номенклатуры для популярных CAD-систем, что сокращает трудозатраты проектировщиков на 30–50%. Также EKF предоставляет готовые типовые решения, включающие в себя схемы, спецификации, ПО для контроллеров.",
    "lkpSubtitle": "EKF разрабатывает базы данных своей номенклатуры для популярных CAD-систем, что сокращает трудозатраты проектировщиков на 30-50%. Также EKF предоставляет готовые типовые решения, включающие в себя схемы, спецификации, ПО для контроллеров.",
    "title": "Готовые решения для ваших задач",
    "lkpTitle": "Индивидуальные и типовые решения для ключевых отраслей"
  }
}
</i18n>
