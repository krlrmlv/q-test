<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
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
      <ValidationProvider
        v-slot="{ valid, validated }"
        mode="eager"
        name="phone"
        rules="required|tel"
      >
        <b-form-group class="mb-8">
          <LazyFormTelInput
            v-model="form.phone"
            :state="valid || !validated ? null : false"
          />
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ valid, validated }"
        mode="eager"
        name="email"
        rules="required|email"
      >
        <b-form-group class="mb-24">
          <b-form-input
            v-model="form.email"
            :placeholder="$t('form.email')"
            :state="valid || !validated ? null : false"
            type="email"
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
import { BFormCheckbox, BFormGroup, BFormInput, BSpinner } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'
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

  data() {
    return {
      accept: true,
      form: {
        _code: 1001,
        _email: 'project@ekf.su',
        _name:
          'Страницы проектировщики | Заявка на разработку технического решения',
        email: null,
        phone: null,
        username: null,
      },
      loading: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      mindboxCustomFields: {
        formName: 'Форма - сопровождаем на всех этапах проекта',
        EKFFormID: 'forma_soprovozhdaem_na_vsex_etapax_proekta',
        cKGname: ['Проектировщик'],
      },
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

      const { formData, pageUrl } = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const url = `${process.env.REST_API_URL}/ekfgroup/form-request`
        const { data } = await this.$axios.post(url, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        if (data?.status === 'success') {
          this.handleSuccess(pageUrl)
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
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`
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
      return { formData, pageUrl }
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

    async handleSuccess(pageUrl) {
      this.$gtm.push({ event: 'frmProjectOrder' })
      this.$ym('reachGoal', 'FORMPROJECTORDER')

      await sendToMindbox('EKFGroup.EmailForm', {
        customer: {
          fullName: this.form.username,
          email: this.form.email,
          mobilePhone: this.form.phone || '',
          subscriptions: mindboxSubscriptions,
        },
        customerAction: {
          customFields: {
            ...this.mindboxCustomFields,
            LandingName: pageUrl,
          },
        },
      })

      const delay = 3000
      this.$bvToast.toast(this.$t('form.submitSuccess'), {
        title: this.$t('form.submitSuccessTitle'),
        toaster: 'b-toaster-bottom-right',
        variant: 'success',
        autoHideDelay: delay,
      })
      setTimeout(() => {
        this.resetForm()
        this.$emit('submit')
      }, delay)
    },

    resetForm() {
      this.form = {
        _code: 1001,
        _email: 'project@ekf.su',
        _name:
          'Страницы проектировщики | Заявка на разработку технического решения',
        email: null,
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
