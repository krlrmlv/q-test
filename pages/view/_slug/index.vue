<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />
      <HomeTabbedSlider :slides="mainSlides" class="mb-64" />
    </b-container>

    <HomeSectionNumbers :numbers="layoutNumbers" />
    <HomeSectionVideo :items="slides.video" :main-video-id="layoutMainVideo" />

    <component
      :is="`home-view-${$route.params.slug}`"
      :faqs="faqs"
      :slides="slides"
      :solutions="layoutSolutions"
    />

    <HomeSectionFeedback
      :form="layoutForm"
      :mindbox-custom-fields="mindboxCustomFields"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCartId } from '@/utils/cart'
import LAYOUT_DATA_QUERY from '@/graphql/home/HomeLayoutData'
import LAYOUT_MAIN_SLIDES_QUERY from '@/graphql/home/HomeLayoutMainSlides'
import sendToMindbox from '@/utils/mindbox'

export default {
  async asyncData({ app, params, $graphql }) {
    /* Load only main slides to reduce blocking time */
    const variables = {
      locale: app.i18n.locale,
      slug: params.slug,
    }

    /** Cart header is required for products */
    $graphql.default.setHeaders({
      'x-hasura-cart-id': getCartId(app.$cookies),
    })

    const { slides } = await $graphql.default.request(
      LAYOUT_MAIN_SLIDES_QUERY,
      variables
    )

    return { mainSlides: slides }
  },

  data() {
    return {
      faqs: [],
      form: {
        'civil-construction': { department: 4, question: 10 },
        distributor: { department: 3, question: 21 },
        homeowner: { department: 6, question: 32 },
        industry: { department: 4, question: 10 },
        nku: { department: 3, question: 6 },
        project: { department: 4, question: 27 },
        retail: { department: 3, question: 7 },
        smo: { department: 6, question: 32 },
      },
      mainVideos: {
        'civil-construction': 'I1zbs31nUe4',
        distributor: 'VE8si-Fj4Nc',
        homeowner: '6cYwozRD-ik',
        industry: 'Gk7gR1x95lI',
        project: 'i7HFxov8DFk',
        retail: 'A4Ne7i_eqY0',
        smo: 'NBCzn2hpMfg',
        nku: 'ilgQJv0wOTI',
      },
      numbers: {
        'civil-construction': [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { number: 36, caption: this.$t('numbers.commodityGroups') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { number: 22, caption: this.$t('numbers.years') },
        ],
        distributor: [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { number: 5, caption: this.$t('numbers.logistics') },
          { number: 36, caption: this.$t('numbers.commodityGroups') },
          { number: '19\xA0000', caption: this.$t('numbers.skus') },
        ],
        homeowner: [
          { number: '19\xA0000', caption: this.$t('numbers.skus') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { number: 22, caption: this.$t('numbers.years') },
          { icon: 'lab-64', caption: this.$t('numbers.laboratory') },
        ],
        industry: [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { number: 36, caption: this.$t('numbers.commodityGroups') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { number: 22, caption: this.$t('numbers.years') },
        ],
        nku: [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { number: 36, caption: this.$t('numbers.commodityGroups') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { icon: 'lab-64', caption: this.$t('numbers.laboratory') },
        ],
        project: [
          { number: 5000, caption: this.$t('numbers.designedObjects') },
          { number: 500, caption: this.$t('numbers.partners') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { icon: 'lab-64', caption: this.$t('numbers.laboratory') },
        ],
        retail: [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { number: 36, caption: this.$t('numbers.commodityGroups') },
          { number: '19\xA0000', caption: this.$t('numbers.skus') },
          { number: 22, caption: this.$t('numbers.years') },
        ],
        smo: [
          { number: '3000+', caption: this.$t('numbers.projectsPerYear') },
          { icon: 'lab-64', caption: this.$t('numbers.laboratory') },
          { number: 9001, caption: this.$t('numbers.gost') },
          { number: 22, caption: this.$t('numbers.years') },
        ],
      },
      slides: {},
      solutions: {
        'civil-construction': ['ЩЭ', 'УЭРМ', 'ЩК', 'ЩКePRO4KM v1.0'],
        industry: [
          'ШУ380ВПчRS v2.0',
          'ШУН2Н380В2КRS v2.0',
          'ШУЗС3Л2В v1.0',
          'ABP-EKF-8570003.01',
        ],
        nku: ['ЩО-70', 'ШУЗС3Л2В v1.0', 'ШУОАФ4ГР v2.0', 'ЩКePRO8KM v1.0'],
        project: [
          'ABP-EKF-8570005.01',
          'ШУН2Н380В2КRS v2.0',
          'ШУОАФ4ГР v2.0',
          'ЩКePRO8KM v1.0',
        ],
      },
    }
  },

  async fetch() {
    /* Load FAQs and all the slides beside main slider */
    const cartId = getCartId(this.$cookies)

    const variables = {
      cartId,
      locale: this.$i18n.locale,
      slides_filter: { slider: { name: { _neq: 'main' } } },
      slug: this.$route.params.slug,
    }

    const { faqs, slides } = await this.$graphql.default.request(
      LAYOUT_DATA_QUERY,
      variables
    )

    this.faqs = faqs
    this.slides =
      slides?.reduce((acc, slide) => {
        const key = slide?.slider?.name

        /* Filter out product slides without products attached */
        if (key === 'latest' && !slide.product) return acc

        if (acc[key]) acc[key].push(slide)
        else acc[key] = [slide]
        return acc
      }, {}) ?? {}
  },

  head() {
    return {
      title: this.$t(`pageTitles.${this.layout.slug}`),
    }
  },

  computed: {
    ...mapGetters('layouts', ['layoutBySlug']),

    breadcrumbs() {
      return [{ text: `layout.${this.layout.id}`, active: true }]
    },

    layout() {
      return this.layoutBySlug(this.$route.params.slug)
    },

    layoutForm() {
      return this.form[this.layout.slug]
    },

    layoutMainVideo() {
      return this.mainVideos[this.layout.slug]
    },

    layoutNumbers() {
      return this.numbers[this.layout.slug]
    },

    layoutSolutions() {
      return this.solutions[this.layout.slug]
    },
    mindboxCustomFields() {
      return {
        formName: 'Напишите нам - форма в футере',
        cKGname: [this.$t(`layout.${this.layout.id}`)],
      }
    },
  },
  mounted() {
    sendToMindbox('EKFGroupCkgProsmotrStranicy', {
      customerAction: {
        customFields: {
          ...this.mindboxCustomFields,
        },
      },
    })
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitles": {
      "civil-construction": "Professional solutions and useful services for civil engineering — EKF",
      "distributor": "Professional solutions and useful services for distributors — EKF",
      "homeowner": "Professional solutions and useful services for homeowners — EKF",
      "industry": "Professional solutions and useful services for industry — EKF",
      "nku": "Professional solutions and useful services for switchgear assemblers — EKF",
      "project": "Professional solutions and useful services for designers — EKF",
      "retail": "Professional solutions and useful services for retail — EKF",
      "smo": "Professional solutions and useful services for industry — EKF"
    }
  },
  "ru": {
    "pageTitles": {
      "civil-construction": "Профессиональные решения и полезные сервисы для гражданского строительства — компания EKF",
      "distributor": "Профессиональные решения и полезные сервисы для дистрибьюторов — компания EKF",
      "homeowner": "Профессиональные решения и полезные сервисы для домовладельцев и дизайнеров — компания EKF",
      "industry": "Профессиональные решения и полезные сервисы для промышленности — компания EKF",
      "nku": "Профессиональные решения и полезные сервисы для сборщиков НКУ — компания EKF",
      "project": "Профессиональные решения и полезные сервисы для проектировщиков — компания EKF",
      "retail": "Профессиональные решения и полезные сервисы для розницы — компания EKF",
      "smo": "Профессиональные решения и полезные сервисы для электромонтажников — компания EKF"
    }
  }
}
</i18n>
