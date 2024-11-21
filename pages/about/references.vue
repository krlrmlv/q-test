<template>
  <main>
    <b-container tag="section" class="pb-16 pb-lg-48">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 class="mb-32 mb-lg-64" v-html="$t('title')"></h2>

      <b-tabs content-class="pt-32 pt-lg-64" justified>
        <b-tab
          v-for="(tab, key) in reviews"
          :key="`tab-${key}`"
          :title="$t(`${key}`)"
        >
          <b-row class="lh-140 mb-24">
            <b-col
              v-for="(review, index) in tab"
              :key="`review-${key}-${index}`"
              lg="6"
              class="mb-24"
            >
              <span class="d-block text-muted fs-2 mb-8">{{
                formatDate(review.date)
              }}</span>
              <b-link
                :href="$getStaticFile(review.file)"
                target="_blank"
                class="d-flex align-items-center text-reset"
              >
                <span class="align-self-start text-primary mr-8">
                  <svg-icon
                    :name="`file/${getFileType(review.file)}-24`"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  />
                </span>
                {{ review.name }}
              </b-link>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-container>
  </main>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'

export default {
  components: {
    BTabs,
    BTab,
  },
  data() {
    return {
      breadcrumbs: [
        { text: 'about.references', to: '/about/references', active: true },
      ],
      reviews: {
        distributors: [
          {
            image:
              '/500x500//uploads/reviews/October2018/LUqf7DYoXUztDM6Qq6Xk.jpg',
            name: 'Отзыв от компании «Nikon Technologies»',
            date: '2017-12-01T00:00:00.000Z',
            file: '/uploads/reviews/October2018/LUqf7DYoXUztDM6Qq6Xk.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/DsXgZc9wiQK0bPNr0g2g.jpg',
            name: 'Благодарность от компании «Горкапстрой»',
            date: '2018-03-19T00:00:00.000Z',
            file: '/uploads/reviews/May2018/DsXgZc9wiQK0bPNr0g2g.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/X1FDh40z65xd9p4t64Pv.jpg',
            name: 'Отзыв от компании «Мирэкс»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/X1FDh40z65xd9p4t64Pv.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/YEo4SBH7bTzqGThLWH2I.jpg',
            name: 'Отзыв от компании «Русский свет»',
            date: '2018-04-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/YEo4SBH7bTzqGThLWH2I.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/zxmWlXPfAyLh1MLskOIZ.jpg',
            name: 'Благодарность от компании «Смирнов бэттериз»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/zxmWlXPfAyLh1MLskOIZ.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/P8LwM8EbMMETpV5IZHd0.jpg',
            name: 'Благодарность от компании «Техносвет»',
            date: '2018-03-20T00:00:00.000Z',
            file: '/uploads/reviews/May2018/P8LwM8EbMMETpV5IZHd0.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/lq1bihVuVkgMUhegLWKI.jpg',
            name: 'Благодарность от компании «СТК «Толедо»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/lq1bihVuVkgMUhegLWKI.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/Ex2gA0VYepOzlhNp5UPV.jpg',
            name: 'Отзыв от компании «Форум Инжиниринг»',
            date: '2018-03-22T00:00:00.000Z',
            file: '/uploads/reviews/May2018/Ex2gA0VYepOzlhNp5UPV.jpg',
          },
        ],
        education: [
          {
            image:
              '/500x500//uploads//iblock/9fe/9fe9ae4ea421c09114c7418692731e0f.jpg',
            name: 'Благодарность от компании «Электро-Оптим»',
            date: '2016-04-12T00:00:00.000Z',
            file: '/uploads//iblock/9fe/9fe9ae4ea421c09114c7418692731e0f.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/17c/17caa10862cd23f0c3b964f5a6a373c7.jpg',
            name: 'Благодарность от компании «Объединение РЭХТ»',
            date: '2016-12-30T00:00:00.000Z',
            file: '/uploads//iblock/17c/17caa10862cd23f0c3b964f5a6a373c7.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/a04/a040006c8ca00fb9b772e3a02affe2d2.jpg',
            name: 'Благодарность от компании «Элекон»',
            date: '2017-10-09T00:00:00.000Z',
            file: '/uploads//iblock/a04/a040006c8ca00fb9b772e3a02affe2d2.jpg',
          },
        ],
        designers: [
          {
            image:
              '/500x500//uploads//iblock/cf1/cf17efa0ab3213a6073a178536fafeb7.jpg',
            name: 'Отзыв от компании «ИОН ЭНЕРДЖИ»',
            date: '2016-02-29T00:00:00.000Z',
            file: '/uploads//iblock/cf1/cf17efa0ab3213a6073a178536fafeb7.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/b4f/b4fbaecebba5d6a53566c613080aaeed.jpg',
            name: 'Отзыв от компании «Алтайэнергосбыт»',
            date: '2017-02-19T00:00:00.000Z',
            file: '/uploads//iblock/b4f/b4fbaecebba5d6a53566c613080aaeed.jpg',
          },
        ],
        subdealers: [
          {
            image: '/500x500//uploads/reviews/May2018/nYqiQkXllP9t3m5vTiJw.jpg',
            name: 'Благодарность от ИП Чумак А. В.',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/nYqiQkXllP9t3m5vTiJw.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/fUE9wRZSsVNHMVbqcmOL.jpg',
            name: 'Благодарность от компании «Энергосфера»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads/reviews/May2018/fUE9wRZSsVNHMVbqcmOL.jpg',
          },
        ],
        electricalCompanies: [
          {
            image:
              '/500x500//uploads//iblock/9d1/9d19d6a14502b253bc0b06490c1271c9.jpg',
            name: 'Благодарность от компании «Промэлектромонтаж»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads//iblock/9d1/9d19d6a14502b253bc0b06490c1271c9.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/d48/d48a856731bae1ed6ec277a4e13062ed.jpeg',
            name: 'Отзыв от компании «Техэнергомонтаж»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads//iblock/d48/d48a856731bae1ed6ec277a4e13062ed.jpeg',
          },
          {
            image:
              '/500x500//uploads//iblock/32f/32f4c4ffe684b0edba77a933303d0f70.jpg',
            name: 'Отзыв от компании «СМУ-53»',
            date: '2016-02-26T00:00:00.000Z',
            file: '/uploads//iblock/32f/32f4c4ffe684b0edba77a933303d0f70.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/be9/be979501bb4fdb0e9929db62dc602993.jpg',
            name: 'Отзыв от компании «ТД Электро»',
            date: '2018-05-04T00:00:00.000Z',
            file: '/uploads//iblock/be9/be979501bb4fdb0e9929db62dc602993.jpg',
          },
          {
            image:
              '/500x500//uploads//iblock/f35/f35fa4ba77f480182d1260cf911e2c4d.jpg',
            name: 'Отзыв от компании «Кванта Групп»',
            date: '2016-02-26T00:00:00.000Z',
            file: '/uploads//iblock/f35/f35fa4ba77f480182d1260cf911e2c4d.jpg',
          },
          {
            image:
              '/500x500//uploads/reviews/October2018/2aTL0CscfAAokpCLXkkR.jpg',
            name: 'Благодарность от компании «Питейный дом»',
            date: '2018-04-13T00:00:00.000Z',
            file: '/uploads/reviews/October2018/2aTL0CscfAAokpCLXkkR.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/CKBKJTfugszORsof9PTz.jpg',
            name: 'Благодарность от компании «Электрокомплект»',
            date: '2018-03-28T00:00:00.000Z',
            file: '/uploads/reviews/May2018/CKBKJTfugszORsof9PTz.jpg',
          },
          {
            image: '/500x500//uploads/reviews/May2018/oabAsrCpdFQmmSNKdqaR.jpg',
            name: 'Благодарность от компании «Электропромкомплект»',
            date: '2018-04-01T00:00:00.000Z',
            file: '/uploads/reviews/May2018/oabAsrCpdFQmmSNKdqaR.jpg',
          },
        ],
        installers: [
          {
            image:
              '/500x500//uploads//iblock/713/713cb6f9789cd0c319ff4b2900f00bf6.png',
            name: 'Благодарность от компании «ИСК «Петербург»',
            date: '2017-02-28T00:00:00.000Z',
            file: '/uploads//iblock/713/713cb6f9789cd0c319ff4b2900f00bf6.png',
          },
        ],
      },
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  methods: {
    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'medium' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },
    getFileType(filename) {
      const arr = filename.split('.')
      return arr[arr.length - 1].toString().toLowerCase()
    },
  },
}
</script>

<i18n>
{
  "en": {
    "designers": "Designers",
    "distributors": "Distributors",
    "education": "Educational center",
    "electricalCompanies": "Electrical companies",
    "installers": "Equipment installers",
    "pageTitle": "Reference letters — EKF",
    "subdealers": "Subdealers",
    "title": "Reference letters"
  },
  "ru": {
    "designers": "Проектировщики",
    "distributors": "Дистрибьюторы",
    "education": "Учебный центр",
    "electricalCompanies": "Электромонтажные организации",
    "installers": "Сборщики электрооборудования",
    "pageTitle": "Отзывы партнеров — EKF",
    "subdealers": "Субдилеры",
    "title": "Отзывы партнеров"
  }
}
</i18n>
