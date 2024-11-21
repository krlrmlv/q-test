<template>
  <section class="section section-home">
    <b-container>
      <b-row align-v="center">
        <b-col cols="12" lg="6" class="mb-64 mb-lg-0">
          <h2>{{ $t('title') }}</h2>
          <p class="mb-32 pm-lg-48">
            {{ $t('subtitle') }}
          </p>

          <b-row>
            <b-col md="8" lg="10">
              <ViewProjectMaintenanceForm />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" lg="6" class="align-self-start">
          <div class="maintenance-points">
            <h4 class="maintenance-points-title mb-24">
              {{ $t('points.title') }}
            </h4>
            <ul class="list-unstyled mb-0">
              <li v-for="i in 7" :key="`point-${i}`" class="maintenance-point">
                <span class="maintenance-point-index">{{
                  i.toString().padStart(2, '0')
                }}</span>
                <div>
                  <h6 class="mb-0">{{ $t(`points.${i}.title`) }}</h6>
                  <!-- v-if="i < 5" -->
                  <p class="mb-0 mt-8" v-html="$t(`points.${i}.text`)"></p>
                </div>
              </li>
            </ul>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
.maintenance-points {
  padding: 3rem 2rem;
  background-color: $white;
  box-shadow: $box-shadow;
}

.maintenance-points-title {
  padding-left: 2.75rem;
}

.maintenance-point {
  display: flex;
  align-items: center;
  font-size: $font-size-2;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.maintenance-point-index {
  position: relative;
  flex: 0 0 auto;
  align-self: stretch;
  width: 1.5rem;
  margin-right: 1.25rem;
  padding-right: calc(0.5rem + #{$border-width});
  text-align: right;
  white-space: nowrap;
  color: $primary;

  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $border-width;
    height: 100%;
    background-color: currentColor;
  }
}

@include media-breakpoint-down(xs) {
  .maintenance-points {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
    padding: 4rem 1rem;
  }

  .maintenance-points-title {
    padding-left: 0;
    font-size: 2rem;
  }
}
</style>

<i18n>
{
  "en": {
    "points": {
      "1": {
        "text": "Departure to the facility, audit of installed systems, take measurements, draw up terms of reference",
        "title": "Pre-project work"
      },
      "2": {
        "text": "If you do not have enough competencies in automation or power supply, we will develop a project for you",
        "title": "Design"
      },
      "3": {
        "text": "Our specialist will monitor the correct connection of the equipment",
        "title": "Installation supervision"
      },
      "4": {
        "text": "We will develop software for you if there is no suitable",
        "title": "Software development"
      },
      "5": {
        "title": "Commissioning works"
      },
      "6": {
        "title": "Commissioning and service"
      },
      "7": {
        "text": "The database of completed projects allows the modernization project manager to quickly obtain project documentation, even if it has been lost.",
        "title": "Modernization"
      },
      "title": "We will do it for you"
    },
    "subtitle": "Leave a request for the development of a technical solution for your project and we will help you put the project into operation",
    "title": "We accompany at all stages of the project"
  },
  "ru": {
    "points": {
      "1": {
        "text": "Помощь в составлении технического задания, при необходимости выезд и обследование объекта.",
        "title": "Предпроектные работы"
      },
      "2": {
        "text": "Предоставление компетенций в разработке эскизного проекта, рабочей документации. <br> <br> Разработка типовых решений для интеграторов, строительно-монтажных организаций, сборщиков, ОЕМ и др.",
        "title": "Проектирование"
      },
      "3": {
        "text": "Предоставление услуг по созданию программного обеспечения для ПЛК и HMI.",
        "title": "Разработка ПО"
      },
      "4": {
        "title": "Шеф-монтаж и пуско-наладочные работы",
        "text": "Наш специалист проверит правильность установки, удаленно или на объекте поможет настроить оборудование."
      },
      "5": {
        "text": "Помощь при взаимодействии с надзорными и принимающими организациями.",
        "title": "Сдача в эксплуатацию"
      },
      "6": {
        "text": "Сопровождение на этапе эксплуатации объекта.",
        "title": "Сервисное обслуживание и техподдержка"
      },
      "7": {
        "text": "База данных по выполненным проектам позволяет руководителю проекта модернизации оперативно получить проектную документацию, даже если она была утеряна.",
        "title": "Модернизация"
      },
      "title": "Наши услуги"
    },
    "subtitle": "Оставьте заявку на разработку технического решения по вашему проекту и мы поможем запустить проект в работу",
    "title": "Сопровождаем на всех этапах проекта"
  }
}
</i18n>
