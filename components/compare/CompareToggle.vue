<template>
  <b-button
    :size="size"
    :title="buttonTitle"
    :class="{ active: inCompare }"
    :aria-label="buttonTitle"
    variant="link"
    class="btn-icon btn-compare-toggle"
    @click="toggleInCompare"
  >
    <slot></slot>

    <transition name="count-badge" mode="out-in">
      <svg-icon
        v-if="inCompare"
        :name="`compare-counter-${iconSize}`"
        :width="iconSize"
        :height="iconSize"
        aria-hidden="true"
      />

      <svg-icon
        v-else
        :name="`compare-${iconSize}`"
        :width="iconSize"
        :height="iconSize"
        aria-hidden="true"
      />
    </transition>
  </b-button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    iconSize: {
      type: [Number, String],
      default: 24,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapGetters('compare', ['isInCompare']),

    buttonTitle() {
      return this.$t(
        `catalog.${this.inCompare ? 'removeFromCompare' : 'addToCompare'}`
      )
    },

    inCompare() {
      return this.isInCompare(this.product?.id)
    },
  },

  methods: {
    ...mapActions('compare', [
      'addCompareProduct',
      'removeCompareProduct',
      'updateComparePopup',
    ]),

    async toggleInCompare() {
      if (this.inCompare) {
        await this.removeCompareProduct(this.product?.id)
      } else {
        await this.addCompareProduct(this.product?.id)
        this.$gtm.push({ event: 'addComparison' })
      }

      this.updateComparePopup({
        isAdded: this.inCompare,
        product: this.product,
        visible: true,
      })
    },
  },
}
</script>
