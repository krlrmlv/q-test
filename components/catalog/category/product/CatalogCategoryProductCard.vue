<template>
  <div
    class="card card-catalog-product"
    :class="{
      'card-catalog-product-list': view === 'list',
      'card-replacement': isReplacementEkfAnalog,
      'suggestion-card': suggestionCard,
    }"
  >
    <CatalogCategoryProductCardTooltip
      v-if="isEkfAnalog"
      class="card-tooltip"
      :type="product.functionalType"
    />

    <div class="card-img-wrapper">
      <b-link :to="localePath(`/catalog/products/${product.slug}`)">
        <b-img-lazy
          :alt="product.title"
          :src="$getCdnImage(image.url, image.size)"
          class="card-img"
        />
      </b-link>
    </div>

    <div class="card-body">
      <p class="product-title">
        <b-link
          :to="localePath(`/catalog/products/${product.slug}`)"
          class="text-body text-hover-primary text-decoration-none"
        >
          <span v-html="product.name" />
        </b-link>
      </p>

      <CatalogProductVendorCode :vendor-code="product.vendor_code">
        <span class="fs-1 product-vendor-code">
          <span class="d-none d-lg-inline">
            {{ $t('global.vendorCode') }}:
          </span>
          {{ product.vendor_code }}
        </span>
      </CatalogProductVendorCode>

      <CatalogCategoryProductProperties
        v-show="hasProperties"
        class="product-properties"
        :product-id="product?.id"
        :properties="productProperties"
        :total-available-properties="totalAvailableProperties"
      />
    </div>

    <div v-if="isReplacementEkfAnalog" class="replacement-analog-description">
      {{ product.description }}
    </div>

    <div class="card-footer">
      <span
        v-if="isOutOfProduction"
        class="out-of-production-status product-prices"
      >
        <svg-icon
          name="warning-16"
          width="16"
          height="16"
          class="mr-8"
          aria-hidden="true"
        />
        <span class="d-none d-lg-block">
          {{ $t('catalog.productOutOfProduction') }}
        </span>
        <span class="d-lg-none short-variant">
          {{ $t('catalog.outOfProduction') }}
        </span>
      </span>

      <div
        v-else-if="product.hide_price"
        class="catalog-product-price product-prices price-on-request"
      >
        <span class="product-price-caption">
          {{ $t('catalog.price.onRequest') }}
        </span>
      </div>

      <CatalogCategoryProductCardPrices
        v-else
        class="product-prices"
        :product="product"
        :view="view"
      />

      <CatalogStock
        v-if="showStock"
        size="sm"
        class="mb-lg-12 card-stock"
        :product="product"
        :in-stock="inStock"
        :stock-own-total="stockOwnTotal"
      >
        <span class="mt-12" :class="stockStatusClass">{{ stockStatus }}</span>
      </CatalogStock>

      <b-row align-v="center" class="card-btns flex-nowrap mx-n4">
        <b-button
          v-if="isOutOfProduction"
          variant="primary"
          block
          class="product-tocart find-analog-btn ml-4"
          @click="handleFindAnalogClick"
        >
          <span class="d-none d-lg-inline">
            {{ $t('catalog.pickUpAnalog') }}
          </span>
          <span class="d-lg-none">
            {{ $t('catalog.findAnalog') }}
          </span>
        </b-button>

        <b-col v-else cols="auto" md="12" xl="auto" class="px-4">
          <b-button
            v-if="product.hide_price"
            variant="primary"
            class="product-tocart get-price-btn"
            @click="showPriceRequsetModal"
          >
            {{ $t('catalog.price.get') }}
          </b-button>

          <CatalogCategoryProductCartButton
            v-else
            v-model="quantity"
            :disabled="loading"
            :retail-rate="product.coefficient"
            :hide-price="product.hide_price"
            @input="updateCart"
          />
        </b-col>

        <b-col cols="auto" class="d-none d-xl-block px-4">
          <CompareToggle :product="product" size="sm" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

import {
  CUSTOM_STATUSES,
  OUT_OF_PRODUCTION_STATUSES,
  WITHDRAWN_STATUSES,
} from '~/components/constants/product'

import { checkIsEkfAnalog, checkIsReplacementEkfAnalog } from '~/utils/product'

