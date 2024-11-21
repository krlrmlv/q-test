<template>
  <section class="section-home-contacts">
    <b-container>
      <h2 class="title mb-24 mb-md-48">{{ $t('contacts.title') }}</h2>

      <ContactPageTabs
        v-model="tabIndex"
        :contacts="contacts"
        :tabs="contactGroups"
      />
    </b-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      tabIndex: 0,
    }
  },

  computed: {
    ...mapGetters('geo', ['selectedLocation']),
    ...mapGetters('contacts', ['hasContacts', 'contacts', 'contactGroups']),
  },

  watch: {
    /* Update contacts sort on location change */
    selectedLocation: {
      handler(event) {
        this.handleLocationChange({ event })
      },
    },
  },

  async mounted() {
    if (this.hasContacts) return
    await this.fetchContacts()
  },

  methods: {
    ...mapActions('contacts', ['fetchContacts', 'handleLocationChange']),
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;

  @include media-breakpoint-up(md) {
    font-size: 2.5rem;
  }
}
</style>
