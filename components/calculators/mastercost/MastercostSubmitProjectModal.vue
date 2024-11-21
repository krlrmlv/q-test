<template>
  <b-modal v-model="localVisible" size="lg" centered hide-footer hide-header>
    <template #default="{ ok, cancel }">
      <h4 class="mb-32">Разместить проект</h4>

      <b-form @submit.prevent="submitProject(ok)">
        <b-row>
          <b-col lg="6">
            <b-form-group :label="$t('formName')">
              <b-form-input
                v-model="form.name"
                type="text"
                required
              ></b-form-input>
              <b-form-text v-if="errors.name" text-variant="danger">
                {{ errors.name[0] }}
              </b-form-text>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group :label="$t('formPhonenumber')">
              <LazyFormTelInput v-model="form.phone" required />
              <b-form-text v-if="errors.phone" text-variant="danger">
                {{ errors.phone[0] }}
              </b-form-text>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group :label="$t('formEmail')">
              <b-form-input
                v-model="form.email"
                type="email"
                required
              ></b-form-input>
              <b-form-text v-if="errors.email" text-variant="danger">
                {{ errors.email[0] }}
              </b-form-text>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group :label="$t('formCity')">
              <b-form-input v-model="form.city" type="text"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group :label="$t('formComment')" class="mb-32">
          <b-form-textarea v-model="form.comment" rows="3"></b-form-textarea>
        </b-form-group>

        <b-row>
          <b-col cols="6" sm="5" lg="4">
            <b-button variant="outline-secondary" block @click="cancel">
              {{ $t('cancel') }}
            </b-button>
          </b-col>
          <b-col cols="6" sm="5" lg="4" offset-sm="2" offset-lg="4">
            <b-button type="submit" variant="primary" block>
              {{ $t('submit') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-button
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="cancel"
      >
        <span class="sr-only">{{ $t('global.close') }}</span>
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BForm,
  BFormGroup,
  BFormText,
  BFormInput,
  BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormText,
    BFormInput,
    BFormTextarea,
  },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    apiUrl: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default() {
        return false
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      form: {
        name: null,
        phone: null,
        email: null,
        city: null,
        comment: null,
      },
      errors: {},
      message: null,
      status: 'READY',
    }
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
  methods: {
    setStatus(status, message = '') {
      this.status = status
      this.message = message
    },
    submitProject(closeModal) {
      this.$axios
        .post(`${this.apiUrl}/order`, {
          ...this.form,
          rows: this.items,
          analogs: this.items,
        })
        .then((response) => {
          if (response.data.errors) {
            this.errors = response.data.errors
            this.setStatus('READY')
          } else {
            this.setStatus('DONE')
            setTimeout(() => {
              closeModal()
              this.setStatus('READY')
            }, 2000)
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.errors = error.response.data.errors
          }
          this.setStatus('READY')
        })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "cancel": "Cancel",
    "formCity": "Your city",
    "formComment": "Comment",
    "formEmail": "Your E-mail",
    "formName": "Your name",
    "formPhonenumber": "Your phone number",
    "submit": "Submit"
  },
  "ru": {
    "cancel": "Отменить",
    "formCity": "Ваш город",
    "formComment": "Комментарий",
    "formEmail": "Ваша электронная почта",
    "formName": "Ваше имя",
    "formPhonenumber": "Ваш номер телефона",
    "submit": "Отправить"
  }
}
</i18n>
