<template>
  <div ref="wrapper" class="embed-responsive">
    <template v-if="mapIsIntersecting">
      <client-only>
        <ContactYMap
          :coords="[54.62896654088406, 39.731893822753904]"
          :controls="['zoomControl']"
          :scroll-zoom="true"
          :placemarks="placemarks"
          :zoom="3.4"
          class="embed-responsive-item"
        />
      </client-only>
    </template>

    <div v-else class="embed-responsive-item bg-gray-200" />
  </div>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },

    selectedContact: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      mapIsIntersecting: false,
    }
  },

  computed: {
    placemarks() {
      const options = {
        iconImageHref: '/images/map-point-new.png',
        iconImageSize: [48, 45],
        iconLayout: 'default#image',
      }

      if (this.selectedContact?.location) {
        return [
          {
            address: this.selectedContact.address,
            clusterName: 'EKF',
            coords: this.selectedContact.location.split(','),
            options,
            phone: this.selectedContact.phone,
            properties: {
              hintContent: `<div><strong>${this.selectedContact.title}</strong></div>`,
            },
            title: this.selectedContact.title,
          },
        ]
      }

      const placemarks = []

      this.contacts?.forEach((contact, index) => {
        if (!contact?.location) return

        placemarks.push({
          address: contact.address,
          callbacks: {
            click: () => this.$emit('click-placemark', contact),
          },
          clusterName: 'EKF',
          id: index + 1,
          coords: contact.location.split(','),
          options,
          phone: contact.phone,
          properties: {
            hintContent: `<div><strong>${contact.title}</strong></div>`,
          },
          title: contact.title,
        })
      })

      return placemarks
    },
  },

  watch: {
    selectedContact(event) {
      if (!this.$refs.wrapper) return

      if (event) {
        this.$refs.wrapper.addEventListener('click', this.handleWrapperClick)
      } else {
        this.$refs.wrapper.removeEventListener('click', this.handleWrapperClick)
      }
    },
  },

  mounted() {
    this.setObserver()
  },

  methods: {
    handleWrapperClick(event) {
      if (event.target?.classList.contains('ymap-balloon-close')) {
        this.$emit('clear-selection')
      }
    },

    setObserver() {
      if ('IntersectionObserver' in window) {
        const wrapper = this.$refs.wrapper
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.mapIsIntersecting = true
            observer.unobserve(entry.target)
          }
        })

        observer.observe(wrapper)
      } else {
        /* Init map immediately if intersectionObserver is not supported */
        this.mapIsIntersecting = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.embed-responsive {
  &::before {
    padding-top: calc(2900% / 36);
  }
}

::v-deep {
  .ymap-body {
    height: 100%;
  }
}

@include media-breakpoint-up(lg) {
  .embed-responsive {
    &::before {
      padding-top: calc(59800% / 807);
    }
  }
}
</style>
