<template>
  <b-modal
    v-model="localVisible"
    centered
    hide-footer
    hide-header
    @hide="handleScroll"
  >
    <template #default="{ close }">
      <div v-if="submitSuccess">
        <h4>{{ $t('cart.preorder.success') }}</h4>
        <p>{{ $t('cart.preorder.successMessage') }}</p>
        <b-button variant="primary" class="mb-8" block @click="close">
          {{ $t('global.close') }}
        </b-button>
      </div>
      <div v-else>
        <h4 class="fs-7">{{ $t('cart.preorder.title') }}</h4>
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
                :class="index < fields.length - 1 ? 'mb-8' : 'mb-16'"
              >
                <b-form-input
                  v-mask="getMask(field)"
                  :value="form[field.name]"
                  :disabled="loading"
                  :placeholder="$t(field.placeholder)"
                  :state="valid || !validated ? null : false"
                  :type="field.type"
                  @input="handleInput($event, field.name)"
                />
              </b-form-group>
            </ValidationProvider>

            <b-button
              :disabled="loading || !accept"
              type="submit"
              variant="primary"
              class="mb-8"
              block
            >
              <b-spinner v-if="loading" class="mr-8" small />
              {{ $t('cart.order') }}
            </b-button>
            <b-form-checkbox v-model="accept">
              <span class="fs-2 lh-140 text-gray-600" v-html="acceptLabel" />
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
      </div>
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
</template>

<script>
import {
  BModal,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { VueMaskDirective } from 'v-mask'
import VueRecaptcha from 'vue-recaptcha'
import sendToMindbox from '@/utils/mindbox'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

export default {
  components: {
    BModal,
    VueRecaptcha,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BSpinner,
  },

  directives: { mask: VueMaskDirective },
  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    code: {
      type: Number,
      default: 1022,
    },
    fields: {
      type: Array,
      default: () => [
        {
          name: 'username',
          placeholder: 'form.fullName',
        },
        {
          mask: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/gim,
          name: 'phonenumber',
          placeholder: 'cart.form.phone',
          rules: 'required',
          type: 'tel',
        },
        {
          name: 'email',
          placeholder: 'cart.form.email',
          rules: 'required',
          type: 'email',
        },
        {
          name: 'city',
          placeholder: 'form.city',
        },
        {
          name: 'company',
          placeholder: 'form.company',
        },
      ],
    },
    formName: {
      type: String,
      default: 'Корзина — Оформление предзаказа',
    },
    products: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      accept: true,
      form: {},
      loading: false,
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      submitSuccess: false,
    }
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
    acceptLabel() {
      const pattern = /<%(.+)%>/gi
      return this.$t('cart.acceptDataProcessing').replace(
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
    ...mapActions('cart', ['cartDelete']),
    buildFormData() {
      /* Append user filled values */
      const formData = new FormData()
      Object.entries(this.form).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('products', JSON.stringify(this.products))

      /* Append service fields */
      formData.append('_code', this.code)
      formData.append('_name', this.formName)
      formData.append('form_name', this.formName)

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

      const { formData, pageUrl } = this.buildFormData()
      formData.append('recaptcha_token', recaptchaToken)

      try {
        const apiUrl = `${process.env.REST_API_URL}/ekfgroup/form-request`
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        const { data } = await this.$axios.post(apiUrl, formData, { headers })

        if (data?.status === 'success') {
          this.handleSuccess();
          this.$ym('reachGoal','SENDAVAILABLETOORDERFORM');
          await sendToMindbox('EKFGroup.EmailForm', {
            customerAction: {
              customFields: {
                formName:
                  'Оформить товары под заказ – форма для блока "Под заказ" в корзине',
                LandingName: pageUrl,
              },
            },
            customer: {
              email: this.form?.email,
              subscriptions: mindboxSubscriptions,
            },
          })
        } else {
          throw new Error(this.$t('form.submitError'))
        }
      } catch (error) {
        const message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          'Server error. Try later'

        this.showErrorToast(message)
      }
      this.loading = false
    },

    getMask(field) {
      if (field.type === 'tel') {
        return [
          /[+\d]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d?/,
        ]
      } else {
        return field.mask
      }
    },

    handleInput(value, field) {
      this.form[field] = value
    },

    async handleSuccess() {
      try {
        const productsToDelete = this.products.map(({ id, cart }) => ({
          product_id: id,
          solution: cart.solution,
        }))

        await this.$store.dispatch('cart/cartDeleteBulk', {
          products: productsToDelete,
        })

        this.submitSuccess = true
        this.resetForm()
      } catch (error) {
        const message = error?.response?.errors[0]?.message
        this.showErrorToast(message)
      }
    },

    handleScroll() {
      if (!this.submitSuccess) return
      setTimeout(() => {
        window.scrollTo({ top: 0 })
      }, 200)
    },

    initForm() {
      this.fields?.forEach(
        ({ name, value }) => (this.form[name] = value ?? null)
      )
    },

    resetForm() {
      this.accept = true
      this.initForm()
      if (typeof this.$refs.observer?.reset === 'function') {
        this.$refs.observer.reset()
      }
    },

    showErrorToast(message) {
      this.$bvToast.toast(message, {
        title: this.$t('global.error'),
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 5000,
      })
    },
  },
}
</script>
