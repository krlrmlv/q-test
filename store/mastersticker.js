export const state = () => ({
  locale: undefined,

  step: 1,
  rails: [],
  moduleWidth: 17.8,
  headerHeight: 25,
  printHeader: true,
  groups: [
    { id: 0, color: '#ffffff' },
    { id: 1, color: '#757e8f' },
    { id: 2, color: '#df4e4e' },
    { id: 3, color: '#df4e4e' },
    { id: 4, color: '#a85c91' },
    { id: 5, color: '#00a9bf' },
    { id: 6, color: '#ff9900' },
    { id: 7, color: '#65b048' },
    { id: 8, color: '#a85c91' },
    { id: 9, color: '#3399ff' },
    { id: 10, color: '#00a9bf' },
    { id: 11, color: '#ff9900' },
    { id: 12, color: '#65b048' },
    { id: 13, color: '#df4e4e' },
    { id: 14, color: '#ffbf42' },
    { id: 15, color: '#a1e07c' },
    { id: 16, color: '#f0acac' },
  ],
  icons: [
    { name: null, label: 'empty' },
    { name: 'coffee-machine', label: 'coffeeMachine' },
    { name: 'pc', label: 'pc' },
    { name: 'conditioner', label: 'conditioner' },
    { name: 'cooking-panel', label: 'cookingPanel' },
    { name: 'dishwasher', label: 'dishwasher' },
    { name: 'exhaust', label: 'exhaust' },
    { name: 'fan', label: 'fan' },
    { name: 'fridge', label: 'fridge' },
    { name: 'iron', label: 'iron' },
    { name: 'kettle', label: 'kettle' },
    { name: 'lamp', label: 'lamp' },
    { name: 'lighting', label: 'lighting' },
    { name: 'microwave', label: 'microwave' },
    { name: 'mixer', label: 'mixer' },
    { name: 'oven', label: 'oven' },
    { name: 'power-socket', label: 'powerSocket' },
    { name: 'router', label: 'router' },
    { name: 'shower', label: 'shower' },
    { name: 'sockets', label: 'sockets' },
    { name: 'soundsystem', label: 'soundsystem' },
    { name: 'tv', label: 'tv' },
    { name: 'usb', label: 'usb' },
    { name: 'washing-machine', label: 'washingMachine' },
  ],
  moduleTypes: [
    { id: 'spacer', symbol: null },
    { id: 'default', symbol: null },
    { id: 'loadBreakSwitch', symbol: 'QS' },
    { id: 'automat', symbol: 'QF' },
    { id: 'rccb', symbol: 'QFD' },
    { id: 'rcd', symbol: 'QD' },
    { id: 'relayVoltage', symbol: 'KV' },
    { id: 'vaMeter', symbol: 'PAV' },
    { id: 'meter', symbol: 'WH' },
    { id: 'reversibleSwitch', symbol: 'SA' },
    { id: 'lamp', symbol: 'HL' },
    { id: 'relayTime', symbol: 'KT' },
    { id: 'relayTwilight', symbol: 'KL' },
    { id: 'relayImpulse', symbol: 'KI' },
    { id: 'panelSocket', symbol: 'XS' },
    { id: 'contactor', symbol: 'KM' },
    { id: 'fuse', symbol: 'F' },
    { id: 'surgeProtection', symbol: 'QVR' },
  ],
})

