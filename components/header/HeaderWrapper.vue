<template>
  <header ref="header" class="app-header">
    <div class="header-content-wrapper">
      <HeaderContent :critical="true" />
    </div>

    <MenuMobile @show-modal="handleShowModal" />

    <MenuDesktop />

    <CallbackModal v-model="modalVisible" />

    <PriceRequestFormModal />
    <ConsultationFormModal />
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getOffsetTop, getViewportWidth } from '@/utils/window'

export default {
  data() {
    return {
      modalVisible: false,
      offsetTop: 0,
    }
  },

  async fetch() {
    await Promise.all([this.fetchCartRows(), this.restoreCompareList()])
  },

  computed: {
    ...mapGetters('header', [
      'breakpoint',
      'catalogOpen',
      'collapsed',
      'fixed',
    ]),
  },

  watch: {
    '$i18n.locale'() {
      this.fetchCatalog()
    },

    '$route.path': {
      handler() {
        this.closeAllMenus()
      },
    },

    collapsed(event) {
      if (event) document.body.classList.add('header-collapsed')
      else document.body.classList.remove('header-collapsed')
    },

    fixed(event) {
      if (event) document.body.classList.add('header-fixed')
      else document.body.classList.remove('header-fixed')
    },
  },

  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })

    this.$nextTick(() => {
      this.setMounted(true)
    })
  },

  beforeUnmount() {
    document.removeEventListener('scroll', this.handleDocumentScroll)
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    ...mapActions('catalog', ['fetchCatalog']),
    ...mapActions('cart', ['fetchCartRows']),
    ...mapActions('compare', ['restoreCompareList']),
    ...mapActions('header', [
      'closeAllMenus',
      'setCollapsed',
      'setFixed',
      'setMounted',
    ]),

    handleDocumentScroll() {
      const offset = getOffsetTop()

      if (offset > this.offsetTop) {
        this.handleScrollDown()
      } else {
        this.handleScrollUp(offset)
      }

      /* Save offset to compare & detect scroll direction */
      this.offsetTop = offset
    },

    handleResize() {
      /* Header is always fixed & never collapsed on mobile,
       * so no scroll listener needed below breakpoint. */
      if (this.breakpoint <= getViewportWidth()) {
        document.addEventListener('scroll', this.handleDocumentScroll)
      } else {
        document.removeEventListener('scroll', this.handleDocumentScroll)
      }
    },

    handleScrollDown() {
      /* Skip collapsing / fixing header if catalog menu is open */
      if (this.catalogOpen) return

      /* Don't trigger store actions if collapsed/fixed already set */
      if (!this.collapsed) this.setCollapsed(true)
      if (!this.fixed) this.setFixed(true)
    },

    handleScrollUp(offset) {
      /* Don't trigger store action if collapsed already set */
      if (this.collapsed) this.setCollapsed(false)

      /* Remove fixed state if scrolled back to top */
      if (offset === 0) {
        this.setFixed(false)
      }
    },

    handleShowModal() {
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  position: relative;
  background-color: $white;
  z-index: $zindex-dropdown + 1;

  .header-content-wrapper {
    position: relative;
    box-shadow: $box-shadow-sm;
    z-index: $zindex-dropdown + 10;
  }

  @include media-breakpoint-down(md) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-right: 0 !important;
  }
}
</style>

<style lang="scss">
@include media-breakpoint-down(md) {
  body {
    padding-top: $header-height-mobile;
  }
}

@include media-breakpoint-up(lg) {
  body {
    &.header-fixed {
      padding-top: $header-height-full;

      .app-header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
      }

      &.header-collapsed {
        padding-top: $header-height-collapsed;
      }
    }
  }
}
</style>
