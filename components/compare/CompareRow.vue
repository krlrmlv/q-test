<template>
  <div
    ref="row"
    :class="{ 'compare-row-sticky': sticky }"
    :style="{
      '--compare-row-offset': offset,
      '--compare-row-sticky-offset': `${stickyOffset}px`,
    }"
    class="compare-row"
  >
    <div
      v-touch:swipe.left="handleSwipeLeft"
      v-touch:swipe.right="handleSwipeRight"
      class="container-xl compare-container"
    >
      <p v-if="title" class="compare-row-title">
        {{ $te(title) ? $t(title) : title }}
      </p>
      <div class="compare-row-columns">
        <slot></slot>
      </div>
    </div>

    <b-button
      v-if="showNavigation && maxOffset > 0"
      :disabled="!offset"
      :title="$t('compare.previousProduct')"
      :aria-label="$t('compare.previousProduct')"
      variant="gray-200"
      class="btn-icon btn-compare-nav btn-compare-prev rounded-pill"
      @click="$emit('slide-prev')"
    >
      <svg-icon
        name="arrow-left-24"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </b-button>

    <b-button
      v-if="showNavigation && maxOffset > 0"
      :disabled="offset >= maxOffset"
      :title="$t('compare.nextProduct')"
      :aria-label="$t('compare.nextProduct')"
      variant="gray-200"
      class="btn-icon btn-compare-nav btn-compare-next rounded-pill"
      @click="$emit('slide-next')"
    >
      <svg-icon
        name="arrow-right-24"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    maxOffset: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
    showNavigation: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      headerEl: null,
      stickyOffset: 0,
    }
  },

  mounted() {
    if (this.sticky) {
      this.headerEl = document.querySelector('.app-header')
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      this.stickyOffset = this.headerEl?.offsetHeight || 0
      const row = this.$refs.row
      if (row) {
        const rowTop = row.getBoundingClientRect().top
        if (rowTop <= this.stickyOffset) {
          row.classList.add('compare-row-collapsed')
        } else {
          row.classList.remove('compare-row-collapsed')
        }
      }
    },

    handleSwipeLeft() {
      if (this.showNavigation) {
        this.$emit('slide-next')
      }
    },

    handleSwipeRight() {
      if (this.showNavigation) {
        this.$emit('slide-prev')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$btn-nav-margin: calc(
  50% - #{map-get($container-max-widths, 'xl') * 0.5} + #{$grid-gutter-width * 0.5}
);
$btn-nav-width: calc(26px + 1.375rem);

.compare-row {
  position: relative;
  transition: $transition-base;
  transition-property: box-shadow;

  &:not(:last-child) {
    border-bottom: $border-width solid $gray-200;
  }

  &.compare-row-sticky {
    position: sticky;
    top: var(--compare-row-sticky-offset);
    padding-top: 1rem;
    background-color: $white;
    z-index: 9;
  }

  &.compare-row-collapsed {
    @include media-breakpoint-down(xs) {
      box-shadow: $box-shadow-sm;
    }
  }
}

.compare-container {
  overflow: hidden;
}

.compare-row-title {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: $font-size-1;
  line-height: 1.2;
  text-transform: uppercase;
  color: $gray-500;
}

.compare-row-columns {
  display: flex;
  justify-content: flex-start;
  gap: $grid-gutter-width;
  transition: $transition-base;
  transition-property: transform;
}

.btn-compare-nav {
  display: none;
  position: absolute;
  top: calc(51px + 0.3125rem);
}

.btn-compare-prev {
  left: calc(#{$btn-nav-margin} - #{$btn-nav-width} - 0.5rem);
}

.btn-compare-next {
  right: calc(#{$btn-nav-margin} - #{$btn-nav-width} - 0.5rem);
}

@media (min-width: 1280px) {
  .btn-compare-nav {
    display: inline-flex;
  }
}
</style>

<style lang="scss">
/*
 * This section should not be scoped. If style is scoped, 
 * it applies not instantly, causing columns to jump
 * from stretched to correct width.
 */

$column-width: calc(
  #{map-get($container-max-widths, 'xl')} / 6 - #{$grid-gutter-width}
);

.compare-row-columns {
  transform: translateX(
    calc(
      (#{$column-width} + #{$grid-gutter-width}) * var(--compare-row-offset) *
        -1
    )
  );

  & > * {
    flex: 0 0 $column-width;
    width: $column-width;
  }
}
</style>
