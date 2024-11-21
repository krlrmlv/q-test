<template>
  <b-modal
    v-model="localVisible"
    size="xxl"
    modal-class="masterlight-product-modal"
    hide-footer
    @show="handleShow"
  >
    <template #modal-header="{ cancel }">
      <b-button
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="cancel"
      >
        <span class="sr-only">{{ $t('global.close') }}</span>
        <svg-icon
          name="chevron-left-24"
          width="24"
          height="24"
          aria-hidden="true"
          class="d-lg-none"
        />
        <svg-icon
          name="close-24"
          width="24"
          height="24"
          aria-hidden="true"
          class="d-none d-lg-block"
        />
      </b-button>
      <h5 class="h3 modal-title">
        {{ $t('calculators.masterLight.selectLamp') }}
      </h5>
    </template>
    <template #default="{ ok }">
      <b-spinner v-if="loading" variant="gray-400" />
      <div v-else>
        <MasterlightCategory
          v-for="category in categories"
          :key="category.id"
          :category="category"
          class="mb-32"
          @product-click="handleProductClick($event, ok)"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
import { BModal, BSpinner } from 'bootstrap-vue'
import CATEGORIES_QUERY from '@/graphql/calculators/masterlight/MasterlightProductCategories'

export default {
  components: {
    BModal,
    BSpinner,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    selected: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      categories: [],
      loading: false,
    }
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },

  methods: {
    async handleShow() {
      this.loading = true
      try {
        const { categories } = await this.$graphql.default.request(
          CATEGORIES_QUERY,
          { locale: this.$i18n.locale }
        )
        this.categories = categories.map(({ category, products }) => ({
          ...category[0],
          products: products?.map((p) => ({ ...p, product: p.product?.[0] || null })) || []
        }))
      } catch (error) {}
      this.loading = false
    },

    handleProductClick(product, callback) {
      this.$emit('select', product)
      callback()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .masterlight-product-modal {
    .modal-header {
      border-bottom: none;
    }

    .modal-body {
      min-height: 0;
      padding-top: 2rem;
      padding-bottom: 2rem;
      overflow-y: auto;
    }
  }
}

@include media-breakpoint-down(md) {
  ::v-deep {
    .masterlight-product-modal {
      display: block !important;

      &.fade {
        transition: $transition-base;
        transition-property: none;

        &.show {
          .modal-dialog {
            transform: translateX(0);
          }
        }

        &:not(.show) {
          opacity: 1;
        }

        .modal-dialog {
          transform: translateX(100%);
        }
      }

      & + .modal-backdrop {
        display: none;
      }

      .modal-dialog {
        max-width: none;
        height: 100%;
        margin: 0;
        transition: $transition-base;
        transition-property: transform;
      }

      .modal-content {
        height: 100%;
        border: none;
      }

      .modal-header {
        position: relative;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;

        &::after {
          display: block;
          content: '';
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 0;
          height: $border-width;
          background-color: $border-color;
        }
      }

      .modal-title {
        flex: 1 1 auto;
        padding-right: calc(24px + 0.5rem);
        font-size: $font-size-3;
        text-align: center;
        text-transform: uppercase;
      }

      .modal-close {
        position: static;
        margin-right: 0.5rem;
        padding: 0;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  ::v-deep {
    .masterlight-product-modal {
      .modal-dialog {
        max-width: calc(
          #{map-get($container-max-widths, 'lg')} - #{$grid-gutter-width}
        );
      }

      .modal-content {
        max-height: calc(100vh - 3.5rem);
      }

      .modal-header {
        padding: 4rem 4rem 0;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep {
    .masterlight-product-modal {
      .modal-dialog {
        max-width: calc(
          #{map-get($container-max-widths, 'xl')} - #{$grid-gutter-width}
        );
      }
    }
  }
}

@media (min-width: 1440px) {
  ::v-deep {
    .masterlight-product-modal {
      .modal-dialog {
        max-width: 1268px;
      }
    }
  }
}
</style>
