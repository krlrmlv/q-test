<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      :class="{ 'form-dark': dark }"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <b-row class="mx-n4 flex-sm-nowrap">
        <b-col cols="12" sm="auto" class="px-4 flex-fill">
          <ValidationProvider
            v-slot="{ valid, validate, validated }"
            name="email"
            rules="required|email"
          >
            <b-form-group
              :state="valid || !validated ? null : false"
              class="mb-8 mb-sm-12"
            >
              <b-form-input
                v-model="email"
                :state="valid || !validated ? null : false"
                placeholder="E-mail"
                type="email"
                @input="validate"
              />
            </b-form-group>
          </ValidationProvider>
        </b-col>

        <b-col cols="12" sm="auto" xl="4" class="mb-8 mb-sm-12 px-4">
          <b-button
            :disabled="!accept"
            :variant="`${dark ? 'outline-' : ''}primary`"
            type="submit"
            block
          >
            {{ text || $t('form.subscribe') }}
          </b-button>
        </b-col>
      </b-row>

      <b-form-checkbox v-model="accept">
        <span
          :class="`text-gray-${dark ? 500 : 600}`"
          class="fs-2"
          v-html="acceptLabel"
        />
      </b-form-checkbox>

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
import { BFormCheckbox, BFormGroup, BFormInput } from 'bootstrap-vue'
import VueRecaptcha from 'vue-recaptcha'

import sendToMindbox from '@/utils/mindbox'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    VueRecaptcha,
  },

  props: {
    text: {
      type: String,
      default: null,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      accept: true,
      email: null,
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
    minboxEventName() {
      if (this.footer) return 'Online.Subscriptions'
      else return 'Online.Subscriptions.News'
    },
  },

  methods: {
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },

    onCaptchaVerified(recaptchaToken) {
      this.sendFormData(recaptchaToken)
    },

    onSubmit() {
      this.$refs.recaptcha.execute()
    },

    async sendFormData(recaptchaToken) {
      try {
        const apiUrl = `${process.env.REST_API_URL}/check-recaptcha`
        const formData = new FormData()
        formData.append('recaptcha_token', recaptchaToken)

        const { data } = await this.$axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        if (data.ok) {
          await sendToMindbox(this.minboxEventName, {
            customer: {
              email: this.email,
              subscriptions: mindboxSubscriptions,
            },
          })

          this.$gtm.push({ event: 'subscribeNews' })
          this.$emit('submit')
          this.email = null

          this.showToast({
            message: this.$t('form.submitSuccess'),
            title: this.$t('form.submitSuccessTitle'),
            variant: 'success',
          })
        } else {
          this.showToast({
            message: this.$t('error.tryAgain'),
            title: this.$t('global.error'),
            variant: 'danger',
          })
        }
      } catch (error) {
        const message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          this.$t('error.serverTryLater')

        this.showToast({
          message,
          title: this.$t('global.error'),
          variant: 'danger',
        })
      }
    },

    showToast({ message, title, variant }) {
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        variant,
        autoHideDelay: 3000,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.accept-label {
  font-size: $font-size-2;
  color: $gray-600;
}
</style>
