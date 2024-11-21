<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(submitForm)">
      <ValidationProvider
        v-slot="{ valid, validated }"
        name="type"
        rules="required"
        slim
      >
        <b-form-group
          :invalid-feedback="$t('errorReport.form.typeFeedback')"
          :state="valid || !validated ? null : false"
          class="mb-8"
        >
          <b-form-select
            v-model="form.errorType"
            :options="errorTypes"
            :state="valid || !validated ? null : false"
          />
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ valid, validate, validated, failedRules }"
        :rules="`required|max:${commentMaxLength}`"
        name="comment"
        slim
      >
        <b-form-group
          :invalid-feedback="getCommentFeedback(failedRules)"
          :state="valid || !validated ? null : false"
          class="mb-8"
        >
          <b-form-textarea
            v-model="form.comment"
            :maxlength="commentMaxLength"
            :placeholder="$t('errorReport.form.commentPlaceholder')"
            :state="valid || !validated ? null : false"
            rows="5"
            @input="validate"
          />
        </b-form-group>
      </ValidationProvider>

      <div class="mb-32">
        <b-form-checkbox v-model="contactMe" class="mb-16">
          {{ $t('errorReport.form.contactMe') }}
        </b-form-checkbox>

        <transition name="fade">
          <b-row v-if="contactMe" class="mx-n4">
            <b-col cols="6" class="px-4">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="name"
                slim
              >
                <b-form-group
                  :invalid-feedback="$t('errorReport.form.requiredFeedback')"
                  :state="valid || !validated ? null : false"
                  class="mb-8"
                >
                  <b-form-input
                    v-model="form.name"
                    :placeholder="$t('errorReport.form.namePlaceholder')"
                    :state="valid || !validated ? null : false"
                  />
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="6" class="px-4">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="phone"
                rules="required|tel"
              >
                <b-form-group
                  :invalid-feedback="$t('errorReport.form.requiredFeedback')"
                  class="mb-8"
                >
                  <LazyFormTelInput
                    v-model="form.phone"
                    :state="valid || !validated ? null : false"
                  />
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
        </transition>
      </div>

      <b-button
        :disabled="!accept"
        type="submit"
        variant="primary"
        class="mb-8"
        block
      >
        <b-spinner v-if="loading" class="mr-8" small />
        {{ $t('form.submit') }}
      </b-button>

      <ValidationProvider
        v-slot="{ valid, validated }"
        name="accept"
        rules="required"
        slim
      >
        <b-form-group
          :invalid-feedback="$t('errorReport.form.acceptFeedback')"
          :state="valid || !validated ? null : false"
          class="mb-0"
        >
          <b-form-checkbox
            v-model="accept"
            :state="valid || !validated ? null : false"
            :unchecked-value="null"
          >
            <span>
              {{ $t('errorReport.form.acceptTerms') }}
              <b-link
                :to="localePath('/legal/user-agreement')"
                target="_blank"
                class="text-reset text-underline"
                >{{ $t('errorReport.form.acceptAgreement') }}</b-link
              >
            </span>
          </b-form-checkbox>
        </b-form-group>
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
import VueRecaptcha from 'vue-recaptcha'
import {
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
  BSpinner,
} from 'bootstrap-vue'

const ERROR_REPORT_CODE = 380

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BSpinner,
    VueRecaptcha,
  },

  props: {
    selection: {
      type: null,
      default: null,
    },
  },

  data() {
    return {
      accept: true,
      commentMaxLength: 10000,
      contactMe: false,
      errorTypes: [
        {
          value: null,
          text: `– ${this.$t('errorReport.form.typePlaceholder')} –`,
          disabled: true,
        },
        {
          value: 'specification',
          text: this.$t('errorReport.form.typeSpecification'),
        },
        {
          value: 'image',
          text: this.$t('errorReport.form.typeImage'),
        },
        {
          value: 'name',
          text: this.$t('errorReport.form.typeName'),
        },
        {
          value: 'price',
          text: this.$t('errorReport.form.typePrice'),
        },
        {
          value: 'other',
          text: this.$t('errorReport.form.typeOther'),
        },
      ],
      form: {
        comment: null,
        phone: '',
        name: '',
        errorType: null,
      },
      loading: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
    }
  },

  computed: {
    selectedErrorType() {
      return (
        this.errorTypes?.find(({ value }) => value === this.form?.errorType)
          ?.text || ''
      )
    },

    selectionText() {
      return this.selection?.toString()
    },
  },

  watch: {
    selectionText: {
      immediate: true,
      handler(event) {
        if (event?.length)
          this.form.comment = `${this.$t(
            'errorReport.form.selectionPrefix'
          )} "${event}"`
      },
    },
  },

  methods: {
    buildFormData() {
      const message = this.form.comment || ''

      const formData = new FormData()
      formData.append('username', this.form.name)
      formData.append('phone', this.form.phone)
      formData.append('message', message)
      formData.append('errorType', this.selectedErrorType)

      formData.append('_code', ERROR_REPORT_CODE)
      formData.append('_type', 'Сообщить об ошибке на сайте')
      formData.append('department', 'Ошибка на сайте')
      formData.append('_name', 'Сообщение об ошибке через Ctrl + Enter')

      /* Append page URL */
      const baseUrl = process.env.SITE_URL
        ? process.env.SITE_URL.endsWith('/')
          ? process.env.SITE_URL.slice(0, -1)
          : process.env.SITE_URL
        : ''
      const pageUrl = `${baseUrl}${this.$route.fullPath}`
      formData.append('site', pageUrl)

      /* Append attached files */
      if (this.form.files && this.form.files.length) {
        this.form.files.forEach((file) => {
          formData.append('inputFiles[]', file)
        })
      }

      /* Append UTM params */
      const utmParams = this.$utm.get()
      Object.keys(utmParams).forEach((key) =>
        formData.append(key, utmParams[key])
      )
      return formData
    },
    getCommentFeedback(failedRules) {
      if (failedRules.max)
        return `${this.$t('errorReport.form.maxLengthFeedback')} ${
          this.commentMaxLength
        }`
      return this.$t('errorReport.form.requiredFeedback')
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
      const formData = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const { data } = await this.$axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        if (data?.status === 'success') {
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

    onSuccess() {
      this.$gtm.push({ event: 'frmFeedback' })
      this.$gtm.push({ event: 'frmReportBug' })
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: 3000,
      })
      this.resetForm()
      this.$emit('submit')
    },

    resetForm() {
      this.form = {
        comment: null,
        phone: '',
        name: '',
        errorType: null,
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
  },
}
</script>
