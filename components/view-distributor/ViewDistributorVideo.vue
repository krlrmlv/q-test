<template>
  <section class="view-project-anchors pt-64 py-xl-96">
    <b-container>
      <div class="mb-lg-32">
        <div class="d-flex justify-content-between">
          <h2 class="mb-0 pl-12">Видео</h2>

          <LinkMore
            href="https://ekfgroup.com/ru/about/video"
            class="d-none d-lg-flex align-items-start"
          >
            {{ 'Смотреть все видео' }}
          </LinkMore>
        </div>
      </div>

      <VideoPlaylist
        :key="`playlist-distributor`"
        :playlist="playlists[0].playlist"
        class="py-32 playlist-distributor"
        hide-title
      />
      <div class="text-center">
        <LinkMore href="https://ekfgroup.com/ru/about/video" class="d-lg-none">
          {{ 'Смотреть все видео' }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      playlists: [
        {
          playlist: {
            title: 'Видео',
            videos: [
              {
                id: '1',
                image: '',
                title:
                  'Почему сотрудничать с EKF выгодно? Как стать партнером EKF?',
                url: 'https://www.youtube.com/watch?v=S4oo-_78bY4&ab_channel=EKF',
              },
              {
                id: '2',
                image: '',
                title: 'Производство металлического лотка на заводе EKF',
                url: 'https://www.youtube.com/watch?v=gRTlQfWtZm0&ab_channel=EKF',
              },
              {
                id: '3',
                image: '',
                title: 'EKF 22 года!',
                url: 'https://www.youtube.com/watch?v=Yg50ev-5-BE&ab_channel=EKF',
              },
            ],
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/card';

.view-project-anchors {
  padding-bottom: 3rem;
  overflow: hidden;

  .card {
    height: 100%;
    background-color: $gray-100;

    .card-img {
      height: auto;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .card-body {
      padding: 2rem 2rem 0.5rem;
    }

    .card-footer {
      padding: 0 2rem 2rem;
      border: none;
      background-color: $gray-100;

      .distributor-more-btn {
        color: $gray-600;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .view-project-anchors {
    padding-bottom: 0;
    .card {
      position: relative;
      z-index: 2;

      .card-body {
        z-index: 2;
      }

      .card-footer {
        z-index: 2;
        background-color: $gray-100;

        .distributor-more-btn {
          visibility: hidden;
          color: $primary;
        }
      }
    }
  }
}
</style>
