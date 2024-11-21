import CATALOG_MENU_CATEGORIES_QUERY from '@/graphql/catalog/CatalogMenuCategories'

export const state = () => ({
  categories: [],
  currentCategorySlug: '',
  priceRequestProduct: {},
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_CURRENT_CATEGORY_SLUG(state, payload = '') {
    state.currentCategorySlug = payload
  },
  SET_PRICE_REQUEST_PRODUCT(state, payload = {}) {
    state.priceRequestProduct = payload
  },
}

export const getters = {
  categories: (state) => state.categories,

  currentCategorySlug: (state) => state.currentCategorySlug,

  categoryById: (state) => (id) =>
    state.categories?.find(
      (category) => category?.id?.toString() === id.toString()
    ) || {},

  nextCategory: (state) => (slug) => {
    const categories = state.categories
    const siblings = siblingsByField(categories, 'slug', slug)
    if (siblings?.length) {
      const index = siblings.findIndex((category) => category.slug === slug)
      if (index > -1) {
        return siblings[index < siblings.length - 1 ? index + 1 : 0]
      }
    }
    return false
  },

  previousCategory: (state) => (slug) => {
    const categories = state.categories
    const siblings = siblingsByField(categories, 'slug', slug)
    if (siblings?.length) {
      const index = siblings.findIndex((category) => category.slug === slug)
      if (index > -1) {
        return siblings[index > 0 ? index - 1 : siblings.length - 1]
      }
    }
    return false
  },

  priceRequestProduct: (state) => state.priceRequestProduct,
}

export const actions = {
  async fetchCatalog({ commit }) {
    try {
      const { categories } = await this.$graphql.default.request(
        CATALOG_MENU_CATEGORIES_QUERY,
        { locale: this.$i18n.locale }
      )
      commit('SET_CATEGORIES', categories)
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  },
}

function categoryByField(categories, key, value) {
  const stack = []
  let node = {}

  stack.push(...categories)

  while (stack.length > 0) {
    node = stack.pop()
    if (node[key] === value) return node
    else if (node.children && node.children.length) {
      node.children.forEach((child) => stack.push(child))
    }
  }
  return node
}

function siblingsByField(categories, key, value) {
  const category = categoryByField(categories, key, value)
  if (category) {
    const parent = category.parent_id
      ? categoryByField(categories, 'id', category.parent_id)
      : false
    if (parent) return parent.children
    else return categories
  }
  return []
}
