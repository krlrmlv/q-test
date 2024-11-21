export const state = () => ({
  disabledFilters: {},
  isSearch: false,
  loading: false,
  perPage: 24,
  sortBy: 'popular',
  sortModes: [
    { key: 'priceAsc', value: { price: 'asc' } },
    { key: 'priceDesc', value: { price: 'desc' } },
    { key: 'new', value: { novelty: 'desc' } },
    {
      key: 'popular',
      value: {
        to_order: 'desc_nulls_last',
        popularity: 'desc_nulls_last',
      },
    },
    { key: 'abc', value: { name: 'asc' } },
  ],
  viewMode: 'list',
})

export const mutations = {
  SET_DISABLED_FILTERS(state, payload) {
    state.disabledFilters = payload
  },
  SET_IS_SEARCH(state, payload) {
    state.isSearch = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_PER_PAGE(state, payload) {
    state.perPage = Number(payload)
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_VIEW_MODE(state, payload) {
    state.viewMode = payload
  },
}

export const getters = {
  disabledFilters: (state) => state.disabledFilters,
  isSearch: (state) => state.isSearch,
  loading: (state) => state.loading,
  perPage: (state) => state.perPage,
  sortBy: (state, getters) =>
    getters.sortModes?.find(({ key }) => key === state.sortBy) ?? {},
  sortByKey: (state) => state.sortBy,
  sortModes: (state) => {
    const defaultMode = { key: 'default', value: {} }
    return state.isSearch ? [defaultMode, ...state.sortModes] : state.sortModes
  },
  viewMode: (state) => state.viewMode,
}

export const actions = {
  setDisabledFilters({ commit }, payload) {
    commit('SET_DISABLED_FILTERS', payload)
  },

  setIsSearch({ commit }, payload) {
    /* Search results have additional sort mode that is selected by default */
    commit('SET_IS_SEARCH', payload)
    commit('SET_SORT_BY', 'popular')
    if (payload) commit('SET_SORT_BY', 'default')
  },

  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  },

  async setPerPage({ commit }, payload) {
    await this.$cookies.set('catalog-category-per-page', payload, {
      path: '/',
      sameSite: true,
    })
    commit('SET_PER_PAGE', payload)
  },

  setSortBy({ commit }, payload) {
    commit('SET_SORT_BY', payload)
  },

  async setViewMode({ commit }, payload) {
    const viewMode = payload ?? getRandomViewMode()

    await this.$cookies.set('catalog-category-view', viewMode, {
      path: '/',
      sameSite: true,
    })

    commit('SET_VIEW_MODE', viewMode)
  },
}

function getRandomViewMode() {
  const VIEW_MODES = ['list', 'grid']
  const index = Math.round(Math.random())
  return VIEW_MODES[index]
}
