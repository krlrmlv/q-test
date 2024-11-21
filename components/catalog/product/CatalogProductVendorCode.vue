<template>
  <div class="copy-wrapper">
    <b-button
      size="sm"
      variant="link"
      class="btn-icon btn-vendor-code-copy"
      :title="$t('copy.vendorCode')"
      :aria-label="$t('copy.vendorCode')"
      @click="handleCopy"
    >
      <slot></slot>

      <svg-icon
        name="copy-16"
        width="16"
        height="16"
        aria-hidden="true"
        class="icon ml-8"
      />
    </b-button>

    <div class="custom-toast" :class="{ show: isCopied }">
      <svg-icon
        name="check-mark-16"
        width="16"
        height="16"
        aria-hidden="true"
        class="mr-4"
      />
      {{ $t('copy.vendorCodeSuccess') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vendorCode: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      timerId: null,
      isCopied: false,
    }
  },

  methods: {
    async handleCopy() {
      try {
        if (this.timerId) clearTimeout(this.timerId)

        await navigator.clipboard.writeText(this.vendorCode)
        this.isCopied = true
        this.timerId = setTimeout(() => {
          this.isCopied = false
        }, 2000)

        this.sendAnalyticEvent()
      } catch (error) {
        this.$bvToast.toast(this.$t('copy.tryAgain'), {
          appendToast: true,
          title: this.$t('copy.error'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          autoHideDelay: 2000,
        })
      }
    },

    sendAnalyticEvent() {
      const currentRoute = this.$route.fullPath

      if (/catalog\/products/.test(currentRoute)) {
        this.$ym('reachGoal', 'COPYPRODUCTARTICLE')
      } else if (/catalog/.test(currentRoute)) {
        this.$ym('reachGoal', 'COPYCATALOGARTICLE')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.copy-wrapper {
  position: relative;
  max-width: fit-content;
}

.custom-toast {
  position: absolute;
  display: none;
  transition-behavior: allow-discrete;
  transition-duration: 500ms;
  transition-property: display opacity;
  opacity: 0;
  padding: 0.75rem 1.46785rem;
  bottom: -2.75rem;
  color: $secondary;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: $font-size-1;
  width: max-content;
}

.custom-toast.show {
  display: flex;
  opacity: 1;
  background-color: #ebf6ee;

  @starting-style {
    opacity: 0;
  }
}
</style>
