<template>
  <ul class="nav nav-support-api">
    <li v-for="(item, itemIndex) in items" :key="item.key" class="nav-item">
      <SupportApiNavTree
        :active-index="localValue"
        :index="`${itemIndex + 1}`"
        :item="item"
        @input="setActiveIndex"
      />
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(event) {
        this.$emit('input', event)
      },
    },
  },

  methods: {
    setActiveIndex(event) {
      this.localValue = event
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-support-api {
  height: 100%;
  flex-direction: column;
  font-size: $font-size-2;

  ::v-deep {
    .nav {
      flex-direction: column;
      padding-left: 1rem;
    }

    .nav-link,
    .navbar-text {
      padding: 0.375rem 0.5rem;
    }

    .nav-link {
      flex: 1 1 auto;
      color: inherit;
      transition: $transition-base;
      transition-property: color, background-color;

      &:hover {
        background-color: $gray-200;
      }

      &.active {
        color: $primary;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .nav-support-api {
    padding-right: 1rem;
    border-right: $border-width solid $border-color;
  }
}
</style>
