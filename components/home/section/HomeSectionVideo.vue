<template>
  <section class="section-home section-home-video">
    <b-container>
      <h2>{{ $t('title') }}</h2>
      <b-row align-v="center" class="mb-lg-64">
        <b-col lg="8">
          <p class="mb-lg-0" v-text="$t(subheader || 'subtitle')"></p>
        </b-col>
        <b-col lg="4" class="d-none d-lg-block text-right">
          <LinkMore :to="localePath('/about/video')" target="_blank">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <YoutubeEmbed
        v-if="mainVideoId"
        :video-id="mainVideoId"
        class="border mb-16 mb-lg-24"
      />

      <b-row class="mb-n16 mb-lg-n24">
        <b-col
          v-for="(video, index) in videos"
          :key="index"
          md="6"
          lg="4"
          class="mb-16 mb-lg-24"
        >
          <CatalogVideoCard :item="video" @click.native="showModal(video)" />
        </b-col>
      </b-row>

      <div class="text-center d-lg-none pt-16">
        <LinkMore :to="localePath('/about/video')" target="_blank">
          {{ $t('linkText') }}
        </LinkMore>
      </div>
    </b-container>

    <YoutubeModal v-model="modalShow" :video="currentVideo" />
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    mainVideoId: {
      type: String,
      default: null,
    },
    subheader: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      currentVideo: {},
      modalShow: false,
      pending: false,
    }
  },

  computed: {
    videos() {
      const placeholder = new Array(3)
      return this.$fetchState?.pending
        ? placeholder
        : this.items.map(({ link, title }) => ({ id: link, name: title }))
    },
  },

  methods: {
    showModal(video) {
      this.currentVideo = video
      this.modalShow = true
    },
  },
}
</script>

<i18n>
{
  "en": {
    "linkText": "Show all videos",
    "subtitle": "Instructions, lifehacks, webinars, products",
    "title": "Video"
  },
  "ru": {
    "linkText": "Смотреть все видео",
    "subtitle": "Инструкции, лайфхаки, вебинары, продукция",
    "title": "Видео"
  }
}
</i18n>
