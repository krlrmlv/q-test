import SOLUTIONS_CATEGORIES_QUERY from '@/graphql/solutions/SolutionsMenuCategories'

export const state = () => ({
  categories: [],

  currentCategory: undefined,
})

export const getters = {
  categories: (state) => state.categories,

  currentCategory: (state) => state.currentCategory,

  currentCategoryMetrikaGoal: (state) => state.currentCategory?.metrika_goal,
}

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },

  SET_CURRENT_CATEGORY(state, payload) {
    state.currentCategory = payload
  },
}

export const actions = {
  async fetchCategories({ commit }) {
    const { categories } = await this.$graphql.default.request(
      SOLUTIONS_CATEGORIES_QUERY,
      { locale: this.$i18n.locale }
    )
    commit('SET_CATEGORIES', categories)
  },

  setCurrentCategory({ commit }, payload) {
    commit('SET_CURRENT_CATEGORY', payload)
  },
}
