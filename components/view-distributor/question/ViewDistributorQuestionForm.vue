<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <b-row class="mx-n4">
        <b-col cols="12" sm="6" class="px-4">
          <ValidationProvider
            v-slot="{ valid, validated }"
            mode="eager"
            name="username"
            rules="required"
          >
            <b-form-group class="mb-8">
              <b-form-input
                v-model="form.username"
                :placeholder="$t('form.fullName')"
                :state="valid || !validated ? null : false"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col cols="12" sm="6" class="px-4">
          <ValidationProvider
            v-slot="{ valid, validated }"
            mode="eager"
            name="phone"
            rules="required"
          >
            <b-form-group class="mb-8">
              <b-form-input
                v-model="form.phone"
                :placeholder="$t('form.phone')"
                :state="valid || !validated ? null : false"
                type="tel"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>

      <ValidationProvider
        v-slot="{ valid, validated }"
        mode="eager"
        name="message"
        rules="required"
      >
        <b-form-group class="mb-24">
          <b-form-textarea
            v-model="form.message"
            :placeholder="$t('form.message')"
            :state="valid || !validated ? null : false"
            rows="3"
          />
        </b-form-group>
      </ValidationProvider>
      <b-row>
        <b-col cols="12" sm="auto" class="mb-16">
          <b-button type="submit" variant="primary" block>
            <b-spinner v-if="loading" class="mr-8" small />
            {{ $t('form.submit') }}
          </b-button>
        </b-col>
      </b-row>

      <ValidationProvider
        v-slot="{ valid, validated }"
        mode="eager"
        name="accept"
        rules="required"
      >
        <b-form-checkbox
          v-model="accept"
          :state="valid || !validated ? null : false"
          :unchecked-value="null"
        >
          <span
            :class="valid || !validated ? 'text-gray-600' : 'text-danger'"
            class="fs-2"
            v-html="acceptLabel"
          />
        </b-form-checkbox>
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
import {
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BSpinner,
} from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BSpinner,
    VueRecaptcha,
  },

  data() {
    return {
      accept: true,
      form: {
        _code: 1024,
        _email: 'project@ekf.su',
        _name: 'Страницы дистрибьюторы | Вопрос',
        message: null,
        phone: null,
        username: null,
      },
      loading: false,
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
    async sendFormData(recaptchaToken = null) {
      if (this.loading) return
      this.loading = true

      const formData = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const url = `${process.env.REST_API_URL}/ekfgroup/form-request`
        const { data } = await this.$axios.post(url, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        if (data?.status === 'success') {
          this.handleSuccess()
        } else {
          this.handleError()
        }
      } catch (error) {
        this.handleError(error)
      }

      this.loading = false
    },

    buildFormData() {
      const formData = new FormData()
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] || '')
      })
      /* Append page URL */
      const baseUrl = process.env.SITE_URL
        ? process.env.SITE_URL.endsWith('/')
          ? process.env.SITE_URL.slice(0, -1)
          : process.env.SITE_URL
        : ''
      const pageUrl = `${baseUrl}${this.$route.fullPath}`
      formData.append('site', pageUrl)
      /* Append attached files */
      if (this.files?.length) {
        this.files.forEach((file) => {
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

    handleError(error) {
      let message
      const title = this.$t('form.submitErrorTitle')
      if (error) {
        message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          'Server error. Try later'
      } else {
        message = this.$t('form.submitError')
      }
      this.showErrorToast(title, message)
    },

    async handleSuccess() {
      this.$gtm.push({ event: 'frmProjectQuestion' })
      this.$ym('reachGoal', 'FORMPROJECTQUESTION')

      await sendToMindbox('VoprosNaStraniceProektirovshhiki', {
        customer: {
          fullName: this.form?.username,
          email: this.form?.email,
          mobilePhone: this.form?.phone || '',
          customFields: {
            ckg: 'proektnyj-institut',
          },
          subscriptions: [{ pointOfContact: 'SMS', topic: 'ekfgroup' }],
        },
      })

      const delay = 3000
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: delay,
      })
      this.resetForm()
      this.$emit('submit')
    },

    resetForm() {
      this.form = {
        _code: 1002,
        _email: 'project@ekf.su',
        _name: 'Страницы проектировщики | Вопрос',
        message: null,
        phone: null,
        username: null,
      }
      this.$refs.observer?.reset()
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
