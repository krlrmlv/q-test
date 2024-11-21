export const state = () => ({
  langSelectAvailable: false
})

export const mutations = {
  SET_LANG_SELECT_AVAILABLE(state, payload) {
    state.langSelectAvailable = payload
  }
}

export const getters = {
  langSelectAvailable: (state) => state.langSelectAvailable
}

export const actions = {
  setLanguageSelectAvailable({ commit }, payload) {
    commit('SET_LANG_SELECT_AVAILABLE', payload)
  }
}
