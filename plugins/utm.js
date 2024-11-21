/**
 ** Parse UTM parameters from URL and save them to store
 **/

export default ({ app: { router }, query, store }, inject) => {
  /* Parameters to track */
  const PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_name',
    'utm_term',
    'initial_utm_source',
    'initial_utm_medium',
    'initial_utm_campaign',
    'initial_utm_content',
    'initial_utm_name',
    'initial_utm_term',
    'yclid',
    'ysclid',
  ]

  /* Create vuex module */
  store.registerModule('utm', {
    namespaced: true,
    state: () => ({
      params: {},
    }),
    mutations: {
      SET_PARAMS(state, payload) {
        state.params = payload
      },
    },
    actions: {
      setParams({ commit }, payload) {
        commit('SET_PARAMS', payload)
      },
    },
  })

  const utm = {
    /* Parse parameters from query object */
    parse(q = query) {
      const result = {}
      PARAMS.forEach((param) => {
        if (q[param]) {
          result[param] = q[param]
        }
      })
      return result
    },

    /* Update saved parameters with new ones */
    save(newParams) {
      const savedParams = this.get()
      const joinedParams = Object.assign(savedParams, newParams)
      store.dispatch('utm/setParams', joinedParams)
    },

    /* Get parameters from store */
    get() {
      return store.state.utm.params || {}
    },
  }

  /* Save parameters on each route change */
  router.afterEach((route) => {
    utm.save(utm.parse(route.query))
  })

  inject('utm', utm)
}
