<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 mb-40 mb-lg-64 mt-lg-40">
        {{ $t('calculators.masterTool.freqConverterEfficiency.title') }}
      </h1>

      <FreqConverterEfficiencyInputData
        :loading="loading"
        :options="options"
        class="mb-lg-16"
        @reset="handleReset"
        @submit="handleSubmit"
      />

      <FreqConverterEfficiencyResult
        v-if="calculatorResponse"
        :result="calculatorResponse"
      />
    </b-container>

    <div v-if="calculatorResponse" class="bg-light py-64 py-lg-96">
      <b-container>
        <b-row>
          <b-col offset-lg="2" lg="8">
            <h2>{{ $t('formTitle') }}</h2>

            <p>{{ $t('formSubtitle') }}</p>

            <FormFeedback
              :code="282"
              :mindbox-custom-fields="mindboxCustomFields"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </main>
</template>

<script>
import { getCartId } from '@/utils/cart'
import CALCULATE_EFFICIENCY_MUTATION from '@/graphql/calculators/master-tool/freq-converter-efficiency/CalculateFreqConverterEfficiency'
import FREQ_CONVERTER_OPTIONS from '@/graphql/calculators/master-tool/freq-converter-efficiency/FreqConverterProducts'
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  async asyncData({ app, $graphql }) {
    const { options } = await $graphql.default.request(FREQ_CONVERTER_OPTIONS, {
      locale: app.i18n.locale,
    })
    return { options }
  },

  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        {
          text: 'calculators.masterTool.freqConverterEfficiency.title',
          to: '/calculators/masterlight',
          active: true,
        },
      ],
      calculatorResponse: null,
      loading: false,
      mindboxCustomFields: {
        formName: 'Оставить заявку - форма в футере',
        EKFFormID: 'ostavit_zayavku_forma_v_futere',
        calculator:
          'Mastertool - Расчет экономической эффективности от применения преобразователя частоты VECTOR EKF PROxima',
      },
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  mounted() {
    mindboxViewCalculator(this.$t('pageTitle'))
  },

  methods: {
    async handleSubmit(data) {
      this.handleReset()

      try {
        this.loading = true
        const cartId = await getCartId(this.$cookies)

        this.$graphql.default.setHeaders({
          'x-hasura-cart-id': cartId,
        })

        const { result } = await this.$graphql.default.request(
          CALCULATE_EFFICIENCY_MUTATION,
          {
            ...data,
            cartId,
            locale: this.$i18n.locale,
          }
        )

        const product = result?.product?.product?.[0]

        if (product?.vendor_code) {
          this.calculatorResponse = { ...result, product }
        } else {
          throw new Error(this.$t('calculatorErrorMessage'))
        }
      } catch (error) {
        this.$bvToast.toast(error.message, {
          autoHideDelay: 5000,
          title: this.$t('global.error'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
        })
      } finally {
        this.loading = false
      }
    },

    handleReset() {
      this.calculatorResponse = null
    },
  },
}
</script>

<i18n>
{
  "en": {
    "calculatorErrorMessage": "Error! Picking compatible freq converter failed. Try again later.",
    "formTitle": "Need advice?",
    "formSubtitle": "Leave a request, and our experts will help you choose the right frequency converter for your equipment and working conditions",
    "pageTitle": "Calculation of economic efficiency from the application frequency converter VECTOR EKF PROXima"
  },
  "ru": {
    "calculatorErrorMessage": "Ошибка! Не удалось подобрать преобразователь. Попробуйте позже.",
    "formTitle": "Нужна консультация?",
    "formSubtitle": "Оставьте заявку, и наши специалисты помогут подобрать подходящий преобразователь частоты для вашего оборудования и условий работы",
    "pageTitle": "Расчет экономической эффективности от применения преобразователя частоты VECTOR EKF PROXima"
  }
}
</i18n>
