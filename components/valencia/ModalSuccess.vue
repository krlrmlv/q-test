<template>
  <b-modal
    v-model="modalSuccessShow"
    modal-class="text-center pb-0"
    body-class="pb-0"
    title=""
    centered
    hide-header
  >
    <h3 class="success-title">Заявка успешно отправлена</h3>
    <p class="fs-4 success-p">
      Наш специалист свяжется с вами <br />
      в&nbsp;ближайшее время
    </p>
    <template #modal-footer="{ ok }">
      <b-row class="flex-fill justify-content-center">
        <b-col sm="12">
          <b-button class="w-100 back-to-site" @click="ok">
            Вернутся к сайту
          </b-button>
        </b-col>
      </b-row>
      <b-button
        variant="white"
        class="btn-round btn-close w-auto d-lg-none close-btn-modal p-20"
        @click="ok"
      >
        <svg-icon name="close-24" width="20" height="20" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: {
    BModal,
  },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  computed: {
    modalSuccessShow: {
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

<style lang="scss">
$valencia-brown: #3d2f31;

.success-title {
  color: $valencia-brown;
}

.back-to-site {
  background-color: $valencia-brown;
  border-color: $valencia-brown;
  &:hover {
    background-color: $valencia-brown;
  }

  &:active {
    background-color: $valencia-brown;
  }
}

.modal-footer {
  border: 0;
  padding: 4rem;
  padding-top: 1rem;
}

.success-p {
  color: #524f4f;
}
</style>
