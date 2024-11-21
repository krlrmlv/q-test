<template>
  <div class="table-container" :class="{ 'fade-visible': fadeVisible }">
    <h4 class="table-title px-20 px-md-0 mb-16 md-mb-40">
      {{ $t('catalog.tabs.logistic.title') }}
    </h4>
    <Simplebar
      v-show="isMounted"
      ref="simplebar"
      data-simplebar-auto-hide="false"
      class="mb-32 mb-lg-48"
    >
      <b-table-lite
        :fields="fields"
        :items="items"
        thead-class="text-muted"
        table-class="table-striped-odd table-logistic"
        no-border-collapse
        borderless
        striped
      />
    </Simplebar>
  </div>
</template>

<script>
import { BTableLite } from 'bootstrap-vue'
import Simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import { getViewportWidth } from '@/utils/window'

const BREAKPOINT_SM = 576

const I18N = 'catalog.tabs.logistic'

export default {
  components: { BTableLite, Simplebar },

  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      fadeVisible: false,
      properties: [
        'coefficient',
        'full_name',
        'barcode',
        'weight',
        'volume',
        'depth',
        'width',
        'height',
      ],
      fields: [
        { key: 'property', label: '', tdClass: 'text-muted align-middle' },
        {
          key: 'individual',
          label: this.$t(`${I18N}.labels.individual`),
          tdClass: 'align-middle',
        },
        {
          key: 'group',
          label: this.$t(`${I18N}.labels.group`),
          tdClass: 'align-middle',
        },
        {
          key: 'transport',
          label: this.$t(`${I18N}.labels.transport`),
          tdClass: 'align-middle',
        },
      ],
      isMounted: false,
    }
  },

  computed: {
    items() {
      const individual = this.product?.unit_storage ?? {}
      const group = this.product?.unit_group_packing ?? {}
      const transport = this.product?.unit_transport_packaging ?? {}

      const rows = this.properties.map((property) => ({
        property: this.$t(`${I18N}.${property}`),
        individual: individual[property] || '-',
        group: group[property] || '-',
        transport: transport[property] || '-',
      }))

      /** Removed zeros from the coefficient.
       * From '1.000' to '1' */
      for (const key in rows[0]) {
        rows[0][key] = rows[0][key].split('.')[0]
      }
      return rows
    },
    simplebar() {
      return this.$refs.simplebar.SimpleBar
    },
  },
  mounted() {
    this.simplebar
      .getScrollElement()
      .addEventListener('scroll', this.scrollHandler, { passive: true })

    /* Show fade-element if screen-size on load is less then 576px */
    if (BREAKPOINT_SM > getViewportWidth()) this.fadeVisible = true

    this.$nextTick(() => {
      this.isMounted = true
    })
  },
  methods: {
    scrollHandler(event) {
      const { scrollWidth, scrollLeft, clientWidth } = event.target

      const isRightEdgeReached =
        scrollWidth - Math.round(scrollLeft) === clientWidth

      if (isRightEdgeReached) this.fadeVisible = false
      else this.fadeVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  thead {
    th {
      font-weight: $font-weight-normal;
      padding-bottom: 1.25rem;
    }
  }
  a {
    color: inherit;
    pointer-events: none;
  }
  .simplebar-horizontal {
    z-index: 2;
  }
  .simplebar-scrollbar.simplebar-visible::before {
    opacity: 0;
  }
}
@include media-breakpoint-down(sm) {
  .table-container {
    position: relative;
    &::after {
      opacity: 0;
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 3.5rem;
      height: 100%;
      background-image: linear-gradient(to left, $white 30%, rgba($white, 0));
      transition: opacity 0.75s ease-out;
      transition-property: opacity;
      z-index: 1;
    }
    &.fade-visible {
      &::after {
        opacity: 1;
      }
    }
  }
  table {
    font-size: $font-size-2;
  }
  .table-logistic {
    font-size: $font-size-2;
  }
  .table-title {
    font-size: $font-size-3;
  }
}
</style>
