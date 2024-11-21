import MASTER_ROOF_CALCULATE from '@/graphql/calculators/masterroof/MasterRoofCalculate'

export const state = () => ({
  activeField: '',
  addedToCart: false,
  cart: [],
  drainpipes: {
    length: 0,
    quantity: 0,
    diameter: null,
    height: null,
  },
  gutter: {
    length: 0,
  },
  valley: {
    length: 0,
  },
  i18n: 'calculators.masterRoof',
})

export const getters = {
  activeField: (state) => state.activeField,
  addedToCart: (state) => state.addedToCart,
  cart: (state) => state.cart,
  i18n: (state) => state.i18n,
  state: (state) => state,
  value: (state) => (field, subfield) => state[field][subfield],
}

export const mutations = {
  SET_DATA(state, [value, field, subfield]) {
    state[field][subfield] = value
  },
  SET_ACTIVE_FIELD(state, payload) {
    state.activeField = payload
  },
  SET_ADDED_TO_CART(state, payload) {
    state.addedToCart = payload
  },
  SET_CART(state, payload) {
    state.cart = payload
  },
  RESET_DATA(state) {
    state.drainpipes = {
      length: 0,
      quantity: 0,
      diameter: null,
      height: null,
    }
    state.gutter = {
      length: 0,
    }
    state.valley = {
      length: 0,
    }
  },
}

export const actions = {
  clearCart({ commit }) {
    commit('SET_CART', [])
  },
  changeAddedToCart({ commit }, payload) {
    commit('SET_ADDED_TO_CART', payload)
  },
  reset({ commit }) {
    commit('RESET_DATA')
  },
  setData({ commit }, payload) {
    commit('SET_DATA', payload)
  },
  setActiveField({ commit }, payload) {
    commit('SET_ACTIVE_FIELD', payload)
  },
  async fetchCart({ commit, state }) {
    const { drainpipes, gutter, valley } = state
    const { ekfgroup_master_roof_calculate } =
      await this.$graphql.default.request(MASTER_ROOF_CALCULATE, {
        drainpipes,
        gutter,
        valley,
      })
    const products = ekfgroup_master_roof_calculate.map((el) => ({
      ...el.product,
      quantity: Math.ceil(el.qty),
      quantity_not_rounded: el.qty_not_rounded,
    }))
    commit('SET_CART', products)
  },
}
