<template>
  <div class="distribution-distributor-select">
    <DistributionSearch
      :value="selectedRegion"
      class="mb-16"
      @input="handleSearch"
    />

    <DistributionPointsFound
      v-if="!pointsLoading"
      :is-partners="isPartners"
      :quantity="pointsTotal"
      class="d-lg-none mb-32"
    />

    <DistributionViewSelect v-model="showMapTab" class="d-lg-none mb-32" />

    <b-row>
      <b-col cols="12" lg="7" xl="8" order-lg="2" class="px-0 px-sm-12">
        <transition name="distribution-tab">
          <div
            :key="showMapTab"
            :class="{ show: showMapTab }"
            class="distribution-tab distribution-map-wrapper"
          >
            <div class="distribution-map bg-gray-100">
              <client-only>
                <YMap
                  v-if="showMapContent"
                  :coords="[54.62896654088406, 39.731893822753904]"
                  :controls="['zoomControl']"
                  :scroll-zoom="true"
                  :placemarks="placeMarks"
                  :zoom="3.4"
                  class="embed-responsive-item"
                  @map-was-initialized="handleMapInitialized"
                >
                </YMap>
              </client-only>
            </div>
          </div>
        </transition>
      </b-col>

      <b-col cols="12" lg="5" xl="4" order-lg="1">
        <transition name="distribution-tab">
          <DistributionDistributorList
            :key="showMapTab"
            v-bind="{ isCheckout, isPartners, partners, selectedPoint }"
            :loading="pointsLoading"
            :class="{ show: !showMapTab }"
            class="distribution-tab"
            @selected="selectSellerPoint"
          >
            <template #header>
              <DistributionPointsFound
                :is-partners="isPartners"
                :loading="pointsLoading"
                :quantity="pointsTotal"
                class="d-none d-lg-block border-bottom pb-16 mr-32"
              />
            </template>
          </DistributionDistributorList>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import { mapGetters } from 'vuex'
import YMap from '@/components/contact/YMap'
import PARTNER_SELLER_POINTS from '@/graphql/distribution/PartnerSellerPoints'

