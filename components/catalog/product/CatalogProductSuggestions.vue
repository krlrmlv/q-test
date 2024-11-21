<template>
  <section :id="anchorId" class="section-product-suggestions">
    <b-container>
      <h2 class="h4 mb-32 mb-lg-40">
        {{ title }}
      </h2>

      <div v-if="isMobile">
        <LazyCatalogCategoryProductCards
          :products="visibleProducts"
          suggestion-card
          view="grid"
        />

        <transition name="fade">
          <b-button
            v-if="hasMore"
            key="btn"
            variant="gray-200"
            block
            @click="showMore"
          >
            {{ $t('blog.showMore') }}
          </b-button>
        </transition>
      </div>

      <LazySliderProducts
        v-else
        :items="products"
        :swiper-class="swiperClass"
      />
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ANALOGS_FUNCTIONAL_TYPES } from '~/components/constants/product'

export default {
  props: {
    anchorId: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    swiperClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      limit: 4,
      isMobile: false,
    }
  },

  computed: {
    ...mapGetters('compare', ['isInCompare']),

    products() {
      return this.items
        .map((item) => ({
          ...item.analog,
          functionalType: item?.functionalType ?? null,
          analogType: item?.analogType ?? null,
        }))
        .filter((item) => Boolean(item))
    },

    visibleProducts() {
      return this.products.slice(0, this.limit)
    },

    hasMore() {
      return this.products?.length && this.limit < this.products?.length
    },

    hasReplacmentEkfAnalog() {
      if (!this.products?.length) return false

      return (
        this.products[0]?.functionalType ===
        ANALOGS_FUNCTIONAL_TYPES.replacement
      )
    },
  },

  mounted() {
    this.limit = this.hasReplacmentEkfAnalog ? 3 : 4
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768
    },

    showMore() {
      this.limit += 4
    },
  },
}
</script>

<style lang="scss">
.section-product-suggestions {
  padding-top: 4rem;
  padding-bottom: 4rem;

  @include media-breakpoint-up(lg) {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
</style>
