<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <b-row>
        <b-col v-if="showQuestions" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="question"
            rules="required"
          >
            <b-form-select
              v-model="form.questionValue"
              :disabled="loading"
              :options="questions"
              :state="valid || !validated ? null : false"
              @change="validate"
            />
          </ValidationProvider>
        </b-col>
      </b-row>

      <b-row :class="{ 'mb-16': disableFileUpload }">
        <b-col md="6" class="mb-8">
          <b-form-input
            v-model="form.fullName"
            :placeholder="$t('form.fullName')"
          />
        </b-col>

        <b-col md="6" class="mb-8">
          <b-form-input v-model="form.city" :placeholder="$t('form.city')" />
        </b-col>

        <b-col md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="phonenumber"
            rules="required|tel"
          >
            <LazyFormTelInput
              v-model="form.phonenumber"
              :state="valid || !validated ? null : false"
            />
          </ValidationProvider>
        </b-col>

        <b-col v-if="isDocumentsLayout" md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="country"
            rules="required"
          >
            <b-form-input
              v-model="form.country"
              :placeholder="`${$t('form.country')} *`"
              :state="valid || !validated ? null : false"
            />
          </ValidationProvider>
        </b-col>

        <b-col md="6" class="mb-8">
          <ValidationProvider
            v-slot="{ valid, validated }"
            name="email"
            rules="required|email"
          >
            <b-form-input
              v-model="form.email"
              :placeholder="`${$t('form.email')} *`"
              :state="valid || !validated ? null : false"
              type="email"
            />
          </ValidationProvider>
        </b-col>

        <b-col cols="12" class="mb-16">
          <b-form-textarea
            v-model="form.message"
            :placeholder="$t('form.message')"
            rows="3"
          />
        </b-col>
      </b-row>

      <b-row v-if="!disableFileUpload" align-v="center" class="mb-8">
        <b-col class="mb-8">
          <FormFile v-model="form.files" multiple />
        </b-col>
      </b-row>

      <b-button
        type="submit"
        variant="primary"
        class="mb-16"
        :disabled="!form.accept"
        block
      >
        <b-spinner v-if="loading" class="mr-8" small />
        {{ $t(`form.${submitVariant}`) }}
      </b-button>

      <ValidationProvider
        v-if="!disableFormAccept"
        v-slot="{ valid, validate, validated }"
        name="accept"
        rules="required"
      >
        <FormAccept
          v-model="form.accept"
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
import { BFormInput, BFormSelect, BFormTextarea, BSpinner } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
import sendToMindbox from '@/utils/mindbox'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