export default {
  components: { YMap },

  props: {
    availableFilterOptions: {
      type: Array,
      default: () => [],
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    isLegal: {
      type: Boolean,
      default: false,
    },
    isPartners: {
      type: Boolean,
      default: false,
    },
    selectedFilterOptions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      mapTimeout: null,
      partnerSellerPoints: [],
      partners: [],
      pointsLoading: true,
      pointsTotal: 0,
      selectedRegion: '',
      selectedPoint: null,
      showMapContent: true,
      showMapTab: true,
    }
  },

  async fetch() {
    if (this.selectedRegion !== '') {
      await this.fetchPartnerSellerPoints()
    }
  },

  computed: {
    ...mapGetters('geo', { storeSelectedRegion: 'selectedLocationName' }),

    placeMarks() {
      const hasSelection = Boolean(this.selectedPoint?.id)

      return (
        this.partnerSellerPoints
          ?.filter(({ id, geo_coords }) => {
            const isSelected = this.selectedPoint?.id === id
            return Boolean(geo_coords) && (!hasSelection || isSelected)
          })
          ?.map((item) => {
            const coords = item.geo_coords.split(' ')
            return {
              id: item.id,
              clusterName: 'EKF',
              coords,
              properties: {
                balloonContentBody: this.getBalloonContentBody(item),
              },
              options: {
                balloonCloseButton: false,
                balloonMaxWidth: 336,
                balloonOffset: [6, -30],
                iconImageHref: '/images/map-point-new.png',
                iconImageSize: [48, 45],
                iconLayout: 'default#image',
              },
              callbacks: {
                click: () => {
                  this.handleBalloonClick(item.id)
                },
              },
            }
          }) ?? []
      )
    },
  },

  watch: {
    selectedFilterOptions() {
      this.fetchPartnerSellerPoints()
    },

    showMapTab(event) {
      /* force map redraw after a delay */
      clearTimeout(this.mapTimeout)
      this.mapTimeout = setTimeout(() => {
        this.showMapContent = event
      }, 2000)
    },

    storeSelectedRegion: {
      handler(event) {
        this.selectedRegion = event
        this.fetchPartnerSellerPoints()
      },
    },
  },

  created() {
    this.selectedRegion = this.storeSelectedRegion
  },

  created() {
    this.selectedRegion = this.storeSelectedRegion
  },

  beforeDestroy() {
    const mapContainer = document.querySelector('.ymap-container')
    if (mapContainer) {
      mapContainer.removeEventListener('click', this.handleMapContainerClick)
    }
  },

  methods: {
    async fetchPartnerSellerPoints() {
      this.pointsLoading = true

      const variables = {
        where: {
          _and: [this.buildDistributorFilter(), this.buildRegionFilter()],
        },
      }

      try {
        const { points } = await this.$graphql.default.request(
          PARTNER_SELLER_POINTS,
          variables
        )

        this.partnerSellerPoints = points ?? []
        this.pointsTotal = points?.length

        this.partners = this.sortPartners(this.groupPointsByPartner(points))
      } catch (error) {}

      this.pointsLoading = false
    },

    buildDistributorFilter() {
      if (this.isCheckout) {
        const filter = { _and: [{ order_access: { _eq: true } }] }

        if (this.isLegal) {
          filter._and.push({ legal_entity_access: { _eq: true } })
        } else {
          filter._and.push({ physical_person_access: { _eq: true } })
        }

        return filter
      }

      const _or = []

      this.selectedFilterOptions.forEach((key) => {
        _or.push({ [key]: { _eq: true } })
      })

      const filter = { _and: [{ _or }] }

      if (this.isPartners) {
        filter._and.push({
          partner: { partner_status: { enabled_on_partners: { _eq: true } } },
        })
      } else {
        filter._and.push({
          is_dealer: { _eq: true },
          partner: {
            partner_status: { enabled_on_where_to_buy: { _eq: true } },
          },
        })
      }

      return filter
    },

    buildRegionFilter() {
      let regionFilter = {}

      if (this.selectedRegion) {
        const query = this.selectedRegion
          .toLowerCase()
          .replace(/( край| область| ао| автономный округ)+/g, '')
          .replace(/[()\s-]+/g, '%')

        regionFilter = {
          _or: [
            { any_city_access: { _eq: true } },
            { city: { _ilike: `${query}` } },
            { region: { _ilike: `${query}%` } },
          ],
        }

        if (query.toLowerCase().includes('астана')) {
          regionFilter._or.push({ city: { _ilike: '%Нур-Султан%' } })
        } else if (this.selectedRegion.toLowerCase().includes('нур-султан')) {
          regionFilter._or.push({ city: { _ilike: '%Астана%' } })
        }
      }

      return regionFilter
    },

    groupPointsByPartner(points) {
      if (!points) return []

      const getCoords = (branch) => branch.geo_coords?.split(' ')

      const groups = groupBy(
        points,
        ({ commercial_name, head_partner_id, id }) =>
          `${head_partner_id ?? id}::${commercial_name?.trim()}`
      )

      return Object.values(groups)?.map((points) => {
        const mainBranch = points[0] ?? {}

        const types = []

        this.availableFilterOptions.forEach((key) => {
          if (points.some((point) => point[key])) {
            types.push(key)
          }
        })

        const branches =
          points
            ?.filter(
              ({ city, geo_coords, street }) => city && street && geo_coords
            )
            ?.map((point) => ({
              ...point,
              address: this.getBranchAddress(point),
              geo_coords: getCoords(point),
            })) ?? []

        return {
          ...mainBranch,
          branches,
          geo_coords: getCoords(mainBranch),
          types,
        }
      })
    },

    getBalloonContentBody(placemark) {
      const address = this.getBranchAddress(placemark)
      const lines = ['<div class="ymaps-balloon-custom">']

      if (placemark?.commercial_name) {
        lines.push(
          '<p class="mb-0"><strong>',
          placemark.commercial_name.trim(),
          '</strong></p>'
        )
      }

      if (address) {
        lines.push('<p class="mb-0">', address, '</p>')
      }

      if (placemark.phone) {
        lines.push('<p class="mb-0">', placemark.phone.trim(), '</p>')
      }

      if (this.isCheckout) {
        lines.push(
          '<div class="mt-8">',
          '<button class="btn btn-sm btn-primary ymap-distributor-select">',
          this.$t('cart.checkout.select'),
          '</button>',
          '</div>'
        )
      }

      lines.push(
        '<button class="btn btn-sm btn-white btn-icon btn-close"><span class="sr-only">',
        this.$t('global.close'),
        '</span></button>',
        '</div>'
      )

      return lines.join('')
    },

    getBranchAddress(branch) {
      const items = []

      if (branch.region && branch.region !== branch.city) {
        let region = branch.region.trim()
        if (region.match(/\sобл$/)) {
          region = region.replace(' обл', ' область')
        } else if (region.match(/ая$/)) {
          region += ' область'
        } else if (region.match(/ий$/)) {
          region += ' край'
        }
        items.push(region)
      }
      if (branch.city) {
        let city = branch.city.trim()
        if (city.match(/\sг$/)) {
          city = city.replace(' г', '')
        }
        city = 'г. ' + city
        items.push(city)
      }
      if (branch.street) items.push(branch.street.trim())
      if (branch.house) items.push(branch.house.trim())
      if (branch.building) items.push(branch.building.trim())
      return items.join(', ')
    },

    handleBalloonClick(distributorId) {
      this.selectedPoint =
        this.partnerSellerPoints?.find(({ id }) => id === distributorId) ?? null
    },

    handleMapInitialized() {
      const mapContainer = document.querySelector('.ymap-container')
      if (mapContainer) {
        mapContainer.addEventListener('click', this.handleMapContainerClick)
      }
    },

    handleMapContainerClick(event) {
      const selectButton = document.querySelector(
        '.ymap-container .ymap-distributor-select'
      )

      const closeButton = document.querySelector(
        '.ymaps-balloon-custom .btn-close'
      )

      if (selectButton?.contains(event.target)) {
        this.$emit('distributor-selected', this.selectedPoint)
      } else if (closeButton?.contains(event.target)) {
        this.selectedPoint = null
      }
    },

    handleSearch(event) {
      this.selectedRegion = event
      this.fetchPartnerSellerPoints()
    },

    selectSellerPoint(branch, propagate = false) {
      this.selectedPoint = branch
      if (propagate) {
        this.$emit('distributor-selected', this.selectedPoint)
      }
    },

    sortPartners(partners) {
      return partners
        .map((sellerPoint) => {
          let sortPriority = 99

          if (sellerPoint.site_url.includes('market.ekfgroup.com')) {
            sortPriority = 1
          } else if (sellerPoint.commercial_name?.includes('ЭТМ')) {
            sortPriority = 2
          } else if (sellerPoint.commercial_name?.includes('Русский Свет')) {
            sortPriority = 3
          } else if (sellerPoint.site_url.includes('yandex')) {
            sortPriority = 4
          } else if (sellerPoint.site_url.includes('ozon')) {
            sortPriority = 5
          } else if (sellerPoint.site_url.includes('sbermegamarket')) {
            sortPriority = 6
          } else if (sellerPoint.site_url.includes('wildberries')) {
            sortPriority = 7
          } else if (sellerPoint.site_url.includes('aliexpress')) {
            sortPriority = 8
          }

          return { ...sellerPoint, sortPriority }
        })
        .sort((a, b) => a.sortPriority - b.sortPriority)
    },
  },
}
</script>

