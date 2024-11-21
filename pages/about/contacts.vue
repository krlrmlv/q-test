<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 mb-24 mb-lg-40">{{ $t('title') }}</h1>

      <b-row>
        <b-col cols="12" lg="5" xl="4" order-lg="1">
          <ContactPageSummary
            :groups="contactGroups"
            class="mb-64 mb-lg-40"
            @click:group="handleGroupClick"
          />

          <ContactPageSocialLinks class="mb-64 mb-lg-80" />
        </b-col>

        <b-col cols="12" lg="7" offset-xl="1" order-lg="2" class="mb-40">
          <ContactPageSupport />
        </b-col>
      </b-row>
    </b-container>

    <section ref="content" class="bg-gray-100 pt-40 py-lg-56">
      <b-container>
        <ContactPageTabs
          v-model="tabIndex"
          :contacts="contacts"
          :tabs="contactGroups"
        />
      </b-container>
    </section>

    <ContactPageFeedback />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      breadcrumbs: [{ text: 'about.contacts', active: true }],
      tabIndex: 0,
    }
  },

  head() {
    return {
      title: this.$t('meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('meta.keywords'),
        },
      ],
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

    /* Activate tab with provided index and scroll to the tab container */
    handleGroupClick(index) {
      const contentEl = this.$refs.content

      const top = contentEl?.getBoundingClientRect()?.top

      if (process.client && top) {
        window.scrollTo({ top, behavior: 'smooth' })
      }

      this.tabIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  h2,
  .h2 {
    font-size: 2rem;
  }

  ::v-deep {
    h3,
    .h3 {
      font-size: 1.75rem;
    }

    h4,
    .h4 {
      font-size: 1.375rem;
    }

    h6,
    .h6 {
      font-size: 1rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "meta": {
      "description": "Contacts information for ekfgroup.com website",
      "keywords": "contacts information website",
      "title": "Contacts"
    },
    "title": "Contacts"
  },
  "ru": {
    "meta": {
      "description": "Контактная информация на сайте ekfgroup.com",
      "keywords": "Контакты информация сайт",
      "title": "Контакты"
    },
    "title": "Контакты"
  }
}
</i18n>
