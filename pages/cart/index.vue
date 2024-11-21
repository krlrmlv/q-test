<template>
  <main class="overflow-hidden pb-lg-32">
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <b-row class="mb-16">
        <b-col cols="6" md="12" order-md="1">
          <h1 class="h2 mb-0">
            {{ $t('cart.title') }}
          </h1>
        </b-col>

        <b-col
          v-if="cartProducts && cartProducts.length"
          cols="6"
          order-md="3"
          class="btn-clear-wrapper"
        >
          <b-button
            variant="link"
            class="btn-clear"
            @click="clearCartProducts('clearCart')"
          >
            {{ $t('global.clearCart') }}
          </b-button>
        </b-col>

        <b-col md="6" order-md="2" class="mt-32 mt-lg-64">
          <CartQuickAdd />
        </b-col>
      </b-row>

      <InfoBlock v-if="infoBlockVisible">
        <span>{{ $t('cart.preorder.info') }}</span>

        <template #button>
          <b-button
            variant="outline-secondary"
            class="info-btn mt-16 mt-lg-0"
            block
            @click="handleAnchorClick"
          >
            {{ $t('cart.anchorLink') }}
          </b-button>
        </template>
      </InfoBlock>

      <transition name="fade" mode="out-in">
        <div v-if="cartProducts && cartProducts.length" key="not-empty">
          <div v-if="cartProductsInStock.length" class="mt-48">
            <b-row>
              <b-col sm="12" md="8" class="display-flex">
                <h4 class="mb-24">
                  {{ $t('cart.inStock') }}
                </h4>

                <CartProductSectionTooltip
                  class="cart-tooltip"
                  :hint="'cart.inStockInfo'"
                />
              </b-col>

              <b-col
                sm="0"
                md="4"
                class="btn-clear-wrapper text-right block-clear-products"
              >
                <b-button
                  variant="link"
                  class="btn-clear"
                  @click="clearCartProducts('clearProductsInStock')"
                >
                  {{ $t('global.clear') }}
                </b-button>
              </b-col>
            </b-row>

            <CartContent class="mb-64">
              <CartProduct
                v-for="product in cartProductsInStock"
                :key="`product-${product.id}-${product.cart.solution}`"
                :product="product"
                :readonly="Boolean(product.cart.solution)"
                @delete="deleteFromCart(product)"
                @update="updateInCart($event, product)"
              />
            </CartContent>

            <b-row class="mb-32">
              <b-col lg="auto" class="ml-lg-auto mb-32">
                <CartQuantityAndTotal
                  :total-sum="cartSumProductsInStock"
                  :products="cartProductsInStock"
                />
              </b-col>
            </b-row>

            <CartControls
              :loading="loading"
              class="mb-64"
              @cart-buy="handleBuyBtn"
              @cart-order-distributor="checkout"
              @cart-save="saveXlsx('cartProductsInStock')"
            />
          </div>

          <hr v-if="infoBlockVisible" class="my-64" />

          <div v-if="cartProductsPreorder.length" id="products-to-order-anchor">
            <b-row>
              <b-col sm="12" md="8" class="display-flex">
                <h4 class="mb-24">
                  {{ $t('cart.availableToOrder') }}
                </h4>

                <CartProductSectionTooltip
                  class="cart-tooltip"
                  :hint="'cart.availableToOrderInfo'"
                />
              </b-col>

              <b-col
                sm="0"
                md="4"
                class="btn-clear-wrapper text-right block-clear-products"
              >
                <b-button
                  variant="link"
                  class="btn-clear"
                  @click="clearCartProducts('clearProductsPreorder')"
                >
                  {{ $t('global.clear') }}
                </b-button>
              </b-col>
            </b-row>

            <CartContent class="mb-64">
              <CartProduct
                v-for="product in cartProductsPreorder"
                :key="`product-${product.id}-${product.cart.solution}`"
                :product="product"
                :readonly="Boolean(product.cart.solution)"
                @delete="deleteFromCart(product)"
                @update="updateInCart($event, product)"
              />
            </CartContent>

            <b-row class="mb-32">
              <b-col lg="auto" class="ml-lg-auto mb-32">
                <CartQuantityAndTotal
                  :total-sum="cartSumProductsPreorder"
                  :products="cartProductsPreorder"
                />
              </b-col>
            </b-row>

            <CartControlsPreorder
              :loading="loading"
              class="mb-64"
              @cart-preorder="cartPreorderHandler"
              @cart-save="saveXlsx('cartProductsPreorder')"
            />
          </div>
        </div>

        <p v-else key="empty" class="text-muted mb-64">
          {{ $t('cart.isEmpty') }}.
        </p>
      </transition>
    </b-container>

    <CartDeleteConfirmation
      v-model="deleteModalVisible"
      :product="solutionsProduct"
      @delete="deleteFromCart"
    />

    <CartProductsDeleteConfirmation
      v-model="deleteProductsModalVisible"
      :delete-type="deleteProductsModalType"
      @delete="clearCartProducts"
    />

    <CartPreorderModal
      v-model="preorderModalVisible"
      :loading="loading"
      :products="cartProductsPreorder"
      @cart-buy="handleBuyBtn"
    />

    <CartPreorderForm
      v-model="preorderFormVisible"
      :products="cartProductsPreorder"
    />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { buildUtmContent, getAnalyticData } from '~/utils/analytic'
