import { getCartId, getOrCreateCartId, setCartUpdatedAt } from '@/utils/cart'
import { mindboxSetCart } from '@/utils/mindbox'

import CART_CLEAR from '@/graphql/cart/CartClear'
import CART_DELETE from '@/graphql/cart/CartDelete'
import CART_DELETE_BULK from '@/graphql/cart/CartDeleteBulk'
import CART_PRODUCTS from '@/graphql/cart/CartProducts'
import CART_ROWS from '@/graphql/cart/CartRows'
import CART_UPSERT from '@/graphql/cart/CartUpsert'
import CART_UPSERT_BULK from '@/graphql/cart/CartUpsertBulk'
import CART_UPSERT_SOLUTION from '@/graphql/cart/CartUpsertSolution'

import { CUSTOM_STATUSES } from '~/components/constants/product'

export const state = () => ({
  cartProducts: [],
  cartRows: 0,
})

export const mutations = {
  SET_CART_PRODUCT_LOADING(state, { loading, productId }) {
    const product = state.cartProducts?.find(({ id }) => id === productId)
    if (product?.cart) {
      product.cart = { ...product.cart, loading }
    }
  },

  SET_CART_PRODUCTS(state, cartProducts) {
    state.cartProducts = cartProducts
  },

  SET_CART_ROWS(state, cartRows) {
    state.cartRows = cartRows
  },
}

export const getters = {
  cartProducts: (state) => state.cartProducts,

  cartProductsInStock: (state) =>
    state.cartProducts.filter(
      (product) =>
        !CUSTOM_STATUSES.includes(product?.status) &&
        Number(product.stocks_aggregate?.aggregate?.sum?.quantity) > 0
    ),

  cartProductsPreorder: (state) =>
    state.cartProducts.filter(
      (product) =>
        CUSTOM_STATUSES.includes(product?.status) ||
        Number(product?.stocks_aggregate?.aggregate?.sum?.quantity) <= 0
    ),

  cartRows: (state) => state.cartRows,

  cartTotalSum: (state) => getSum(state.cartProducts),

  cartSumProductsInStock: (state, getters) =>
    getSum(getters.cartProductsInStock),

  cartSumProductsPreorder: (state, getters) =>
    getSum(getters.cartProductsPreorder),

  isInCart: (state) => (productId) =>
    state.cartProducts.findIndex((product) => productId === product.id) > -1,
}

export const actions = {
  async cartClear({ dispatch }) {
    const cartId = await getOrCreateCartId(this.$cookies)

    await this.$graphql.default.request(CART_CLEAR, { cartId })
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart')
  },

  async cartDelete({ dispatch }, { productId, solution }) {
    const cartId = await getOrCreateCartId(this.$cookies)
    const variables = { cartId, productId, solution }

    await this.$graphql.default.request(CART_DELETE, variables)
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart')
  },

  async cartDeleteBulk({ dispatch }, { products }) {
    const cartId = await getOrCreateCartId(this.$cookies)

    await this.$graphql.default.request(CART_DELETE_BULK, { cartId, products })
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart')
  },

  async cartUpsert({ dispatch }, { product, quantity, source }) {
    const cartId = await getOrCreateCartId(this.$cookies)
    const variables = {
      cartId,
      productId: product.id,
      quantity,
      solution: product?.cart?.solution,
    }

    await this.$graphql.default.request(CART_UPSERT, variables)
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart', source)
  },

  async cartUpsertSolution({ dispatch }, { solutionId, source }) {
    const cartId = await getOrCreateCartId(this.$cookies)

    await this.$graphql.default.request(CART_UPSERT_SOLUTION, {
      cartId,
      solutionId,
    })
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart', source)
  },

  async cartUpsertBulk({ dispatch }, { products, source }) {
    const cartId = await getOrCreateCartId(this.$cookies)

    await this.$graphql.default.request(CART_UPSERT_BULK, {
      cartId,
      products,
    })
    await setCartUpdatedAt(this.$cookies)

    return dispatch('fetchCart', source)
  },

  async fetchCart({ commit }, sourceForMindbox) {
    const cartId = await getCartId(this.$cookies)
    this.$graphql.default.setHeaders({ 'x-hasura-cart-id': cartId })

    const { cart, cartRows } = await this.$graphql.default.request(
      CART_PRODUCTS,
      { cartId, locale: this.$i18n.locale }
    )

    const mappedCart = cart.map(({ quantity, solution, catalog_product }) => ({
      cart: { quantity, solution },
      ...(catalog_product[0] ?? []),
    }))

    if (sourceForMindbox) mindboxSetCart(mappedCart, sourceForMindbox)

    commit('SET_CART_PRODUCTS', mappedCart)
    commit('SET_CART_ROWS', cartRows?.aggregate?.sum?.quantity || 0)
  },

  async fetchCartRows({ commit }) {
    const cartId = await getCartId(this.$cookies)
    this.$graphql.default.setHeaders({ 'x-hasura-cart-id': cartId })

    const { cartRows } = await this.$graphql.default.request(CART_ROWS, {
      cartId,
    })

    commit('SET_CART_ROWS', cartRows?.aggregate?.sum?.quantity || 0)
  },

  setCartProductLoading({ commit }, payload) {
    commit('SET_CART_PRODUCT_LOADING', payload)
  },
}

/** Cart utils */
const getSum = (products) =>
  products
    .filter((product) => Boolean(product?.price && product?.cart?.quantity))
    .map(({ price, cart }) => price * cart.quantity)
    .reduce((acc, sum) => acc + sum, 0)
