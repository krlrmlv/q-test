<template>
  <div class="masterkupol-cart-table">
    <div class="table-thead">
      <div class="table-tr">
        <div
          v-for="field in fields"
          :key="field.key"
          :class="field.cellClass"
          class="table-th"
        >
          {{ field.label }}
        </div>
      </div>
    </div>

    <div v-for="group in cart" :key="group.name" class="table-tbody">
      <div class="table-tr row-group">
        <div v-if="group.products.length" class="table-td cell-group">
          {{ group.name }}
        </div>
      </div>
      <div
        v-for="(product, index) in group.products"
        :key="`product-${index}`"
        class="table-tr"
      >
        <div class="table-td cell-image">
          <img
            :src="getImage(product)"
            :alt="product.name"
            class="product-image"
          />
        </div>
        <div class="table-td cell-vendor-code">
          {{ product.vendor_code }}
        </div>
        <div class="table-td cell-name">
          <b-link
            :to="localePath(`/catalog/products/${product.slug}`)"
            target="_blank"
            class="text-reset"
          >
            {{ product.name }}
          </b-link>
        </div>
        <div class="table-td cell-quantity">
          {{ product.quantity }}<span>&nbsp;{{ getUnitName(product) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'image',
          label: this.$t('calculators.masterKupol.cart.fields.photo'),
          cellClass: 'cell-image',
        },
        {
          key: 'vendor_code',
          label: this.$t('calculators.masterKupol.cart.fields.vendorCode'),
          cellClass: 'cell-vendor-code',
        },
        {
          key: 'name',
          label: this.$t('calculators.masterKupol.cart.fields.name'),
          cellClass: 'cell-name',
        },
        {
          key: 'quantity',
          label: this.$t('calculators.masterKupol.cart.fields.quantity'),
          cellClass: 'cell-quantity',
        },
      ],
    }
  },

  methods: {
    getImage(product) {
      return this.$getCdnImage(`/products/${product?.image}`, { width: 86 })
    },

    getUnitName(product) {
      return product?.unit_storage?.name || this.$t('units.pc')
    },
  },
}
</script>

<style lang="scss" scoped>
.table-thead {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: $line-height-base;
  background-color: $gray-100;
}

.table-tbody {
  line-height: 1.375;
}

.cell-group {
  &.table-td {
    padding: 0.5rem 0;
    font-size: 1.125rem;
    font-weight: $font-weight-medium;
    line-height: $headings-line-height;
  }
}

.cell-quantity {
  &.table-td {
    font-size: $font-size-4;
    font-weight: $font-weight-medium;
  }
}

@include media-breakpoint-down(md) {
  .table-thead {
    display: none;
  }

  .table-tbody {
    font-size: $font-size-2;

    &:not(:first-of-type) {
      .row-group {
        margin-top: 1.5rem;
      }
    }
  }

  .table-tr {
    &:not(.row-group) {
      display: grid;
      align-items: center;
      grid-template-columns: 126px auto;
      grid-template-rows: min-content min-content;
      gap: 0.5rem;
      padding: 1rem;
      margin-bottom: 0.5rem;
      background-color: $white;
      box-shadow: $box-shadow;
    }
  }

  .cell-vendor-code {
    display: none;
  }

  .cell-image {
    grid-row: 1 / span 2;
    align-self: start;
    text-align: center;
  }
}

@include media-breakpoint-down(xs) {
  .table-tr {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
  }

  .cell-group {
    &.table-td {
      padding-left: $grid-gutter-width * 0.5;
      padding-right: $grid-gutter-width * 0.5;
    }
  }
}

@include media-breakpoint-up(lg) {
  .table-tr {
    display: flex;
    align-items: center;

    &:nth-child(even) {
      background-color: $gray-100;
    }
  }

  .table-th,
  .table-td {
    flex: 0 0 auto;
    min-width: 0;
  }

  .table-th {
    padding: 1.25rem 1.5rem;
  }

  .table-td {
    padding: 0.875rem 1.5rem;
  }

  .cell-image {
    width: 15%;

    &.table-td {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      text-align: center;
    }
  }

  .cell-vendor-code {
    width: 17%;
  }

  .cell-name {
    width: 53%;
  }

  .cell-quantity {
    width: 15%;
    text-align: center;

    &.table-th {
      white-space: nowrap;
    }
  }

  .cell-group {
    width: 100%;

    &.table-td {
      padding: 1rem 0;
      font-size: 1.375rem;
    }
  }

  .product-image {
    width: 56px;
    height: 56px;
  }
}

@include media-breakpoint-up(xl) {
  .cell-name {
    width: 56%;
  }

  .cell-quantity {
    width: 12%;
  }
}
</style>
