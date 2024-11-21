<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form @submit.prevent="handleSubmit(submitForm)">
      <b-row>
        <b-col md="6" lg="5" xl="4" order-md="2" class="mb-64 mb-md-32">
          <div class="card h-100 justify-content-center shadow">
            <div class="card-body flex-grow-0 p-32">
              <CartTotal :discount="discount" :total="total" />
            </div>
          </div>
        </b-col>

        <b-col md="6" lg="7" xl="8" order-md="1" class="mb-32">
          <b-form-radio-group
            v-model="localIsLegal"
            button-variant="gray-200"
            class="btn-group-tabs w-100 mb-32"
            buttons
            @input="$emit('input-legal', $event)"
          >
            <b-form-radio :value="false">
              {{ $t('cart.checkout.individual') }}
            </b-form-radio>

            <b-form-radio :value="true">
              {{ $t('cart.checkout.entity') }}
            </b-form-radio>
          </b-form-radio-group>

          <b-row class="mb-8">
            <transition name="fade">
              <b-col v-if="isLegal" cols="12" class="mb-8">
                <FormAutocomplete
                  :options="companies"
                  :placeholder="$t('cart.checkout.form.organization')"
                  :state="isCompanyValid ? null : false"
                  :value="form.company.value"
                  @input="fetchCompanies($event)"
                  @update="form.company = $event"
                >
                  <template #option="{ option }">
                    {{ option.value }}, ИНН: {{ option.data.inn }}
                  </template>
                </FormAutocomplete>
              </b-col>
            </transition>

            <b-col lg="6" class="mb-8">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="name"
                rules="required"
                slim
              >
                <b-form-input
                  v-model="form.name"
                  :placeholder="$t('form.fullName')"
                  :state="valid || !validated ? null : false"
                />
              </ValidationProvider>
            </b-col>

            <b-col lg="6" class="mb-8">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="phone"
                rules="required|tel"
                slim
              >
                <LazyFormTelInput
                  v-model="form.phone"
                  :state="valid || !validated ? null : false"
                />
              </ValidationProvider>
            </b-col>

            <b-col lg="6" class="mb-8">
              <ValidationProvider
                v-slot="{ valid, validated }"
                name="email"
                rules="required|email"
                slim
              >
                <b-form-input
                  v-model="form.email"
                  :placeholder="$t('form.email')"
                  :state="valid || !validated ? null : false"
                  type="email"
                />
              </ValidationProvider>
            </b-col>

            <b-col lg="6" class="mb-8">
              <ValidationProvider
                v-slot="{ valid, validate, validated }"
                name="city"
                rules="required"
                slim
              >
                <FormAutocomplete
                  ref="citySelect"
                  :options="cities"
                  :placeholder="$t('cart.checkout.form.pickupCity')"
                  :state="valid || !validated ? null : false"
                  :value="form.city"
                  @input="fetchCities($event)"
                  @update="handleCityUpdate($event, validate)"
                >
                  <template #option="{ option }">
                    {{ option }}
                  </template>
                </FormAutocomplete>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-form-radio-group
            :checked="selectDistributorManually"
            class="mb-16"
            stacked
          >
            <b-form-radio
              v-for="option in distributorOptions"
              :key="`distributor-option-${option.value}`"
              :value="option.value"
              @click.native.prevent="handleDistributorOptionClick(option.value)"
            >
              {{ $t(`cart.checkout.form.${option.text}`) }}
            </b-form-radio>
          </b-form-radio-group>

          <p v-if="distributor && distributor.id" class="fs-2 text-info">
            {{ $t('distribution.sellerPointSelected') }}
            {{ pointName }}
          </p>

          <b-form-textarea
            v-model="form.comment"
            :placeholder="$t('cart.checkout.form.comment')"
            rows="2"
          />
        </b-col>

        <b-col cols="12" order-md="3">
          <b-button
            :disabled="loading"
            type="submit"
            variant="primary"
            class="btn-lg-lg"
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
              class="mt-16"
            >
              {{ $t('cart.checkout.form.disclaimer') }}
            </b-form-checkbox>
          </ValidationProvider>
        </b-col>
      </b-row>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  BFormInput,
  BFormTextarea,
  BFormRadioGroup,
  BFormRadio,
  BFormCheckbox,
  BSpinner,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

import { getAnalyticData } from '~/utils/analytic'
import sendToMindbox from '@/utils/mindbox'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

import PARTNER_CITIES from '@/graphql/distribution/PartnerCities'
import ORDER_CREATE from '@/graphql/mutations/OrderCreate'

