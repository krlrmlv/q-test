<template>
  <div class="footer-subscribe">
    <p class="h7 d-none d-sm-block mb-8">
      {{ $t('form.footerSubscribeLabel') }}
    </p>

    <NewsFormSubscribe class="d-none d-sm-block" dark footer />

    <div class="d-flex d-sm-none align-items-center fs-2 text-gray-500">
      <span class="text-white mr-8">
        <svg-icon name="mail-24" width="24" height="24" />
      </span>
      <b-link class="text-reset" @click="modalVisible = !modalVisible">
        {{ $t('form.subscribe') }}
      </b-link>
    </div>

    <b-modal v-model="modalVisible" centered hide-footer hide-header>
      <template #default="{ ok, close }">
        <h4 class="text-center mb-32">{{ $t('form.subscribeToNews') }}</h4>

        <NewsFormSubscribe footer @submit="ok" />

        <b-button
          :title="$t('global.close')"
          :aria-label="$t('global.close')"
          size="sm"
          variant="white"
          class="btn-icon modal-close text-secondary rounded-pill"
          @click="close"
        >
          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  data() {
    return {
      modalVisible: false,
      mindboxCustomFields: {
        formName: 'Подписка на новости - сквозная форма в футере',
        EKFFormID: 'podpiska_na_novosti_skvoznaya_forma_v_futere',
      },
    }
  },
}
</script>
