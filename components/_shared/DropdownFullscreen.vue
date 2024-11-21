<template>
  <b-dropdown
    :block="block"
    :boundary="isModal ? 'viewport' : 'scrollParent'"
    :disabled="disabled"
    :menu-class="menuClass"
    :no-caret="noCaret"
    :no-flip="noFlip"
    :offset="offset"
    :right="right"
    :size="size"
    :text="text"
    :toggle-class="toggleClass"
    :variant="variant"
    class="dropdown-fullscreen"
    @show="handleShow"
  >
    <template #button-content>
      <slot name="button-content">{{ text }}</slot>
    </template>

    <template #default="{ hide }">
      <li v-if="isModal" role="presentation" class="text-right">
        <b-button
          :title="$t('global.close')"
          :aria-label="$t('global.close')"
          size="sm"
          variant="white"
          class="btn-icon text-secondary rounded-pill dropdown-fullscreen-close"
          @click="hide"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </b-button>
      </li>

      <slot />
    </template>
  </b-dropdown>
</template>

<script>
import { BDropdown } from 'bootstrap-vue'
import { getViewportWidth } from '@/utils/window'

export default {
  components: { BDropdown },

  props: {
    block: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: [Number, String],
      default: 576,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    menuClass: {
      type: [Array, Object, String],
      default: null,
    },
    noCaret: {
      type: Boolean,
      default: false,
    },
    noFlip: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: [Number, String],
      default: 0,
    },
    right: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    toggleClass: {
      type: [Array, Object, String],
      default: null,
    },
    variant: {
      type: String,
      default: 'secondary',
    },
  },

  data() {
    return {
      isModal: false,
    }
  },

  methods: {
    handleShow() {
      this.isModal = Number(this.breakpoint) > getViewportWidth()
    },
  },
}
</script>
