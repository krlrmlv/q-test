<template>
  <transition name="compare-popup">
    <div v-if="visible" :key="popupKey" class="compare-popup">
      <b-container>
        <b-row align-v="center" class="flex-lg-nowrap">
          <b-col cols="auto" class="d-none d-lg-block">
            <img
              :alt="product.name"
              :src="$getCdnImage(imageUrl, 48)"
              width="48"
              height="48"
              class="card-img"
            />
          </b-col>

          <b-col cols="12" lg="auto" class="flex-fill mb-12 mb-lg-0">
            <p class="fs-4 lh-120 mb-4" v-html="message" />

            <p class="fs-2 text-gray-600 mb-0">
              {{ $t('catalog.compareProductCount') }}
              {{ compareProductCount }}&nbsp;{{
                getDeclension(
                  compareProductCount,
                  $t('catalog.tabs.assortment.productsDeclensions')
                )
              }}
            </p>
          </b-col>

          <b-col cols="12" lg="auto">
            <b-button
              :disabled="!compareProductCount"
              :to="localePath('/compare')"
              variant="primary"
              block
            >
              <svg-icon
                name="compare-24"
                width="24"
                height="24"
                aria-hidden="true"
                class="mr-8"
              />
              {{ $t('catalog.goToCompare') }}
            </b-button>
          </b-col>

          <b-col cols="auto" class="d-none d-lg-block">
            <div class="mx-n8">
              <b-button
                :title="$t('global.close')"
                :aria-label="$t('global.close')"
                variant="white"
                class="btn-icon rounded-pill text-secondary p-8"
                block
                @click="hide"
              >
                <svg-icon
                  name="close-24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="light"
        class="btn-icon popup-close-mobile d-lg-none"
        @click="hide"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import getDeclension from '@/utils/declension'

export default {
  props: {
    autohide: {
      type: [Boolean, Number],
      default: 5000,
    },
  },

  data() {
    return {
      timeout: null,
    }
  },

  computed: {
    ...mapGetters('compare', ['comparePopup', 'compareProductCount']),

    imageUrl() {
      return `/products/${this.product.image}`
    },

    isAdded() {
      return this.comparePopup.isAdded
    },

    message() {
      const string = this.$t(
        `catalog.${this.isAdded ? 'addedToCompare' : 'removedFromCompare'}`
      )

      return string.replace(
        '%s',
        `<span class="product-name">${this.product.name}</span>`
      )
    },

    popupKey() {
      return `${this.product.id}-${this.isAdded}-${this.visible}`
    },

    product() {
      return this.comparePopup.product ?? {}
    },

    visible() {
      return this.comparePopup.visible
    },
  },

  watch: {
    popupKey: {
      immediate: true,
      handler() {
        this.timeout && clearTimeout(this.timeout)
        this.timeout = null

        if (this.visible && this.autohide) {
          this.timeout = setTimeout(() => {
            this.hide()
          }, this.autohide)
        }
      },
    },
  },

  methods: {
    ...mapActions('compare', ['updateComparePopup']),

    getDeclension,

    hide() {
      this.updateComparePopup({
        isAdded: this.isAdded,
        product: {},
        visible: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.compare-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: $white;
  box-shadow: $box-shadow;
  z-index: $zindex-dropdown - 10;
}

.popup-close-mobile {
  position: absolute;
  top: 0;
  right: $grid-gutter-width * 0.5;
  padding: 0.5rem;
  border-radius: $rounded-pill;
  transform: translateY(-50%);
}

::v-deep {
  .product-name {
    font-weight: $font-weight-medium;
  }
}

@include media-breakpoint-down(md) {
  ::v-deep {
    .product-name {
      display: none;
    }
  }
}

.compare-popup-enter-active,
.compare-popup-leave-active {
  transition: $transition-base;
  transition-property: transform;
}
.compare-popup-enter,
.compare-popup-leave-to {
  transform: translateY(100%);
}
</style>
