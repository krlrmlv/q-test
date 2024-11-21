<template>
  <section class="solutions-banner">
    <picture>
      <source
        srcset="/images/view/project/main-xs.png"
        media="(max-width: 420px)"
      />
      <img
        src="/images/view/project/main.png"
        class="solutions-banner-bg"
        aria-hidden="true"
      />
    </picture>
    <b-container class="solutions-banner-content">
      <slot />

      <b-row align-v="center" class="banner-content-column">
        <b-col cols="12" md="7" xl="6" sm="9">
          <h1 class="h2">
            {{ $t('title') }}
          </h1>

          <p class="category-description mb-24 mb-sm-64 mb-md-56 mb-xl-40">
            {{ $t('subtitle') }}
          </p>
          <SeoLink href="https://lkp.ekfgroup.com/" target="_blank">
            <b-button
              variant="primary"
              class="btn-banner"
              @click="$ym('reachGoal', 'CLICKLKPBUTTONPROJECT')"
            >
              {{ $t('goToPersonalAccount') }}
              <svg-icon
                name="arrow-right-24"
                width="18"
                height="18"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </SeoLink>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.banner-content-column {
  padding-top: 6.5rem;
  padding-bottom: 9.5rem;
}
::v-deep {
  .breadcrumb-item {
    color: $white;

    &::before,
    a {
      color: inherit;
    }
  }
}
@include media-breakpoint-up(lg) {
  .solutions-banner-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

@include media-breakpoint-down(md) {
  .h2 {
    font-size: 1.75rem;
  }

  .category-description {
    font-size: $font-size-2;
    line-height: 1.4;
  }
}
@include media-breakpoint-down(xs) {
  .banner-content-column {
    padding-top: 3.5rem;
    padding-bottom: 9.5rem;
  }

  .h2 {
    font-size: 2.375rem;
  }

  .category-description {
    font-size: 1rem;
  }

  .btn-banner {
    width: 100%;
  }
}

@media (max-width: 336px) {
  .h2 {
    font-size: 2rem;
  }
}
</style>

<i18n>
{
  "en": {
    "subtitle": "A new level of convenience and efficiency: reducing the time it takes to take a project into account to 30 minutes and prompt consultation on any issues",
    "title": "Personal account of the designer",
    "watchVideo": "Go to your personal account"
  },
  "ru": {
    "subtitle": "Новый уровень удобства и эффективности: сокращение времени взятия проекта в расчёт до 30 мин и оперативная консультация по любым вопросам",
    "title": "Личный кабинет проектировщика",
    "goToPersonalAccount": "Перейти в личный кабинет"
  }
}
</i18n>