export default {
  components: {
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BSpinner,
    VueRecaptcha,
  },

  props: {
    code: {
      type: [Number, String],
      default: null,
    },
    disableFileUpload: {
      type: Boolean,
      default: false,
    },
    disableFormAccept: {
      type: Boolean,
      default: false,
    },
    disableMindbox: {
      type: Boolean,
      default: false,
    },
    formName: {
      type: String,
      default: '',
    },
    gtmEvent: {
      type: String,
      default: null,
    },
    mindboxCustomFields: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      form: {
        accept: true,
        email: null,
        files: null,
        fullName: null,
        city: null,
        country: null,
        message: null,
        phonenumber: null,
        questionValue: null,
      },
      loading: false,
      showQuestions: true,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      questions: [
        {
          disabled: true,
          text: `– ${this.$t('form.selectQuestion')} –`,
          value: null,
        },
        {
          text: this.$t('form.questions.products'),
          value: 282,
        },
        {
          text: this.$t('form.questions.error'),
          value: 380,
        },
        {
          text: this.$t('form.questions.review'),
          value: 1027,
        },
        {
          text: this.$t('form.questions.supplier'),
          value: 581,
        },
        {
          text: this.$t('form.questions.distributor'),
          value: 1028,
        },
        {
          text: this.$t('form.questions.job'),
          value: 5,
        },
        {
          text: this.$t('form.questions.training'),
          value: 111,
        },
        {
          text: this.$t('form.questions.project'),
          value: 71,
        },
        {
          text: this.$t('form.questions.other'),
          value: 680,
        },
      ],
    }
  },

  computed: {
    submitVariant() {
      return this.isDocumentsLayout ? 'submitReport' : 'submit'
    },

    isDocumentsLayout() {
      return this.$root?.layoutName === 'documents'
    },

    selectedQuestion() {
      const formCode = this.code ?? this.form?.questionValue
      if (!formCode) return {}

      return this.questions.find(({ value }) => value === formCode)
    },

    mindboxFields() {
      const formName = this.mindboxCustomFields?.formName || ''

      return this.selectedQuestion?.text
        ? {
            ...this.mindboxCustomFields,
            formName: `${formName} - ${this.selectedQuestion?.text}`,
          }
        : this.mindboxCustomFields
    },
  },

  created() {
    if (this.code) this.showQuestions = false
  },

  methods: {
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },

    onCaptchaVerified(recaptchaToken) {
      this.sendFormData(recaptchaToken)
    },

    submitForm() {
      this.$refs.recaptcha.execute()
    },

    onSuccess() {
      this.$gtm.push({ event: 'frmFeedback' })
      if (this.gtmEvent) {
        this.$gtm.push({ event: this.gtmEvent })
      }
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: 3000,
      })
      this.resetForm()
    },

    resetForm() {
      this.form = {
        accept: true,
        email: null,
        files: null,
        fullName: null,
        city: null,
        country: null,
        message: null,
        phonenumber: null,
        questionValue: null,
      }
    },

    showErrorToast(title, message) {
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 7000,
      })
    },

    async sendFormData(recaptchaToken = null) {
      if (this.loading) return
      this.loading = true

      const { formData, pageUrl } = this.buildFormData()
      const apiUrl = `${process.env.REST_API_URL}/ekfgroup/form-request`

      formData.append('recaptcha_token', recaptchaToken)

      try {
        const { data } = await this.$axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        if (data?.status === 'success') {
          this.$emit('success', this.form)
          if (this.form?.accept && !this.disableMindbox) {
            await sendToMindbox('EKFGroup.EmailForm', {
              customer: {
                fullName: this.form.fullName,
                email: this.form.email,
                mobilePhone: this.form.phonenumber || '',
                subscriptions: mindboxSubscriptions,
              },
              customerAction: {
                customFields: {
                  ...this.mindboxFields,
                  comment: this.form?.message,
                  LandingName: pageUrl,
                },
              },
            })
          }

          this.onSuccess()
        } else {
          this.showErrorToast(
            this.$t('form.submitErrorTitle'),
            this.$t('form.submitError')
          )
        }
        this.loading = false
      } catch (error) {
        const title = this.$t('form.submitErrorTitle')
        const message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          'Server error. Try later'
        this.showErrorToast(title, message)
        this.loading = false
      }
    },
    buildFormData() {
      const formData = new FormData()

      formData.append('username', this.form.fullName)
      formData.append('city', this.form.city)
      formData.append('country', this.form.country || '')
      formData.append('phone', this.form.phonenumber || '')
      formData.append('email', this.form.email)
      formData.append('message', this.form.message || '')

      formData.append('_code', this.code || this.selectedQuestion?.value)
      formData.append('_type', this.selectedQuestion?.text || '')
      formData.append('_name', this.formName || '')

      /* Append page URL */
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`
      formData.append('site', pageUrl)

      /* Append attached files */
      if (!this.disableFileUpload && this.form.files?.length) {
        this.form.files.forEach((file) => {
          formData.append('inputFiles[]', file)
        })
      }

      /* Append UTM params */
      const utmParams = this.$utm.get()
      Object.keys(utmParams).forEach((key) =>
        formData.append(key, utmParams[key])
      )

      return { formData, pageUrl }
    },
  },
}
</script>
