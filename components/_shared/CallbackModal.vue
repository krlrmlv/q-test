<template>
  <b-modal v-model="localVisible" centered hide-footer hide-header>
    <template #default="{ close }">
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <form @submit.prevent="handleSubmit(submitForm)">
          <div class="mb-32">
            <h4 v-text="$t('feedback.requestCallback')" />
            <p class="fs-2" v-text="$t('feedback.modalSubtitle')" />
          </div>

          <b-row class="mx-n4">
            <b-col md="12" class="mb-8 px-4">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="firstName"
                rules="required"
                slim
              >
                <b-form-input
                  v-model="firstName"
                  :placeholder="$t('form.firstName')"
                  :state="valid || !validated ? null : false"
                />
              </ValidationProvider>
            </b-col>

            <b-col cols="12" class="mb-8 px-4">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="phonenumber"
                rules="required|tel"
                slim
              >
                <LazyFormTelInput
                  v-model="phonenumber"
                  :state="valid || !validated ? null : false"
                />
              </ValidationProvider>
            </b-col>
          </b-row>

          <div class="mb-8">
            <b-form-textarea
              v-model="message"
              :placeholder="$t('form.message')"
              rows="2"
            />
          </div>

          <b-button
            :disabled="!accept"
            type="submit"
            variant="primary"
            class="mb-8"
            block
          >
            {{ $t('feedback.requestCallback') }}
          </b-button>
        </form>
      </ValidationObserver>

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

      <b-form-checkbox v-model="accept">
        <span class="fs-2 text-gray-600" v-html="acceptLabel" />
      </b-form-checkbox>
      <VueRecaptcha
        ref="recaptcha"
        :sitekey="sitekey"
        size="invisible"
        @expired="onCaptchaExpired"
        @verify="onCaptchaVerified"
      />
    </template>
  </b-modal>
</template>

<script>
import { BModal, BFormCheckbox, BFormInput, BFormTextarea } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
import sendToMindbox from '@/utils/mindbox'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

const BITRIX_FORM_CODE = 42

export default {
  components: {
    BModal,
    BFormCheckbox,
    BFormInput,
    BFormTextarea,
    VueRecaptcha,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      accept: true,
      email: '',
      firstName: null,
      mindboxCustomFields: {
        formName: 'Заказ звонка - форма в попапе',
        EKFFormID: 'zakaz_zvonka_forma_v_popape',
      },
      loading: false,
      message: '',
      phonenumber: '',
      sitekey: process.env.RECAPTCHA_SITE_KEY,
    }
  },

  computed: {
    acceptLabel() {
      const pattern = /<%(.+)%>/gi
      return this.$t('form.acceptDataProcessing').replace(
        pattern,
        `<a href="${this.localePath(
          '/legal/data-consent'
        )}" target="_blank" class="text-reset text-underline">$1</a>`
      )
    },

    fullName() {
      return this.firstName
    },

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
    buildFormData() {
      const formData = new FormData()

      formData.append('username', this.fullName)
      formData.append('phone', this.phonenumber)
      formData.append('email', this.email)
      formData.append('message', this.message)

      formData.append('_code', BITRIX_FORM_CODE)
      formData.append('_email', '')
      formData.append('_type', 'Перезвоните мне')
      formData.append('department', 'Перезвоните мне')
      formData.append('_name', 'Перезвоните мне')

      /* Append page URL */
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`
      formData.append('site', pageUrl)

      /* Append UTM params */
      const utmParams = this.$utm.get()
      Object.keys(utmParams).forEach((key) =>
        formData.append(key, utmParams[key])
      )
      return { formData, pageUrl }
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    onCaptchaVerified(recaptchaToken) {
      this.sendFormData(recaptchaToken)
    },
    submitForm() {
      this.$refs.recaptcha.execute()
    },
    async sendFormData(recaptchaToken = null) {
      if (this.loading) return
      this.loading = true

      const apiUrl = `${process.env.REST_API_URL}/ekfgroup/form-request`
      const { formData, pageUrl } = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const { data } = await this.$axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        if (data?.status === 'success') {
          if (this.accept) {
            await sendToMindbox('EKFGroup.MobilePhoneForm', {
              customerAction: {
                customFields: {
                  ...this.mindboxCustomFields,
                  LandingName: pageUrl,
                  comment: this.message,
                },
              },
              customer: {
                fullName: this.fullName,
                mobilePhone: this.phonenumber?.replace(/[\s\-()]/g, ''),
                subscriptions: mindboxSubscriptions,
              },
            })
          }
          this.handleSuccess()
        } else {
          this.showErrorToast(
            this.$t('form.submitErrorTitle'),
            this.$t('form.submitError')
          )
        }
      } catch (error) {
        const title = this.$t('form.submitErrorTitle')
        const message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          'Server error. Try later'
        this.showErrorToast(title, message)
      } finally {
        this.loading = false
        this.localVisible = false
      }
    },

    handleSuccess() {
      this.$gtm.push({ event: 'frmCall' })
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: 3000,
      })
      this.resetForm()
    },

    resetForm() {
      this.accept = true
      this.email = ''
      this.firstName = null
      this.message = ''
      this.phonenumber = ''
    },

    showErrorToast(title, message) {
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 7000,
      })
    },
  },
}
</script>
