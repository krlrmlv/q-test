<template>
  <div class="masterroof-cart-table">
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
    <div v-for="(product, index) in cart" :key="`product-${index}`">
      <hr v-if="index > 0" />
      <div class="table-tr">
        <div class="table-td cell-image">
          <img
            :src="getImage(product)"
            :alt="product.name"
            class="product-image"
          />
        </div>
        <div class="table-td cell-vendor">
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
        <div class="table-td cell-unit">
          {{ getUnitName(product) }}
        </div>
        <div class="table-td cell-quantity">
          {{ product.quantity_not_rounded }}
        </div>
        <div class="cell-quantity-unit">
          {{ product.quantity_not_rounded }}
          {{ getUnitName(product) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters('masterroof', ['i18n']),
    fields() {
      const fields = ['image', 'vendor', 'name', 'unit', 'quantity'].map(
        (key) => ({
          key,
          label: this.$t(`${this.i18n}.cart.fields.${key}`),
          cellClass: `cell-${key}`,
        })
      )
      return fields
    },
  },

  methods: {
    getImage(product) {
      const { image } = product?.catalog_products[0]
      return this.$getCdnImage(`/products/${image}`, 86)
    },

    getUnitName(product) {
      const { name } = product?.catalog_products[0]?.unit_storage
      return name || this.$t('units.pc')
    },
  },
}
</script>

<style lang="scss" scoped>
.cell-quantity-unit {
  display: none;
}

.table-thead {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: $line-height-base;
  background-color: $gray-100;
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
  .table-thead,
  hr {
    display: none;
  }

  .cell-quantity-unit {
    display: block;
    font-weight: 500;
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
  .cell-unit,
  .cell-quantity,
  .cell-vendor {
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

  .cell-vendor {
    width: 17%;
  }

  .cell-name {
    width: 50%;
  }
  .cell-unit {
    width: 7%;
    text-align: left;
  }
  .cell-quantity {
    width: 11%;
    text-align: left;

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
    width: 50%;
  }
  .cell-unit {
    width: 8%;
  }
  .cell-quantity {
    width: 10%;
  }
}
</style>
