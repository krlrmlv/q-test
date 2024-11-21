<template>
  <div class="tabs">
    <ul class="nav nav-underline">
      <li v-for="(tab, index) in tabs" :key="tab" class="nav-item">
        <b-link
          :class="{ active: index === tabIndex }"
          class="nav-link"
          @click="$emit('update', index)"
        >
          {{ tab }}
        </b-link>
      </li>
    </ul>

    <div class="pt-32 pt-lg-64">
      <b-row class="mx-n12">
        <b-col cols="12" lg="6" xl="4" class="mb-16 px-12 pt-lg-24">
          <transition name="fade" mode="out-in">
            <div :key="`content-${tabIndex}`">
              <h4 class="mb-24">{{ activeTab }}</h4>

              <ul class="list-unstyled mb-0">
                <li
                  v-for="(contact, index) in activeTabContacts"
                  :key="`contact-${tabIndex}-${index}`"
                  class="mb-24"
                  @click="handleContactClick(contact)"
                >
                  <p v-if="contact" class="h6 mb-8">
                    {{ contact.title }}
                  </p>

                  <div
                    v-if="contact && md"
                    class="md-content"
                    v-html="renderMarkdown(contact.description)"
                  />

                  <div v-else class="md-content">
                    <b-skeleton class="mb-8" />
                    <b-skeleton class="mb-8" />
                    <b-skeleton class="w-75 mb-8" />
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </b-col>

        <b-col
          cols="12"
          lg="6"
          xl="7"
          offset-xl="1"
          class="px-0 px-sm-12 pt-lg-24"
        >
          <ContactPageMap
            :contacts="activeTabContacts"
            :selected-contact="selectedContact"
            @clear-selection="handleClearSelection"
            @click-placemark="handlePlacemarkClick"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { mdLight } from '@/utils/markdown'

export default {
  components: { BSkeleton },

  model: {
    prop: 'tabIndex',
    event: 'update',
  },

  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      md: null,
      selectedContact: null,
    }
  },

  computed: {
    activeTab() {
      return this.tabs[this.tabIndex]
    },

    activeTabContacts() {
      return this.contacts[this.tabIndex]?.contacts ?? []
    },
  },

  watch: {
    tabIndex() {
      this.selectedContact = null
    },
  },

  mounted() {
    this.initRenderer()
  },

  methods: {
    async initRenderer() {
      this.md = await mdLight()
    },

    handleClearSelection() {
      this.selectedContact = null
    },

    handleContactClick(contact) {
      if (this.selectedContact && this.selectedContact.id === contact?.id) {
        this.selectedContact = null
      } else {
        this.selectedContact = contact
      }
    },

    handlePlacemarkClick(contact) {
      this.selectedContact = contact
    },

    renderMarkdown(text) {
      if (typeof this.md?.render !== 'function') return text
      return this.md.render(text ?? '')
    },
  },
}
</script>

<style lang="scss" scoped>
.md-content {
  font-size: $font-size-2;
  color: $gray-700;

  ::v-deep {
    a {
      color: inherit;

      &:hover {
        color: $primary;
      }
    }

    p,
    ol,
    ul {
      margin-bottom: 0.5rem;
    }
  }
}

.nav-link {
  font-size: $font-size-4;
}

@include media-breakpoint-down(sm) {
  .nav-underline {
    justify-content: space-between;
  }

  .nav-link {
    font-size: $font-size-2;
  }
}

@include media-breakpoint-up(lg) {
  .nav-underline {
    gap: 4rem;
  }
}

@include media-breakpoint-up(xl) {
  .nav-underline {
    gap: 6rem;
  }
}
</style>
