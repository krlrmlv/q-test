import CONTACT_CATEGORIES_QUERY from '@/graphql/contacts/ContactCategories'

export const state = () => ({
  contacts: [],
  contactGroups: [],
})

export const getters = {
  contacts: (state) => state.contacts,
  contactGroups: (state) => state.contactGroups,
  hasContacts: (state) =>
    Boolean(state.contacts.length && state.contactGroups.length),
}

export const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload
  },
  SET_CONTACT_GROUPS(state, payload) {
    state.contactGroups = payload
  },
}

export const actions = {
  async fetchContacts({ commit, rootGetters }) {
    const { categories } = await this.$graphql.default.request(
      CONTACT_CATEGORIES_QUERY,
      {
        locale: this.$i18n.locale,
      }
    )

    const [firstGroup, ...rest] = categories

    const selectedLocation = rootGetters['geo/selectedLocation']

    const sortedContacts = sortContacts(
      firstGroup?.contacts ?? [],
      selectedLocation
    )

    const contacts = []

    if (firstGroup) {
      firstGroup.contacts = sortedContacts
      contacts.push(firstGroup)
    }

    contacts.push(...rest)

    const contactGroups = categories.map(({ name }) => name)

    commit('SET_CONTACTS', contacts)
    commit('SET_CONTACT_GROUPS', contactGroups)
  },

  handleLocationChange({ commit, getters }, { event }) {
    const [firstGroup, ...rest] = getters.contacts

    const sortedContacts = sortContacts(firstGroup?.contacts ?? [], event)

    const newContacts = []

    if (firstGroup) {
      firstGroup.contacts = sortedContacts
      newContacts.push(firstGroup)
    }

    newContacts.push(...rest)

    commit('SET_CONTACTS', newContacts)
  },
}

/* If `region` has a `contact` assigned, move that contact to the start of array,
 * otherwise return `contacts` as is */
function sortContacts(contacts, region) {
  if (!region?.fias_id || !contacts?.length) return contacts

  const foundIndex = contacts.findIndex(
    (contact) =>
      region.fias_id === contact?.settlement?.fias_id ||
      region.region_fias_id === contact?.settlement?.fias_id
  )

  if (foundIndex < 0) return contacts

  const regionalContact = contacts[foundIndex]
  contacts.splice(foundIndex, 1)
  contacts.unshift(regionalContact)

  return contacts
}
