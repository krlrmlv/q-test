<template>
  <div
    ref="wrapper"
    :class="{ 'text-collapse-wrapper-initialized': ready }"
    :style="{ '--content-line-height': lineHeight }"
    class="text-collapse-wrapper"
  >
    <div
      ref="collapse"
      :class="{ collapsed: !collapseShow, overlay: buttonVisible }"
      :style="{ height: currentHeight }"
      class="text-collapse"
    >
      <div ref="content" class="text-collapse-content">
        <slot />
      </div>
    </div>

    <transition name="fade">
      <b-button
        v-if="buttonVisible"
        :class="collapseShow ? 'not-collapsed' : 'collapsed'"
        size="sm"
        variant="link"
        class="collapse-toggle"
        @click="toggleCollapse"
      >
        <span v-text="$t(`global.${collapseShow ? 'collapse' : 'readMore'}`)" />
        <svg-icon
          name="caret"
          width="8"
          height="4"
          class="icon-caret ml-8"
          aria-hidden="true"
        />
      </b-button>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    lineHeight: {
      type: [Number, String],
      default: 1.5,
    },
    lines: {
      type: [Number, String],
      default: 4,
    },
  },

  data() {
    return {
      collapsedHeight: 0,
      collapseShow: false,
      fullHeight: 0,
      ready: false,
    }
  },

  computed: {
    buttonVisible() {
      return this.fullHeight > this.collapsedHeight
    },

    currentHeight() {
      return this.ready
        ? `${
            this.collapseShow
              ? this.fullHeight
              : Math.min(this.collapsedHeight, this.fullHeight)
          }px`
        : null
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.setFullHeight()
      this.setCollapsedHeight()
      this.ready = true
      this.$emit('ready')
      window.addEventListener('resize', this.setFullHeight, { passive: true })
    })
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.setFullHeight)
  },

  methods: {
    setCollapsedHeight() {
      const lineHeight = this.$refs.content
        ? window.getComputedStyle(this.$refs.content).lineHeight
        : 0
      this.collapsedHeight = Math.ceil(
        parseInt(this.lines, 10) * parseFloat(lineHeight)
      )
    },

    setFullHeight() {
      this.fullHeight = this.$refs.content ? this.$refs.content.offsetHeight : 0
    },

    toggleCollapse() {
      this.collapseShow = !this.collapseShow
    },
  },
}
</script>

<style lang="scss" scoped>
.text-collapse-wrapper {
  transition: $transition-base;
  transition-property: opacity;

  &:not(.text-collapse-wrapper-initialized) {
    height: 0;
    opacity: 0;
  }
}

.text-collapse {
  position: relative;
  overflow: hidden;
  transition: $transition-collapse;

  ::v-deep {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6,
    .h7,
    .h8,
    p,
    ol,
    ul {
      margin-bottom: calc(1em * var(--content-line-height));
    }
  }

  &::after {
    display: none;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    background-image: linear-gradient(to top, $white, rgba($white, 0));
    transform: translateY(150%);
    transition: $transition-base;
    transition-property: transform;
  }

  &.overlay {
    &::after {
      display: block;
    }
  }

  &.collapsed {
    &::after {
      transform: translateY(0);
    }
  }
}

.collapse-toggle {
  margin-top: 0.75rem;
  padding: 0;
  text-decoration: none;
  font-weight: $font-weight-normal;
  border: none;
  color: $dark;
}

@include media-breakpoint-up(md) {
  .collapse-toggle {
    justify-content: flex-start;
    text-align: left;
  }
}

.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}
</style>
