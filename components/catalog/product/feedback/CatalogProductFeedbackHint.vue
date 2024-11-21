<template>
  <div class="product-feedback-hint">
    <p>{{ $t('catalog.feedbackHint.title') }}</p>

    <p ref="hint" class="text-gray-500" v-html="hintHtml" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
    }
  },

  computed: {
    hintHtml() {
      const message = this.$t('catalog.feedbackHint.message')
      return message
        .replace(
          /\{\{(.+)\}\}/gi,
          '<a href="#" class="hint-message-link modal-toggle">$1</a>'
        )
        .replace(
          '911.help@ekf.su',
          '<a href="mailto:911.help@ekf.su" class="hint-message-link">911.help@ekf.su</a>'
        )
        .replace(
          '8 800 777-65-27',
          '<nobr><a href="tel:88007776527" class="hint-message-link hint-message-link-phone">8 800 777-65-27</a></nobr>'
        )
    },
  },

  mounted() {
    const link = this.$refs.hint.querySelector('.modal-toggle')
    if (link) link.addEventListener('click', this.linkClickHandler)
  },

  beforeDestroy() {
    const link = this.$refs.hint.querySelector('.modal-toggle')
    if (link) link.removeEventListener('click', this.linkClickHandler)
  },

  methods: {
    linkClickHandler(e) {
      e.preventDefault()
      this.$gtm.push({ event: 'clkFillForminProductCard' })
      this.$root.$emit('bv::show::modal', 'consultation-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
.product-feedback-hint {
  padding-right: 1rem;
  font-size: $font-size-2;
  line-height: 1.4;
  max-width: 387px;
}

::v-deep {
  .hint-message-link {
    color: inherit;
    border-bottom: 1px solid currentColor;

    @include hover {
      color: $primary;
    }
  }
}

@include media-breakpoint-up(md) {
  .product-feedback-hint {
    padding-left: 2.25rem;
    padding-right: 0;
    font-size: $font-size-1;
  }

  ::v-deep {
    .hint-message-link-phone {
      border-bottom: none;
    }
  }
}
</style>
