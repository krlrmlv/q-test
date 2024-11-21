<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitForm)">
        <b-form-input
          v-model="form.fullName"
          :placeholder="$t('form.fullName')"
          type="text"
          class="mb-8"
        ></b-form-input>
        <ValidationProvider
          v-slot="{ valid, validated }"
          name="phonenumber"
          rules="required|tel"
        >
          <LazyFormTelInput
            v-model="form.phonenumber"
            :state="valid || !validated ? null : false"
            class="mb-8"
          />
        </ValidationProvider>
        <FormFile
          v-model="form.files"
          class="file-btn-valencia mb-20 mb-lg-32"
          multiple
          :message-center="messageCenter"
        />
        <b-button type="submit" class="mb-16 valencia-submit-btn" block>
          {{ $t('form.submit') }}
        </b-button>
        <b-form-checkbox
          v-model="form.accept"
          class="text-gray-500 agreement-checkbox"
        >
          Я согласен с условиями
          <b-link
            to="/legal/user-agreement"
            target="_blank"
            class="text-reset text-underline ml-4 agreement"
          >
            Пользовательского соглашения</b-link
          >
        </b-form-checkbox>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { BFormCheckbox, BFormInput } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

export default {
  components: {
    BFormCheckbox,
    BFormInput,
  },
  props: {
    mindboxFormName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      noFile: false,
      messageCenter: true,
      formName: 'Заявка с https://ekfgroup.com/valencia',
      form: {
        accept: true,
        files: null,
        fullName: null,
        phonenumber: null,
        code: 1005,
      },
    }
  },

  methods: {
    async onSuccess(pageUrl) {
      this.$emit('modal-sent')
      if (process.client) {
        window.dataLayer = window.dataLayer || []
      }
      await sendToMindbox('EKFGroup.MobilePhoneForm', {
        customerAction: {
          customFields: {
            formName: this.mindboxFormName,
            LandingName: pageUrl,
          },
        },
        customer: {
          fullName: this.form?.fullName,
          mobilePhone: this.form?.phonenumber || '',
          subscriptions: mindboxSubscriptions,
        },
      })
      this.resetForm()
      // this.loading = false
    },
    resetForm() {
      this.form = {
        accept: true,
        files: null,
        fullName: null,
        phonenumber: null,
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

    submitForm() {
      const formData = new FormData()

      formData.append('username', this.form.fullName)
      formData.append('phone', this.form.phonenumber || '')

      formData.append('_code', this.form.code)
      formData.append('_name', this.formName || '')

      /* Append page URL */
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`
      formData.append('site', pageUrl)

      /* Append attached files */
      if (!this.noFile && this.form.files?.length) {
        this.form.files.forEach((file) => {
          formData.append('inputFiles[]', file)
        })
      }

      /* Append UTM params */
      const utmParams = this.$utm.get()
      Object.keys(utmParams).forEach((key) =>
        formData.append(key, utmParams[key])
      )

      this.$axios
        .post('https://api.ekfgroup.com/ekfgroup/form-request', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(() => this.onSuccess(pageUrl))
        .catch(() => {
          this.errorMessage =
            'Ошибка! Форма не была отправлена, попробуйте еще раз.'
        })
    },
  },
}
</script>

<style lang="scss">
$valencia-brown: #3d2f31;

.valencia-submit-btn {
  background-color: $valencia-brown;
  color: $white;
  &:hover {
    background-color: $valencia-brown;
  }
  &:active {
    background-color: $valencia-brown !important;
  }
}

.agreement-checkbox {
  .agreement {
    color: $valencia-brown !important;
  }

  .custom-control-label {
    display: block;
    &::before {
      color: #fff;
      border-color: $valencia-brown;
      background-color: $valencia-brown;
      top: 0;
    }
    &::after {
      top: 0;
    }
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    border-color: $valencia-brown;
    background-color: $valencia-brown;
  }
}

.file-btn-valencia {
  .custom-file-label {
    border: 1px solid $valencia-brown;
    color: $valencia-brown;
    background-color: #ebebeb;
  }
}
</style>
