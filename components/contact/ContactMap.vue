<template>
  <b-container ref="contactsWrapper">
    <h1 class="h2 mb-32 mb-lg-64">{{ $t('contacts.title') }}</h1>

    <slot />

    <b-row>
      <b-col lg="7" xl="8" order-lg="2" class="px-0 px-lg-12">
        <div class="embed-responsive embed-responsive-3by2 mb-32 mb-lg-0">
          <template v-if="mapIsIntersecting">
            <client-only>
              <YMap
                :coords="[54.62896654088406, 39.731893822753904]"
                :controls="['zoomControl']"
                :scroll-zoom="true"
                :placemarks="placeMarks"
                :zoom="3.4"
                class="embed-responsive-item"
              />
            </client-only>
          </template>

          <div v-else class="embed-responsive-item bg-gray-200" />
        </div>
      </b-col>

      <b-col lg="5" xl="4" order-lg="1">
        <ContactCollapse
          v-for="(contact, index) in contacts"
          :key="index"
          :contact="contact"
          :visible="index === 0"
          accordion="contacts"
          class="mb-32"
          appear
          @toggle-collapse="selectContact(contact)"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import YMap from '@/components/contact/YMap'
import CONTACTS_QUERY from '@/graphql/contacts/Contacts'

export default {
  components: { YMap },

  data() {
    return {
      contacts: [],
      mapIsIntersecting: false,
      selected: {},
    }
  },

  async fetch() {
    const { contacts } = await this.$graphql.default.request(CONTACTS_QUERY, {
      locale: this.$i18n.locale,
    })
    this.contacts = contacts
    this.setRegionalContact()
  },

  computed: {
    ...mapGetters('geo', ['selectedLocation']),

    placeMarks() {
      if (this.selected?.title) {
        const { address, location, phone, title } = this.selected
        return [
          {
            address,
            clusterName: 'EKF',
            coords: location.split(','),
            options: {
              iconImageHref: '/images/map-point-new.png',
              iconImageSize: [48, 45],
              iconLayout: 'default#image',
            },
            phone,
            properties: {
              hintContent: `<div><strong>${title}</strong></div>`,
            },
            title,
          },
        ]
      }
      return this.contacts.map((contact, index) => ({
        address: contact.address,
        clusterName: 'EKF',
        id: index + 1,
        coords: contact.location.split(','),
        options: {
          iconImageHref: '/images/map-point-new.png',
          iconImageSize: [48, 45],
          iconLayout: 'default#image',
        },
        phone: contact.phone,
        properties: {
          hintContent: `<div><strong>${contact.title}</strong></div>`,
        },
        title: contact.title,
      }))
    },
  },

  watch: {
    selectedLocation: {
      deep: true,
      immediate: true,
      handler(event) {
        this.setRegionalContact(event)
      },
    },
  },

  mounted() {
    this.setObserver()
  },

  methods: {
    selectContact(contact) {
      this.selected = contact
    },

    setObserver() {
      if ('IntersectionObserver' in window) {
        const contactsWrapper = this.$refs.contactsWrapper
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.mapIsIntersecting = true
            observer.unobserve(entry.target)
          }
        })

        observer.observe(contactsWrapper)
      } else {
        /* Init map immediately if intersectionObserver is not supported */
        this.mapIsIntersecting = true
      }
    },

    setRegionalContact(region = this.selectedLocation) {
      if (!region?.id) return

      const foundIndex = this.contacts.findIndex(
        ({ settlement_id }) =>
          region.id === settlement_id ||
          region?.parents
            ?.map(({ parent_id }) => parent_id)
            ?.includes(settlement_id)
      )

      if (foundIndex >= 0) {
        const regionalContact = { ...this.contacts[foundIndex] }
        this.contacts.splice(foundIndex, 1)
        this.contacts.unshift(regionalContact)

        this.selected = regionalContact
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .ymap-body {
    height: 100%;
  }
}
</style>
