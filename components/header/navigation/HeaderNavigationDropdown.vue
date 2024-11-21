<template>
  <li class="nav-item nav-item-dropdown">
    <div :class="{ show: open }" class="dropdown">
      <b-link class="nav-link" @mouseover="handleToggleMouseover">
        {{ $te(item.name) ? $t(item.name) : item.name }}
      </b-link>
      <ul
        :class="{ show: open }"
        tabindex="-1"
        class="dropdown-menu"
        @mouseenter="handleMenuMouseover"
      >
        <HeaderNavigationDropdownItem
          v-for="(child, childIndex) in children"
          :key="`child-${childIndex}`"
          :item="child"
          :open="openChildIndex === childIndex"
          @link-click="setDropdownOpenIndex(-1)"
          @set-close="handleChildClose(childIndex)"
          @set-open="handleChildOpen(childIndex)"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const DELAY = 300

export default {
  props: {
    index: {
      type: Number,
      default: null,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      enterTimeout: null,
      leaveTimeout: null,
      openChildIndex: -1,
    }
  },

  computed: {
    ...mapGetters('header', ['catalogOpen', 'dropdownOpenIndex']),

    children() {
      return this.item?.children?.map(({ children, name, to, href }) => ({
        children,
        hasChildren: Boolean(children?.length),
        name,
        to,
        href,
      }))
    },

    open() {
      return this.index === this.dropdownOpenIndex
    },
  },

  methods: {
    ...mapActions('header', ['setDropdownOpenIndex']),

    handleChildClose(index) {
      if (this.openChildIndex === index) {
        this.openChildIndex = -1
      }
    },

    handleChildOpen(index) {
      this.openChildIndex = index
    },

    handleMenuMouseover(event) {
      clearTimeout(this.leaveTimeout)
      const menu = event?.target?.closest('.dropdown-menu')
      menu?.addEventListener('mouseleave', this.handleMouseout)
    },

    handleMouseout(event) {
      clearTimeout(this.enterTimeout)
      this.leaveTimeout = setTimeout(() => {
        event?.target?.removeEventListener('mouseout', this.onToggleOut)
        this.setDropdownOpenIndex(-1)
      }, DELAY)
    },

    handleToggleMouseover(event) {
      this.enterTimeout = setTimeout(() => {
        this.openDropdown(event)
      }, DELAY)
    },

    openDropdown(event) {
      event?.target?.addEventListener('mouseout', this.handleMouseout)
      this.setDropdownOpenIndex(this.index)
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  min-width: 12.5rem;
  margin-top: 0.5rem;
  margin-left: 0.75rem;

  ::v-deep {
    .dropdown-item {
      padding: 0.5rem;
      line-height: $input-btn-line-height-sm;

      .dropdown.dropright & {
        background-color: red;
      }
    }

    .dropdown-item-active {
      font-weight: $font-weight-bold;
      background-color: transparent;
      cursor: default;
    }
  }
}

@include media-breakpoint-up(xl) {
  .dropdown-menu {
    margin-left: 1.5rem;
  }

  body.header-collapsed {
    .dropdown-menu {
      margin-left: 1rem;
    }
  }
}
</style>
