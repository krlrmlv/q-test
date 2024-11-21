<template>
  <div ref="sidebar" class="catalog-sidebar">
    <div class="catalog-sidebar-header">
      <b-button
        :title="$t('global.back')"
        variant="link"
        class="btn-icon text-secondary border-0 p-0"
        @click="$emit('close')"
      >
        <svg-icon
          name="chevron-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>
      <p class="h7 text-uppercase mx-auto mb-0">{{ title }}</p>
      <b-button
        :title="$t('global.close')"
        variant="link"
        class="btn-icon text-secondary border-0 p-0"
        @click="$emit('close')"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </div>
    <div class="catalog-sidebar-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getViewportWidth } from '@/utils/window'
import debounce from '@/utils/debounce'
const BREAKPOINT = 768
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  watch: {
    show: {
      handler(value) {
        this.toggleSidebar(value)
      },
    },
  },
  mounted() {
    this.toggleSidebar(this.show)
  },
  methods: {
    handleResize() {
      if (BREAKPOINT < getViewportWidth()) this.$emit('close')
    },
    debouncedResizeHandler: debounce(function () {
      this.handleResize()
    }, 500),
    toggleSidebar(show) {
      if (show) {
        this.$refs.sidebar && this.$refs.sidebar.classList.add('show')
        // window.addEventListener('resize', this.debouncedResizeHandler)
        if (BREAKPOINT > getViewportWidth()) {
          window.addEventListener('resize', this.debouncedResizeHandler)
          setTimeout(() => {
            this.$store.commit('SET_BODY_FIXED', true)
          }, 100)
        }
      } else {
        this.$refs.sidebar && this.$refs.sidebar.classList.remove('show')
        this.$store.commit('SET_BODY_FIXED', false)
        window.removeEventListener('resize', this.debouncedResizeHandler)
      }
    },
  },
}
</script>

<style lang="scss">
.catalog-sidebar-header {
  display: none;
}

@include media-breakpoint-down(sm) {
  .catalog-sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0;
    background-color: $white;
    overflow: hidden;
    transform: translateX(100%);
    transition: $transition-base;
    transition-property: transform;
    z-index: $zindex-dropdown + 2;

    &.show {
      transform: translateX(0);
    }
  }

  .catalog-sidebar-header {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin: 0;
    padding: $grid-gutter-width * 0.5;
    text-align: center;
    border-bottom: $border-width solid $border-color;
  }

  .catalog-sidebar-body {
    flex: 1 1 auto;
    min-height: 0;
    padding: 2rem $grid-gutter-width * 0.5 1rem;
    overflow-y: auto;
  }
}
</style>
