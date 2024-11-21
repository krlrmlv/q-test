<template>
  <div>
    <b-modal
      v-model="modalShow"
      body-class="px-20 py-40 p-lg-64"
      footer-class="p-0"
      centered
      hide-header
    >
      <h2 class="h4 mb-5 callback">Оставить заявку</h2>
      <ValenciaForm
        class="valencia-modal"
        mindbox-form-name="Оставить заявку- Форма в попапе"
        @modal-sent="$emit('modal-sent')"
      />
      <template #modal-footer="{ ok }">
        <b-button
          variant="white"
          class="btn-round btn-close w-auto close-btn-modal p-20"
          @click="ok"
        >
          <svg-icon name="close-24" width="20" height="20" />
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: {
    BModal,
  },
  model: {
    prop: 'value',
    event: 'toggle',
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  computed: {
    modalShow: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('toggle', newValue)
      },
    },
  },
}
</script>

<style lang="scss">
$valencia-brown: #3d2f31;

.callback {
  font-weight: $font-weight-bold;
  text-align: center;
  color: $valencia-brown;
}

.close-btn-modal {
  position: absolute;
  top: 0;
  right: 0;
}

.valencia-modal {
  .file-btn-valencia {
    .custom-file-label {
      border: 1px solid $valencia-brown;
      color: $valencia-brown;
      background-color: $white;
      @include media-breakpoint-down(md) {
        background-position: left 5rem center;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .callback {
    font-size: $h3-font-size;
  }
}
</style>
