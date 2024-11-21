<template>
  <section class="section-home section-home-partners">
    <b-container>
      <h2 class="mb-32 mb-md-64">{{ $t('title') }}</h2>

      <b-row align-v="center" class="justify-content-between mx-xl-n24">
        <b-col
          v-for="(partner, index) in partners"
          :key="`partner-${index}`"
          :class="{ 'text-right': index % 2 }"
          cols="6"
          sm="4"
          md="auto"
          class="text-sm-center mb-32 mb-md-64 px-xl-24"
        >
          <img
            :alt="partner"
            :src="`/images/home/partners/${partner}.png`"
            class="img-fluid"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      partners: [
        'etm',
        'rs',
        'raek',
        'minimax',
        'rossed',
        'goods',
        'ozon',
        'wildberries',
        'obi',
        'castorama',
        'tesli',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.section-home-partners {
  padding-bottom: 2rem;
}
</style>

<i18n>
{
  "en": {
    "title": "We work together"
  },
  "ru": {
    "title": "Работаем вместе"
  }
}
</i18n>
