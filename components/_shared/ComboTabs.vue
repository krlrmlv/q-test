<template>
  <div class="combo-tabs">
    <div
      class="nav-tabs-wrapper"
      :class="{ 'nav-tabs-scrollable-wrapper': scrollable }"
    >
      <nav ref="nav" :class="{ 'nav-tabs-scrollable': scrollable }">
        <ul
          :class="{ 'nav-fill': fill, 'nav-justified': justified }"
          role="tablist"
          class="nav nav-tabs"
        >
          <li
            v-if="hasTabStart"
            :class="titleClass"
            role="presentation"
            class="nav-item nav-item-start"
          >
            <slot name="tab-start" :index="localValue" />
          </li>

          <li
            v-for="(tab, index) in tabs"
            :key="`tab-${index}`"
            :class="titleClass"
            role="presentation"
            class="nav-item"
            @click="handleTabCLick(index)"
          >
            <!-- Link here prevents dragging & text selection, so swap it to span
             --- when scrollable is enabled -->
            <component
              :is="scrollable ? 'span' : 'BLink'"
              :class="[{ active: isActiveIndex(index) }, titleLinkClass]"
              role="tab"
              class="nav-link"
              @click="$emit('change', index)"
            >
              {{ getTitle(tab) }}
            </component>
          </li>

          <li
            v-if="hasTabEnd"
            :class="titleClass"
            role="presentation"
            class="nav-item nav-item-end"
          >
            <slot name="tab-end" :index="localValue" />
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="hasBeforeContent">
      <slot name="before-content" :index="localValue" />
    </div>

    <div :class="contentClass" class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :key="`tab-pane-${index}`"
        :class="{ active: isActiveIndex(index) }"
        class="tab-pane"
        role="tabpanel"
      >
        <slot
          :active="isActiveIndex(index)"
          :index="localValue"
          :name="`tab(${index})`"
        >
          <component
            :is="tab.component"
            v-if="tab.component"
            v-bind="tab.componentProps"
          />
          <template v-else-if="tab.content">
            {{ tab.content }}
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    contentClass: {
      type: String,
      default: null,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      /* Scroll buttons horizontally instead of wrapping them */
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    titleClass: {
      type: String,
      default: null,
    },
    titleLinkClass: {
      type: String,
      default: null,
    },
    value: {
      /* Active tab index */
      type: Number,
      default: null,
    },
  },

  computed: {
    slots() {
      return this.$slots
    },

    hasBeforeContent() {
      return Boolean(
        this.$slots['before-content'] || this.$scopedSlots['before-content']
      )
    },

    hasTabEnd() {
      return Boolean(this.$slots['tab-end'] || this.$scopedSlots['tab-end'])
    },

    hasTabStart() {
      return Boolean(this.$slots['tab-start'] || this.$scopedSlots['tab-start'])
    },

    hasValue() {
      return !Number.isNaN(this.value) && this.value !== null && this.value >= 0
    },

    localValue: {
      get() {
        return this.value ?? 0
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },

  watch: {
    scrollable: 'getTitleHeight',
  },

  mounted() {
    this.getTitleHeight()
  },

  methods: {
    fireAnalyticEvents(tab) {
      if (typeof tab.analyticEvents !== 'function') return

      tab.analyticEvents()
    },

    handleTabCLick(tabIndex) {
      /** A/B test for tabs order, fire event for second tab */
      if (tabIndex === 1) {
        this.fireAnalyticEvents(this.tabs[tabIndex])
      }

      this.$emit('scroll')
    },

    isActiveIndex(index) {
      return index === this.value || (index === 0 && !this.hasValue)
    },

    getTitle(tab) {
      return typeof tab === 'string' ? tab : tab?.title
    },

    getTitleHeight() {
      /* Calculate tab title height to use with Safari hack */
      const nav = this.$refs.nav
      if (!nav) return

      if (this.scrollable) {
        let navLinkHeight

        const navTabs = nav.querySelector('.nav-tabs')
        if (navTabs) {
          const navItem = document.createElement('li')
          navItem.classList.add('nav-item')

          navItem.style.setProperty('position', 'absolute')
          navItem.style.setProperty('transform', 'translateX(-200vw)')
          navItem.style.setProperty('visibility', 'hidden')

          navItem.innerHTML = '<a class="nav-link">&nbsp;</a>'

          navTabs.appendChild(navItem)

          navLinkHeight = navItem.getBoundingClientRect().height

          navItem.parentNode.removeChild(navItem)
        }

        if (navLinkHeight) {
          nav.style.setProperty('--tab-title-height', `${navLinkHeight}px`)
        }
      } else {
        nav.style.setProperty('--tab-title-height', null)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-pane {
  display: unset;
  transition: $transition-base;
  transition-property: opacity;

  &:not(.active) {
    position: fixed;
    visibility: hidden;
    opacity: 0;
    transform: translateX(-200vw);
  }
}
</style>
