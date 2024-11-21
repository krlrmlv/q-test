import INIT_QUERY from '@/graphql/Init'
import FILES_SETTINGS_QUERY from '@/graphql/FilesSettings'

export const state = () => ({
  bodyFixed: false,
  bodyFixedOffset: 0,
  clientIp: null,
  languages: [],
  selectedLanguage: {},
  settings: [],
})

export const mutations = {
  SET_BODY_FIXED(state, payload) {
    state.bodyFixed = payload
  },
  SET_BODY_FIXED_OFFSET(state, payload) {
    state.bodyFixedOffset = payload
  },
  SET_CLIENT_IP(state, payload) {
    state.clientIp = payload
  },
  SET_LANGUAGES(state, languages) {
    state.languages = languages
  },
  SET_SETTINGS(state, settings) {
    state.settings = settings
  },
  SET_SELECTED_LANGUAGE(state, code) {
    state.selectedLanguage =
      state.languages?.find((language) => language.code === code) || {}
  },
}

export const getters = {
  bodyFixed: (state) => state.bodyFixed,
  clientIp: (state) => state.clientIp,
  settingByKey: (state) => (settingKey) =>
    state.settings?.find(({ key }) => key === settingKey)?.value || null,
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    /* Get client IP from initial request and save it to store
     * for geolocation */
    await dispatch('setClientIp', req)

    await Promise.all([
      dispatch('fetchSettings'),
      dispatch('catalog/fetchCatalog'),
    ])
  },

  async fetchSettings({ commit }) {
    try {
      const variables = { locale: this.$i18n.locale }

      const { languages, layouts } = await this.$graphql.default.request(
        INIT_QUERY,
        variables
      )

      commit('layouts/SET_LAYOUTS', layouts)
      commit('SET_LANGUAGES', languages)
      commit('SET_SELECTED_LANGUAGE', this.$i18n.locale)
    } catch (error) {}
  },

  async fetchFilesSettings({ commit }) {
    try {
      const { settings } = await this.$graphql.default.request(
        FILES_SETTINGS_QUERY
      )

      commit('SET_SETTINGS', settings)
    } catch (error) {}
  },

  setBodyFixed({ commit }, payload) {
    commit('SET_BODY_FIXED', payload)
  },

  setBodyFixedOffset({ commit }, payload) {
    commit('SET_BODY_FIXED_OFFSET', payload)
  },

  setClientIp({ commit }, req) {
    const clientIp =
      req?.headers?.['x-forwarded-for']?.split(',')?.pop().trim() ||
      req?.connection?.remoteAddress ||
      req?.socket?.remoteAddress
    commit('SET_CLIENT_IP', clientIp)
  },
}
