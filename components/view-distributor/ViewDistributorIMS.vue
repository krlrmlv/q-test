<template>
  <section class="view-project-anchors pt-64 py-xl-96">
    <b-container>
      <div class="mb-lg-64">
        <div class="d-flex justify-content-between">
          <h2>Сервис IMS</h2>
          <LinkMore
            href="https://ims3.ekf.su/"
            class="d-none d-lg-flex align-items-start"
          >
            {{ 'Перейти в IMS' }}
          </LinkMore>
        </div>
        <b-row class="mb-32 mb-lg-0">
          <b-col md="8" xl="9">
            Уникальная онлайн система продаж компании EKF. Личный кабинет партнера
            позволяет на одной платформе подбирать оборудование, управлять заказами и
            доставкой. Доступ к системе дает возможность работать с проектами и
            управлять финансами.
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col
          v-for="card in cards1"
          :key="card.key"
          cols="12"
          md="6"
          class="mb-24"
        >
          <div class="card">
            <div class="card-body">
              <svg-icon
                :name="card.icon"
                width="40"
                height="40"
                aria-hidden="true"
                class="mb-8 mb-xl-32"
              />
              <h6 class="mb-8">
                {{ card.title }}
              </h6>
              <p class="ims-text">
                {{ card.text }}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="card in cards2"
          :key="card.key"
          cols="12"
          md="4"
          class="mb-24"
        >
          <div class="card">
            <div class="card-body">
              <svg-icon
                :name="card.icon"
                width="40"
                height="40"
                aria-hidden="true"
                class="mb-8 mb-xl-32"
              />
              <h6 class="mb-8">
                {{ card.title }}
              </h6>
              <p class="ims-text">
                {{ card.text }}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards1: [
        {
          key: 'browser-48',
          icon: 'distributor/browser-48',
          title: 'Без установки',
          text: 'не требует дополнительного скачивания',
        },
        {
          key: 'growth-48',
          icon: 'distributor/growth-48',
          title: 'Бесплатная аналитика',
          text: 'анализирует продажи и прогнозирует потребности',
        },
      ],
      cards2: [
        {
          key: 'table-48',
          icon: 'distributor/table-48',
          title: 'Остатки и поступления',
          text: 'показывает остатки до 1 штуки и плановые поступления',
        },
        {
          key: 'clock-48',
          icon: 'distributor/clock-48',
          title: 'История работы',
          text: 'сохраняет историю работы',
        },
        {
          key: '24clock-48',
          icon: 'distributor/24clock-48',
          title: 'Доступ 24/7',
          text: 'и многое другое, что ранее требовало участия специалиста EKF, теперь доступно онлайн круглосуточно',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/card';

.ims-text {
  color: #495057;
}

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
