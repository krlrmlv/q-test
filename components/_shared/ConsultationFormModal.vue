<template>
  <b-modal
    :id="id"
    v-model="localVisible"
    centered
    hide-footer
    hide-header
    @hidden="submitSuccess = false"
  >
    <template #default="{ close }">
      <transition name="fade" mode="out-in">
        <div v-if="submitSuccess" key="success" class="text-center">
          <p class="text-primary mb-24">
            <svg-icon
              name="check-32"
              width="32"
              height="32"
              aria-hidden="true"
            />
          </p>

          <h4 class="mb-8">
            {{ $t('catalog.feedbackHint.successTitle') }}
          </h4>

          <p class="fs-2 mb-32">
            {{ $t('catalog.feedbackHint.successMessage') }}
          </p>

          <div class="d-md-none">
            <b-button variant="primary" block @click="close">
              {{ $t('global.close') }}
            </b-button>
          </div>

          <div class="d-none d-md-block">
            <b-button size="sm" variant="primary" @click="close">
              {{ $t('global.close') }}
            </b-button>
          </div>
        </div>

        <div v-else key="form">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }" slim>
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="mb-32">
                <h4 v-text="$t('catalog.feedbackHint.modalTitle')"></h4>
                <p class="fs-2" v-text="$t('feedback.modalSubtitle')"></p>
              </div>

              <ValidationProvider
                v-for="(field, index) in fields"
                v-slot="{ valid, validated }"
                :key="`field-${index}`"
                :name="field.name"
                :rules="field.rules"
                mode="eager"
                slim
              >
                <b-form-group
                  :invalid-feedback="field.invalidFeedback"
                  class="mb-8"
                >
                  <LazyFormTelInput
                    v-if="field.type === 'tel'"
                    v-model="form[field.name]"
                    :state="valid || !validated ? null : false"
                  />

                  <b-form-textarea
                    v-else-if="field.name === 'message'"
                    v-model="form[field.name]"
                    :disabled="loading"
                    :placeholder="$t(field.placeholder)"
                    :state="valid || !validated ? null : false"
                    rows="3"
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
                <b-form-checkbox
                  v-model="accept"
                  :state="valid || !validated ? null : false"
                  :unchecked-value="null"
                >
                  <span class="fs-2 text-gray-600" v-html="acceptLabel" />
                </b-form-checkbox>
              </ValidationProvider>
            </form>
          </ValidationObserver>
        </div>
      </transition>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="white"
        size="sm"
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
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BModal,
  BSpinner,
} from 'bootstrap-vue'
import { mindboxProductConsultationForm } from '@/utils/mindbox'

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BModal,
    BSpinner,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    id: {
      type: String,
      default: 'consultation-modal',
    },
    code: {
      type: Number,
      default: 282,
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
          name: 'phone',
          placeholder: '',
          rules: 'required|tel',
          type: 'tel',
        },
        {
          name: 'email',
          placeholder: 'form.email',
          rules: 'required|email',
        },
        {
          name: 'message',
          placeholder: 'form.message',
        },
      ],
    },
    industryPage: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      accept: true,
      endpoint: `${process.env.REST_API_URL}/ekfgroup/form-request`,
      form: {},
      loading: false,
      submitSuccess: false,
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

    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },

  created() {
    this.initForm()
  },

  methods: {
    buildFormData() {
      const pageUrl = `${process.env.SITE_URL}${this.$route.fullPath}`
      const formData = new FormData()

      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      formData.append('_code', this.code)
      formData.append('pageUrl', pageUrl)

      return formData
    },

    initForm() {
      this.fields?.forEach(
        ({ name, value }) => (this.form[name] = value ?? null)
      )
    },

    async onSubmit() {
      if (this.loading) return

      this.loading = true
      const formData = this.buildFormData()

      try {
        const { data } = await this.$axios.post(this.endpoint, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })

        if (data?.status === 'success') this.handleSuccess()
        else
          this.showErrorToast(
            this.$t('form.submitErrorTitle'),
            this.$t('form.submitError')
          )
      } catch (error) {
        const title = this.$t('form.submitErrorTitle')
        const message =
          error?.response?.statusText ||
          error?.response?.data?.message ||
          'Server error. Try later'

        this.showErrorToast(title, message)
      } finally {
        this.loading = false
      }
    },

    handleSuccess() {
      this.submitSuccess = true

      if (this.industryPage) {
        this.$ym('reachGoal', 'sendformindustry')
      } else {
        mindboxProductConsultationForm(this.form)
        this.$gtm.push({ event: 'submFormProductCard' })
      }

      this.resetForm()
    },

    handleInput(value, field) {
      this.form[field] = value
    },

    resetForm() {
      this.accept = true
      this.initForm()

      if (typeof this.$refs.observer?.reset === 'function') {
        this.$refs.observer.reset()
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
