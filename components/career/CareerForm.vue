<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form ref="form" @submit.prevent="handleSubmit(submitForm)">
      <b-row>
        <b-col md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="name"
            rules="required"
          >
            <b-form-input
              v-model="form.name"
              :placeholder="`${$t('form.firstName')} *`"
              :state="valid || !validated ? null : false"
            />
          </ValidationProvider>
        </b-col>

        <b-col md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="lastname"
            rules="required"
          >
            <b-form-input
              v-model="form.lastName"
              :placeholder="`${$t('form.lastName')} *`"
              :state="valid || !validated ? null : false"
            />
          </ValidationProvider>
        </b-col>

        <b-col md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="phonenumber"
            rules="required|tel"
          >
            <LazyFormTelInput
              v-model="form.phone"
              :state="valid || !validated ? null : false"
            />
          </ValidationProvider>
        </b-col>

        <b-col md="6" class="mb-8">
          <b-form-input v-model="form.city" :placeholder="$t('form.city')" />
        </b-col>

        <b-col cols="12" class="mb-16">
          <b-form-textarea
            v-model="form.message"
            :placeholder="$t('form.message')"
            maxlength="2000"
            rows="3"
          />
        </b-col>

        <b-col cols="12" class="mb-16">
          <FormFile
            :state="fileError ? false : null"
            :value="file"
            @input="handleFileInput"
          >
            <template v-if="fileError" #placeholder>
              <div class="d-flex align-items-center">
                <span class="text-danger mr-8">{{ $t('fileTooLarge') }}</span>

                <b-button
                  :aria-label="$t('clear')"
                  :title="$t('clear')"
                  size="sm"
                  variant="danger"
                  class="btn-icon rounded-pill border-0"
                  @click="handleFileInput(null)"
                >
                  <svg-icon
                    name="close-16"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  />
                </b-button>
              </div>
            </template>
          </FormFile>
        </b-col>
      </b-row>

      <b-button type="submit" variant="primary" class="mb-16" block>
        <b-spinner v-if="loading" class="mr-8" small />
        {{ $t('form.submit') }}
      </b-button>

      <ValidationProvider
        v-slot="{ valid, validate, validated }"
        name="accept"
        rules="required"
      >
        <FormAccept
          v-model="accept"
          :state="valid || !validated ? null : false"
          :unchecked-value="null"
          @input="validate"
        />
      </ValidationProvider>
      <VueRecaptcha
        ref="recaptcha"
        :sitekey="sitekey"
        size="invisible"
        @expired="onCaptchaExpired"
        @verify="onCaptchaVerified"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import { BFormInput, BFormTextarea, BSpinner } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
import { VueMaskDirective } from 'v-mask'
import { trimUrl } from '@/utils/trim-url'
import sendToMindbox from '@/utils/mindbox'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

const fileSizeLimit = 25 * 1024 * 1024

export default {
  components: {
    BFormInput,
    BFormTextarea,
    BSpinner,
    VueRecaptcha,
  },

  directives: { mask: VueMaskDirective },

  props: {
    vacancyName: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      accept: true,
      file: null,
      fileError: false,
      form: {
        city: null,
        lastName: null,
        message: null,
        name: null,
        phone: null,
      },
      loading: false,
      serviceCode: 1013,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
    }
  },

  computed: {
    apiUrl() {
      return `${process.env.REST_API_URL}/ekfgroup/form-request`
    },

    fullName() {
      return [this.form.name, this.form.lastName].join(' ')
    },

    serviceName() {
      if (!this.vacancyName) return 'Анкета со страницы Карьера в EKF'
      return `Анкета ${this.vacancyName} — Карьера в EKF`
    },
  },

  methods: {
    buildFormData() {
      const formData = new FormData()

      formData.append('_code', this.serviceCode)
      formData.append('_name', this.serviceName)

      formData.append('username', this.fullName ?? '')
      formData.append('phone', this.form.phone ?? '')
      formData.append('city', this.form.city ?? '')
      formData.append('vacancy', this.vacancyName ?? '')
      formData.append('message', this.form.message ?? '')

      /* Append page URL */
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`
      formData.append('site', pageUrl)

      /* Append attached files */
      if (this.file) {
        formData.append('inputFiles[]', this.file)
      }

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

      const { formData, pageUrl } = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const { data } = await this.$axios.post(this.apiUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        if (data?.status === 'success') {
          this.$emit('success', this.form)
          this.handleSuccess(pageUrl)
        } else throw new Error('Unknown error')
      } catch (error) {
        this.handleError(error)
      }

      this.loading = false
    },

    handleError(error) {
      const title = this.$t('form.submitErrorTitle')

      const message =
        error?.response?.statusText ||
        error?.response?.data?.message ||
        'Server error. Try later'

      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 7000,
      })
    },

    handleFileInput(event) {
      if (!event) {
        this.fileError = false
        this.file = null
      } else if (event.size <= fileSizeLimit) {
        this.fileError = false
        this.file = event
      } else {
        this.fileError = true
        this.file = null
      }
    },

    handleReset() {
      if (typeof this.$refs.form?.reset === 'function') {
        this.$refs.form.reset()
      }

      if (typeof this.$refs.observer?.reset === 'function') {
        this.$refs.observer.reset()
      }
    },

    handleSuccess(pageUrl) {
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: 3000,
      })

      sendToMindbox('EKFGroup.MobilePhoneForm', {
        customer: {
          fullName: this.fullName,
          mobilePhone: this.form?.phone || '',
          subscriptions: mindboxSubscriptions,
        },
        customerAction: {
          customFields: {
            comment: this.form?.message,
            LandingName: pageUrl,
            formName: 'Работа в EKF - отправить резюме',
          },
        },
      })

      this.handleReset()
    },
  },
}
</script>

<i18n>
{
  "en": {
    "clear": "Clear",
    "fileTooLarge": "File size cannot exceed 25 MB"
  },
  "ru": {
    "clear": "Очистить",
    "fileTooLarge": "Файл не должен быть больше 25 МБ"
  }
}
</i18n>