export default {
  components: {
    BFormInput,
    BFormTextarea,
    BFormRadioGroup,
    BFormRadio,
    BFormCheckbox,
    BSpinner,
  },
  props: {
    discount: {
      type: [Number, String],
      default: 0,
    },
    distributor: {
      type: Object,
      default: () => ({}),
    },
    isLegal: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    selectDistributorManually: {
      type: Boolean,
      default: false,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
  },

  data() {
    return {
      accept: true,
      cities: [],
      companies: [],
      distributorOptions: [
        { value: false, text: 'distributorSelectAuto' },
        { value: true, text: 'distributorSelectManual' },
      ],
      form: {
        city: null,
        comment: null,
        company: { value: null },
        email: null,
        name: null,
        phone: null,
        promocode: null,
      },
      isCompanyValid: true,
      loading: false,
    }
  },

  computed: {
    ...mapGetters('geo', ['selectedLocationName']),

    localIsLegal: {
      get() {
        return this.isLegal
      },
      set(newValue) {
        this.$emit('change-legal', newValue)
      },
    },

    localSelectDistributor: {
      get() {
        return this.selectDistributorManually
      },
      set(newValue) {
        this.$emit('select-distributor', newValue)
      },
    },

    pointName() {
      return [
        this.distributor?.commercial_name,
        this.distributor?.city,
        this.distributor?.street,
        this.distributor?.house,
      ]
        .filter((el) => Boolean(el))
        .join(', ')
    },
  },

  watch: {
    selectedLocationName: {
      immediate: true,
      handler(event) {
        this.form.city = event
      },
    },
  },

  methods: {
    async fetchCities(text) {
      const newCities = []

      if (text?.length) {
        this.loading = true

        const variables = {
          where: {
            _and: [
              { city: { _is_null: false } },
              { _or: [{ city: { _ilike: `%${text}%` } }] },
            ],
          },
        }

        const { cities } = await this.$graphql.default.request(
          PARTNER_CITIES,
          variables
        )

        cities?.forEach(({ name }) => {
          const cityName = name?.trim()?.replace(/(.+) г\.?$/gi, '$1')
          if (cityName?.length && !newCities.includes(cityName)) {
            newCities.push(cityName)
          }
        })

        this.loading = false
      } else {
        /* If nothing was found, reset city to previously selected on blur */
        this.addCitySelectorBlurListener()
      }

      this.cities = newCities
    },

    async fetchCompanies(text) {
      this.loading = true

      const response = await this.$axios.post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
        { query: text },
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token 1e46452c3557361fb8747708598498ddedc3b528',
          },
        }
      )

      this.companies = response.data.suggestions
      this.isCompanyValid = true

      this.loading = false
    },

    async submitForm() {
      if (this.loading) return

      this.validateCompany()
      if (!this.isCompanyValid) return

      this.loading = true

      const { name, phone, email, city, comment, promocode } = this.form
      let inn = null
      let company_name = null

      if (this.isLegal) {
        inn = this.form.company.data.inn
        company_name = this.form.company.value
      }

      const products = this.products.map(({ cart, id, price, price_base }) => ({
        base_price: parseFloat(price_base),
        id,
        price: parseFloat(price),
        quantity: cart.quantity,
      }))

      const { utm, referer } = getAnalyticData({
        utmPlugin: this.$utm,
        cookies: this.$cookies,
      })

      const mindboxEntity =
        inn && company_name ? 'Юридеческой лицо' : 'Физическое лицо'

      await this.$graphql.default
        .request(ORDER_CREATE, {
          order: {
            city,
            comment,
            company_name,
            email,
            inn,
            is_lead_chosen_manually: Boolean(this.selectDistributorManually),
            is_physical_person: !this.isLegal,
            name,
            partner_seller_point_id: this.distributor?.id,
            phone,
            products,
            promocode,
            utm,
            referer,
          },
        })
        .then(async () => {
          sendToMindbox('EKFGroup.CreateDistributorOrder', {
            customerAction: {
              customFields: {
                distributor: this.distributor?.commercial_name,
              },
            },
            customer: {
              email,
              mobilePhone: phone,
              fullName: name,
              subscriptions: mindboxSubscriptions,
              customFields: {
                inn,
                company: company_name,
                region: city,
                entity: mindboxEntity,
              },
            },
          })

          this.$gtm.push({ event: 'frmOrderDistr' })
          this.$gtm.push({
            event: 'ecommercePurchase',
            ecommerce: {
              purchase: {
                actionField: {
                  id: `distributor-order-${Date.now()}`,
                  revenue: this.total,
                },
                products: this.products.map(({ cart, id, name, price }) => ({
                  id,
                  name,
                  price,
                  quantity: cart.quantity,
                })),
              },
            },
          })

          await this.$store.dispatch('cart/cartDeleteBulk', {
            products: this.products.map(({ id }) => ({ product_id: id })),
          })

          // this.loading = false
          this.$router.push(this.localePath('/cart/order-confirm'))
        })
        .catch((error) => {
          const message = error?.response?.errors[0]?.message

          this.$bvToast.toast(message, {
            title: this.$t('global.error'),
            toaster: 'b-toaster-bottom-right',
            variant: 'danger',
            autoHideDelay: 5000,
          })

          this.loading = false
        })
    },

    addCitySelectorBlurListener() {
      const input = this.$refs.citySelect?.$el?.querySelector('.form-control')
      if (input) {
        input.addEventListener('blur', this.handleCitySelectorBlur)
      }
    },

    handleCitySelectorBlur(event) {
      if (event?.target) {
        /* Force reset input value to currently selected city */
        event.target.value = this.form.city
        event.target.removeEventListener('blur', this.handleCitySelectorBlur)
      }
    },

    handleCityUpdate(event, validate) {
      this.form.city = event
      if (typeof validate === 'function') {
        validate(event)
      }
    },

    handleDistributorOptionClick(event) {
      this.$emit('input-distributor-option', event)
    },

    validateCompany() {
      this.isCompanyValid = true
      if (this.isLegal) {
        if (
          !(
            this.form.company &&
            this.form.company.value &&
            this.form.company.data &&
            this.form.company.data.inn
          )
        ) {
          this.isCompanyValid = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .custom-radio {
  & + .custom-radio {
    margin-top: 0.75rem;
  }
}

@include media-breakpoint-down(sm) {
  ::v-deep .nav-tabs {
    .nav-link {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
}
</style>
