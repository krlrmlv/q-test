<template>
  <div class="footer-social-links">
    <SeoLink
      v-for="(link, index) in links"
      :key="`link-${index}`"
      :href="link.url"
      :class="link.linkClass"
      :aria-label="link.title"
      target="_blank"
      class="btn btn-gray-800 text-white btn-social btn-icon rounded-pill"
    >
      <svg-icon
        :name="`social/${link.icon}-24`"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </SeoLink>
  </div>
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
          linkClass: 'link-ok',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.footer-social-links {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;

  ::v-deep {
    .btn-social {
      @include hover {
        background-color: $brand-light;
      }
    }
  }

  @media (max-width: 359px) {
    .link-ok {
      display: none;
    }
  }
}
</style>
