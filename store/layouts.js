export const state = () => ({
  layouts: [],
})

export const getters = {
  layouts: (state) => state.layouts,
  layoutBySlug: (state) => (slug) =>
    state.layouts?.find((layout) => layout.slug === slug) || {},
}

export const mutations = {
  SET_LAYOUTS(state, payload) {
    state.layouts = payload
  },
}

export const actions = {
  setLayouts({ commit }, payload) {
    commit('SET_LAYOUTS', payload)
  },
}
