<template>
  <section class="section-home section-home-univer">
    <b-container>
      <b-row>
        <b-col lg="6" class="d-lg-flex flex-column">
          <div class="mb-32 mb-md-64">
            <SeoLink href="https://univer.ekfgroup.com/" target="_blank">
              <b-img-lazy :alt="$t('univer')" :src="$t('logo')" width="149" />
            </SeoLink>
          </div>

          <h2>{{ $t('title') }}</h2>

          <b-img-lazy
            :alt="`${$t('univer')}: ${$t('title')}`"
            src="/images/home/univer/main.jpg"
            class="img-fluid d-lg-none mb-16"
          />

          <ul class="list-text lh-140 mb-24">
            <li class="mb-8">
              {{ $t('points.0') }}
            </li>
            <li class="mb-8">
              {{ $t('points.1') }}
            </li>
            <li class="mb-8">
              {{ $t('points.2') }}
            </li>
          </ul>

          <b-row>
            <b-col cols="12" sm="auto">
              <SeoLink
                href="https://univer.ekfgroup.com/"
                target="_blank"
                class="btn btn-primary btn-block"
              >
                {{ $t('startLearning') }}
              </SeoLink>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="6" class="d-none d-lg-block">
          <b-img-lazy
            :alt="`${$t('univer')}: ${$t('title')}`"
            src="/images/home/univer/main.jpg"
            class="img-fluid"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: { BImgLazy },
}
</script>

<i18n>
{
  "ru": {
    "logo": "/images/logo-univer.svg",
    "points": [
      "Вебинары о новинках электрооборудования и особенностях работы",
      "Занятия в учебном классе EKF: практика и разбор продукции",
      "Региональные мероприятия – тренеры EKF в вашем городе"
    ],
    "startLearning": "Начать обучение",
    "title": "Учитесь и зарабатывайте больше",
    "univer": "Электроунивер"
  },
  "en": {
    "logo": "/images/logo-univer-en.svg",
    "points": [
      "Webinars on new electrical equipment and features of work",
      "EKF classroom activities: practice and product review",
      "Regional events - EKF trainers in your city"
    ],
    "startLearning": "Start Learning",
    "title": "Learn and earn more",
    "univer": "Electric University"
  }
}

</i18n>
