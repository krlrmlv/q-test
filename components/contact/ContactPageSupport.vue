<template>
  <div class="overflow-hidden">
    <p class="h6 mb-24 mb-lg-32">
      {{ $t('support.title') }}
    </p>

    <b-row class="mb-16 mb-xl-24 mx-n24">
      <b-col cols="12" lg="7" xl="4" class="d-flex flex-column mb-16 px-24">
        <a href="tel:88003338815" class="text-reset text-hover-primary">
          <span v-html="$t('support.phone')" />
        </a>

        <span class="label">
          {{ $t('phoneLabel') }}
        </span>
      </b-col>

      <b-col cols="12" lg="5" xl="3" class="d-flex flex-column mb-16 px-24">
        <a href="mailto:911@ekf.su" class="text-reset text-hover-primary">
          911@ekf.su
        </a>

        <span class="label">
          {{ $t('emailLabel') }}
        </span>
      </b-col>

      <b-col cols="12" xl="5" class="d-flex flex-column mb-16 px-24">
        <span>{{ $t('support.schedule') }}</span>
        <span class="label">
          {{ $t('scheduleLabel') }}
        </span>
      </b-col>
    </b-row>

    <hr class="border-top border-gray-300 mb-32 mb-lg-40" />

    <p class="h6 mb-24 mb-lg-32">
      {{ $t('hr.title') }}
    </p>

    <b-row class="mb-16 mb-xl-24 mx-n24">
      <b-col cols="12" lg="7" xl="4" class="d-flex flex-column mb-16 px-24">
        <a href="tel:88003338815" class="text-reset text-hover-primary">
          <span v-html="$t('hr.phone')" />
        </a>

        <span class="label">
          {{ $t('phoneLabel') }}
        </span>
      </b-col>

      <b-col cols="12" lg="5" xl="3" class="d-flex flex-column mb-16 px-24">
        <a href="mailto:personal@ekf.su" class="text-reset text-hover-primary">
          personal@ekf.su
        </a>

        <span class="label">
          {{ $t('emailLabel') }}
        </span>
      </b-col>
    </b-row>

    <hr class="border-top border-gray-300 mb-32 mb-lg-40" />

    <p class="h6 mb-24 mb-lg-32">
      {{ $t('press.title') }}
    </p>

    <b-row class="mb-xl-24 mx-n24">
      <b-col cols="12" lg="7" xl="4" class="d-flex flex-column mb-16 px-24">
        <a href="tel:88003338815" class="text-reset text-hover-primary">
          <span v-html="$t('press.phone')" />
        </a>

        <span class="label">
          {{ $t('phoneLabel') }}
        </span>
      </b-col>

      <b-col cols="12" lg="5" xl="3" class="d-flex flex-column mb-16 px-24">
        <a href="mailto:pr@ekf.su" class="text-reset text-hover-primary">
          pr@ekf.su
        </a>

        <span class="label">
          {{ $t('emailLabel') }}
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.label {
  font-size: $font-size-2;
  line-height: 1.4;
  color: $gray-500;
}
</style>

<i18n>
{
  "en": {
    "emailLabel": "Email",
    "hr": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, HR department</span>",
      "title": "HR Department"
    },
    "phoneLabel": "Phone number",
    "press": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, ext. 142</span>",
      "title": "Press"
    },
    "scheduleLabel": "Schedule (Moscow time)",
    "support": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, ext. 2</span>",
      "schedule": "mon-fri 8:00-17:00",
      "title": "Technical support"
    }
  },
  "ru": {
    "emailLabel": "Email",
    "hr": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, отдел HR</span>",
      "title": "Отдел кадров"
    },
    "phoneLabel": "Телефон",
    "press": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, доб. 142</span>",
      "title": "Для СМИ"
    },
    "scheduleLabel": "График работы, по МСК",
    "support": {
      "phone": "8 (800) 333-88-15<span class='text-body'>, доб. 2</span>",
      "schedule": "пн-пт с 8:00 до 17:00",
      "title": "Техническая поддержка"
    }
  }
}
</i18n>
