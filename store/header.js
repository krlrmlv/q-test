export const state = () => ({
  breakpoint: 992,
  catalogOpen: false,
  collapsed: false,
  dropdownOpenIndex: -1,
  fixed: false,
  mobileMenuOpen: false,
  mounted: false,
  searchOpen: false,
})

export const mutations = {
  SET_CATALOG_OPEN(state, payload) {
    state.catalogOpen = payload
  },
  SET_COLLAPSED(state, payload) {
    state.collapsed = payload
  },
  SET_DROPDOWN_OPEN_INDEX(state, payload) {
    state.dropdownOpenIndex = payload
  },
  SET_FIXED(state, payload) {
    state.fixed = payload
  },
  SET_MOBILE_MENU_OPEN(state, payload) {
    state.mobileMenuOpen = payload
  },
  SET_MOUNTED(state, payload) {
    state.mounted = payload
  },
  SET_SEARCH_OPEN(state, payload) {
    state.searchOpen = payload
  },
}

export const getters = {
  breakpoint: (state) => state.breakpoint,
  catalogOpen: (state) => state.catalogOpen,
  collapsed: (state) => state.collapsed,
  dropdownOpen: (state) => state.dropdownOpenIndex >= 0,
  dropdownOpenIndex: (state) => state.dropdownOpenIndex,
  fixed: (state) => state.fixed,
  mobileMenuOpen: (state) => state.mobileMenuOpen,
  mounted: (state) => state.mounted,
  searchOpen: (state) => state.searchOpen,
}

export const actions = {
  closeAllMenus({ dispatch }) {
    return Promise.all([
      dispatch('setCatalogOpen', false),
      dispatch('setDropdownOpenIndex', -1),
      dispatch('setMobileMenuOpen', false),
      dispatch('setSearchOpen', false),
    ])
  },

  setCatalogOpen({ commit, dispatch }, payload) {
    /* Close everything else first */
    commit('SET_DROPDOWN_OPEN_INDEX', -1)
    commit('SET_MOBILE_MENU_OPEN', false)
    commit('SET_SEARCH_OPEN', false)

    commit('SET_CATALOG_OPEN', payload)

    /* Unfix body on catalog close */
    if (!payload) {
      return dispatch('setBodyFixed', false, { root: true })
    }
  },

  setCollapsed({ commit }, payload) {
    commit('SET_COLLAPSED', payload)
  },

  setDropdownOpenIndex({ commit }, payload) {
    commit('SET_DROPDOWN_OPEN_INDEX', payload)
  },

  setFixed({ commit }, payload) {
    commit('SET_FIXED', payload)
  },

  setMobileMenuOpen({ commit, dispatch }, payload) {
    /* Close everything else first */
    commit('SET_CATALOG_OPEN', false)
    commit('SET_DROPDOWN_OPEN_INDEX', -1)
    commit('SET_SEARCH_OPEN', false)

    commit('SET_MOBILE_MENU_OPEN', payload)

    /* Fix/unfix body on menu toggle */
    return dispatch('setBodyFixed', payload, { root: true })
  },

  setMounted({ commit }, payload) {
    commit('SET_MOUNTED', payload)
  },

  setSearchOpen({ commit }, payload) {
    /* Close everything else first */
    commit('SET_CATALOG_OPEN', false)
    commit('SET_DROPDOWN_OPEN_INDEX', -1)
    commit('SET_MOBILE_MENU_OPEN', false)

    commit('SET_SEARCH_OPEN', payload)
  },
}
