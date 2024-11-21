<template>
  <div>
    <div class="view-project-banner">
      <div class="overlay">
        <b-container>
          <AppBreadcrumbs :items="items" :color="'text-gray-100'" />
        </b-container>
        <div class="distributor-container">
          <b-container>
            <b-row align-v="center">
              <b-col md="8" xl="6" class="mb-32 mb-md-16">
                <h2 class="shrift" v-html="$t('title')"></h2>
                <p class="lh-130 mb-32" v-html="$t('subtitle')"></p>
                <b-button
                  variant="primary"
                  class="distr-100"
                  @click="modalVisible = true"
                >
                  <svg-icon
                    name="play-16"
                    width="16"
                    height="16"
                    class="mr-8"
                    aria-hidden="true"
                  />
                  {{ $t('watchVideo') }}
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>

      <YoutubeModal v-model="modalVisible" :video="video" size="xxl" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modalVisible: false,
      video: {
        id: 'VE8si-Fj4Nc',
        title: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.shrift {
  font-size: 2.375rem;
}

.view-project-banner {
  .distributor-container {
    padding-top: 3rem;
    padding-bottom: 7rem;
    .distr-100 {
      width: 100%;
    }
  }
  background-color: #0c0d1a;
  background: url('/images/view/distributor/bg-sm.jpg'),
    lightgray 0px -98.581px / 100% 153.372%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: $white;
  height: 550px;
}

.breadcrumb-item a {
  color: #f8f9fa;
}

@include media-breakpoint-up(md) {
  .shrift {
    font-size: 3rem;
  }
  .view-project-banner {
    background-image: url('/images/view/distributor/bg-full.jpg');
    height: 100%;
    .distributor-container {
      padding: 7rem 0;
      .distr-100 {
        width: unset;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "subtitle": "We provide full support in design and provide libraries of ready-made solutions for various construction industries",
    "title": "Solutions for designers",
    "watchVideo": "Watch video"
  },
  "ru": {
    "subtitle": "Партнерские программы позволяют оптимизировать стандартные&nbsp;процессы и сэкономить время работы",
    "title": "Программы <br class=\"d-none d-lg-block\"/> для дистрибьюторов",
    "watchVideo": "Смотреть видео"
  }
}
</i18n>
