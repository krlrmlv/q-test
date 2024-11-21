<template>
  <b-modal
    v-model="localVisible"
    modal-class="modal-gallery"
    size="xl"
    centered
    hide-footer
    hide-header
  >
    <template #default="{ close }">
      <CatalogProductGallery
        :images="images"
        :start="start"
        :spinner="spinner"
        in-modal
      />

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="link"
        class="btn-icon modal-close text-white rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
    spinner: {
      type: String,
      default: null,
    },
    start: {
      type: [Number, String],
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .modal-content {
    padding-bottom: calc(0.5rem + 64px);
    border: none;
    background-color: transparent;
  }

  .modal-body {
    padding: 0 1.5rem;
    background-color: $white;
  }

  .modal-close {
    right: -2.5rem;
    top: -2.5rem;
  }
}

@include media-breakpoint-up(md) {
  ::v-deep {
    .modal-body {
      position: relative;

      .catalog-product-gallery-thumbnails {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;

        .swiper-wrapper {
          justify-content: center;
        }

        .swiper-slide {
          width: 80px !important;
        }
      }

      .gallery-thumbnail {
        border-width: $border-width * 2;

        &:hover {
          border-color: rgba($white, 0.2);
        }

        &.active {
          border-color: $primary;

          &:hover {
            border-color: darken($primary, 10%);
          }
        }
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  ::v-deep {
    .modal-body {
      padding: 0 3rem;

      .gallery-slide {
        height: 600px;
      }
    }
  }
}
</style>
