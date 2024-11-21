<template>
  <div>
    <transition name="fade" mode="out-in">
      <div :key="`nav-${Boolean(step)}`">
        <MasterkupolNav
          v-if="step"
          :items="navItems"
          class="mb-32 mb-lg-40"
          @click="handleNavClick"
        />
        <transition name="fade" mode="out-in">
          <component
            :is="componentName"
            @go-to-rod="handleNavClick('rod', 2)"
            @home="handleHome"
            @next="handleNext"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: ['initialData', 'protectionMethod'],
      step: 0,
    }
  },
  computed: {
    componentName() {
      const key = this.navItems?.[this.step]
      return key && `Masterkupol${key[0].toUpperCase()}${key.substring(1)}`
    },
  },

  methods: {
    handleHome() {
      this.handleNavClick(undefined, 0)
    },

    handleNavClick(item, step) {
      this.step = step
      if (step >= 1) {
        this.navItems = [...this.navItems.slice(0, this.step), item]
      }
    },

    handleNext(component) {
      this.step++
      this.navItems = [...this.navItems.slice(0, this.step), component]
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .col-form-label {
    padding-bottom: 0.5rem;
    font-size: $font-size-4;
    line-height: $font-size-base * $line-height-base;
  }

  .input-group-text {
    color: $gray-500;
    background-color: $white;
  }

  .collapse-toggle {
    justify-content: initial;
    padding: 0;
    text-align: left;
    border: none;

    .icon {
      transform: rotate(-90deg);
      transition: $transition-base;
      transition-property: transform;
    }

    &.collapsed {
      .icon {
        transform: rotate(90deg);
      }
    }

    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
