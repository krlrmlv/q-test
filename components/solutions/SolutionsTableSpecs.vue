<template>
  <div class="table-wrapper">
    <b-table-lite
      :fields="fields"
      :items="items"
      table-class="table-striped-odd"
      thead-class="d-none"
      class="table-specs mb-0"
      borderless
      striped
    />
  </div>
</template>

<script>
import { BTableLite } from 'bootstrap-vue'

export default {
  components: { BTableLite },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        { key: 'property', label: '', tdClass: 'cell-property' },
        { key: 'value', label: '' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(sm) {
  .table-specs {
    font-size: $font-size-1;
    line-height: $font-size-3;
  }

  ::v-deep {
    .table {
      th,
      td {
        padding: 0.5rem 1rem;
      }
    }
  }
}

@include media-breakpoint-down(xs) {
  .table-wrapper {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
  }
}
</style>