export default {
  name: 'CatalogCategoryProductCard',

  components: { BImgLazy },

  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    suggestionCard: {
      type: Boolean,
      default: false,
    },
    view: {
      type: String,
      default: 'list',
    },
  },

  data() {
    return {
      loading: false,
      quantity: 0,
    }
  },

  computed: {
    ...mapGetters('category', ['isSearch']),

    hasProperties() {
      return this.totalAvailableProperties || this.view === 'list'
    },

    image() {
      const url = `/products/${this.product?.image}`
      const size = this.view === 'list' ? 185 : 284

      return { url, size }
    },

    inStock() {
      return Boolean(this.stockOwnTotal)
    },

    isEkfAnalog() {
      return checkIsEkfAnalog(this.product)
    },

    isOutOfProduction() {
      return OUT_OF_PRODUCTION_STATUSES.includes(this.product.status)
    },

    isReplacementEkfAnalog() {
      return checkIsReplacementEkfAnalog(this.product)
    },

    isUnavailable() {
      return (
        WITHDRAWN_STATUSES.includes(this.product?.status) &&
        !parseInt(this.product?.stocks_aggregate?.aggregate?.sum?.quantity || 0)
      )
    },

    productProperties() {
      return this.product?.property_values ?? []
    },

    showStock() {
      return this.view === 'list' && !this.isOutOfProduction
    },

    stockStatus() {
      if (CUSTOM_STATUSES.includes(this.product?.status))
        return this.$t('catalog.toOrder')

      return this.inStock
        ? this.$t('catalog.inStock')
        : this.$t('catalog.outOfStock')
    },

    stockStatusClass() {
      if (CUSTOM_STATUSES.includes(this.product?.status))
        return 'text-secondary'
      return this.inStock ? 'text-success' : 'text-danger'
    },

    stockOwnTotal() {
      return Number(
        this.product?.stocks_aggregate?.aggregate?.sum?.quantity || 0
      )
    },

    totalAvailableProperties() {
      return this.product?.totalAvailableProperties?.aggregate?.count || 0
    },

    unitCaption() {
      /** unit_storage declination only if unit is 'пар' */
      let ending = ''
      if (this.product?.unit_storage?.name.toLowerCase() === 'пар')
        ending += 'у'

      return this.product?.unit_storage?.name
        ? `${this.$t('global.for')} ${this.product.unit_storage.name}${ending}`
        : ''
    },
  },

  created() {
    this.quantity = this.product?.carts?.[0]?.quantity ?? 0
  },

  methods: {
    showPriceRequsetModal() {
      this.$store.commit('catalog/SET_PRICE_REQUEST_PRODUCT', this.product)
      this.$root.$emit('bv::show::modal', 'price-request-modal')
    },

    handleFindAnalogClick() {
      if (this.isSearch) {
        this.$emit('show-analogs')
        return
      }

      this.$ym('reachGoal', 'analogues-search')

      const locale = this.$i18n.locale
      const query = `q=${this.product.vendor_code}&showAnalogs=true`
      this.$router.push(`/${locale}/search?${query}`)
    },

    async updateCart(count) {
      this.loading = true

      if (count) {
        const source = 'Каталог'

        await this.$store.dispatch('cart/cartUpsert', {
          product: this.product,
          quantity: this.quantity,
          source,
        })
      } else {
        await this.$store.dispatch('cart/cartDelete', {
          productId: this.product?.id,
        })
      }

      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
/** Base styles */
.card-catalog-product {
  padding: 1.5rem;
  line-height: 1.2;
  height: 100%;

  .card-img-wrapper {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;

    &::before {
      display: block;
      content: '';
      padding-top: 100%;
    }

    .card-img {
      position: absolute;
      left: 0;
      top: 0;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }

  .card-body {
    padding: 1rem 0 0.875rem;

    .product-title {
      margin-bottom: 0.25rem;
      font-weight: $font-weight-medium;
    }

    ::v-deep {
      .btn-vendor-code-copy {
        color: $gray-500;
        padding: 0;

        @include hover {
          color: $primary;
        }
      }

      .custom-toast {
        bottom: -2.25rem;
        padding: 0.5rem 0.71875rem;
      }
    }

    .product-properties {
      display: none;
    }
  }

  .card-footer {
    padding: 0;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: flex-end;
    background-color: transparent;

    .product-prices {
      margin-bottom: 0.625rem;

      ::v-deep {
        .product-price-base {
          display: none;
        }
      }
    }

    .out-of-production-status {
      margin-bottom: 1.6875rem;
    }

    .card-stock {
      display: none;
      font-size: $font-size-2;
    }

    .btn-out-of-production {
      padding: 0.3875rem 0.5rem;
      font-size: $font-size-1;
    }

    .card-btns {
      justify-content: space-between;
    }

    .find-analog-btn {
      padding-inline: 0;
      max-width: 193px;
    }

    .product-tocart {
      width: 100%;
    }
  }

  @include media-breakpoint-down(md) {
    padding: 0.5rem 0.5rem 1rem;

    .card-body {
      .product-title {
        font-size: $font-size-1;
        font-weight: $font-weight-normal;
      }
      ::v-deep {
        .custom-toast {
          min-width: 140px;
        }
      }
    }

    .card-footer {
      .product-prices {
        margin-bottom: 0.25rem;

        &.out-of-production-status {
          margin-bottom: 0.5rem;
        }

        &.price-on-request {
          margin-bottom: 0.625rem;
        }
      }

      ::v-deep {
        .product-price-bulk,
        .catalog-product-stock {
          display: none;
        }
        .product-tocart-sm:is(button) {
          padding: 0.5rem 1.75rem;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .card-footer {
      .product-tocart {
        min-width: 140px;
        height: 2rem;
      }
    }
  }

  @include media-breakpoint-down(xs) {
    .card-body {
      padding-bottom: 0.25rem;

      .product-vendor-code {
        display: block;
        max-width: 116px;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ::v-deep {
        .btn-vendor-code-copy {
          font-size: $font-size-1;
        }
        .custom-toast {
          font-size: 10px;
          padding: 0.5rem 0.53125rem;
          bottom: -2.25rem;
        }
      }
    }

    .card-footer {
      .get-price-btn,
      .find-analog-btn {
        font-size: $font-size-2;
      }

      .find-analog-btn {
        max-width: 140px;
        max-height: 2rem;
      }
    }
  }
}

/** List view mode */
@include media-breakpoint-up(lg) {
  .card-catalog-product-list {
    flex-direction: row;

    &:hover {
      box-shadow: $box-shadow;
    }

    .card-img-wrapper {
      align-self: flex-start;
      width: 25%;
      flex: 0 0 auto;
    }

    .card-body {
      padding: 0 0.5rem;

      ::v-deep {
        .custom-toast {
          bottom: 0;
          right: -11rem;
          transform: translateY(20%);
        }
      }

      .product-title {
        font-size: $font-size-4;
      }

      .product-properties {
        font-size: $font-size-1;
        margin-top: 1rem;
        display: block;
      }

      ::v-deep {
        .product-specs-item {
          &:not(:last-of-type) {
            margin-bottom: 0.25rem;
          }

          & > dt {
            display: inline;
            font-weight: $font-weight-normal;

            &::after {
              display: inline;
              content: ':';
            }
          }

          & > dd {
            display: inline;
            color: $gray-500;
          }
        }
      }
    }

    .card-footer {
      width: 28.83%;
      padding: 0 0 0 1rem;
      border-left: $border-width solid $border-color;

      .card-stock {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        flex-grow: 1;
        gap: 0.5rem;
      }

      .product-prices {
        margin-bottom: auto;

        ::v-deep {
          .product-price-base {
            display: block;
          }
        }
      }

      .card-btns {
        justify-content: flex-start;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .card-catalog-product-list {
    .card-img-wrapper {
      max-width: 185px;
    }

    .card-body {
      padding: 0 1.5;
      .product-properties {
        font-size: $font-size-2;
      }
    }

    .card-footer {
      padding-left: 2.5rem;

      .product-tocart.product-tocart-sm {
        min-width: 160px;
        ::v-deep {
          .form-control {
            width: 3rem;
          }
        }
      }
    }
  }

  .card-catalog-product:not(.card-catalog-product-list) {
    .card-footer {
      .product-tocart {
        min-width: 180px;
      }
    }
  }
}

/** Suggestion section cards */
.suggestion-card {
  position: relative;
  .card-tooltip {
    position: absolute;
    top: 0;
    left: 0;
    margin: 1.5rem;
    z-index: 1;
  }

  .card-img-wrapper {
    max-width: 284px;
    margin: 0 auto;
  }

  @include media-breakpoint-down(xxl) {
    .product-vendor-code {
      display: block;
      max-width: 144px;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @include media-breakpoint-down(md) {
    .card-tooltip {
      margin: 0.5rem;
    }
  }
}

.out-of-production-status {
  display: flex;
  align-items: center;
  font-size: $font-size-2;
  font-weight: $font-weight-medium;
  color: $gray-700;

  svg {
    flex-shrink: 0;
  }

  .short-variant {
    font-size: 10px;
  }
}

/** Suggestion analogs replacement card */
.card-replacement {
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1.5rem 1.5rem 0.375rem;
  border: $border-width solid $border-color;

  .card-img-wrapper {
    width: 50%;
    max-width: 284px;
    order: 2;
  }

  .card-body {
    margin-top: auto;
    width: 50%;
    order: 1;

    .product-title {
      font-size: $font-size-6;
      margin-bottom: 0.625rem;
    }
  }

  .replacement-analog-description {
    order: 3;
    position: relative;
    display: -webkit-box;
    line-clamp: 7;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: $gray-700;
  }

  .card-footer {
    order: 4;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 0;

    .product-prices {
      margin-bottom: 0;
    }

    .product-tocart-sm:is(button) {
      padding: 0.5rem 2.25rem;

      ::v-deep {
        .icon {
          display: none;
        }

        span {
          display: block !important;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .card-body {
      ::v-deep {
        .custom-toast {
          bottom: 0;
          right: -11rem;
          transform: translateY(20%);
        }
      }
    }
  }

  @include media-breakpoint-down(md) {
    padding: 0.5rem 0.5rem 0.375rem;

    .card-body {
      padding: 0.5rem 0;

      .product-title {
        font-size: $font-size-4;
        font-weight: $font-weight-medium;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    padding: 0.5rem 0.5rem 0.375rem;

    .card-body {
      padding: 0;

      .product-title {
        font-size: $font-size-2;
        font-weight: $font-weight-medium;
        margin-bottom: 0.25rem;
      }
    }

    .replacement-analog-description {
      display: none;
    }

    .card-footer {
      padding-bottom: 0;
    }
  }
}
</style>
