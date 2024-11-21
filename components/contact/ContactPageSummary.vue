<template>
  <div class="bg-gray-120">
    <ul class="list-unstyled fs-2 text-gray-600 mb-0 p-24 p-lg-40">
      <li class="mb-24">
        <a href="tel:88003338815" class="h3 text-body text-hover-primary">
          8 (800) 333-88-15
        </a>

        <br />{{ $t('schedule') }}
      </li>

      <li class="mb-24">
        <a href="mailto:info@ekf.su" class="h6 text-body text-hover-primary">
          info@ekf.su
        </a>

        <br />{{ $t('email') }}
      </li>

      <li>
        <SeoLink
          href="https://yandex.ru/maps/-/CBa5vKU6SC"
          target="_blank"
          class="h6 text-body text-hover-primary"
        >
          {{ $t('address.value') }}
        </SeoLink>

        <br />{{ $t('address.label') }}
      </li>
    </ul>

    <hr class="border-top border-gray-300 my-16 my-lg-0" />

    <ul class="list-unstyled mb-0 p-24 p-lg-40">
      <li
        v-for="(group, index) in groups"
        :key="group"
        :class="{ 'mt-24': index > 0 }"
        class="h6 fs-3 mb-0"
      >
        <b-link
          class="d-inline-flex align-items-center text-body text-hover-primary"
          @click="$emit('click:group', index)"
        >
          {{ group }}

          <svg-icon
            name="arrow-right-24-alternate"
            width="24"
            height="24"
            class="ml-8"
          />
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<i18n>
{
  "en": {
    "address": {
      "label": "Head office address",
      "value": "Moscow, st. Otradnaya, 2B, building 9"
    },
    "email": "Email",
    "schedule": "mon-fri 8:00-18:00"
  },
  "ru": {
    "address": {
      "label": "Адрес центрального офиса",
      "value": "г. Москва, ул. Отрадная, 2Б, стр. 9"
    },
    "email": "Email",
    "schedule": "пн-пт с 8:00 до 18:00"
  }
}
</i18n>
