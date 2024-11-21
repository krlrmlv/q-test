<template>
  <div class="card card-collapse">
    <b-button
      :class="toggleClass"
      size="sm"
      variant="link"
      class="card-header"
      @click="toggleCollapse"
    >
      <svg-icon
        :name="collapseOpen ? 'minus-16' : 'plus-16'"
        :class="`text-${toggleVariant}`"
        width="16"
        height="16"
        class="mr-8"
        aria-hidden="true"
      />
      {{ title }}
    </b-button>

    <b-collapse
      v-model="collapseOpen"
      :accordion="accordion"
      :appear="appear"
      :visible="visible"
    >
      <div :class="bodyClass" class="card-body">
        <slot />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'

export default {
  components: { BCollapse },

  props: {
    accordion: {
      type: String,
      default: null,
    },
    appear: {
      type: Boolean,
      default: false,
    },
    bodyClass: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    toggleClass: {
      type: String,
      default: null,
    },
    toggleVariant: {
      type: String,
      default: 'primary',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      collapseOpen: this.visible,
    }
  },

  methods: {
    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
      this.$emit('toggle-collapse', this.collapseOpen)
    },
  },
}
</script>

<style lang="scss">
.card-collapse {
  display: inline-flex; // to avoid breaking inside card in multicolumn parent
  width: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  break-inside: avoid;
  background-color: transparent;

  .card-header {
    display: flex;
    justify-content: flex-start;
    padding: 0;
    font-size: $font-size-3;
    line-height: $headings-line-height;
    text-align: left;
    text-decoration: none;
    border: none;
    color: $body-color;
    background-color: transparent;
  }

  .card-body {
    padding: 0.25rem 0 0 calc(0.5rem + 16px);
  }
}
</style>
