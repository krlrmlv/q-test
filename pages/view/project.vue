<template>
  <div>
    <ViewProjectBanner>
      <AppBreadcrumbs :items="breadcrumbs" />
    </ViewProjectBanner>

    <main>
      <ViewProjectAnchors
        :anchors="anchorsWithTitles"
        @anchor-click="handleAnchorClick"
      />
      <HomeSectionNumbers :numbers="numbers" class="bg-light text-black">
        <template #header>
          <span></span>
        </template>
      </HomeSectionNumbers>

      <ViewProjectLkp class="my-96" />
      <ViewProjectBenefits class="pt-96 pt-md-48" />
      <ViewProjectSlider :slides="lkpSlides" class="mt-48 mb-96" />

      <HomeSectionCalculators
        bg-variant="light"
        subtitle-variant="lkpSubtitle"
      />

      <a id="anchor-libraries" class="anchor" />
      <HomeSectionLibraries :limit="3" />

      <a id="anchor-solutions" class="anchor" />
      <ViewProjectSolutions
        class="bg-light"
        :solutions="solutions"
        title-variant="lkpTitle"
        subtitle-variant="lkpSubtitle"
      />

      <HomeSectionProjects />

      <ViewProjectMaintenance />

      <a id="anchor-products" class="anchor" />
      <ViewProjectProducts
        class="bg-light"
        :subtitle="$t('products.subtitle')"
      />

      <a id="anchor-support" class="anchor" />
      <ViewProjectCourses :courses="courses" />

      <HomeSectionFaq :faqs="faqs" :title="$t('faqTitle')" class="bg-light" />

      <ViewProjectQuestion />
    </main>
  </div>
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
      slug: 'project',
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

    const courses = groupedSlides.univer ?? []
    const solutions = groupedSlides.solutions ?? []

    return { courses, faqs, solutions }
  },

  data() {
    return {
      anchors: [
        { key: 'solutions', icon: 'thumbs-up-24' },
        { key: 'products', icon: 'tools-24' },
        { key: 'support', icon: 'student-24' },
        { key: 'libraries', icon: 'folder-24' },
      ],
      numbers: [
        { number: '45000+', caption: this.$t('numbers.projects') },
        { number: '1500+', caption: this.$t('numbers.partners') },
        { number: 9001, caption: this.$t('numbers.gost') },
        { icon: 'lab-64', caption: this.$t('numbers.laboratory') },
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

    lkpSlides() {
      return [
        'registration',
        'designInstitute',
        'differentCustomers',
        'manager',
      ].map((name) => ({
        title: this.$t(`lkp.slides.${name}.title`),
        subtitle: this.$t(`lkp.slides.${name}.subtitle`),
      }))
    },

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
      return this.layoutBySlug('project')
    },
  },

  mounted() {
    sendToMindbox('EKFGroupCkgProsmotrStranicy', {
      customerAction: {
        customFields: {
          cKGname: ['Проектировщик'],
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
      "libraries": "Latest BIM & CAD libraries",
      "products": "Own production for comprehensive supply of facilities",
      "solutions": "Ready-made solutions for various industries",
      "support": "Support and training"
    },
    "faqTitle": "Frequently asked questions",
    "pageTitle": "Professional solutions and useful services for designers — EKF"
  },
  "ru": {
    "anchors": {
      "libraries": "Актуальные BIM & CAD библиотеки",
      "products": "Собственное производство для комплексного снабжения объектов",
      "solutions": "Готовые решения для разных отраслей",
      "support": "Поддержка и обучение"
    },
    "faqTitle": "Частые вопросы",
    "pageTitle": "Профессиональные решения и полезные сервисы для проектировщиков — компания EKF",
    "products": {
      "subtitle": "Более 18 тысяч позиций для энергообеспечения объектов различных отраслей"
    }
  }
}
</i18n>
