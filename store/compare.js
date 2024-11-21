export const state = () => ({
  popup: {
    isAdded: true,
    product: {},
    visible: false,
  },
  productIds: [],
})

export const mutations = {
  ADD_COMPARE_PRODUCT(state, payload) {
    state.productIds.push(payload)
  },

  REMOVE_COMPARE_PRODUCT(state, payload) {
    const index = state.productIds.findIndex((id) => id === payload)
    if (index > -1) state.productIds.splice(index, 1)
  },

  UPDATE_COMPARE_PRODUCTS(state, payload) {
    state.productIds = payload
  },

  UPDATE_COMPARE_POPUP(state, { isAdded, product, visible }) {
    state.popup = { isAdded, product, visible }
  },
}

export const getters = {
  comparePopup: (state) => state.popup,

  compareProductCount: (state) => state.productIds?.length || 0,

  compareProducts: (state) => state.productIds,

  isInCompare: (state) => (productId) =>
    state.productIds.findIndex((id) => id === productId) > -1,
}

export const actions = {
  addCompareProduct({ commit, dispatch }, payload) {
    dispatch('restoreCompareList')

    commit('ADD_COMPARE_PRODUCT', payload)

    dispatch('saveCompareList')
  },

  removeCompareProduct({ commit, dispatch }, payload) {
    dispatch('restoreCompareList')

    commit('REMOVE_COMPARE_PRODUCT', payload)

    dispatch('saveCompareList')
  },

  updateCompareProducts({ commit, dispatch }, { products, updateCookie }) {
    commit('UPDATE_COMPARE_PRODUCTS', products)

    if (updateCookie) {
      dispatch('saveCompareList')
    }
  },

  updateComparePopup({ commit }, { isAdded, product, visible }) {
    commit('UPDATE_COMPARE_POPUP', { isAdded, product, visible })
  },

  /* Get product IDs array from cookie and save it to store */

  restoreCompareList({ dispatch }) {
    const cookieProductIds = this.$cookies.get('compare_product_ids')
    const products = Array.isArray(cookieProductIds) ? cookieProductIds : []

    dispatch('updateCompareProducts', { products, updateCookie: false })
  },

  /* Save product IDs array to cookie */

  saveCompareList({ state }) {
    this.$cookies.set('compare_product_ids', state.productIds, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: true,
    })
  },
}
