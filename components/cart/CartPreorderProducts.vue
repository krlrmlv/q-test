<template>
  <b-table-lite
    :fields="fields"
    :items="products"
    class="cart-out-of-stock mb-32"
    borderless
    striped
  >
    <template #cell(image)="{ item }">
      <img
        :src="getImageUrl(item)"
        :alt="item.vendor_code"
        width="48"
        height="48"
      />
    </template>

    <template #cell(name)="{ item }">
      <b-link
        :to="localePath(`/catalog/products/${item.slug}`)"
        class="text-reset"
      >
        {{ item.name }}
      </b-link>
    </template>

    <template #cell(price)="{ value }">
      {{ formatSum(value, $i18n.locale) }}&nbsp;₽
    </template>
  </b-table-lite>
</template>

<script>
import { BTableLite } from 'bootstrap-vue'
import formatSum from '@/utils/formatSum'

export default {
  components: { BTableLite },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'image',
          label: this.$t('cart.fields.photo'),
          tdClass: 'cell-image text-center',
        },
        {
          key: 'vendor_code',
          label: this.$t('cart.fields.vendorCode'),
          tdClass: 'cell-vendor-code',
        },
        {
          key: 'name',
          label: this.$t('cart.fields.nameOnly'),
          tdClass: 'cell-name',
        },
        {
          key: 'price',
          label: this.$t('cart.fields.price'),
          tdClass: 'cell-price',
        },
      ],
    }
  },

  methods: {
    formatSum,

    getImageUrl(item) {
      return this.$getCdnImage(`/products/${item?.image}`, 48)
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-out-of-stock {
  &.table-borderless {
    ::v-deep {
      thead tr:last-of-type {
        border-bottom: none;
      }
    }
  }

  ::v-deep {
    thead {
      background-color: $light;

      th {
        padding: 1.25rem;
        line-height: $line-height-base;
      }
    }

    tbody {
      td {
        padding: 0.5rem 1.25rem;
      }
    }

    .cell-price {
      font-size: $font-size-4;
      font-weight: $font-weight-medium;
    }
  }
}

@include media-breakpoint-down(md) {
  .cart-out-of-stock {
    font-size: $font-size-2;

    ::v-deep {
      thead {
        display: none;
      }

      tbody {
        tr {
          display: grid;
          grid-template-areas: 'a b b' 'a c d';
          gap: 0;
        }

        td {
          line-height: 1.2rem;
        }
      }

      .cell-image {
        grid-area: a;
        padding: 0.5rem;
      }

      .cell-name {
        grid-area: b;
        padding: 0.5rem 0.5rem 0.25rem;
      }

      .cell-vendor-code {
        grid-area: c;
        align-self: end;
        padding: 0 0.5rem 0.375rem;
        font-size: $font-size-1;
      }

      .cell-price {
        grid-area: d;
        align-self: end;
        padding: 0 0.5rem 0.5rem;
        font-size: $font-size-3;
        text-align: right;
      }
    }
  }
}
</style>
