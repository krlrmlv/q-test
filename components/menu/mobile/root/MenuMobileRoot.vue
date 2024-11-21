<template>
  <div class="menu-panel menu-panel-root">
    <ul class="menu-mobile-nav menu-mobile-nav-primary" vertical>
      <li
        v-for="(item, index) in menuItems"
        :key="`primary-${index}`"
        class="nav-item"
      >
        <MenuMobileRootLink :item="item" @action="$emit('go-next', item)" />
      </li>
    </ul>

    <hr class="mx-12 my-0" />

    <ul class="menu-mobile-nav menu-mobile-nav-secondary" vertical>
      <MenuMobileCart />

      <MenuMobileCompare />

      <li
        v-for="(item, index) in mobileMenu"
        :key="`secondary-${index}`"
        class="nav-item"
      >
        <MenuMobileRootSecondaryLink
          :item="item"
          @action="$emit('show-modal', $event)"
        />
      </li>

      <li class="nav-item-text">
        <LocationIndicator />
      </li>

      <li class="nav-item-text">
        <SelectRegionIndicator />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { menu, mobileMenu } from '~/components/constants/header'

export default {
  data() {
    return {
      mobileMenu,
    }
  },

  computed: {
    ...mapGetters('catalog', ['categories']),
    ...mapGetters('layouts', ['layouts']),

    menuItems() {
      const catalog = {
        id: 'catalog',
        name: this.$t('catalog.catalog'),
        children: this.categories,
      }
      const layouts = {
        id: 'professionals',
        name: this.$t('professionals.title'),
        children: this.layouts?.map(({ id, name, slug }) => ({
          id,
          name,
          to: `/view/${slug}`,
        })),
      }
      return [catalog, layouts, ...menu]
    },
  },

  methods: {
    handleClick(item) {
      if (item.action) {
        this.$emit('show-modal', item.action)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-mobile-nav {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.nav-item,
.nav-item-text {
  border-bottom: none;
}

::v-deep {
  .nav-link-icon {
    display: block;
    position: relative;
    color: $secondary;
  }
}

.menu-mobile-nav-primary {
  .nav-item,
  .nav-item-text {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
  }

  ::v-deep {
    .icon {
      color: $secondary;
    }
  }
}
</style>
