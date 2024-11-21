import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'
import LIGHTNING_PROTECTION from '@/graphql/calculators/masterkupol/LightningProtection'
import { flattenObj } from '~/utils/flattenObj'

export const state = () => ({
  buildingData: {
    height: 0,
    length: 0,
    width: 0,
    zone: null,
  },
  cart: [],
  gridData: {
    additionalChimneyConductors: 0,
    additionalConductors: 0,
    chimneys: null,
    conductorType: 'd8',
    constructions: null,
    drainpipes: null,
    mountingMethod: 'above',
    pitchAngle: 0,
    protectionCategory: 2,
    roofMaterial: 'tiling',
    wallMaterial: 'concrete',
  },
  groundingData: {
    electrodeType: 'vertical',
    groundType: 'loam',
    resistance: 10,
  },
  protectionMethod: 'grid',
  rodData: {
    additionalChimneyConductors: null,
    additionalConductors: null,
    conductorType: null,
    coordX: 0,
    coordY: 0,
    lightning_rod_height: 0,
    protectionCategory: null,
    reliability: 0.9,
    wallMaterial: null,
  },
  rodDataDefaults: {
    ridge: {
      additionalChimneyConductors: 0,
      additionalConductors: 0,
    },
    wall: {
      conductorType: 'rod',
      protectionCategory: 1,
      wallMaterial: 'concrete',
    },
  },
  rodType: null,
  roofType: null,
})

export const getters = {
  buildingData: (state) => state.buildingData,
  cart: (state) => state.cart,
  gridData: (state) => state.gridData,
  groundingData: (state) => state.groundingData,
  protectionMethod: (state) => state.protectionMethod,
  rodData: (state) => state.rodData,
  rodType: (state) => state.rodType,
  roofType: (state) => state.roofType,
}

export const mutations = {
  SET_BUILDING_DATA(state, payload) {
    state.buildingData = payload
  },
  SET_CART(state, payload) {
    state.cart = payload
  },
  SET_GRID_DATA_FIELD(state, [value, field]) {
    state.gridData[field] = value
  },
  SET_GROUNDING_DATA_FIELD(state, [value, field]) {
    state.groundingData[field] = value
  },
  SET_PROTECTION_METHOD(state, payload) {
    state.protectionMethod = payload
  },
  SET_ROD_DATA_FIELD(state, [value, field]) {
    state.rodData[field] = value
  },
  SET_ROD_TYPE(state, payload) {
    state.rodType = payload

    /** reset all rod data fields that have default values
     ** based on selected rod type */
    const nullableFields = Object.values(state.rodDataDefaults)
      .map((obj) => Object.keys(obj))
      .reduce((acc, cur) => {
        acc.push(...cur)
        return acc
      }, [])
    nullableFields.forEach((key) => {
      state.rodData[key] = null
    })

    /** then set default values for selected rod type */
    const defaults = state.rodDataDefaults[payload]
    if (defaults) {
      Object.keys(defaults).forEach((key) => {
        state.rodData[key] = defaults[key]
      })
    }
  },
  SET_ROOF_TYPE(state, payload) {
    state.roofType = payload
  },
}

export const actions = {
  clearCart({ commit }) {
    commit('SET_CART', [])
  },
  setBuildingData({ commit }, payload) {
    commit('SET_BUILDING_DATA', payload)
  },
  setGridDataField({ commit }, payload) {
    const [value, field] = payload
    if (field === 'protectionCategory') {
      value < 3
        ? commit('SET_GROUNDING_DATA_FIELD', [10, 'resistance'])
        : commit('SET_GROUNDING_DATA_FIELD', [20, 'resistance'])
    }
    commit('SET_GRID_DATA_FIELD', payload)
  },
  setGroundingDataField({ commit }, payload) {
    commit('SET_GROUNDING_DATA_FIELD', payload)
  },
  setProtectionMethod({ commit }, payload) {
    payload === 'grid'
      ? commit('SET_ROOF_TYPE', null)
      : commit('SET_ROOF_TYPE', 'flat')
    commit('SET_PROTECTION_METHOD', payload)
  },
  setRodDataField({ commit }, payload) {
    const [value, field] = payload
    if (field === 'protectionCategory') {
      value < 3
        ? commit('SET_GROUNDING_DATA_FIELD', [10, 'resistance'])
        : commit('SET_GROUNDING_DATA_FIELD', [20, 'resistance'])
    }
    commit('SET_ROD_DATA_FIELD', payload)
  },
  setRodType({ commit }, payload) {
    commit('SET_ROD_TYPE', payload)
  },
  setRoofType({ commit }, payload) {
    commit('SET_ROOF_TYPE', payload)
  },
  async fetchCart({ commit, state }) {
    const flatData = flattenObj(state)
    const dataSnakeCase = mapKeys(flatData, (value, key) => snakeCase(key))

    const { ekfgroup_lightning_protection_calculate } =
      await this.$graphql.default.request(LIGHTNING_PROTECTION, dataSnakeCase)

    commit(
      'SET_CART',
      cartPlaceholder1.map((el) => ({
        name: el.name,
        products: ekfgroup_lightning_protection_calculate
          .filter((product) => product.group === el.group)
          .map((product) => ({
            group: product.group,
            name: product.product.catalog_products[0].name,
            image: product.product.catalog_products[0].image,
            quantity: Math.ceil(product.qty),
            product_id: product.product_id,
            vendor_code: product.vendor_code,
            slug: product.product.catalog_products[0].slug,
            unit_storage: product.product.catalog_products[0].unit_storage,
          })),
      }))
    )
  },
}

const cartPlaceholder1 = [
  {
    name: 'Молниеприемная сетка',
    group: 'lightningReceivingGrid',
  },
  {
    name: 'Токоотводы (спуски по фасаду)',
    group: 'currentCollectors',
  },
  {
    name: 'Заземлитель',
    group: 'grounding',
  },
  {
    name: 'Молниеприемник',
    group: 'lightningReceiver',
  },
]
