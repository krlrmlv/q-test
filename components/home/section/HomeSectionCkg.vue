<template>
  <div class="py-64 py-lg-96">
    <b-container>
      <h2>{{ $t('title') }}</h2>

      <b-row>
        <b-col md="10" lg="8" xl="7">
          <p class="fs-2 fs-md-3 mb-32 mb-lg-64">
            {{ $t('subtitle') }}
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col
          v-for="(link, index) in links"
          :key="`ckg-${index}`"
          cols="12"
          md="6"
          xl="3"
          class="mb-16 mb-lg-24"
        >
          <b-link :to="localePath(link)" class="text-reset">
            <div class="ckg-block">
              <h6 class="ckg-block-title" v-html="$t(`items.${index}`)" />

              <div class="block-img text-right">
                <b-img-lazy
                  :alt="$t(`items.${index}`)"
                  :src="`/images/home/ckg/${index + 1}.jpg`"
                />
              </div>
            </div>
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
export default {
  components: { BImgLazy },
  data() {
    return {
      links: [
        '/view/distributor',
        '/view/nku',
        '/view/project',
        '/view/industry',
        '/view/civil-construction',
        '/view/smo',
        '/view/retail',
        '/view/homeowner',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.ckg-block {
  position: relative;
  height: 120px;
  padding-top: 1rem;
  padding-left: 1rem;
  background-color: $gray-300;
}

.ckg-block-title {
  position: relative;
  z-index: 1;
}

.block-img {
  position: absolute;
  bottom: 0;
  right: 0;

  img {
    margin-top: -2rem;
    max-height: 110px;
  }
}

@include media-breakpoint-up(xl) {
  .ckg-block {
    height: 210px;
  }

  .block-img {
    img {
      max-height: unset;
      margin-top: 0;
    }
  }
}
</style>

<i18n>
{
  "ru": {
    "items": [
      "Дистрибьюция",
      "Производители щитового <br /> оборудования",
      "Проектирование",
      "Промышленность",
      "Гражданское <br /> строительство",
      "Электромонтаж",
      "Розница",
      "Домовладение <br />  или дизайн"
    ],
    "subtitle": "Продукция, решения, сервисы",
    "title": "Нам есть что предложить каждому"
  },
  "en": {
    "items": [
      "Distribution",
      "Low voltage complete <br /> devices erector",
      "Engineering",
      "Industry",
      "Civil <br /> engineering",
      "Wiring",
      "Retail",
      "Home ownership <br /> or design"
    ],
    "subtitle": "We have something to offer everyone",
    "title": "Products, solutions, services"
  }
}
</i18n>
