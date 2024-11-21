<template>
  <div class="distribution-distributor-list">
    <slot name="header"></slot>
    <div class="distributor-list-overflow">
      <Simplebar ref="simplebar" data-simplebar-auto-hide="false" class="h-100">
        <ul class="distributor-list">
          <li
            v-for="(partner, index) in partners"
            :key="`partner-${index}`"
            ref="partnerList"
            class="list-item"
          >
            <p class="h6 mb-0">
              <b-link class="text-reset" @click="handlePartnerClick(partner)">
                {{
                  partner.partner?.commercial_name || partner.commercial_name
                }}
              </b-link>
            </p>

            <p class="fs-1 text-muted mb-8">
              {{ getPartnerTypesString(partner) }}
            </p>

            <ul class="list-unstyled fs-2 text-secondary">
              <li v-if="partner.phone" class="d-flex align-items-center mb-8">
                <svg-icon
                  name="phone-16"
                  width="16"
                  height="16"
                  class="mr-8"
                  aria-label="Тел."
                />
                <b-link
                  :href="`tel:${partner.phone}`"
                  target="_blank"
                  class="text-reset"
                >
                  {{ partner.phone }}
                </b-link>
              </li>

              <li v-if="partner.email" class="d-flex align-items-center mb-8">
                <svg-icon
                  name="mail-16"
                  width="16"
                  height="16"
                  class="mr-8"
                  aria-label="E-mail"
                />
                <b-link
                  :href="`mailto:${partner.email}`"
                  target="_blank"
                  class="text-reset"
                >
                  {{ partner.email }}
                </b-link>
              </li>

              <li
                v-if="partner.site_url"
                class="d-flex align-items-center mb-8"
              >
                <svg-icon
                  name="website-16"
                  width="16"
                  height="16"
                  class="mr-8"
                  aria-label="Сайт"
                />
                <SeoLink
                  :href="getUrlWithPrefix(partner.site_url)"
                  class="text-reset"
                  target="_blank"
                  @click="sendAnalyticEvent(partner.commercial_name)"
                >
                  {{ getClearUrlString(partner.site_url) }}
                </SeoLink>
              </li>
            </ul>

            <template v-if="!isCheckout">
              <DistributionBranchCollapse
                v-if="partner.branches && partner.branches.length"
                :items="partner.branches"
                class="mb-4"
                @selected="$emit('selected', $event)"
              />
            </template>
          </li>
        </ul>
      </Simplebar>
    </div>
  </div>
</template>

<script>
import Simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import { getViewportWidth } from '@/utils/window'

export default {
  components: { Simplebar },

  props: {
    isCheckout: {
      type: Boolean,
      default: false,
    },
    isPartners: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    partners: {
      type: Array,
      default: () => [],
    },
    selectedPoint: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    'selectedPoint.id': {
      immediate: true,
      handler(event) {
        this.scrollToPoint(event)
      },
    },
  },

  mounted() {
    setTimeout(() => this.scrollToPoint(this.selectedPoint?.id), 500)
  },

  methods: {
    getPartnerTypesString(partner) {
      const typeTranslations = {
        internet_shop: 'onlineStore',
        is_panel_equipment_manufacturer: 'pem',
        is_system_integrators: 'si',
        retail: 'retail',
        wholesale: 'distributor',
      }

      return partner.types
        .map((key) => this.$t(`distribution.${typeTranslations[key]}.title`))
        .join(' / ')
    },

    getClearUrlString(url) {
      return (
        url
          .trim()
          .match(
            /^(|http:\/\/|https:\/\/)[а-яА-Яa-zA-Z0-9.-]+.(ru|com|org|net|рф|kz|site|me|info|biz|app|by|ua)/
          )?.[0] || url
      )
    },

    /* fix URLs without protocol */
    getUrlWithPrefix(url) {
      const urlWithPrefix = url.match(/http(s?):.+/) ? url : `//${url}`
      return urlWithPrefix + '?utm_source=ekfgroup_wheretobuy'
    },

    handlePartnerClick(partner) {
      const propagate = process.client && getViewportWidth() < 992
      this.$emit('selected', partner, propagate)
    },

    scrollToPoint(pointId) {
      if (!process.client || getViewportWidth() < 992) return

      const wrapper = this.$refs.simplebar?.SimpleBar?.getScrollElement()
      const nodeList = this.$refs.partnerList
      if (!wrapper || !nodeList?.length) return

      let top = 0
      if (pointId) {
        const index = this.partners.findIndex(({ id }) => id === pointId)
        top = (nodeList[index]?.offsetTop || 0) - 16
      }
      wrapper.scrollTo({ top, behavior: 'smooth' })
    },

    sendAnalyticEvent(commercialName) {
      if (commercialName === 'EKF Market') return

      this.$ym('reachGoal', 'CLKURLDISTRBUY')
    },
  },
}
</script>

<style lang="scss" scoped>
.distributor-list {
  margin: 0;
  padding: 0;
  list-style: none;

  & > .list-item {
    margin-bottom: 1rem;

    &:not(:last-child) {
      padding-bottom: 0.5rem;
      border-bottom: $border-width solid $border-color;
    }
  }
}

@include media-breakpoint-up(lg) {
  .distribution-distributor-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 12px;
    right: 12px;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .distributor-list-overflow {
    flex: 1 1 auto;
    position: relative;
    min-height: 0;
  }

  .distributor-list {
    padding-top: 1rem;
    padding-right: 2rem;
  }
}
</style>
