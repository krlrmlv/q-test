import DEFAULT_CITIES from '@/graphql/geo/DefaultCities'

const DEFAULT_CITIES_FIAS_IDS = [
  '0c5b2444-70a0-4932-980c-b4dc0d3f02b5', // Moscow
  'c2deb16a-0330-4f05-821f-1d09c93331e6', // SPb
  '8dea00e3-9aab-4d8e-887c-ef2aaa546456', // Novosibirsk
  '2763c110-cb8b-416a-9dac-ad28a55b4402', // Yekaterinburg
  'c1cfe4b9-f7c2-423c-abfa-6ed1c05a15c5', // Rostov-on-Don
  '555e7d61-d9a7-4ba6-9770-6caa8198c483', // Nizhny Novgorod
  'a376e68d-724a-4472-be7c-891bdb09ae32', // Chelyabinsk
  '7dfa745e-aa19-4688-b121-b655c11e482f', // Krasnodar
  'a309e4ce-2f36-4106-b1ca-53e0f48a6d95', // Perm
  '5bf5ddff-6353-4a3d-80c4-6fb27f00c6c1', // Voronezh
  'bb035cc3-1dc2-4627-9d25-a1bf2d4b936b', // Samara
  'b9a43610-5c01-4ba8-8de7-95facc7e460d', // Oktyabrsk
  '93b3df57-4c89-44df-ac42-96f05e9cd3b9', // Kazan
  'a52b7389-0cfe-46fb-ae15-298652a64cf8', // Volgograd
]

/** Regions fias_id of the Far Eastern Federal District.
 * These IDs are needed to display information about
 * the sales representative on the contacts page
 *  if selectedLocation is located in these regions
 */
const DFO_REGIONS_FIAS_IDS = [
  '6466c988-7ce3-45e5-8b97-90ae16cb1249', // Irkutsk region
  'a84ebed3-153d-4ba9-8532-8bdf879e1f5a', // The Republic of Buryatia
  'b6ba5716-eb48-401b-8443-b197c9578734', // Transbaikal region
  'c225d3db-1db6-4063-ace0-b3fe9ea3805f', // The Republic of Sakha / Yakutia
]

/** These cities are federal and do not have a region,
 * but we need it to display the block In your region
 * in the CatalogProductStockModalPartner */
const FEDERAL_CITIES_REGION = {
  // 'Moscow': 'Moscow region'
  '0c5b2444-70a0-4932-980c-b4dc0d3f02b5':
    '29251dcf-00a1-4e34-98d4-5c47484a36d4',
  // 'Saint-Petersburg': 'Leningrad region'
  'c2deb16a-0330-4f05-821f-1d09c93331e6':
    '6d1ebb35-70c6-4129-bd55-da3969658f5d',
  // 'Sevastopol': 'Republic of Crimea'
  '6fdecb78-893a-4e3f-a5ba-aa062459463b':
    'bd8e6511-e4b9-4841-90de-6bbc231a789e',
}

const COOKIE_NAME = 'location_saved'

const MOSCOW_FIAS_ID = '0c5b2444-70a0-4932-980c-b4dc0d3f02b5'

const FALLBACK_LOCATION_MOSCOW = {
  name: 'Москва',
  type: 'город',
  type_short: 'г',
  fias_id: MOSCOW_FIAS_ID,
  region_fias_id: FEDERAL_CITIES_REGION.MOSCOW_FIAS_ID,
  region_name: 'Московская',
  region_type: 'обл',
  source: 'fallback',
}

export const state = () => ({
  defaultLocations: [],
  loadingLocation: false,
  loadingDefaultLocations: false,
  selectedLocation: {},
})