export const getters = {
  locale: (state) => state.locale,

  step: (state) => state.step,
  rails: (state) => state.rails,
  moduleWidth: (state) => state.moduleWidth,
  headerHeight: (state) => state.headerHeight,
  printHeader: (state) => state.printHeader,

  groups: (state) => state.groups,
  groupById: (state) => (groupId) => {
    const group = state.groups.find(({ id }) => id === groupId)
    return group || state.groups[0]
  },
  groupColor: (_, getters) => (groupId) => {
    return getters.groupById(groupId).color
  },
  groupCustomText: (_, getters) => (groupId) => {
    return getters.groupById(groupId).customText || null
  },
  icons: (state) => state.icons,
  iconByName: (state) => (iconName) => {
    const icon = state.icons.find(({ name }) => name === iconName)
    return icon || state.icons[0]
  },
  iconLabel: (_, getters) => (iconName) => {
    return getters.iconByName(iconName).label
  },
  moduleTypes: (state) => state.moduleTypes,
  moduleTypeById: (state) => (moduleTypeId) => {
    const moduleType = state.moduleTypes.find(({ id }) => id === moduleTypeId)
    return moduleType || state.moduleTypes[1]
  },
  moduleTypeCustomText: (_, getters) => (moduleTypeId) => {
    return getters.moduleTypeById(moduleTypeId).customText || null
  },
  moduleTypeIsCustom: (_, getters) => (moduleTypeId) => {
    return !!getters.moduleTypeById(moduleTypeId).customText
  },
  moduleTypeSymbol: (_, getters) => (moduleTypeId) => {
    return getters.moduleTypeById(moduleTypeId).symbol || ''
  },
}

export const mutations = {
  SET_LOCALE(state, payload) {
    state.locale = payload
  },

  ADD_RAIL(state) {
    const rail = railDefault()
    state.rails.push(rail)
  },
  UPDATE_RAIL(state, payload) {
    const { railIndex, field, value, oldValue } = payload
    state.rails[railIndex][field] = value

    if (field === 'width') {
      if (value > oldValue) {
        for (let i = oldValue; i < value; i++) {
          state.rails[railIndex].modules.push(moduleDefault())
        }
      } else if (value < oldValue) {
        state.rails[railIndex].modules.splice(value)
      }
    }
  },
  REMOVE_RAIL(state, index) {
    state.rails.splice(index, 1)
  },
  CLEAR_RAILS(state) {
    const rail = railDefault()
    state.rails = [rail]
  },
  ADD_MODULE(state, { module, railIndex }) {
    state.rails[railIndex].modules.push(module)
  },
  MOVE_MODULE(state, payload) {
    const { index, newIndex, railIndex } = payload
    const modules = state.rails[railIndex].modules
    const moduleToSwap = modules[newIndex]
    const moduleToMove = modules[index]
    modules.splice(index, 1, moduleToSwap)
    modules.splice(newIndex, 1, moduleToMove)
  },
  REMOVE_MODULE(state, payload) {
    const { index, railIndex } = payload
    state.rails[railIndex].modules.splice(index, 1)
  },
  SET_MODULE_PARAMETERS(state, payload) {
    const { index, railIndex, field, value } = payload
    const module = state.rails[railIndex].modules[index]
    module[field] = value
    if (field === 'moduleType') {
      module.width = forceWidth(module)
    }
  },
  ADD_GROUP(state, payload) {
    const customIndices = state.groups
      .filter(({ id }) => id.toString().includes('custom'))
      .map(({ id }) => parseInt(id.toString().replace('custom', '')))

    const id = `custom${Math.max(...customIndices, -1) + 1}` // if no custom groups found, start numbering from 0
    state.groups.push({ ...payload, id })
  },
  UPDATE_GROUP(state, { id, color, customText }) {
    const group = state.groups.find((group) => group.id === id)
    if (group) {
      group.color = color
      group.customText = customText
    }
  },
  DELETE_GROUP(state, id) {
    const index = state.groups.findIndex((item) => item.id === id)
    if (index > -1) {
      state.groups.splice(index, 1)
    }
  },
  ADD_MODULE_TYPE(state, payload) {
    const customIndices = state.moduleTypes
      .filter(({ id }) => id.toString().includes('custom'))
      .map(({ id }) => parseInt(id.toString().replace('custom', '')))

    const id = `custom${Math.max(...customIndices, -1) + 1}` // if no custom devices found, start numbering from 0
    state.moduleTypes.push({ ...payload, id })
  },
  UPDATE_MODULE_TYPE(state, { id, symbol, customText }) {
    const moduleType = state.moduleTypes.find(
      (moduleType) => moduleType.id === id
    )
    if (moduleType) {
      moduleType.symbol = symbol
      moduleType.customText = customText
    }
  },
  DELETE_MODULE_TYPE(state, id) {
    const index = state.moduleTypes.findIndex((item) => item.id === id)
    if (index > -1) {
      state.moduleTypes.splice(index, 1)
    }
  },
  SET_STEP(state, payload) {
    state.step = payload
  },
  SET_HEADER_HEIGHT(state, payload) {
    state.headerHeight = payload
  },
  SET_PRINT_HEADER(state, payload) {
    state.printHeader = payload
  },
}

