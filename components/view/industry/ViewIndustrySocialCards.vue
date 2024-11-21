<template>
  <b-row class="mt-40">
    <b-col v-for="link in socialLinks" :key="link.name" md="6" class="mb-16">
      <SeoLink
        tag-name="div"
        class="card text-body"
        target="_blank"
        :href="link.href"
      >
        <img
          class="card-image d-none d-sm-block"
          :src="`/images/view/industry/${link.qrCode}`"
          :alt="`Qr code ${link.name}`"
        />

        <div class="card-body">
          <p class="card-brand">
            <svg-icon
              :name="`social/${link.icon}-24`"
              width="24"
              height="24"
              class="mr-8"
              aria-hidden="true"
            />
            {{ link.name }}
          </p>

          <p class="card-description">{{ link.text }}</p>
        </div>
      </SeoLink>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        {
          name: 'Telegram',
          icon: 'telegram',
          qrCode: 'tg_qr.png',
          text: 'Промышленная автоматизация EKF',
          href: 'https://t.me/ekf_automation',
        },
        {
          name: 'Яндекс.Дзен',
          icon: 'zen',
          qrCode: 'dzen_qr.png',
          text: 'Решения EKF для промышленности и инфраструктуры',
          href: 'https://dzen.ru/ekf_b2b',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  align-items: flex-start;
  padding: 2rem;
  height: 100%;
  gap: 0 2rem;
  background-color: $gray-100;
  transition: $transition-base;
  transition-property: background-color;

  .card-body {
    padding: 0;

    .card-brand {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      color: $gray-700;
    }

    .card-description {
      margin-bottom: 0;
      font-weight: $font-weight-medium;
      font-size: $font-size-6;
    }
  }

  @include media-breakpoint-down(md) {
    gap: 0 1rem;
    padding: 1.5rem;

    .card-image {
      max-width: 96px;
    }

    .card-body {
      .card-description {
        font-size: $font-size-4;
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      background-color: $white;
      box-shadow: $box-shadow;
    }
  }

  @media (hover: none) {
    &:active {
      background-color: $white;
      box-shadow: $box-shadow;
    }
  }
}
</style>