import { scrollToTarget } from '@/utils/window'
import sendToMindbox from '@/utils/mindbox'

import LOG_SENT_CART from '@/graphql/cart/LogSentCart'
import MARKET_CART_UPSERT from '@/graphql/mutations/MarketCartUpsert'

export default {
  name: 'CartPage',

  async asyncData({ store }) {
    await store.dispatch('cart/fetchCart')
  },

  data() {
    return {
      breadcrumbs: [{ text: 'cart.title', to: '/cart', active: true }],
      loading: false,
      preorderModalVisible: false,
      preorderFormVisible: false,
      deleteModalVisible: false,
      deleteProductsModalVisible: false,
      deleteProductsModalType: '',
      solutionsProduct: {},
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    ...mapGetters('cart', [
      'cartProducts',
      'cartProductsInStock',
      'cartProductsPreorder',
      'cartSumProductsInStock',
      'cartSumProductsPreorder',
    ]),

    infoBlockVisible() {
      return this.cartProductsPreorder.length && this.cartProductsInStock.length
    },
  },

  async mounted() {
    await sendToMindbox('EKFGroupcartVisit')
    await this.$gtm.push({ event: 'testposeszkorziny' })
  },

  methods: {
    ...mapActions('cart', [
      'cartDelete',
      'cartDeleteBulk',
      'cartClear',
      'cartUpsert',
      'setCartProductLoading',
    ]),

    cartPreorderHandler() {
      this.preorderFormVisible = !this.preorderFormVisible
      this.$ym('reachGoal', 'CLICKAVAILABLETOORDERFORM')
    },

    analyticEventsOnBuy() {
      const savedView = this.$cookies.get('catalog-category-view')

      if (savedView === 'list') {
        this.$ym('reachGoal', 'horizontal-list-product', {
          'horizontal-list-product-cartamount': this.cartSumProductsInStock,
        })
      } else if (savedView === 'grid') {
        this.$ym('reachGoal', 'vertical-list-product', {
          'vertical-list-product-cartamount': this.cartSumProductsInStock,
        })
      }

      sendToMindbox('EKFGroup.CreateEKFMarketOrder')
      this.$gtm.push({ event: 'btnOnlineStore' })
      this.$gtm.push({
        event: 'ecommercePurchase',
        ecommerce: {
          purchase: {
            actionField: {
              id: `internet-magazin-${Date.now()}`,
              revenue: this.cartSumProductsInStock,
            },
            products: this.cartProductsInStock.map(
              ({ id, name, price, cart }) => ({
                id,
                name,
                price,
                quantity: cart.quantity,
              })
            ),
          },
        },
      })
    },

    async deleteFromCart(product) {
      if (product?.cart?.solution && !this.deleteModalVisible) {
        this.deleteModalVisible = true
        this.solutionsProduct = product
        return
      }

      const { id: productId } = product

      this.setCartProductLoading({ loading: true, productId })
      try {
        await this.cartDelete({ productId, solution: product?.cart?.solution })
      } catch (error) {
        const message = error?.response?.errors[0]?.message
        this.showErrorToast(message)
      }
      this.setCartProductLoading({ loading: false, productId })
    },

    async clearCart() {
      if (!this.deleteProductsModalVisible) {
        this.deleteProductsModalVisible = true
        this.deleteProductsModalType = 'clearCart'
        return
      }

      this.loading = true
      try {
        await this.cartClear()
      } catch (error) {
        const message = error?.response?.errors[0]?.message
        this.showErrorToast(message)
      }
      this.loading = false
    },

    async updateInCart(quantity, product) {
      const productId = product?.id
      const source = 'Корзина'
      this.setCartProductLoading({ loading: true, productId })
      try {
        await this.cartUpsert({ product, quantity, source })
      } catch (error) {
        const message = error?.response?.errors[0]?.message
        this.showErrorToast(message)
      }
      this.setCartProductLoading({ loading: false, productId })
    },

    buildUtmParams(orderId) {
      const utmSource = 'utm_source=ekfgroup_basket'
      const utmTerm = `utm_term=${orderId}`
      const utmContent = buildUtmContent({
        utmPlugin: this.$utm,
        cookies: this.$cookies,
      })

      return `${utmSource}&${utmTerm}&utm_content=${utmContent}`
    },

    handleBuyBtn() {
      if (this.cartProductsPreorder.length && !this.preorderModalVisible) {
        this.preorderModalVisible = true
        return
      }
      this.sendOrderToShop()
    },

    handleAnchorClick() {
      const target = document.getElementById('products-to-order-anchor')
      scrollToTarget(target)
    },

    async saveXlsx(productsType) {
      if (!(this.cartProducts && this.cartProducts.length)) return

      const products = this[productsType].map(
        ({ cart, name, price, price_base, unit_storage, vendor_code, id }) => ({
          id,
          name,
          price,
          base_price: parseFloat(price_base),
          qty: cart.quantity,
          unit_storage_name: unit_storage?.name,
          vendor_code,
        })
      )

      const apiUrl = `${process.env.REST_API_URL}/ekfgroup/cart-xls-download`

      try {
        const { utm, referer } = getAnalyticData({
          utmPlugin: this.$utm,
          cookies: this.$cookies,
        })

        const { data } = await this.$axios.post(apiUrl, {
          products,
          locale: this.$i18n.locale,
          utm,
          referer,
        })

        this.$gtm.push({ event: 'btnSaveSpecification' })
        const filename = data.path.split('/').pop()
        const link = document.createElement('a')
        link.href = `${process.env.REST_API_URL}${data.path}`
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      } catch (e) {
        // eslint-disable-next-line
        console.log(e.response)
      }
    },

    async sendOrderToShop() {
      const products = this.cartProductsInStock?.map(({ cart, id }) => ({
        id,
        quantity: cart?.quantity ?? 0,
      }))

      if (products?.length) {
        this.loading = true

        try {
          const { cart } = await this.$graphql.default.request(
            MARKET_CART_UPSERT,
            { products }
          )

          /* GTM & Mindbox & Metrika events for marketing */
          this.analyticEventsOnBuy()

          /* Log cart for marketing and get orderId for utmParams */
          const orderId = await this.logToSentCarts()

          /* Remove products added to Market cart from ekfgroup.com cart */
          const productsToDelete = this.cartProductsInStock.map(
            ({ id, cart }) => ({ product_id: id, solution: cart.solution })
          )
          await this.$store.dispatch('cart/cartDeleteBulk', {
            products: productsToDelete,
          })

          const utmParams = this.buildUtmParams(orderId)

          /* Redirect to market cart page with id */
          window.location.assign(
            `${process.env.MARKET_SITE_URL}/cart?id=${cart?.id}&${utmParams}`
          )
        } catch (error) {
          const message = error?.response?.errors[0]?.message
          this.showErrorToast(message)
        }
        this.loading = false
      }
      this.preorderModalVisible = false
    },

    async clearCartProducts(type) {
      if (type === '') {
        return
      }

      if (type === 'clearCart') {
        return this.clearCart()
      }

      if (!this.deleteProductsModalVisible) {
        this.deleteProductsModalVisible = true
        this.deleteProductsModalType = type
        return
      }

      let blockProducts
      if (type === 'clearProductsInStock') {
        blockProducts = this.cartProductsInStock
      } else if (type === 'clearProductsPreorder') {
        blockProducts = this.cartProductsPreorder
      } else {
        return
      }

      const productsToDelete = blockProducts.map(({ id, cart }) => ({
        product_id: id,
        solution: cart.solution,
      }))
      await this.$store.dispatch('cart/cartDeleteBulk', {
        products: productsToDelete,
      })
    },

    checkout() {
      this.$router.push(this.localePath('/cart/checkout'))
    },

    async logToSentCarts() {
      let orderId

      try {
        const { utm, referer } = getAnalyticData({
          utmPlugin: this.$utm,
          cookies: this.$cookies,
        })

        const variables = {
          objects: [
            {
              city: '',
              company_name: '',
              email: '',
              inn: '',
              is_lead_chosen_manually: false,
              is_physical_person: true,
              name: '',
              phone: '',
              utm,
              referer,
              products: {
                data: this.cartProductsInStock.map(
                  ({
                    price,
                    price_base: base_price,
                    id: product_id,
                    cart: { quantity },
                  }) => ({
                    base_price,
                    price,
                    product_id,
                    quantity,
                  })
                ),
              },
            },
          ],
        }
        const { sent_cart } = await this.$graphql.default.request(
          LOG_SENT_CART,
          variables
        )

        orderId = sent_cart?.returning[0]?.id
      } catch (e) {}

      return orderId ?? ''
    },

    showErrorToast(message) {
      this.$bvToast.toast(message, {
        title: this.$t('global.error'),
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 5000,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-clear-wrapper {
  text-align: right;
  margin-bottom: auto;
  @include media-breakpoint-up(md) {
    margin-bottom: 1.75rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
}

.display-flex {
  display: flex;
}
.text-right {
  text-align: right;
}

@media (max-width: 770px) {
  .block-clear-products {
    display: none;
  }
}

::v-deep {
  @include media-breakpoint-up(lg) {
    .info-block {
      .info-text {
        flex: 0 0 70%;
        align-items: center;
      }
      .info-btn {
        flex: 0 0 30%;
        max-width: 266px;
        padding: 0.75rem 4.75rem;
      }
    }
  }
}

@include media-breakpoint-up(xxl) {
  // TODO: remove this block after reworking cart table

  $cartColWidthDiff: 4%;
  $colWidthPercent: calc(100% / $grid-row-columns);

  ::v-deep {
    .cart-picture-col,
    .cart-product .product-picture {
      flex: 0 0 calc($colWidthPercent * 2 - $cartColWidthDiff);
      max-width: calc($colWidthPercent * 2 - $cartColWidthDiff);
    }

    .cart-title-col,
    .cart-product .product-title {
      flex: 0 0 calc($colWidthPercent * 3 + $cartColWidthDiff);
      max-width: calc($colWidthPercent * 3 + $cartColWidthDiff);
    }
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Cart — EKF"
  },
  "ru": {
    "pageTitle": "Корзина — EKF"
  }
}
</i18n>