export const mutations = {
  SET_DEFAULT_LOCATIONS(state, payload) {
    state.defaultLocations = payload
  },

  SET_LOADING_LOCATION(state, payload) {
    state.loadingLocation = payload
  },

  SET_LOADING_DEFAULT_LOCATIONS(state, payload) {
    state.loadingDefaultLocations = payload
  },

  SET_SELECTED_LOCATION(state, payload) {
    if (!payload?.region_fias_id) {
      /** Try to set region_fias_id if city fias_id has match in FEDERAL_CITIES_REGION */

      payload.region_fias_id = FEDERAL_CITIES_REGION[payload?.fias_id] ?? ''
    }

    state.selectedLocation = payload
  },
}

export const getters = {
  loading: (state) => state.loadingLocation || state.loadingDefaultLocations,

  locationName: (_) => (region) => {
    let name = region?.name ?? ''
    const regionType = region?.type?.toLowerCase() ?? ''

    if (regionType && regionType !== 'город') name += ` ${regionType}`

    return name
  },

  defaultLocations: (state) => state.defaultLocations,

  isDFORegionSelected: (state) => {
    return DFO_REGIONS_FIAS_IDS.includes(state.selectedLocation.region_fias_id)
  },

  selectedLocation: (state) => state.selectedLocation,

  selectedLocationName: (state, getters) =>
    getters.locationName(state.selectedLocation),
}

export const actions = {
  async getClientLocation({ dispatch, rootState, state }) {
    const clientIp = rootState.clientIp

    if (clientIp === '127.0.0.1') {
      return dispatch('setSelectedLocation', FALLBACK_LOCATION_MOSCOW)
    }

    let location = this.$cookies.get(COOKIE_NAME) || {}

    if (!isValidCookieLocation(location)) {
      await dispatch('setLoadingLocation', true)

      location = await getLocationByIp({ clientIp, axios: this.$axios })

      await dispatch('setLoadingLocation', false)
      return dispatch('setSelectedLocation', location)
    } else if (!state.selectedLocation?.fias_id) {
      return dispatch('setSelectedLocation', location)
    }
  },

  async fetchDefaultLocations({ dispatch }) {
    let payload = []

    await dispatch('setLoadingDefaultLocations', true)

    try {
      const { default_cities } = await this.$graphql.default.request(
        DEFAULT_CITIES,
        { fias_ids: DEFAULT_CITIES_FIAS_IDS }
      )

      payload = default_cities
    } catch (error) {}

    await dispatch('setLoadingDefaultLocations', false)
    return dispatch('setDefaultLocations', payload)
  },

  setLoadingLocation({ commit }, payload) {
    commit('SET_LOADING_LOCATION', payload)
  },

  setLoadingDefaultLocations({ commit }, payload) {
    commit('SET_LOADING_DEFAULT_LOCATIONS', payload)
  },

  setDefaultLocations({ commit, state }, locations) {
    commit('SET_DEFAULT_LOCATIONS', locations)
  },

  setSelectedLocation({ commit }, location) {
    if (!location?.fias_id) location = FALLBACK_LOCATION_MOSCOW

    commit('SET_SELECTED_LOCATION', location)

    try {
      this.$cookies.set(COOKIE_NAME, location, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: true,
      })
    } catch (error) {
      /* Skip "Cannot set headers after they are sent to the client" */
    }
  },
}

/** Utils */
const isValidCookieLocation = (location) => {
  return (
    location?.fias_id &&
    location?.region_fias_id &&
    location?.source !== 'fallback'
  )
}

const getLocationByIp = async ({ clientIp, axios }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REST_API_URL}/get-location-by-ip`,
      { clientIp }
    )

    if (data?.data?.fias_id) return buildLocation(data.data)
  } catch (error) {}

  return FALLBACK_LOCATION_MOSCOW
}

const buildLocation = (data) => {
  return {
    name: data?.city,
    fias_id: data?.fias_id,
    type: data?.city_type_full,
    type_short: data?.city_type,
    region_name: data?.region ?? '',
    region_fias_id:
      FEDERAL_CITIES_REGION[data?.fias_id] ?? data?.region_fias_id ?? '',
    region_type: data?.region_type_full ?? '',
    region_type_short: data?.region_type ?? '',
    source: 'DaData',
  }
}
