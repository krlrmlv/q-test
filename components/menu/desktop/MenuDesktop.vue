<template>
  <transition name="fade">
    <div
      :class="{ show: visible }"
      class="menu-desktop menu-panel"
      @click="handlePanelClick"
    >
      <b-container class="menu-desktop-container">
        <b-row class="h-100">
          <b-col cols="4" xl="3">
            <MenuDesktopRoot
              :items="rootItems"
              @change-panel="setActivePanel"
            />
          </b-col>

          <b-col cols="4" lg="8" xl="9">
            <MenuCatalogLinks :lighting-price-list="isLightingCategory" />

            <transition name="fade" mode="out-in">
              <MenuDesktopPanel :key="activePanelId" :panel="activePanel" />
            </transition>
          </b-col>
        </b-row>
      </b-container>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="white"
        class="btn-icon btn-close text-muted"
        @click="setCatalogOpen(false)"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>

      <transition name="backdrop-fade">
        <div v-if="dropdownOpen" class="menu-backdrop" />
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const LIGHTING_CATEGORY_ID = '84'

export default {
  data() {
    return {
      activePanelId: null,
    }
  },

  computed: {
    ...mapGetters('catalog', ['categories', 'categoryById']),
    ...mapGetters('header', {
      dropdownOpen: 'dropdownOpen',
      visible: 'catalogOpen',
    }),

    activePanel() {
      return this.activePanelId
        ? this.categoryById(this.activePanelId)
        : this.rootPanel
    },

    isLightingCategory() {
      return this.activePanelId === LIGHTING_CATEGORY_ID
    },

    rootItems() {
      const categories = this.categories?.map(({ id, name, slug }) => ({
        id,
        name,
        slug,
      }))
      return [{ id: null, name: this.$t('catalog.title') }, ...categories]
    },

    rootPanel() {
      return {
        id: null,
        name: this.$t('catalog.title'),
        children: this.categories,
      }
    },
  },

  methods: {
    ...mapActions('header', ['setCatalogOpen']),

    handlePanelClick(event) {
      const menuContainer = event?.target?.closest('.menu-desktop-container')
      if (!menuContainer) this.setCatalogOpen(false)
    },

    setActivePanel(event) {
      this.activePanelId = event
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-desktop {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: $font-size-2;
  line-height: 1.4;
  background-color: $white;
  z-index: $zindex-dropdown + 2;
}

.menu-desktop-container {
  padding-bottom: 5rem;
}

.menu-backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($modal-backdrop-bg, $modal-backdrop-opacity);
  z-index: 10;
}

.btn-close {
  position: absolute;
  top: 0;
  right: calc(50vw - #{map-get($container-max-widths, 'lg') * 0.5});
  padding: $grid-gutter-width * 0.5;
  border-radius: $rounded-pill;
  border: none;
  color: $secondary;
}

::v-deep {
  .menu-desktop-nav {
    display: inline-block; // Firefox break-inside fix
    list-style: none;
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    break-inside: avoid;

    .nav-item {
      break-inside: avoid;
    }

    .nav-item-header {
      font-size: $font-size-3;
      font-weight: $font-weight-medium;
      line-height: $headings-line-height;
    }

    .nav-link {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      padding: 0.25rem 0;
      color: inherit;
      text-decoration: none;

      .icon {
        flex: 0 0 auto;
        margin-left: auto;
        color: $secondary;
      }

      &:hover {
        color: $primary;
      }
    }
  }
}

body.header-fixed {
  .menu-desktop {
    max-height: calc(100vh - #{$header-height-full});
    overflow-y: auto;
  }

  &.header-collapsed {
    .menu-desktop {
      max-height: calc(100vh - #{$header-height-collapsed});
    }
  }
}

@include media-breakpoint-down(md) {
  .menu-desktop {
    display: none;
  }
}

@include media-breakpoint-up(lg) {
  .menu-desktop {
    &:not(.show) {
      visibility: hidden;
      transform: translateX(-200vw);
    }
  }
}

@include media-breakpoint-up(xl) {
  .btn-close {
    right: calc(50vw - #{map-get($container-max-widths, 'xl') * 0.5});
  }
}

@include media-breakpoint-up(xxl) {
  .btn-close {
    right: calc(50vw - #{map-get($container-max-widths, 'xxl') * 0.5});
  }
}

@include media-breakpoint-up(xxxl) {
  .btn-close {
    right: calc(50vw - #{map-get($container-max-widths, 'xxxl') * 0.5});
  }
}
</style>
