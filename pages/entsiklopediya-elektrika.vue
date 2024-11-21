<template>
  <b-container tag="main" class="pb-32 pb-lg-64">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 mb-32">{{ $t('header') }}</h1>

    <b-row class="mx-xl-n24">
      <b-col md="6" lg="4" class="px-xl-24">
        <img
          :alt="$t('title')"
          src="/images/encyclopedia/main.jpg"
          class="img-fluid shadow mb-32"
        />
      </b-col>
      <b-col md="6" lg="8" class="px-xl-24">
        <p class="h5 mb-32">{{ $t('subheader') }}</p>
        <ul class="list-unstyled mb-32">
          <li
            v-for="item in listItems"
            :key="item"
            class="d-flex align-items-center mb-16"
          >
            <img
              :src="`/images/encyclopedia/${item}.jpg`"
              width="48"
              height="48"
              class="flex-shrink-0 rounded-pill border mr-16"
              aria-hidden="true"
            />
            <span>{{ $t(`list.${item}`) }}</span>
          </li>
        </ul>
        <p class="mb-32">{{ $t('text') }}</p>
        <SeoLink
          href="https://cloud.ekf.su/s/8ZEC7Hc63YjGBmL"
          target="_blank"
          class="btn btn-primary"
        >
          {{ $t('download') }}
        </SeoLink>
        <div class="fs-2 text-muted mt-32">
          <p class="mb-8">{{ $t('share') }}</p>
          <script src="//yastatic.net/share2/share.js"></script>
          <div
            :data-lang="$i18n.locale"
            class="ya-share2"
            data-services="vkontakte,odnoklassniki,moimir,twitter,lj,viber,skype,telegram"
            data-url="https://ekfgroup.com/entsiklopediya-elektrika/"
            data-counter=""
          >
            {{ $t('share') }}
          </div>
        </div>
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
          text: this.$t('title'),
          to: '/entsiklopediya-elektrika',
          active: true,
        },
      ],
      listItems: ['wire', 'switch', 'socket', 'regulator', 'efficiency'],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "download": "Download book (PDF, 80.5 MB)",
    "header": "The second edition of the book «Desktop Encyclopedia of the Electrician»",
    "list": {
      "wire": "Correctly connect the wiring at home or in the country",
      "switch": "Replace switch",
      "socket": "Install the socket",
      "regulator": "Install underfloor heating",
      "efficiency": "Improve energy efficiency in your home"
    },
    "pageTitle": "The second edition of the book «Desktop Encyclopedia of the Electrician»",
    "share": "Share with friends",
    "subheader": "You will learn to:",
    "text": "You can find answers to these and other questions in the new edition of the illustrated book «Electrician's Desktop Encyclopedia» from EKF specialists.",
    "title": "Desktop Encyclopedia of the Electrician"
  },
  "ru": {
    "download": "Скачать книгу (PDF, 80.5 МБ)",
    "header": "Второе издание книги «Настольная энциклопедия электрика»",
    "list": {
      "wire": "Правильно подключить проводку дома или на даче",
      "switch": "Заменить выключатель",
      "socket": "Установить розетку",
      "regulator": "Монтировать теплый пол",
      "efficiency": "Повысить энергоэффективность в доме"
    },
    "pageTitle": "Второе издание книги «Настольная энциклопедия электрика»",
    "share": "Поделитесь с друзьями",
    "subheader": "Вы узнаете как:",
    "text": "Ответы на эти и другие вопросы вы можете найти в новом издании иллюстрированной книги «Настольная энциклопедия электрика» от специалистов EKF.",
    "title": "Настольная энциклопедия электрика"
  }
}
</i18n>