<style lang="scss" scoped>
.distribution-map-wrapper {
  position: relative;
  height: 400px;
  margin-bottom: 2rem;
}

.distribution-map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.ymap-container {
  height: inherit;
}

::v-deep {
  .ymap-body {
    height: inherit;

    & > [class*='ymaps'] {
      width: 100% !important;
    }

    [class*='-balloon-panel'] {
      [class*='-balloon'] {
        box-shadow: none;
      }
    }

    [class*='-balloon__content'] {
      padding: 0;
    }
  }
}

@include media-breakpoint-down(md) {
  .distribution-tab {
    &:not(.show) {
      display: none;
    }
  }

  .distribution-tab-enter-active,
  .distribution-tab-leave-active {
    transition: opacity 0.15s ease-in-out;
  }

  .distribution-tab-enter-active {
    position: absolute;
    z-index: 1;
  }

  .distribution-tab-enter,
  .distribution-tab-leave-to {
    opacity: 0;
  }

  ::v-deep {
    .ymaps-balloon-custom {
      border-bottom: $border-width solid $border-color;
    }
  }
}

@include media-breakpoint-up(md) {
  .distribution-map-wrapper {
    width: 100%;
    height: auto;

    &::before {
      display: block;
      content: '';
      padding-bottom: 66.66667%;
    }
  }
}

@include media-breakpoint-up(lg) {
  .distribution-distributor-select {
    position: relative;
  }

  .distribution-search {
    position: absolute;
    right: $grid-gutter-width * 0.5;
    top: $grid-gutter-width * 0.5;
    width: 360px;
    z-index: 2;
  }

  .distribution-map-wrapper {
    margin-bottom: 0;

    &::before {
      padding-bottom: 100%;
    }
  }
}

@include media-breakpoint-up(xl) {
  .distribution-map-wrapper {
    &::before {
      padding-bottom: 66.66667%;
    }
  }
}
</style>
