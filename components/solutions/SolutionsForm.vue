<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <ValidationProvider
        v-for="(field, index) in fields"
        v-slot="{ valid, validated }"
        :key="`field-${index}`"
        :name="field.name"
        :rules="field.rules"
        mode="eager"
      >
        <b-form-group
          :invalid-feedback="field.invalidFeedback"
          :class="index < fields.length - 1 ? 'mb-8' : 'mb-24'"
        >
          <LazyFormTelInput
            v-if="field.type === 'tel'"
            v-model="form[field.name]"
            :state="valid || !validated ? null : false"
          />
          <b-form-input
            v-else
            :value="form[field.name]"
            :disabled="loading"
            :placeholder="$t(field.placeholder)"
            :state="valid || !validated ? null : false"
            :type="field.type"
            @input="handleInput($event, field.name)"
          />
        </b-form-group>
      </ValidationProvider>

      <b-row class="mb-16">
        <b-col cols="12" :md="bannerForm ? 'auto' : null">
          <b-button
            :disabled="loading || !accept"
            type="submit"
            variant="primary"
            block
          >
            <b-spinner v-if="loading" class="mr-8" small />
            {{ submitLabel || $t('form.submit') }}
          </b-button>
        </b-col>
      </b-row>

      <b-form-checkbox v-model="accept">
        <span class="fs-2 lh-140 text-gray-600" v-html="acceptLabel" />
      </b-form-checkbox>

      <VueRecaptcha
        ref="recaptcha"
        :sitekey="sitekey"
        size="invisible"
        @expired="handleCaptchaExpired"
        @verify="handleCaptchaVerified"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import { BFormCheckbox, BFormGroup, BFormInput, BSpinner } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters } from 'vuex'
import sendToMindbox from '@/utils/mindbox'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BSpinner,
    VueRecaptcha,
  },

  props: {
    bannerForm: {
      type: Boolean,
      default: false,
    },
    code: {
      type: Number,
      default: 1012,
    },
    fields: {
      type: Array,
      default: () => [
        {
          name: 'username',
          placeholder: 'form.fullName',
          rules: 'required',
        },
        {
          name: 'phonenumber',
          placeholder: '',
          rules: 'required|tel',
          type: 'tel',
        },
        {
          name: 'company',
          placeholder: 'form.company',
          rules: 'required',
        },
      ],
    },
    formName: {
      type: String,
      default: 'Решения — Бесплатный расчет проекта',
    },
    industryPage: {
      type: Boolean,
      default: false,
    },
    mindboxCustomFields: {
      type: Object,
      default: () => ({}),
    },
    submitLabel: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      accept: true,
      form: {},
      loading: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
    }
  },

  computed: {
    ...mapGetters('geo', ['selectedLocationName']),
    ...mapGetters('solutions', { metrikaGoal: 'currentCategoryMetrikaGoal' }),

    acceptLabel() {
      const pattern = /<%(.+)%>/gi

      return this.$t('form.acceptDataProcessing').replace(
        pattern,
        `<a href="${this.localePath(
          '/legal/data-consent'
        )}" target="_blank" class="text-reset text-underline">$1</a>`
      )
    },
  },

  created() {
    this.initForm()
  },

  methods: {
    analyticEvents() {
      this.$ym('reachGoal', 'SENDFORMSOLUTIONS')

      if (this.metrikaGoal) {
        /* Reach additional YM goal if set for current category */

        this.$ym('reachGoal', this.metrikaGoal)
      }
    },

    async sendFormData(recaptchaToken = null) {
      if (this.loading) return

      this.loading = true

      const { formData, pageUrl } = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const apiUrl = `${process.env.REST_API_URL}/ekfgroup/form-request`
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        const { data } = await this.$axios.post(apiUrl, formData, { headers })

        if (data?.status === 'success') {
          this.$emit('success', this.form)
          this.handleSuccess(pageUrl)
        } else {
          throw new Error(this.$t('form.submitError'))
        }
      } catch (error) {
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
      }

      this.loading = false
    },

    buildFormData() {
      /* Append user filled values */
      const formData = new FormData()
      const formCode = this.industryPage ? 1026 : this.code

      Object.entries(this.form).forEach(([key, value]) => {
        formData.append(key, value)
      })

      /* Append service fields */
      formData.append('_code', formCode)
      formData.append('_name', this.formName)
      formData.append('form_name', this.formName)
      formData.append('geo', this.selectedLocationName)

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

    handleCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },

    handleCaptchaVerified(recaptchaToken) {
      this.sendFormData(recaptchaToken)
    },

    handleInput(value, field) {
      this.form[field] = value
    },

    async handleSuccess(pageUrl) {
      if (this.industryPage) {
        this.$emit('submit')
      } else {
        this.analyticEvents()
        this.$bvToast.toast(this.$t('form.submitSuccess'), {
          title: this.$t('form.submitSuccessTitle'),
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
          autoHideDelay: 3000,
        })
      }

      const event = this.form?.email ? 'EmailForm' : 'MobilePhoneForm'
      await sendToMindbox('EKFGroup.' + event, {
        customer: {
          fullName: this.form.username,
          email: this.form.email,
          mobilePhone: this.form.phonenumber ?? '',
          subscriptions: mindboxSubscriptions,
          customFields: {
            company: this.form.company ?? '',
            geocity: this.selectedLocationName ?? '',
          },
        },
        customerAction: {
          customFields: {
            ...this.mindboxCustomFields,
            LandingName: pageUrl,
          },
        },
      })

      this.resetForm()
    },

    initForm() {
      this.fields?.forEach(
        ({ name, value }) => (this.form[name] = value ?? null)
      )
    },

    submitForm() {
      if (!this.industryPage) this.$ym('reachGoal', 'CLICKFORMSOLUTIONS')
      this.$refs.recaptcha.execute()
    },

    resetForm() {
      this.accept = true
      this.initForm()

      if (typeof this.$refs.observer?.reset === 'function') {
        this.$refs.observer.reset()
      }
    },
  },
}
</script>
