<template>
  <b-modal
    v-model="localVisible"
    centered
    hide-footer
    hide-header
    @show="initModal"
  >
    <template #default="{ close }">
      <transition name="fade" mode="out-in">
        <div v-if="submitSuccess" key="success">
          <div class="text-md-center mb-32">
            <h4 v-text="$t('solutions.downloadFile.successTitle')" />
            <p
              class="fs-2"
              v-text="$t('solutions.downloadFile.successMessage')"
            />

            <b-button variant="primary" block @click="close">
              {{ $t('solutions.downloadFile.return') }}
            </b-button>
          </div>
        </div>

        <div v-else key="form">
          <div class="text-md-center mb-32">
            <h4 v-text="$t('solutions.downloadFile.title')" />
            <p class="fs-2" v-text="$t('solutions.downloadFile.subtitle')" />
          </div>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="name"
                rules="required"
              >
                <b-form-group
                  :invalid-feedback="$t('form.fieldRequiredFeedback')"
                  class="mb-8"
                >
                  <b-form-input
                    v-model="name"
                    :disabled="loading"
                    :placeholder="$t('form.firstName')"
                    :state="valid || !validated ? null : false"
                  />
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, validated }"
                name="email"
                rules="required|email"
              >
                <b-form-group
                  :invalid-feedback="$t('form.fieldRequiredFeedback')"
                  class="mb-8"
                >
                  <b-form-input
                    v-model="email"
                    :disabled="loading"
                    :placeholder="$t('form.email')"
                    :state="valid || !validated ? null : false"
                    type="email"
                  />

                  <b-form-text v-if="submitError" text-variant="danger">
                    {{ submitError }}
                  </b-form-text>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, validated }"
                name="phone"
                rules="required|tel"
              >
                <b-form-group
                  :invalid-feedback="$t('form.fieldRequiredFeedback')"
                  class="mb-8"
                >
                  <LazyFormTelInput
                    v-model="phone"
                    :state="valid || !validated ? null : false"
                  />

                  <b-form-text v-if="submitError" text-variant="danger">
                    {{ submitError }}
                  </b-form-text>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, validated }"
                name="company"
                rules="required"
              >
                <b-form-group
                  :invalid-feedback="$t('form.fieldRequiredFeedback')"
                  class="mb-8"
                >
                  <b-form-input
                    v-model="company"
                    :placeholder="$t('form.company')"
                    :state="valid || !validated ? null : false"
                    type="text"
                  />

                  <b-form-text v-if="submitError" text-variant="danger">
                    {{ submitError }}
                  </b-form-text>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, validated }"
                name="typeOfCompany"
                rules="required"
              >
                <b-form-group
                  :invalid-feedback="$t('form.fieldRequiredFeedback')"
                >
                  <b-form-select
                    v-model="companyType"
                    :options="companyTypeOptions"
                    :state="valid || !validated ? null : false"
                    type="text"
                  />

                  <b-form-text v-if="submitError" text-variant="danger">
                    {{ submitError }}
                  </b-form-text>
                </b-form-group>
              </ValidationProvider>

              <b-button
                :disabled="loading"
                type="submit"
                variant="primary"
                class="mb-8 mt-16"
                block
              >
                <b-spinner v-if="loading" class="mr-8" small />
                {{ $t('form.submit') }}
              </b-button>

              <ValidationProvider
                v-slot="{ valid, validated }"
                name="accept"
                rules="required"
              >
                <b-form-group
                  :invalid-feedback="$t('form.acceptRequiredFeedback')"
                  :state="valid || !validated ? null : false"
                  class="mb-0"
                >
                  <b-form-checkbox
                    v-model="accept"
                    :state="valid || !validated ? null : false"
                    :unchecked-value="null"
                  >
                    <span
                      :class="{ 'text-gray-600': valid || !validated }"
                      class="fs-2"
                      v-html="acceptLabel"
                    />
                  </b-form-checkbox>
                </b-form-group>
              </ValidationProvider>
            </form>
          </ValidationObserver>
        </div>
      </transition>

      <b-button
        :aria-label="$t('global.close')"
        :title="$t('global.close')"
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
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormText,
  BFormSelect,
  BModal,
  BSpinner,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import SOLUTION_FILE_DOWNLOAD_MUTATION from '@/graphql/solutions/SolutionFileDownload'

export default {
  components: {
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormText,
    BModal,
    BSpinner,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    file: {
      type: Object,
      default: () => ({}),
    },
    vendorCode: {
      type: String,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      accept: true,
      company: null,
      companyType: null,
      email: null,
      loading: false,
      name: null,
      phone: null,
      submitError: null,
      submitSuccess: false,
    }
  },

  computed: {
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

    companyTypeOptions() {
      const options = [
        'Проектный институт',
        'Промышленное предприятие',
        'Интегратор',
        'Производитель щитового оборудования',
        'Строительно-монтажная организация',
        'Обслуживающая организация',
        'Другое',
      ].map((value) => ({ value, text: value }))

      options.unshift({ text: 'Тип компании', value: null, disabled: true })

      return options
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
    async onSubmit() {
      if (this.loading) return

      this.loading = true

      const variables = {
        email: this.email,
        name: this.name,
        phone: this.phone,
        company: this.company,
        companyType: this.companyType,
        solution_file_id: this.file?.id,
        long_form: true,
      }

      try {
        const { result } = await this.$graphql.default.request(
          SOLUTION_FILE_DOWNLOAD_MUTATION,
          variables
        )

        if (result?.success) {
          this.handleSuccess(result)
        } else {
          this.handleSubmitError()
        }
      } catch (error) {
        this.handleSubmitError(error)
      }

      this.loading = false
    },

    handleSubmitError(error) {
      this.submitError =
        error?.response?.statusText ||
        error?.response?.data?.message ||
        error?.response?.errors[0]?.message ||
        this.$t('form.submitError')
    },

    handleSuccess(result) {
      if (this.metrikaGoal) {
        /* Reach additional YM goal if set for current category */
        this.$ym('reachGoal', this.metrikaGoal)
      }

      const mindboxResponse = JSON.parse(result?.message || '{}')

      if (mindboxResponse?.status?.toLowerCase() === 'success') {
        this.submitSuccess = true

        /* Set a true value in the cookie to prevent next opening of the modal if a file clicked */
        this.$cookies.set('archiv_form_submitted', true, {
          path: '/',
          sameSite: true,
        })

        this.$emit('form-submitted')
        this.resetForm()
        this.$ym('reachGoal', 'SAVESOLUTIONSENH')
      } else {
        this.submitError = this.$t('solutions.downloadFile.mindboxError')
      }
    },

    initModal() {
      this.submitSuccess = false
      this.resetForm()
    },

    resetForm() {
      this.accept = true
      this.company = null
      this.companyType = null
      this.email = null
      this.name = null
      this.phone = null
      this.submitError = null
    },
  },
}
</script>
