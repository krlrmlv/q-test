export const state = () => ({
  searchHistoryItems: [],
})

export const getters = {
  searchHistoryItems: (state) => state.searchHistoryItems,
}

export const mutations = {
  SET_SEARCH_HISTORY_ITEMS(state, payload) {
    if (payload?.length > 6) payload.length = 6
    state.searchHistoryItems = payload
  },
}

export const actions = {
  async addSearchHistoryItem({ commit }, payload) {
    if (!payload?.length) return

    const items = await getSearchHistory()

    if (items?.includes(payload)) return

    items.unshift(payload)

    await storeSearchHistory(items)
    commit('SET_SEARCH_HISTORY_ITEMS', items)
  },

  async clearSearchHistory({ commit }) {
    await storeSearchHistory([])
    commit('SET_SEARCH_HISTORY_ITEMS', [])
  },

  async deleteSearchHistoryItem({ commit }, payload) {
    const items = await getSearchHistory()
    const index = items.findIndex((item) => item === payload)
    items.splice(index, 1)
    await storeSearchHistory(items)
    commit('SET_SEARCH_HISTORY_ITEMS', items)
  },

  async loadSearchHistory({ commit }) {
    const items = await getSearchHistory()
    commit('SET_SEARCH_HISTORY_ITEMS', items)
  },
}

async function getSearchHistory() {
  if (!process.client) return []
  const items = await JSON.parse(localStorage.getItem('searchHistoryItems'))
  return items || []
}

async function storeSearchHistory(payload) {
  if (!process.client) return
  if (payload?.length > 6) payload.length = 6
  await localStorage.setItem('searchHistoryItems', JSON.stringify(payload))
}
