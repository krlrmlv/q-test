<template>
  <main>
    <ViewDistributorBanner :items="breadcrumbs" />

    <ViewDistributorAnchors
      :anchors="anchorsWithTitles"
      @anchor-click="handleAnchorClick"
    />

    <ViewDistributorNumbers :numbers="numbers" />

    <a id="anchor-libraries" class="anchor-distributor" />
    <ViewDistributorIMS />

    <ViewDistributorVideo class="bg-light" />

    <DistributionSectionCalculators />

    <a id="anchor-support" class="anchor-distributor" />
    <ViewDistributorCourses :courses="courses" />

    <HomeSectionFaq :faqs="faqs" :title="$t('faqTitle')" class="bg-light" />

    <a id="anchor-products" class="anchor-distributor" />
    <ViewDistributorProducts />

    <a id="anchor-solutions" class="anchor" />
    <ViewDistributorQuestion />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCartId } from '@/utils/cart'
import LAYOUT_DATA_QUERY from '@/graphql/home/HomeLayoutData'
import sendToMindbox from '@/utils/mindbox'

export default {
  async asyncData({ app, $graphql }) {
    const cartId = await getCartId(app.$cookies)

    const variables = {
      locale: app.i18n.locale,
      slides_filter: { slider: { name: { _in: ['solutions', 'univer'] } } },
      slug: 'distributor',
    }

    $graphql.default.setHeaders({
      'x-hasura-cart-id': cartId,
    })

    const { faqs, slides } = await $graphql.default.request(
      LAYOUT_DATA_QUERY,
      variables
    )

    const groupedSlides = slides?.reduce((acc, slide) => {
      const key = slide?.slider?.name
      if (acc[key]) acc[key].push(slide)
      else acc[key] = [slide]
      return acc
    }, {})

    // const courses = groupedSlides.univer ?? []
    const courses = [
      {
        id: '3008',
        image: '/images/view/distributor/kabelenesushchie-sistemy.jpg',
        link: 'https://univer.ekfgroup.com/catalog/courses/3008-kabelenesushchie-sistemy-obzornyy-kurs/',
        link_text: 'Подробнее',
        product: null,
        slider: {
          name: 'univer',
        },
        subtitle: 'Электронный курс',
        title: 'Кабеленесущие системы. Обзорный курс',
      },
      {
        id: '2352',
        image: '/images/view/distributor/predlozhenie-ekf.jpg',
        link: 'https://univer.ekfgroup.com/catalog/courses/2352-sdelano-v-rossii-predlozhenie-ekf-dlya-elektrotekhnicheskogo-rynka/',
        link_text: 'Подробнее',
        product: null,
        slider: {
          name: 'univer',
        },
        subtitle: 'Электронный курс',
        title:
          'Сделано в России: предложение EKF для электротехнического рынка',
      },
      {
        id: '2313',
        image: '/images/view/distributor/teplyy-pol.jpg',
        link: 'https://univer.ekfgroup.com/catalog/courses/2313-teplyy-pol/',
        link_text: 'Подробнее',
        product: null,
        slider: {
          name: 'univer',
        },
        subtitle: 'Электронный курс',
        title: 'Теплый пол',
      },
    ]
    const solutions = groupedSlides.solutions ?? []

    return { courses, faqs, solutions }
  },

  data() {
    return {
      anchors: [
        { key: 'libraries', icon: 'distributor/filters-40' },
        { key: 'products', icon: 'distributor/solutions-40' },
        { key: 'solutions', icon: 'distributor/products-40' },
        { key: 'support', icon: 'distributor/support-40' },
      ],
      numbers: [
        { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
        { number: '7', caption: this.$t('numbers.logistics') },
        { number: '19 000', caption: this.$t('numbers.skus') },
        { number: '22', caption: 'года на рынке' },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    ...mapGetters('layouts', ['layoutBySlug']),

    anchorsWithTitles() {
      return this.anchors?.map((anchor) => ({
        ...anchor,
        text: this.$t(`anchors.${anchor.key}`),
      }))
    },

    breadcrumbs() {
      return [
        {
          text: `layout.${this.layout?.id}`,
          to: this.$router.currentRoute,
          active: true,
        },
      ]
    },

    layout() {
      return this.layoutBySlug('distributor')
    },
  },

  mounted() {
    sendToMindbox('EKFGroupCkgProsmotrStranicy', {
      customerAction: {
        customFields: {
          cKGname: 'Проектировщик',
        },
      },
    })
  },

  methods: {
    handleAnchorClick(event) {
      if (!process.client) return

      const target = document.getElementById(`anchor-${event}`)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<i18n>
{
  "en": {
    "anchors": {
      "libraries": "Manage orders quickly and easily",
      "products": "Covering needs with our own equipment",
      "solutions": "Professional technical support",
      "support": "TFull-time and distance learning programs"
    },
    "faqTitle": "Frequently asked questions",
    "pageTitle": "Professional solutions and useful services for designers — EKF"
  },
  "ru": {
    "anchors": {
      "libraries": "Управляйте заказами быстро и просто",
      "products": "Покрытие потребностей собственным оборудованием",
      "solutions": "Профессиональная техническая поддержка",
      "support": "Программы очного и дистанционного обучения"
    },
    "faqTitle": "Получите ответ на ваш вопрос",
    "pageTitle": "Профессиональные решения и полезные сервисы для проектировщиков — компания EKF"
  }
}
</i18n>
