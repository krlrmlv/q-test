<template>
  <div class="masterlight-lamp-select">
    <picture>
      <source
        srcset="/images/calculators/masterlight-room.webp"
        type="image/webp"
      />
      <source
        srcset="/images/calculators/masterlight-room.jpg"
        type="image/jpeg"
      />
      <img
        :alt="$t('calculators.masterLight.schemeAlt')"
        src="/images/calculators/masterlight-room.jpg"
        class="room-plan img-fluid w-100"
      />
    </picture>

    <div class="room-plan-overlay">
      <transition name="fade" mode="out-in">
        <div v-if="product" :key="product.id" class="room-plan-overlay-product">
          <b-button
            :disabled="loading"
            variant="light"
            class="btn-change"
            block
            @click="showModal"
          >
            <svg-icon
              name="sync-24"
              width="24"
              height="24"
              aria-hidden="true"
              class="d-md-none mr-8"
            />
            {{ $t('calculators.masterLight.changeSelection') }}
          </b-button>
          <MasterlightProductCard
            :product="product"
            class="mb-24 mb-md-16"
            @click="$emit('select', null)"
          />
          <b-button
            :disabled="loading"
            variant="primary"
            class="btn-submit"
            block
            @click="$emit('submit')"
          >
            <b-spinner v-if="loading" class="mr-8" small />
            {{ $t('calculators.masterLight.calculate') }}
          </b-button>
        </div>
        <b-button v-else variant="primary" block @click="showModal">
          {{ $t('calculators.masterLight.selectLamp') }}
        </b-button>
      </transition>
    </div>

    <MasterlightProductModal
      v-model="modalVisible"
      :selected="product"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      modalVisible: false,
    }
  },
  methods: {
    showModal() {
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.masterlight-lamp-select {
  position: relative;
}

.room-plan-overlay {
  .btn-change {
    margin-bottom: 1rem;
  }
}

::v-deep {
  .card-masterlight-product {
    font-size: $font-size-1;

    .card-img {
      padding: 0.25rem 0.5rem;
    }

    .card-body {
      padding: 0.5rem 0.5rem 0.75rem;
    }

    .product-image {
      width: 132px;
      height: 132px;
    }
  }
}

@include media-breakpoint-down(sm) {
  .room-plan {
    display: none;
  }

  .room-plan-overlay {
    .btn-change {
      padding: 0;
      border: none;
      color: $primary;
      background-color: $white;

      &:not(:disabled):not(.disabled) {
        &:hover,
        &:focus {
          background-color: $white;
          box-shadow: none;
        }
      }
    }

    .btn-submit {
      color: $primary;
      background-color: $white;
    }
  }
}

@include media-breakpoint-only(md) {
  .room-plan-overlay {
    margin-top: 1rem;
  }
}

@include media-breakpoint-up(lg) {
  .room-plan-overlay {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  .room-plan-overlay-product {
    width: 11.75rem;
  }
}
</style>