export const actions = {
  setLocale({ commit }, payload) {
    commit('SET_LOCALE', payload)
  },

  addRail({ commit }) {
    commit('ADD_RAIL')
  },
  updateRail({ commit }, payload) {
    commit('UPDATE_RAIL', payload)
  },
  removeRail({ commit }, index) {
    commit('REMOVE_RAIL', index)
  },
  clearRails({ commit }) {
    commit('CLEAR_RAILS')
    commit('SET_HEADER_HEIGHT', 25)
    commit('SET_PRINT_HEADER', true)
    commit('SET_STEP', 1)
  },
  addModule({ commit }, payload) {
    const { moduleType, railIndex } = payload
    const module = moduleDefault(0.5)
    module.moduleType = moduleType
    module.width = forceWidth(module)
    commit('ADD_MODULE', { module, railIndex })
  },
  moveModule({ commit }, payload) {
    commit('MOVE_MODULE', payload)
  },
  removeModule({ commit }, payload) {
    commit('REMOVE_MODULE', payload)
  },
  updateModuleParameters({ commit }, payload) {
    commit('SET_MODULE_PARAMETERS', payload)
  },
  updateGroup({ commit }, payload) {
    if (payload.id) commit('UPDATE_GROUP', payload)
    else commit('ADD_GROUP', payload)
  },
  deleteGroup({ commit }, id) {
    commit('DELETE_GROUP', id)
  },
  updateModuleType({ commit }, payload) {
    if (payload.id) commit('UPDATE_MODULE_TYPE', payload)
    else commit('ADD_MODULE_TYPE', payload)
  },
  deleteModuleType({ commit }, id) {
    commit('DELETE_MODULE_TYPE', id)
  },
  setStep({ commit }, payload) {
    commit('SET_STEP', payload)
  },
  setHeaderHeight({ commit }, payload) {
    commit('SET_HEADER_HEIGHT', payload)
  },
  setPrintHeader({ commit }, payload) {
    commit('SET_PRINT_HEADER', payload)
  },
}

function moduleDefault(width = 1) {
  return {
    moduleType: 'default',
    width,
    heading: null,
    description: null,
    moduleGroup: 1,
    noIcon: false,
    label: null,
    room: null,
    combine: false,
    moduleIcon: null,
    accent: false,
    reverseTogglePositions: [
      {
        id: 1,
        label: 'calculators.masterSticker.position1',
        text: 'calculators.masterSticker.position1Short',
        name: 'I',
        groupId: 1,
        icon: 'fridge',
      },
      {
        id: 0,
        label: 'calculators.masterSticker.positionOff',
        text: 'calculators.masterSticker.positionOffShort',
        name: '0',
        groupId: 0,
      },
      {
        id: 2,
        label: 'calculators.masterSticker.position2',
        text: 'calculators.masterSticker.position2Short',
        name: 'I',
        groupId: 4,
        icon: 'tv',
      },
    ],
    lampColors: [
      { text: 'A', value: '#ffdd00' },
      { text: 'B', value: '#00cc00' },
      { text: 'C', value: '#dd0000' },
    ],
  }
}

function railDefault() {
  const rail = {
    width: 12,
    height: 25,
    isReversed: false,
    modules: [],
  }
  for (let i = 0; i < 12; i++) {
    rail.modules.push(moduleDefault())
  }
  return rail
}

function forceWidth(module) {
  if (module.moduleType === 'reversibleSwitch' && module.width !== 4) {
    return 4
  }
  if (module.moduleType === 'lamp' && module.width !== 0.5) {
    return 0.5
  } else {
    return module.width
  }
}
