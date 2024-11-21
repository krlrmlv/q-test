<template>
  <nav class="header-navigation">
    <b-nav class="header-nav-main">
      <component
        :is="item.component"
        v-for="(item, index) in menuItems"
        :key="`nav-item-${index}`"
        :index="index"
        :item="item"
      />
    </b-nav>
  </nav>
</template>

<script>
import { BNav, BNavItem, BSkeleton } from 'bootstrap-vue'
import { menu } from '~/components/constants/header'

export default {
  components: {
    BNav,
    BNavItem,
    BSkeleton,
  },

  computed: {
    menuItems() {
      return menu?.map(({ children, name, to }) => ({
        children,
        component: children?.length
          ? 'HeaderNavigationDropdown'
          : 'HeaderNavigationLink',
        name,
        to,
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
.header-nav-main {
  flex-wrap: nowrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding: 0.5rem 0;
}

::v-deep {
  .nav-link {
    padding: 0.5rem;
    font-size: $font-size-3;
    font-weight: $font-weight-medium;
    line-height: 1.25;
    text-transform: uppercase;
    white-space: nowrap;
    border: none;
    color: $body-color;

    &:hover {
      color: $brand-light;
    }

    &:focus-visible {
      color: $brand-light;
      outline: 1px solid $brand-light;
    }

    &:focus,
    &.focus,
    &:active {
      color: $brand;
    }
  }

  .b-skeleton {
    width: 6em;
    height: 1.25rem;
  }
}

@include media-breakpoint-up(xl) {
  .header-nav-main {
    margin-left: -1.125rem;
    margin-right: -1.125rem;
  }

  ::v-deep {
    .nav-link {
      padding: 0.5rem 1.125rem;
    }
  }
}

@include media-breakpoint-up(xxl) {
  .header-nav-main {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  ::v-deep {
    .nav-link {
      padding: 0.5rem 1.5rem;
    }
  }
}
</style>
