<template>
  <b-row class="mx-n4">
    <b-col cols="12" class="px-4">
      <p class="h7 mb-12">
        {{ $t('title') }}
      </p>
    </b-col>

    <b-col
      v-for="link in links"
      :key="link.title"
      cols="auto"
      class="mb-8 px-4"
    >
      <SeoLink
        :href="link.url"
        :aria-label="link.title"
        target="_blank"
        class="btn btn-gray-200 text-gray-600 btn-icon rounded-pill"
      >
        <svg-icon
          :name="`social/${link.icon}-24`"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </SeoLink>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'Telegram',
          icon: 'telegram',
          url: 'https://t.me/ekf_channel',
        },
        {
          title: 'Tenchat',
          icon: 'tenchat',
          url: 'https://tenchat.ru/ekfgroup',
        },
        {
          title: 'YouTube',
          icon: 'youtube',
          url: 'https://www.youtube.com/c/EKF_channel',
        },
        {
          title: 'Яндекс.Дзен',
          icon: 'zen',
          url: 'https://zen.yandex.ru/id/59b916d2482677e78926fd12',
        },
        {
          title: 'ВКонтакте',
          icon: 'vk',
          url: 'https://vk.com/ekf_official',
        },
        {
          title: 'Одноклассники',
          icon: 'ok',
          url: 'https://ok.ru/ekfofficial',
        },
      ],
    }
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Our social networks and messengers"
  },
  "ru": {
    "title": "Мы в социальных сетях и мессенджерах"
  }
}
</i18n>
