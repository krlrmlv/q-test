<template>
  <div class="menu-desktop-panel menu-desktop-panel-root">
    <ul class="menu-desktop-nav">
      <li
        v-for="(category, index) in items"
        :key="`category-${index}`"
        class="nav-item"
      >
        <b-link
          class="nav-link"
          @click="changePanel(category.id)"
          @mouseover="handleMouseover($event, category.id)"
        >
          {{ category.name }}
          <svg-icon
            name="chevron-right-24"
            width="24"
            height="24"
            aria-hidden="true"
            class="text-gray-700"
          />
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleMouseover(event, panel) {
      const target = event.target.closest('.nav-link')
      const timer = setTimeout(() => this.changePanel(panel), 300)
      const resetTimer = () => {
        clearTimeout(timer)
        target.removeEventListener('mouseout', resetTimer)
      }
      target.addEventListener('mouseout', resetTimer)
    },
    changePanel(panel) {
      this.$emit('change-panel', panel)
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-desktop-panel-root {
  height: 100%;

  .menu-desktop-nav {
    margin-left: -0.5rem;
    padding-right: 1rem;
    border-right: $border-width solid $border-color;

    .nav-link {
      padding: 0.25rem 0 0.25rem 0.5rem;

      &:hover {
        color: inherit;
        background-color: $gray-200;
      }
    }
  }
}
</style>
