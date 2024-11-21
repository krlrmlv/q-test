<template>
  <section class="catalog-product-description">
    <h1 class="h3 mb-8">{{ product.name }}</h1>

    <b-row align-v="center" class="flex-wrap-reverse">
      <b-col cols="auto" class="flex-fill flex-md-grow-0 mb-4 mb-md-32">
        <CatalogProductVendorCode :vendor-code="product.vendor_code">
          <span>
            {{ $t('global.vendorCode') }}: {{ product.vendor_code }}
          </span>
        </CatalogProductVendorCode>
      </b-col>

      <b-col cols="auto" class="mb-4 mb-md-32">
        <CompareToggle :product="product" icon-size="16" size="sm">
          <span class="mr-6">{{ $t('catalog.compare') }}</span>
        </CompareToggle>
      </b-col>
    </b-row>

    <b-row class="flex-lg-nowrap">
      <b-col cols="12" md="6" xl="auto">
        <b-skeleton
          v-if="!isMounted"
          class="description-skeleton gallery"
          variant="light"
        />

        <CatalogProductGallery
          v-else
          :images="productImages"
          :spinner="productPhoto3d"
          class="mb-32"
        />
      </b-col>

      <b-col cols="12" md="6" xl="auto" class="flex-xl-fill">
        <b-row>
          <b-col cols="12" xl="6" order-xl="2">
            <div v-if="isOutOfProduction">
              <CatalogProductAnalogFind
                :vendor-code="product.vendor_code"
                class="mb-24"
              />
            </div>

            <div v-else>
              <CatalogProductPrices
                v-if="showPriceAndCart"
                :product="product"
                class="mb-8"
              />

              <CatalogProductRequestPrice
                v-else
                :product="product"
                class="mb-8"
              />

              <div class="mb-32">
                <CatalogStock
                  class="mb-16"
                  :product="product"
                  :in-stock="inStock"
                  :stock-own-total="stockOwnTotal"
                >
                  <CatalogProductAnalogsAnchor
                    v-if="isWithdrawn && hasReplacementEkfAnalog"
                  />

                  <CatalogProductStockAvailability
                    v-else
                    :in-stock="inStock"
                    :product-status="product.status"
                  />

                  <template
                    #ownTableControl="{
                      hasOwnStockModal,
                      stockLoading,
                      size,
                      showOwnTable,
                    }"
                  >
                    <b-button
                      v-if="hasOwnStockModal"
                      variant="link"
                      class="catalog-product-stock card-btn-link"
                      :disabled="stockLoading"
                      :size="size"
                      @click="showOwnTable"
                    >
                      <svg-icon
                        name="boxes-product-16"
                        width="16"
                        height="16"
                        class="mr-4"
                        aria-hidden="true"
                      />
                      {{ $t('catalog.inStockEkf') }}
                    </b-button>
                  </template>
                </CatalogStock>

                <CatalogDescriptionLink
                  v-if="product.hyperlink"
                  :link="product.hyperlink"
                  :link-classes="'catalog-product-stock card-btn-link btn-hyperlink reverse'"
                  class="py-0"
                />
              </div>
            </div>

            <CatalogProductFeedbackHint class="d-none d-md-block" />
          </b-col>
          <b-col cols="12" xl="6" order-xl="1" class="d-none d-xl-block">
            <b-skeleton
              v-if="!isMounted"
              class="description-skeleton"
              variant="light"
            />

            <ClientOnly v-else>
              <CatalogProductDescriptionCollapses
                :product="product"
                class="mb-60 mb-xl-24"
                @tab-activate="$emit('tab-activate', $event)"
              />
            </ClientOnly>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import {
  OUT_OF_PRODUCTION_STATUSES,
  WITHDRAWN_STATUSES,
} from '~/components/constants/product'

export default {
  components: {
    BSkeleton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    isMounted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasReplacementEkfAnalog() {
      return this.product?.replacementEkfAnalog?.length
    },

    isOutOfProduction() {
      return OUT_OF_PRODUCTION_STATUSES.includes(this.product.status)
    },

    isWithdrawn() {
      return WITHDRAWN_STATUSES.includes(this.product.status)
    },

    inStock() {
      return Boolean(this.stockOwnTotal)
    },

    productImages() {
      return this.product?.images?.map(({ file }) => {
        return { file, name: this.product?.name }
      })
    },

    productPhoto3d() {
      return this.product?.photo3d?.photo3d?.path
    },

    stockOwnTotal() {
      return Number(
        this.product?.stocks_aggregate?.aggregate?.sum?.quantity || 0
      )
    },

    showPriceAndCart() {
      return !this.product?.hide_price
    },
  },
}
</script>

<style lang="scss" scoped>
.description-skeleton {
  border-radius: 0;
  height: 470px;

  &.gallery {
    width: auto;
  }

  @include media-breakpoint-up(xl) {
    &.gallery {
      width: 440px;
    }
  }
}

::v-deep {
  .catalog-product-stock-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .catalog-product-stock {
    justify-content: flex-start;
    padding: 0 0 0 2.25rem;
    text-align: left;
    line-height: inherit;
  }

  @include media-breakpoint-down(sm) {
    .catalog-product-stock,
    .btn-hyperlink.reverse {
      justify-content: center;
      padding: 0;
    }
  }
}
</style>
