<template>
  <div :class="{ show: visible }" class="menu-mobile">
    <div
      :style="{ transform: `translateX(${(-100 * menuLevel) / 3}%)` }"
      class="menu-mobile-content"
    >
      <MenuMobileRoot
        @go-next="goNext($event, 1)"
        @show-modal="$emit('show-modal', $event)"
      />

      <MenuMobilePanel
        :panel="level1"
        @go-next="goNext($event, 2)"
        @go-prev="goPrev"
      />

      <MenuMobilePanel
        :panel="level2"
        @go-next="goNext($event, 3)"
        @go-prev="goPrev"
      />

      <MenuMobilePanel :panel="level3" @go-prev="goPrev" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      menuLevel: 0,
      level1: {},
      level2: {},
      level3: {},
    }
  },

  computed: {
    ...mapGetters('header', { visible: 'mobileMenuOpen' }),
  },

  watch: {
    visible() {
      this.menuLevel = 0
    },
  },

  methods: {
    goNext(event, level) {
      this.menuLevel = level
      if (level > 0) this[`level${level}`] = event
    },

    goPrev() {
      if (this.menuLevel > 0) this.menuLevel--
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-mobile {
  position: fixed;
  top: $header-height-mobile;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 $grid-gutter-width * 0.5;
  background-color: $white;
  overflow: hidden;
  transform: translateX(-100%);
  transition: $transition-base;
  transition-property: transform;
  z-index: $zindex-dropdown + 2;
}

.menu-mobile-content {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300%;
  transform: translateX(0);
  transition: $transition-base;
  transition-property: transform;
}

.menu-panel {
  flex: 0 0 33.33333%;
  height: 100%;
  overflow-y: auto;
}

::v-deep {
  .menu-mobile-nav {
    list-style: none;
    margin: 0;
    padding-left: $grid-gutter-width * 0.5;
    padding-right: $grid-gutter-width * 0.5;
  }

  .nav-item,
  .nav-item-text {
    display: flex;
    position: relative;
    font-size: $font-size-2;
    line-height: $headings-line-height;
    border-bottom: $border-width solid $border-color;
  }

  .nav-link,
  .nav-item-text {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-height: 3rem;
    padding: 0.5rem 0;
    color: inherit;
  }

  .nav-item-header {
    align-items: center;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    text-align: center;
    text-transform: uppercase;

    .caption {
      flex: 1 1 auto;
      max-width: 100%;
      padding-right: calc(
        #{$border-width * 2 + 24px} + #{$input-btn-padding-y}
      );
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .nav-link:hover {
    color: $secondary;
  }

  .nav-btn {
    color: $secondary;
  }

  .location-indicator,
  .indicator {
    & > .btn {
      font-size: inherit;
      text-decoration: inherit;
    }

    &:hover {
      color: $secondary;
    }
  }
}

@include media-breakpoint-down(md) {
  .menu-mobile {
    &.show {
      transform: translateX(0);
    }
  }
}

@include media-breakpoint-up(lg) {
  .menu-mobile {
    display: none;
  }
}
</style>
